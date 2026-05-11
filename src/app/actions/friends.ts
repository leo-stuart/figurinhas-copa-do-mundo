'use server'

import { randomBytes } from 'node:crypto'
import { headers } from 'next/headers'
import { createClient } from '@/infrastructure/supabase/server'
import { SupabaseProfileRepository } from '@/infrastructure/repositories/SupabaseProfileRepository'
import { SupabaseFriendshipRepository } from '@/infrastructure/repositories/SupabaseFriendshipRepository'
import { EnsureProfile } from '@/domain/usecases/EnsureProfile'
import { AcceptInvite, type AcceptInviteResult } from '@/domain/usecases/AcceptInvite'
import { ListFriends } from '@/domain/usecases/ListFriends'
import { GetMatches } from '@/domain/usecases/GetMatches'
import { RemoveFriend } from '@/domain/usecases/RemoveFriend'
import { SetDisplayName } from '@/domain/usecases/SetDisplayName'
import type { Profile } from '@/domain/entities/Profile'
import type { Match } from '@/domain/entities/Match'

async function getMe() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) throw new Error('Not authenticated')
  return {
    supabase,
    userId: data.claims.sub as string,
    email: data.claims.email as string | undefined,
  }
}

export async function ensureMyProfile(): Promise<Profile> {
  const { supabase, userId, email } = await getMe()
  const repo = new SupabaseProfileRepository(supabase)
  const useCase = new EnsureProfile(repo, (n) => new Uint8Array(randomBytes(n)))
  return useCase.execute(userId, email)
}

export async function getMyInviteUrl(): Promise<{ url: string; slug: string }> {
  const profile = await ensureMyProfile()
  const h = await headers()
  const proto = h.get('x-forwarded-proto') ?? 'https'
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  return { url: `${proto}://${host}/invite/${profile.inviteSlug}`, slug: profile.inviteSlug }
}

export async function setDisplayName(name: string): Promise<Profile> {
  const { supabase, userId } = await getMe()
  const repo = new SupabaseProfileRepository(supabase)
  const useCase = new SetDisplayName(repo)
  return useCase.execute(userId, name)
}

export async function listFriends(): Promise<Array<{ userId: string; displayName: string }>> {
  const { supabase, userId } = await getMe()
  const profileRepo = new SupabaseProfileRepository(supabase)
  const friendshipRepo = new SupabaseFriendshipRepository(supabase)
  const useCase = new ListFriends(profileRepo, friendshipRepo)
  const friends = await useCase.execute(userId)
  return friends.map(f => ({ userId: f.userId, displayName: f.displayName }))
}

export async function getMatchesFor(friendId: string): Promise<{
  match: Match
  friend: { userId: string; displayName: string } | null
}> {
  const { supabase } = await getMe()
  const profileRepo = new SupabaseProfileRepository(supabase)
  const friendshipRepo = new SupabaseFriendshipRepository(supabase)
  const useCase = new GetMatches(friendshipRepo)

  const [match, friendProfile] = await Promise.all([
    useCase.execute(friendId),
    profileRepo.getByUserId(friendId),
  ])
  return {
    match,
    friend: friendProfile
      ? { userId: friendProfile.userId, displayName: friendProfile.displayName }
      : null,
  }
}

export async function removeFriend(friendId: string): Promise<void> {
  const { supabase, userId } = await getMe()
  const repo = new SupabaseFriendshipRepository(supabase)
  const useCase = new RemoveFriend(repo)
  await useCase.execute(userId, friendId)
}

export async function acceptInviteBySlug(slug: string): Promise<AcceptInviteResult> {
  const { supabase, userId, email } = await getMe()
  const profileRepo = new SupabaseProfileRepository(supabase)
  const friendshipRepo = new SupabaseFriendshipRepository(supabase)

  await new EnsureProfile(profileRepo, (n) => new Uint8Array(randomBytes(n))).execute(userId, email)

  const useCase = new AcceptInvite(profileRepo, friendshipRepo)
  return useCase.execute(userId, slug)
}

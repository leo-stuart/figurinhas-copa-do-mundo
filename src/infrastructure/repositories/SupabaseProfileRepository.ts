import type { SupabaseClient } from '@supabase/supabase-js'
import type { IProfileRepository } from '@/domain/repositories/IProfileRepository'
import type { Profile } from '@/domain/entities/Profile'

interface ProfileRow {
  user_id: string
  display_name: string
  invite_slug: string
  created_at: string
}

function toEntity(row: ProfileRow): Profile {
  return {
    userId: row.user_id,
    displayName: row.display_name,
    inviteSlug: row.invite_slug,
    createdAt: new Date(row.created_at),
  }
}

export class SupabaseProfileRepository implements IProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getByUserId(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    return data ? toEntity(data as ProfileRow) : null
  }

  async getBySlug(slug: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('invite_slug', slug)
      .maybeSingle()

    if (error) throw error
    return data ? toEntity(data as ProfileRow) : null
  }

  async getManyByUserIds(userIds: string[]): Promise<Profile[]> {
    if (userIds.length === 0) return []
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .in('user_id', userIds)

    if (error) throw error
    return (data ?? []).map(row => toEntity(row as ProfileRow))
  }

  async create(profile: Profile): Promise<Profile> {
    const { data, error } = await this.supabase
      .from('profiles')
      .insert({
        user_id: profile.userId,
        display_name: profile.displayName,
        invite_slug: profile.inviteSlug,
      })
      .select()
      .single()

    if (error) throw error
    return toEntity(data as ProfileRow)
  }

  async updateDisplayName(userId: string, displayName: string): Promise<Profile> {
    const { data, error } = await this.supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return toEntity(data as ProfileRow)
  }
}

'use server'

import { createClient } from '@/infrastructure/supabase/server'
import { SupabaseStickerRepository } from '@/infrastructure/repositories/SupabaseStickerRepository'
import { UpdateStickerCount } from '@/domain/usecases/UpdateStickerCount'
import { GetUserStickers } from '@/domain/usecases/GetUserStickers'

export async function updateStickerCount(stickerCode: string, count: number) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) throw new Error('Not authenticated')

  const repo = new SupabaseStickerRepository(supabase)
  const useCase = new UpdateStickerCount(repo)
  return useCase.execute(data.claims.sub, stickerCode, count)
}

export async function getUserStickers(): Promise<Record<string, number>> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) return {}

  const repo = new SupabaseStickerRepository(supabase)
  const useCase = new GetUserStickers(repo)
  return useCase.execute(data.claims.sub)
}

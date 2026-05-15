'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/infrastructure/supabase/server'
import { SupabaseStickerRepository } from '@/infrastructure/repositories/SupabaseStickerRepository'
import { SupabaseStickerHistoryRepository } from '@/infrastructure/repositories/SupabaseStickerHistoryRepository'
import { UpdateStickerCount } from '@/domain/usecases/UpdateStickerCount'
import { GetUserStickers } from '@/domain/usecases/GetUserStickers'
import { GetStickerHistory } from '@/domain/usecases/GetStickerHistory'
import { ResetAllStickers } from '@/domain/usecases/ResetAllStickers'
import type { StickerHistoryEntry } from '@/domain/entities/StickerHistoryEntry'

export async function updateStickerCount(stickerCode: string, count: number) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) throw new Error('Not authenticated')

  const repo = new SupabaseStickerRepository(supabase)
  const historyRepo = new SupabaseStickerHistoryRepository(supabase)
  const useCase = new UpdateStickerCount(repo, historyRepo)
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

export async function getStickerHistory(
  page: number = 0,
  pageSize: number = 20,
): Promise<{ entries: StickerHistoryEntry[]; total: number }> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) return { entries: [], total: 0 }

  const historyRepo = new SupabaseStickerHistoryRepository(supabase)
  const useCase = new GetStickerHistory(historyRepo)
  return useCase.execute(data.claims.sub, pageSize, page * pageSize)
}

export async function resetAllStickers(): Promise<{ resetCount: number }> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) throw new Error('Not authenticated')

  const repo = new SupabaseStickerRepository(supabase)
  const historyRepo = new SupabaseStickerHistoryRepository(supabase)
  const useCase = new ResetAllStickers(repo, historyRepo)
  const result = await useCase.execute(data.claims.sub)

  revalidatePath('/album')
  revalidatePath('/history')

  return result
}

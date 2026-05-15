import type { SupabaseClient } from '@supabase/supabase-js'
import type { IStickerHistoryRepository } from '@/domain/repositories/IStickerHistoryRepository'
import type { StickerHistoryEntry } from '@/domain/entities/StickerHistoryEntry'

export class SupabaseStickerHistoryRepository implements IStickerHistoryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async record(userId: string, stickerCode: string, previousCount: number, newCount: number): Promise<void> {
    const { error } = await this.supabase
      .from('sticker_history')
      .insert({
        user_id: userId,
        sticker_code: stickerCode,
        previous_count: previousCount,
        new_count: newCount,
      })

    if (error) throw error
  }

  async list(userId: string, limit: number, offset: number): Promise<{ entries: StickerHistoryEntry[]; total: number }> {
    const { data, count, error } = await this.supabase
      .from('sticker_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    const entries: StickerHistoryEntry[] = (data ?? []).map(row => ({
      id: row.id,
      stickerCode: row.sticker_code,
      previousCount: row.previous_count,
      newCount: row.new_count,
      delta: row.delta,
      createdAt: new Date(row.created_at),
    }))

    return { entries, total: count ?? 0 }
  }
}

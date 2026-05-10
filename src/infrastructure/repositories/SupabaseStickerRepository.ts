import type { SupabaseClient } from '@supabase/supabase-js'
import type { IStickerRepository } from '@/domain/repositories/IStickerRepository'
import type { UserSticker } from '@/domain/entities/UserSticker'

export class SupabaseStickerRepository implements IStickerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getUserStickers(userId: string): Promise<UserSticker[]> {
    const { data, error } = await this.supabase
      .from('user_stickers')
      .select('*')
      .eq('user_id', userId)
      .gt('count', 0)

    if (error) throw error

    return (data ?? []).map(row => ({
      userId: row.user_id,
      stickerCode: row.sticker_code,
      count: row.count,
      updatedAt: new Date(row.updated_at),
    }))
  }

  async upsertStickerCount(userId: string, stickerCode: string, count: number): Promise<UserSticker> {
    const { data, error } = await this.supabase
      .from('user_stickers')
      .upsert(
        { user_id: userId, sticker_code: stickerCode, count, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,sticker_code' }
      )
      .select()
      .single()

    if (error) throw error

    return {
      userId: data.user_id,
      stickerCode: data.sticker_code,
      count: data.count,
      updatedAt: new Date(data.updated_at),
    }
  }

  async deleteStickerEntry(userId: string, stickerCode: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_stickers')
      .delete()
      .eq('user_id', userId)
      .eq('sticker_code', stickerCode)

    if (error) throw error
  }
}

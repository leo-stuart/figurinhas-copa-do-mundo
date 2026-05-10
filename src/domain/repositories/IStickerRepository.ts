import type { UserSticker } from '../entities/UserSticker'

export interface IStickerRepository {
  getUserStickers(userId: string): Promise<UserSticker[]>
  upsertStickerCount(userId: string, stickerCode: string, count: number): Promise<UserSticker>
  deleteStickerEntry(userId: string, stickerCode: string): Promise<void>
}

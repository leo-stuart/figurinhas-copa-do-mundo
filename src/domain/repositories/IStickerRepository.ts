import type { UserSticker } from '../entities/UserSticker'

export interface IStickerRepository {
  getUserStickers(userId: string): Promise<UserSticker[]>
  getStickerCount(userId: string, stickerCode: string): Promise<number>
  upsertStickerCount(userId: string, stickerCode: string, count: number): Promise<UserSticker>
  deleteStickerEntry(userId: string, stickerCode: string): Promise<void>
  deleteAllForUser(userId: string): Promise<void>
}

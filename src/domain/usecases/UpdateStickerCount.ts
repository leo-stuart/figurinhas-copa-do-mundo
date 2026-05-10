import type { IStickerRepository } from '../repositories/IStickerRepository'
import type { UserSticker } from '../entities/UserSticker'

export class UpdateStickerCount {
  constructor(private readonly repo: IStickerRepository) {}

  async execute(userId: string, stickerCode: string, count: number): Promise<UserSticker | null> {
    if (count <= 0) {
      await this.repo.deleteStickerEntry(userId, stickerCode)
      return null
    }
    return this.repo.upsertStickerCount(userId, stickerCode, count)
  }
}

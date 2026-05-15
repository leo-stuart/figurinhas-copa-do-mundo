import type { IStickerRepository } from '../repositories/IStickerRepository'
import type { IStickerHistoryRepository } from '../repositories/IStickerHistoryRepository'

export class ResetAllStickers {
  constructor(
    private readonly repo: IStickerRepository,
    private readonly historyRepo: IStickerHistoryRepository,
  ) {}

  async execute(userId: string): Promise<{ resetCount: number }> {
    const owned = await this.repo.getUserStickers(userId)

    await this.repo.deleteAllForUser(userId)

    for (const sticker of owned) {
      await this.historyRepo.record(userId, sticker.stickerCode, sticker.count, 0)
    }

    return { resetCount: owned.length }
  }
}

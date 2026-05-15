import type { IStickerRepository } from '../repositories/IStickerRepository'
import type { IStickerHistoryRepository } from '../repositories/IStickerHistoryRepository'
import type { UserSticker } from '../entities/UserSticker'

export class UpdateStickerCount {
  constructor(
    private readonly repo: IStickerRepository,
    private readonly historyRepo: IStickerHistoryRepository,
  ) {}

  async execute(userId: string, stickerCode: string, count: number): Promise<UserSticker | null> {
    const previousCount = await this.repo.getStickerCount(userId, stickerCode)

    let result: UserSticker | null
    if (count <= 0) {
      await this.repo.deleteStickerEntry(userId, stickerCode)
      result = null
    } else {
      result = await this.repo.upsertStickerCount(userId, stickerCode, count)
    }

    if (previousCount !== count) {
      await this.historyRepo.record(userId, stickerCode, previousCount, count)
    }

    return result
  }
}

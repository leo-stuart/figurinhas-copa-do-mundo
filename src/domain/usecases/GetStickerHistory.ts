import type { IStickerHistoryRepository } from '../repositories/IStickerHistoryRepository'
import type { StickerHistoryEntry } from '../entities/StickerHistoryEntry'

export class GetStickerHistory {
  constructor(private readonly repo: IStickerHistoryRepository) {}

  async execute(
    userId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ entries: StickerHistoryEntry[]; total: number }> {
    return this.repo.list(userId, limit, offset)
  }
}

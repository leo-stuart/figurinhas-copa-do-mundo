import type { StickerHistoryEntry } from '../entities/StickerHistoryEntry'

export interface IStickerHistoryRepository {
  record(userId: string, stickerCode: string, previousCount: number, newCount: number): Promise<void>
  list(userId: string, limit: number, offset: number): Promise<{ entries: StickerHistoryEntry[]; total: number }>
}

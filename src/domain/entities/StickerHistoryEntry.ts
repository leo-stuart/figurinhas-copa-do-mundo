export interface StickerHistoryEntry {
  id: string
  stickerCode: string
  previousCount: number
  newCount: number
  delta: number
  createdAt: Date
}

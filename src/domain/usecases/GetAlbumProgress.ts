import type { AlbumProgress } from '../entities/AlbumProgress'

export class GetAlbumProgress {
  execute(owned: Map<string, number>, totalStickers: number): AlbumProgress {
    let have = 0
    let duplicatesCount = 0

    for (const count of owned.values()) {
      if (count >= 1) have++
      if (count >= 2) duplicatesCount += count - 1
    }

    return {
      total: totalStickers,
      have,
      missing: totalStickers - have,
      duplicatesCount,
      percentage: Math.round((have / totalStickers) * 100),
    }
  }
}

import type { IStickerRepository } from '../repositories/IStickerRepository'

export class GetUserStickers {
  constructor(private readonly repo: IStickerRepository) {}

  async execute(userId: string): Promise<Record<string, number>> {
    const stickers = await this.repo.getUserStickers(userId)
    return Object.fromEntries(stickers.map(s => [s.stickerCode, s.count]))
  }
}

export type StickerSection = 'fwc' | 'team' | 'coca-cola'

export interface Sticker {
  code: string
  section: StickerSection
  number: number
  teamCode?: string
}

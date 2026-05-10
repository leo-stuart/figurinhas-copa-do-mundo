export interface Team {
  name: string
  code: string
  flag: string
  group: string
}

export interface AlbumGroup {
  letter: string
  teams: Team[]
}

const TEAM_PRIMARY_COLORS: Record<string, string> = {
  MEX: '#009B3A',
  KOR: '#CC0000',
  RSA: '#FEDF00',
  CZE: '#003087',
  CAN: '#D80621',
  SUI: '#D80621',
  QAT: '#7A1231',
  BIH: '#1557A8',
  BRA: '#009B3A',
  MAR: '#CC0000',
  HAI: '#1557A8',
  SCO: '#003087',
  USA: '#003087',
  PAR: '#CC0000',
  AUS: '#FEDF00',
  TUR: '#D80621',
  GER: '#111111',
  CIV: '#009B3A',
  ECU: '#FEDF00',
  CUW: '#1557A8',
  NED: '#F36C21',
  JPN: '#D80621',
  TUN: '#CC0000',
  SWE: '#1557A8',
  BEL: '#111111',
  EGY: '#CC0000',
  IRN: '#009B3A',
  NZL: '#0A1E4A',
  ESP: '#CC0000',
  URU: '#89C8F5',
  KSA: '#009B3A',
  CPV: '#1557A8',
  FRA: '#003087',
  SEN: '#009B3A',
  NOR: '#D80621',
  IRQ: '#009B3A',
  ARG: '#89C8F5',
  ALG: '#009B3A',
  AUT: '#D80621',
  JOR: '#CC0000',
  POR: '#009B3A',
  COL: '#FEDF00',
  UZB: '#1557A8',
  COD: '#1557A8',
  ENG: '#FFFFFF',
  CRO: '#CC0000',
  GHA: '#FEDF00',
  PAN: '#D80621',
}

export const GROUPS: AlbumGroup[] = [
  { letter: 'A', teams: [
    { name: 'Mexico',             code: 'MEX', flag: '🇲🇽', group: 'A' },
    { name: 'South Korea',        code: 'KOR', flag: '🇰🇷', group: 'A' },
    { name: 'South Africa',       code: 'RSA', flag: '🇿🇦', group: 'A' },
    { name: 'Czechia',            code: 'CZE', flag: '🇨🇿', group: 'A' },
  ]},
  { letter: 'B', teams: [
    { name: 'Canada',             code: 'CAN', flag: '🇨🇦', group: 'B' },
    { name: 'Switzerland',        code: 'SUI', flag: '🇨🇭', group: 'B' },
    { name: 'Qatar',              code: 'QAT', flag: '🇶🇦', group: 'B' },
    { name: 'Bosnia-Herzegovina', code: 'BIH', flag: '🇧🇦', group: 'B' },
  ]},
  { letter: 'C', teams: [
    { name: 'Brazil',             code: 'BRA', flag: '🇧🇷', group: 'C' },
    { name: 'Morocco',            code: 'MAR', flag: '🇲🇦', group: 'C' },
    { name: 'Haiti',              code: 'HAI', flag: '🇭🇹', group: 'C' },
    { name: 'Scotland',           code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  ]},
  { letter: 'D', teams: [
    { name: 'United States',      code: 'USA', flag: '🇺🇸', group: 'D' },
    { name: 'Paraguay',           code: 'PAR', flag: '🇵🇾', group: 'D' },
    { name: 'Australia',          code: 'AUS', flag: '🇦🇺', group: 'D' },
    { name: 'Türkiye',            code: 'TUR', flag: '🇹🇷', group: 'D' },
  ]},
  { letter: 'E', teams: [
    { name: 'Germany',            code: 'GER', flag: '🇩🇪', group: 'E' },
    { name: 'Ivory Coast',        code: 'CIV', flag: '🇨🇮', group: 'E' },
    { name: 'Ecuador',            code: 'ECU', flag: '🇪🇨', group: 'E' },
    { name: 'Curaçao',            code: 'CUW', flag: '🇨🇼', group: 'E' },
  ]},
  { letter: 'F', teams: [
    { name: 'Netherlands',        code: 'NED', flag: '🇳🇱', group: 'F' },
    { name: 'Japan',              code: 'JPN', flag: '🇯🇵', group: 'F' },
    { name: 'Tunisia',            code: 'TUN', flag: '🇹🇳', group: 'F' },
    { name: 'Sweden',             code: 'SWE', flag: '🇸🇪', group: 'F' },
  ]},
  { letter: 'G', teams: [
    { name: 'Belgium',            code: 'BEL', flag: '🇧🇪', group: 'G' },
    { name: 'Egypt',              code: 'EGY', flag: '🇪🇬', group: 'G' },
    { name: 'Iran',               code: 'IRN', flag: '🇮🇷', group: 'G' },
    { name: 'New Zealand',        code: 'NZL', flag: '🇳🇿', group: 'G' },
  ]},
  { letter: 'H', teams: [
    { name: 'Spain',              code: 'ESP', flag: '🇪🇸', group: 'H' },
    { name: 'Uruguay',            code: 'URU', flag: '🇺🇾', group: 'H' },
    { name: 'Saudi Arabia',       code: 'KSA', flag: '🇸🇦', group: 'H' },
    { name: 'Cabo Verde',         code: 'CPV', flag: '🇨🇻', group: 'H' },
  ]},
  { letter: 'I', teams: [
    { name: 'France',             code: 'FRA', flag: '🇫🇷', group: 'I' },
    { name: 'Senegal',            code: 'SEN', flag: '🇸🇳', group: 'I' },
    { name: 'Norway',             code: 'NOR', flag: '🇳🇴', group: 'I' },
    { name: 'Iraq',               code: 'IRQ', flag: '🇮🇶', group: 'I' },
  ]},
  { letter: 'J', teams: [
    { name: 'Argentina',          code: 'ARG', flag: '🇦🇷', group: 'J' },
    { name: 'Algeria',            code: 'ALG', flag: '🇩🇿', group: 'J' },
    { name: 'Austria',            code: 'AUT', flag: '🇦🇹', group: 'J' },
    { name: 'Jordan',             code: 'JOR', flag: '🇯🇴', group: 'J' },
  ]},
  { letter: 'K', teams: [
    { name: 'Portugal',           code: 'POR', flag: '🇵🇹', group: 'K' },
    { name: 'Colombia',           code: 'COL', flag: '🇨🇴', group: 'K' },
    { name: 'Uzbekistan',         code: 'UZB', flag: '🇺🇿', group: 'K' },
    { name: 'Congo DR',           code: 'COD', flag: '🇨🇩', group: 'K' },
  ]},
  { letter: 'L', teams: [
    { name: 'England',            code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
    { name: 'Croatia',            code: 'CRO', flag: '🇭🇷', group: 'L' },
    { name: 'Ghana',              code: 'GHA', flag: '🇬🇭', group: 'L' },
    { name: 'Panama',             code: 'PAN', flag: '🇵🇦', group: 'L' },
  ]},
]

export const FWC_COUNT = 20
export const CC_COUNT = 14
export const TEAM_STICKER_COUNT = 20
export const TOTAL_STICKERS = FWC_COUNT + GROUPS.reduce((s, g) => s + g.teams.length * TEAM_STICKER_COUNT, 0) + CC_COUNT

export function fwcCodes(): string[] {
  return Array.from({ length: FWC_COUNT }, (_, i) => `FWC_${i + 1}`)
}

export function ccCodes(): string[] {
  return Array.from({ length: CC_COUNT }, (_, i) => `CC_${i + 1}`)
}

export function teamCodes(code: string): string[] {
  return Array.from({ length: TEAM_STICKER_COUNT }, (_, i) => `${code}_${i + 1}`)
}

export function teamPrimaryColor(code: string): string {
  return TEAM_PRIMARY_COLORS[code] ?? '#1557A8'
}

export function getStickerInfo(code: string): { title: string; sub: string } {
  const [prefix, num] = code.split('_')
  if (prefix === 'FWC') return { title: `FWC ${num}`, sub: 'Introdução · FWC' }
  if (prefix === 'CC')  return { title: `CC ${num}`,  sub: 'Exclusiva Coca-Cola' }
  for (const g of GROUPS) {
    const t = g.teams.find(t => t.code === prefix)
    if (t) return { title: `${t.flag} ${prefix} ${num}`, sub: `${t.name} · Grupo ${g.letter}` }
  }
  return { title: code, sub: '' }
}

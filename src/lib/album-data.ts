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
    { name: 'México',             code: 'MEX', flag: '🇲🇽', group: 'A' },
    { name: 'Coreia do Sul',      code: 'KOR', flag: '🇰🇷', group: 'A' },
    { name: 'África do Sul',      code: 'RSA', flag: '🇿🇦', group: 'A' },
    { name: 'Tchéquia',           code: 'CZE', flag: '🇨🇿', group: 'A' },
  ]},
  { letter: 'B', teams: [
    { name: 'Canadá',             code: 'CAN', flag: '🇨🇦', group: 'B' },
    { name: 'Suíça',              code: 'SUI', flag: '🇨🇭', group: 'B' },
    { name: 'Catar',              code: 'QAT', flag: '🇶🇦', group: 'B' },
    { name: 'Bósnia-Herzegovina', code: 'BIH', flag: '🇧🇦', group: 'B' },
  ]},
  { letter: 'C', teams: [
    { name: 'Brasil',             code: 'BRA', flag: '🇧🇷', group: 'C' },
    { name: 'Marrocos',           code: 'MAR', flag: '🇲🇦', group: 'C' },
    { name: 'Haiti',              code: 'HAI', flag: '🇭🇹', group: 'C' },
    { name: 'Escócia',            code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  ]},
  { letter: 'D', teams: [
    { name: 'Estados Unidos',     code: 'USA', flag: '🇺🇸', group: 'D' },
    { name: 'Paraguai',           code: 'PAR', flag: '🇵🇾', group: 'D' },
    { name: 'Austrália',          code: 'AUS', flag: '🇦🇺', group: 'D' },
    { name: 'Turquia',            code: 'TUR', flag: '🇹🇷', group: 'D' },
  ]},
  { letter: 'E', teams: [
    { name: 'Alemanha',           code: 'GER', flag: '🇩🇪', group: 'E' },
    { name: 'Costa do Marfim',    code: 'CIV', flag: '🇨🇮', group: 'E' },
    { name: 'Equador',            code: 'ECU', flag: '🇪🇨', group: 'E' },
    { name: 'Curaçao',            code: 'CUW', flag: '🇨🇼', group: 'E' },
  ]},
  { letter: 'F', teams: [
    { name: 'Países Baixos',      code: 'NED', flag: '🇳🇱', group: 'F' },
    { name: 'Japão',              code: 'JPN', flag: '🇯🇵', group: 'F' },
    { name: 'Tunísia',            code: 'TUN', flag: '🇹🇳', group: 'F' },
    { name: 'Suécia',             code: 'SWE', flag: '🇸🇪', group: 'F' },
  ]},
  { letter: 'G', teams: [
    { name: 'Bélgica',            code: 'BEL', flag: '🇧🇪', group: 'G' },
    { name: 'Egito',              code: 'EGY', flag: '🇪🇬', group: 'G' },
    { name: 'Irã',                code: 'IRN', flag: '🇮🇷', group: 'G' },
    { name: 'Nova Zelândia',      code: 'NZL', flag: '🇳🇿', group: 'G' },
  ]},
  { letter: 'H', teams: [
    { name: 'Espanha',            code: 'ESP', flag: '🇪🇸', group: 'H' },
    { name: 'Uruguai',            code: 'URU', flag: '🇺🇾', group: 'H' },
    { name: 'Arábia Saudita',     code: 'KSA', flag: '🇸🇦', group: 'H' },
    { name: 'Cabo Verde',         code: 'CPV', flag: '🇨🇻', group: 'H' },
  ]},
  { letter: 'I', teams: [
    { name: 'França',             code: 'FRA', flag: '🇫🇷', group: 'I' },
    { name: 'Senegal',            code: 'SEN', flag: '🇸🇳', group: 'I' },
    { name: 'Noruega',            code: 'NOR', flag: '🇳🇴', group: 'I' },
    { name: 'Iraque',             code: 'IRQ', flag: '🇮🇶', group: 'I' },
  ]},
  { letter: 'J', teams: [
    { name: 'Argentina',          code: 'ARG', flag: '🇦🇷', group: 'J' },
    { name: 'Argélia',            code: 'ALG', flag: '🇩🇿', group: 'J' },
    { name: 'Áustria',            code: 'AUT', flag: '🇦🇹', group: 'J' },
    { name: 'Jordânia',           code: 'JOR', flag: '🇯🇴', group: 'J' },
  ]},
  { letter: 'K', teams: [
    { name: 'Portugal',           code: 'POR', flag: '🇵🇹', group: 'K' },
    { name: 'Colômbia',           code: 'COL', flag: '🇨🇴', group: 'K' },
    { name: 'Uzbequistão',        code: 'UZB', flag: '🇺🇿', group: 'K' },
    { name: 'RD Congo',           code: 'COD', flag: '🇨🇩', group: 'K' },
  ]},
  { letter: 'L', teams: [
    { name: 'Inglaterra',         code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
    { name: 'Croácia',            code: 'CRO', flag: '🇭🇷', group: 'L' },
    { name: 'Gana',               code: 'GHA', flag: '🇬🇭', group: 'L' },
    { name: 'Panamá',             code: 'PAN', flag: '🇵🇦', group: 'L' },
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

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
  MEX: '#006847', // flag green
  KOR: '#C60C30', // taegeuk red
  RSA: '#007749', // flag green
  CZE: '#11457E', // flag blue
  CAN: '#D52B1E', // maple red
  SUI: '#DA291C', // swiss red
  QAT: '#8D1B3D', // qatari maroon
  BIH: '#002F6C', // flag blue
  BRA: '#009C3B', // verde-amarelo
  MAR: '#C1272D', // moroccan red
  HAI: '#00209F', // flag blue
  SCO: '#005EB8', // royal blue
  USA: '#002868', // old glory blue
  PAR: '#D52B1C', // tricolor red
  AUS: '#012169', // commonwealth blue
  TUR: '#E30A17', // turkish red
  GER: '#000000', // schwarz
  CIV: '#F77F00', // flag orange
  ECU: '#034EA2', // flag blue (yellow unreadable on white)
  CUW: '#002868', // flag blue
  NED: '#AE1C28', // dutch red (oranje is monarchy, flag is red-white-blue)
  JPN: '#BC002D', // hinomaru red
  TUN: '#E70013', // tunisian red
  SWE: '#006AA7', // flag blue
  BEL: '#000000', // belgian black (vertical band)
  EGY: '#CE1126', // egyptian red
  IRN: '#239F40', // iranian green
  NZL: '#00247D', // flag dark blue
  ESP: '#C60B1E', // spanish red
  URU: '#0038A8', // uruguayan navy (sun + bands)
  KSA: '#006C35', // saudi green
  CPV: '#003893', // flag blue
  FRA: '#002395', // tricolore blue
  SEN: '#00853F', // senegalese green
  NOR: '#BA0C2F', // norwegian red
  IRQ: '#CE1126', // flag red
  ARG: '#75AADB', // albiceleste blue
  ALG: '#006233', // algerian green
  AUT: '#C8102E', // austrian red
  JOR: '#CE1126', // jordanian red
  POR: '#006600', // portuguese green
  COL: '#CE1126', // colombian red (legible)
  UZB: '#0099B5', // flag blue
  COD: '#007FFF', // congolese sky blue
  ENG: '#CE1124', // st george red
  CRO: '#FF0000', // croatian red
  GHA: '#CE1126', // ghanaian red (legible)
  PAN: '#D21034', // panamanian red
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
  return ['FWC_00', ...Array.from({ length: FWC_COUNT - 1 }, (_, i) => `FWC_${i + 1}`)]
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

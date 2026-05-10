import type { Team } from '@/lib/album-data'

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase()
}

export function teamMatchesQuery(team: Team, query: string): boolean {
  const q = normalizeQuery(query)
  if (!q) return true

  return [
    team.name,
    team.code,
    `group ${team.group}`,
    team.group,
  ].some(value => value.toLowerCase().includes(q))
}

export function stickerMatchesQuery(code: string, num: number, query: string): boolean {
  const q = normalizeQuery(query)
  if (!q) return true

  const [prefix] = code.split('_')
  return [
    code,
    code.replace('_', ' '),
    prefix,
    `${prefix} ${num}`,
    `${prefix}_${num}`,
    String(num),
  ].some(value => value.toLowerCase().includes(q))
}

export function specialMatchesQuery(title: string, badge: string, query: string): boolean {
  const q = normalizeQuery(query)
  if (!q) return true

  return [
    title,
    badge,
  ].some(value => value.toLowerCase().includes(q))
}

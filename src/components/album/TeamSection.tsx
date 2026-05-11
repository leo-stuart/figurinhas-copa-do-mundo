import { memo, type CSSProperties } from 'react'
import type { Team } from '@/lib/album-data'
import { teamCodes, teamPrimaryColor, TEAM_STICKER_COUNT } from '@/lib/album-data'
import StickerTile from './StickerTile'
import { normalizeQuery, stickerMatchesQuery, teamMatchesQuery } from './filtering'

interface Props {
  team: Team
  owned: Map<string, number>
  filter: string
  searchQuery: string
  onTap: (code: string, currentCount: number) => void
  onLongPress: (code: string) => void
}

function TeamSection({ team, owned, filter, searchQuery, onTap, onLongPress }: Props) {
  const codes = teamCodes(team.code)
  const have  = codes.filter(c => (owned.get(c) ?? 0) >= 1).length
  const query = normalizeQuery(searchQuery)
  const teamQueryMatch = teamMatchesQuery(team, query)

  const hasVisible = codes.some(c => {
    const count = owned.get(c) ?? 0
    const num = Number(c.split('_')[1] ?? 0)
    const matchesSearch = teamQueryMatch || stickerMatchesQuery(c, num, query)
    if (filter === 'have') return count >= 1 && matchesSearch
    if (filter === 'miss') return count === 0 && matchesSearch
    if (filter === 'dup')  return count >= 2 && matchesSearch
    return matchesSearch
  })

  if (!hasVisible) return null
  const primaryColor = teamPrimaryColor(team.code)
  const textColor = team.code === 'ENG' ? '#111111' : '#FFFFFF'

  return (
    <article className="team-page" style={{ '--team-color': primaryColor, '--team-text': textColor } as CSSProperties}>
      <div className="team-strip">
        <div>
          <div className="campaign-kicker">NÓS SOMOS</div>
          <h3 className="country-name">{team.name}</h3>
          <div className="association-line">
            <span className="flag-box" aria-hidden="true">{team.flag}</span>
            <span>Federação de Futebol {team.code}</span>
          </div>
        </div>
        <span className="team-count">
          {have}/{TEAM_STICKER_COUNT}
        </span>
      </div>

      <div className="team-page-body">
        <div className="sticker-grid">
          {codes.map((code, i) => (
            <StickerTile
              key={code}
              code={code}
              num={i + 1}
              count={owned.get(code) ?? 0}
              filter={filter}
              accentColor={primaryColor}
              searchQuery={query}
              forceVisibleForSearch={teamQueryMatch}
              onTap={onTap}
              onLongPress={onLongPress}
            />
          ))}
        </div>
        <div className="album-footer">
          <span>Rumo à classificação</span>
          <span>Grupo {team.group} · {team.code}</span>
        </div>
      </div>
    </article>
  )
}

export default memo(TeamSection)

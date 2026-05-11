'use client'

import { memo, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
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

  const [manualExpanded, setManualExpanded] = useState(false)
  const autoExpanded = filter !== 'all' || (query.length > 0 && teamQueryMatch)
  const expanded = manualExpanded || autoExpanded

  if (!hasVisible) return null
  const primaryColor = teamPrimaryColor(team.code)
  const textColor = team.code === 'ENG' ? '#111111' : '#FFFFFF'

  return (
    <article className="team-page" style={{ '--team-color': primaryColor, '--team-text': textColor } as CSSProperties}>
      <button
        type="button"
        className="team-strip"
        onClick={() => setManualExpanded(v => !v)}
        aria-expanded={expanded}
        aria-controls={`team-body-${team.code}`}
      >
        <span className="team-strip-left">
          <span className="flag-box" aria-hidden="true">{team.flag}</span>
          <span className="team-strip-text">
            <span className="campaign-kicker">{team.code}</span>
            <span className="country-name">{team.name}</span>
          </span>
        </span>
        <span className="team-strip-right">
          <span className="team-count">{have}<span className="sep">/</span>{TEAM_STICKER_COUNT}</span>
          <ChevronDown size={20} className={`team-chevron ${expanded ? 'open' : ''}`} aria-hidden="true" />
        </span>
      </button>

      {expanded && (
        <div className="team-page-body" id={`team-body-${team.code}`}>
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
      )}
    </article>
  )
}

export default memo(TeamSection)

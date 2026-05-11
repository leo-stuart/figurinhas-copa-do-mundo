import { memo } from 'react'
import type { AlbumGroup } from '@/lib/album-data'
import { teamCodes } from '@/lib/album-data'
import TeamSection from './TeamSection'
import { normalizeQuery, stickerMatchesQuery, teamMatchesQuery } from './filtering'

interface Props {
  group: AlbumGroup
  owned: Map<string, number>
  filter: string
  searchQuery: string
  onTap: (code: string, currentCount: number) => void
  onLongPress: (code: string) => void
}

function GroupSection({ group, owned, filter, searchQuery, onTap, onLongPress }: Props) {
  const allCodes = group.teams.flatMap(t => teamCodes(t.code))
  const totalInGroup = allCodes.length
  const haveInGroup  = allCodes.filter(c => (owned.get(c) ?? 0) >= 1).length
  const query = normalizeQuery(searchQuery)
  const groupQueryMatch = !query || `grupo ${group.letter}`.toLowerCase().includes(query) || `group ${group.letter}`.toLowerCase().includes(query) || group.letter.toLowerCase() === query

  const hasVisible = allCodes.some(c => {
    const count = owned.get(c) ?? 0
    const [teamCode, rawNum] = c.split('_')
    const num = Number(rawNum ?? 0)
    const team = group.teams.find(t => t.code === teamCode)
    const matchesSearch = groupQueryMatch || (team ? teamMatchesQuery(team, query) : false) || stickerMatchesQuery(c, num, query)
    if (filter === 'have') return count >= 1 && matchesSearch
    if (filter === 'miss') return count === 0 && matchesSearch
    if (filter === 'dup')  return count >= 2 && matchesSearch
    return matchesSearch
  })

  if (!hasVisible) return null

  return (
    <section className="group-spread" aria-label={`Grupo ${group.letter}`}>
      <div className="group-heading">
        <div>
          <div className="campaign-kicker">GRUPO</div>
          <h2>Grupo {group.letter}</h2>
        </div>
        <span className="section-count">
          {haveInGroup}/{totalInGroup}
        </span>
      </div>

      {group.teams.map(team => (
        <TeamSection
          key={team.code}
          team={team}
          owned={owned}
          filter={filter}
          searchQuery={groupQueryMatch ? '' : query}
          onTap={onTap}
          onLongPress={onLongPress}
        />
      ))}
    </section>
  )
}

export default memo(GroupSection)

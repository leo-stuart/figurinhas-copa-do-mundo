import { memo } from 'react'
import StickerTile from './StickerTile'
import { normalizeQuery, specialMatchesQuery, stickerMatchesQuery } from './filtering'

interface Props {
  title: string
  badge: string
  codes: string[]
  owned: Map<string, number>
  filter: string
  searchQuery: string
  onTap: (code: string, currentCount: number) => void
  onLongPress: (code: string) => void
}

function SpecialSection({ title, badge, codes, owned, filter, searchQuery, onTap, onLongPress }: Props) {
  const have = codes.filter(c => (owned.get(c) ?? 0) >= 1).length
  const isCocaCola = title.toLowerCase().includes('coca')
  const accentColor = isCocaCola ? '#D80621' : '#1557A8'
  const query = normalizeQuery(searchQuery)
  const sectionQueryMatch = specialMatchesQuery(title, badge, query)

  const hasVisible = codes.some(c => {
    const count = owned.get(c) ?? 0
    const num = Number(c.split('_')[1] ?? 0)
    const matchesSearch = sectionQueryMatch || stickerMatchesQuery(c, num, query)
    if (filter === 'have') return count >= 1 && matchesSearch
    if (filter === 'miss') return count === 0 && matchesSearch
    if (filter === 'dup')  return count >= 2 && matchesSearch
    return matchesSearch
  })

  if (!hasVisible) return null

  return (
    <section className={`special-spread ${isCocaCola ? 'coke' : 'intro'}`} aria-label={title}>
      <div className="special-strip">
        <div>
          <div className="campaign-kicker">WE ARE</div>
          <h2 className="section-title">{title}</h2>
        </div>
        <span className="section-badge">{badge}</span>
        <span className="section-count">
          {have}/{codes.length}
        </span>
      </div>

      <div className="special-body">
        <div className="sticker-grid special-grid">
        {codes.map((code, i) => (
          <StickerTile
            key={code}
            code={code}
            num={i + 1}
            count={owned.get(code) ?? 0}
            filter={filter}
            accentColor={accentColor}
            searchQuery={query}
            forceVisibleForSearch={sectionQueryMatch}
            onTap={onTap}
            onLongPress={onLongPress}
          />
        ))}
        </div>
      </div>
    </section>
  )
}

export default memo(SpecialSection)

'use client'

import { useState, useCallback, useTransition, useMemo } from 'react'
import { CircleCheckBig, Layers, PackageOpen, Search, SearchX, Trash2, X } from 'lucide-react'
import { updateStickerCount } from '@/app/actions/stickers'
import { GROUPS, TOTAL_STICKERS, fwcCodes, ccCodes, teamCodes } from '@/lib/album-data'
import { GetAlbumProgress } from '@/domain/usecases/GetAlbumProgress'
import StatsHeader from './StatsHeader'
import GroupSection from './GroupSection'
import SpecialSection from './SpecialSection'
import StickerSheet from './StickerSheet'
import { normalizeQuery, specialMatchesQuery, stickerMatchesQuery, teamMatchesQuery } from './filtering'

export type Filter = 'all' | 'have' | 'miss' | 'dup'
type SectionFilter = 'all' | 'specials' | (typeof GROUPS)[number]['letter']

interface Props {
  initialStickers: Record<string, number>
  userEmail: string
}

const progressUseCase = new GetAlbumProgress()
const FWC_CODES = fwcCodes()
const CC_CODES  = ccCodes()
const SECTION_OPTIONS: { value: SectionFilter; label: string }[] = [
  { value: 'all', label: 'All sections' },
  { value: 'specials', label: 'Specials' },
  ...GROUPS.map(group => ({ value: group.letter, label: `Group ${group.letter}` })),
]

export default function AlbumClient({ initialStickers, userEmail }: Props) {
  const [owned, setOwned]     = useState<Record<string, number>>(initialStickers)
  const [filter, setFilter]   = useState<Filter>('all')
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sheetKey, setSheetKey] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const ownedMap = useMemo(() => new Map(Object.entries(owned)), [owned])
  const progress = useMemo(() => progressUseCase.execute(ownedMap, TOTAL_STICKERS), [ownedMap])
  const query = useMemo(() => normalizeQuery(searchQuery), [searchQuery])
  const duplicateCodes = useMemo(
    () => Object.entries(owned).filter(([, count]) => count >= 2).map(([code]) => code),
    [owned]
  )

  const anyVisible = useMemo(() => {
    const countMatches = (code: string) => {
      const count = ownedMap.get(code) ?? 0
      if (filter === 'have') return count >= 1
      if (filter === 'miss') return count === 0
      if (filter === 'dup') return count >= 2
      return true
    }

    const codesMatch = (codes: string[], sectionMatch: boolean) =>
      codes.some(code => {
        const num = Number(code.split('_')[1] ?? 0)
        return countMatches(code) && (sectionMatch || stickerMatchesQuery(code, num, query))
      })

    if (sectionFilter === 'all' || sectionFilter === 'specials') {
      if (codesMatch(FWC_CODES, specialMatchesQuery('FWC — Introdução', 'ESPECIAL', query))) return true
      if (codesMatch(CC_CODES, specialMatchesQuery('Exclusivas Coca-Cola', 'EXCLUSIVA', query))) return true
    }

    return GROUPS.some(group => {
      if (sectionFilter !== 'all' && sectionFilter !== group.letter) return false

      const groupMatch = !query || `group ${group.letter}`.toLowerCase().includes(query) || group.letter.toLowerCase() === query
      return group.teams.some(team => {
        const teamMatch = groupMatch || teamMatchesQuery(team, query)
        return codesMatch(teamCodes(team.code), teamMatch)
      })
    })
  }, [filter, ownedMap, query, sectionFilter])

  const handleTap = useCallback((code: string, currentCount: number) => {
    const next = currentCount + 1
    setOwned(o => ({ ...o, [code]: next }))

    startTransition(async () => {
      try {
        await updateStickerCount(code, next)
      } catch {
        setOwned(o => {
          const s = { ...o }
          if (currentCount <= 0) delete s[code]
          else s[code] = currentCount
          return s
        })
      }
    })
  }, [])

  const handleRemoveDuplicates = useCallback(() => {
    if (duplicateCodes.length === 0) return

    const snapshot = owned
    setOwned(current => {
      const next = { ...current }
      for (const code of duplicateCodes) next[code] = 1
      return next
    })

    startTransition(async () => {
      try {
        await Promise.all(duplicateCodes.map(code => updateStickerCount(code, 1)))
      } catch {
        setOwned(snapshot)
      }
    })
  }, [duplicateCodes, owned])

  const handleSheetUpdate = useCallback((code: string, count: number) => {
    setOwned(o => {
      const s = { ...o }
      if (count <= 0) delete s[code]
      else s[code] = count
      return s
    })
    setSheetKey(null)

    startTransition(async () => {
      try {
        await updateStickerCount(code, count)
      } catch {
        // silent fail — UI already updated, will reconcile on next load
      }
    })
  }, [])

  return (
    <div className="app-shell">
      <StatsHeader
        progress={progress}
        filter={filter}
        onFilterChange={setFilter}
        userEmail={userEmail}
      />

      <main className="app-container">
        <SelectionControls
          sectionFilter={sectionFilter}
          searchQuery={searchQuery}
          onSectionFilterChange={setSectionFilter}
          onSearchQueryChange={setSearchQuery}
        />

        {filter === 'dup' && progress.duplicatesCount > 0 && (
          <div className="duplicate-action">
            <div>
              <strong>{progress.duplicatesCount} repetidas</strong>
              <span>{duplicateCodes.length} figurinhas com cópias extras</span>
            </div>
            <button
              type="button"
              className="danger-button"
              onClick={handleRemoveDuplicates}
              disabled={isPending}
            >
              <Trash2 size={17} />
              Remover repetidas
            </button>
          </div>
        )}

        {(sectionFilter === 'all' || sectionFilter === 'specials') && (
          <SpecialSection
            title="FWC — Introdução"
            badge="ESPECIAL"
            codes={FWC_CODES}
            owned={ownedMap}
            filter={filter}
            searchQuery={query}
            onTap={handleTap}
            onLongPress={setSheetKey}
          />
        )}

        {GROUPS.filter(group => sectionFilter === 'all' || sectionFilter === group.letter).map(group => (
          <GroupSection
            key={group.letter}
            group={group}
            owned={ownedMap}
            filter={filter}
            searchQuery={query}
            onTap={handleTap}
            onLongPress={setSheetKey}
          />
        ))}

        {(sectionFilter === 'all' || sectionFilter === 'specials') && (
          <SpecialSection
            title="Exclusivas Coca-Cola"
            badge="EXCLUSIVA"
            codes={CC_CODES}
            owned={ownedMap}
            filter={filter}
            searchQuery={query}
            onTap={handleTap}
            onLongPress={setSheetKey}
          />
        )}

        {!anyVisible && <EmptyForFilter filter={filter} hasSelectionFilter={Boolean(query) || sectionFilter !== 'all'} />}
      </main>

      <StickerSheet
        stickerCode={sheetKey}
        owned={ownedMap}
        onClose={() => setSheetKey(null)}
        onUpdate={handleSheetUpdate}
      />
    </div>
  )
}

function SelectionControls({
  sectionFilter,
  searchQuery,
  onSectionFilterChange,
  onSearchQueryChange,
}: {
  sectionFilter: SectionFilter
  searchQuery: string
  onSectionFilterChange: (section: SectionFilter) => void
  onSearchQueryChange: (query: string) => void
}) {
  return (
    <div className="selection-controls" aria-label="Find stickers">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <input
          value={searchQuery}
          onChange={event => onSearchQueryChange(event.target.value)}
          placeholder="Search team, code, group, sticker..."
          type="search"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearchQueryChange('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </label>

      <select
        className="section-select"
        value={sectionFilter}
        onChange={event => onSectionFilterChange(event.target.value as SectionFilter)}
        aria-label="Filter by section"
      >
        {SECTION_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

function EmptyForFilter({ filter, hasSelectionFilter }: { filter: Filter; hasSelectionFilter: boolean }) {
  if (hasSelectionFilter) {
    return (
      <div className="empty-state">
        <SearchX size={34} strokeWidth={2} />
        <strong>No matches</strong>
        <p>Try a team name, group letter, country code, or sticker code like BRA_7.</p>
      </div>
    )
  }

  const MSGS = {
    all:  { Icon: PackageOpen, title: 'Álbum vazio',       sub: 'Toque nas figurinhas para começar a marcar sua coleção.' },
    have: { Icon: SearchX, title: 'Nenhuma figurinha',     sub: 'Quando você marcar itens como obtidos, eles aparecem aqui.' },
    miss: { Icon: CircleCheckBig, title: 'Álbum completo', sub: 'Você já marcou todas as figurinhas desta coleção.' },
    dup:  { Icon: Layers, title: 'Sem repetidas',          sub: 'As figurinhas com duas ou mais cópias aparecem nesta visão.' },
  }
  const { Icon, title, sub } = MSGS[filter]

  return (
    <div className="empty-state">
      <Icon size={34} strokeWidth={2} />
      <strong>{title}</strong>
      <p>{sub}</p>
    </div>
  )
}

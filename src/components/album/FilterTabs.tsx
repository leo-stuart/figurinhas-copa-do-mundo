'use client'

import type { Filter } from './AlbumClient'

interface Props {
  filter: Filter
  onFilterChange: (f: Filter) => void
}

const TABS: { key: Filter; label: string }[] = [
  { key: 'all',  label: 'Álbum'      },
  { key: 'have', label: 'Coletadas'  },
  { key: 'miss', label: 'Faltantes'  },
  { key: 'dup',  label: 'Repetidas'  },
]

export default function FilterTabs({ filter, onFilterChange }: Props) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filtros do álbum">
      {TABS.map(tab => (
        <button
          key={tab.key}
          onClick={() => onFilterChange(tab.key)}
          role="tab"
          aria-selected={filter === tab.key}
          className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

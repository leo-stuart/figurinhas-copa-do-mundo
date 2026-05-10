'use client'

import { signOut } from '@/app/actions/auth'
import type { AlbumProgress } from '@/domain/entities/AlbumProgress'
import { LogOut } from 'lucide-react'
import FilterTabs from './FilterTabs'
import type { Filter } from './AlbumClient'

interface Props {
  progress: AlbumProgress
  filter: Filter
  onFilterChange: (f: Filter) => void
  userEmail: string
}

export default function StatsHeader({ progress, filter, onFilterChange, userEmail }: Props) {
  return (
    <header className="album-header">
      <div className="album-header-inner">
        <div className="album-header-main">
          <div className="flex items-start justify-between gap-3">
            <div className="brand-lockup">
              <div className="brand-mark" aria-hidden="true">26</div>
              <div className="min-w-0">
                <div className="campaign-kicker">WE ARE</div>
                <h1 className="brand-title">FIFA World Cup 26</h1>
                <div className="brand-subtitle">Panini Official Sticker Collection</div>
              </div>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                title={`Sair (${userEmail})`}
                aria-label={`Sair (${userEmail})`}
                className="icon-button"
              >
                <LogOut size={18} />
              </button>
            </form>
          </div>

          <div>
            <div className="progress-panel" aria-label="Progresso do álbum">
              <div className="progress-copy">
                <div className="progress-label">
                  <span>{progress.have} de {progress.total}</span>
                  <span>{progress.missing} faltam</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
                </div>
              </div>
              <div className="progress-number">{progress.percentage}%</div>
            </div>

            <div className="stats-grid">
              <StatBox label="Tenho" value={progress.have} tone="green" />
              <StatBox label="Faltam" value={progress.missing} tone="red" />
              <StatBox label="Repetidas" value={progress.duplicatesCount} tone="gold" />
            </div>
          </div>
        </div>

        <FilterTabs filter={filter} onFilterChange={onFilterChange} />
      </div>
    </header>
  )
}

function StatBox({ label, value, tone }: { label: string; value: number; tone: 'green' | 'red' | 'gold' }) {
  const color = `var(--${tone})`

  return (
    <div className="stat-card">
      <strong style={{ color }}>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

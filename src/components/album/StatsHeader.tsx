'use client'

import Link from 'next/link'
import { signOut } from '@/app/actions/auth'
import type { AlbumProgress } from '@/domain/entities/AlbumProgress'
import { LogOut, Users } from 'lucide-react'
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
    <section className="album-hero">
      <div className="hero-stripe" aria-hidden="true" />

      <div className="album-hero-inner">
        <div className="hero-bar">
          <div className="hero-brand">
            <div className="hero-brand-text">
              <span className="hero-brand-kicker">FIFA World Cup</span>
              <span className="hero-brand-title">Álbum 26</span>
            </div>
          </div>

          <div className="hero-stats" aria-label="Progresso">
            <span className="hero-pct">{progress.percentage}<i>%</i></span>
            <span className="hero-stat">
              <b>{progress.have}</b>
              <i>/{progress.total}</i>
            </span>
            <span className="hero-stat hero-stat--miss">
              <b>{progress.missing}</b>
              <i>faltam</i>
            </span>
            {progress.duplicatesCount > 0 && (
              <span className="hero-stat hero-stat--dup">
                <b>{progress.duplicatesCount}</b>
                <i>reps</i>
              </span>
            )}
          </div>

          <div className="hero-actions">
            <Link
              href="/friends"
              className="icon-button"
              title="Amigos e trocas"
              aria-label="Amigos e trocas"
            >
              <Users size={18} />
            </Link>
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
        </div>

        <div className="hero-progress-track" aria-hidden="true">
          <div className="hero-progress-fill" style={{ width: `${progress.percentage}%` }} />
        </div>

        <FilterTabs filter={filter} onFilterChange={onFilterChange} />
      </div>
    </section>
  )
}

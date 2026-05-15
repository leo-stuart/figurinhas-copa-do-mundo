'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, History, Minus, Plus, RotateCcw } from 'lucide-react'
import type { StickerHistoryEntry } from '@/domain/entities/StickerHistoryEntry'
import { getStickerInfo } from '@/lib/album-data'

interface Props {
  entries: StickerHistoryEntry[]
  total: number
  page: number
  pageSize: number
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

export default function HistoryClient({ entries, total, page, pageSize }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasPrev = page > 0
  const hasNext = page + 1 < totalPages
  const startIdx = total === 0 ? 0 : page * pageSize + 1
  const endIdx = Math.min(total, (page + 1) * pageSize)

  return (
    <div className="app-shell">
      <section className="album-hero">
        <div className="hero-stripe" aria-hidden="true" />
        <div className="album-hero-inner">
          <div className="hero-bar">
            <div className="hero-brand">
              <div className="hero-brand-text">
                <span className="hero-brand-kicker">Atividade</span>
                <span className="hero-brand-title">Histórico</span>
              </div>
            </div>
            <Link href="/album" className="icon-button" aria-label="Voltar ao álbum" title="Voltar ao álbum">
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <main className="app-container history-container">
        {entries.length === 0 ? (
          <div className="empty-state">
            <History size={34} strokeWidth={2} />
            <strong>Sem histórico ainda</strong>
            <p>Toque em figurinhas no álbum para começar a registrar mudanças.</p>
          </div>
        ) : (
          <>
            <div className="history-summary">
              Mostrando <b>{startIdx}–{endIdx}</b> de <b>{total}</b> mudanças
            </div>

            <ul className="history-list">
              {entries.map(entry => {
                const info = getStickerInfo(entry.stickerCode)
                const isReset = entry.newCount === 0 && entry.previousCount > 0
                const isAdd = entry.delta > 0
                return (
                  <li key={entry.id} className="history-entry">
                    <div className={`history-delta ${isReset ? 'reset' : isAdd ? 'add' : 'remove'}`}>
                      {isReset ? <RotateCcw size={16} /> : isAdd ? <Plus size={16} /> : <Minus size={16} />}
                      <span>{isReset ? 'Zerada' : `${isAdd ? '+' : ''}${entry.delta}`}</span>
                    </div>
                    <div className="history-info">
                      <strong className="history-title">{info.title}</strong>
                      <span className="history-sub">{info.sub}</span>
                    </div>
                    <div className="history-meta">
                      <span className="history-counts">{entry.previousCount} → {entry.newCount}</span>
                      <span className="history-date">{dateFormatter.format(entry.createdAt)}</span>
                    </div>
                  </li>
                )
              })}
            </ul>

            <nav className="history-pagination" aria-label="Paginação">
              {hasPrev ? (
                <Link href={`/history?page=${page - 1}`} className="pager-button">
                  <ChevronLeft size={16} />
                  Anterior
                </Link>
              ) : (
                <span className="pager-button disabled">
                  <ChevronLeft size={16} />
                  Anterior
                </span>
              )}
              <span className="pager-status">Página {page + 1} de {totalPages}</span>
              {hasNext ? (
                <Link href={`/history?page=${page + 1}`} className="pager-button">
                  Próxima
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <span className="pager-button disabled">
                  Próxima
                  <ChevronRight size={16} />
                </span>
              )}
            </nav>
          </>
        )}
      </main>
    </div>
  )
}

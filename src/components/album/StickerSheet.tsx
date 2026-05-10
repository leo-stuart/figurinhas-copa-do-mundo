'use client'

import { useEffect, useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { getStickerInfo } from '@/lib/album-data'

interface Props {
  stickerCode: string | null
  owned: Map<string, number>
  onClose: () => void
  onUpdate: (code: string, count: number) => void
}

export default function StickerSheet({ stickerCode, owned, onClose, onUpdate }: Props) {
  const [count, setCount] = useState(0)
  const isOpen = stickerCode !== null

  useEffect(() => {
    if (stickerCode) setCount(owned.get(stickerCode) ?? 0)
  }, [stickerCode, owned])

  const info = stickerCode ? getStickerInfo(stickerCode) : null

  return (
    <>
      <div
        className={`sheet-backdrop ${isOpen ? 'open' : 'closed'}`}
        onClick={onClose}
      />
      <div className={`sheet-panel ${isOpen ? 'open' : 'closed'}`}>
        <div className="sheet-handle" />

        <h2 className="sheet-title">
          {info?.title ?? '—'}
        </h2>

        <div className="sheet-subtitle">
          {info?.sub}
        </div>

        <div className="sheet-counter">
          <button
            type="button"
            onClick={() => setCount(c => Math.max(0, c - 1))}
            className="counter-button"
            aria-label="Diminuir quantidade"
          >
            <Minus size={22} />
          </button>

          <span className="counter-value">
            {count}
          </span>

          <button
            type="button"
            onClick={() => setCount(c => c + 1)}
            className="counter-button"
            aria-label="Aumentar quantidade"
          >
            <Plus size={22} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => stickerCode && onUpdate(stickerCode, count)}
          className="primary-button"
        >
          <Check size={18} />
          Salvar quantidade
        </button>
      </div>
    </>
  )
}

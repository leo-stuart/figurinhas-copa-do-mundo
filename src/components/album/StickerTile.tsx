'use client'

import { memo, useCallback, useRef, type CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { stickerMatchesQuery } from './filtering'

interface Props {
  code: string
  num: number
  count: number
  filter: string
  accentColor?: string
  searchQuery?: string
  forceVisibleForSearch?: boolean
  onTap: (code: string, currentCount: number) => void
  onLongPress: (code: string) => void
}

function StickerTile({
  code,
  num,
  count,
  filter,
  accentColor = '#1557A8',
  searchQuery = '',
  forceVisibleForSearch = false,
  onTap,
  onLongPress,
}: Props) {
  const have  = count >= 1
  const isDup = count >= 2

  const visible =
    filter === 'all' ||
    (filter === 'have' && have) ||
    (filter === 'miss' && !have) ||
    (filter === 'dup'  && isDup)

  const matchesSearch = forceVisibleForSearch || stickerMatchesQuery(code, num, searchQuery)

  const lpTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const lpFired = useRef(false)
  const moved   = useRef(false)

  const handlePointerDown = useCallback(() => {
    moved.current = false
    lpFired.current = false
    lpTimer.current = setTimeout(() => {
      lpFired.current = true
      if (!moved.current) {
        navigator.vibrate?.(50)
        onLongPress(code)
      }
    }, 500)
  }, [code, onLongPress])

  const handlePointerMove = useCallback(() => {
    moved.current = true
    clearTimeout(lpTimer.current)
  }, [])

  const handlePointerCancel = useCallback(() => {
    clearTimeout(lpTimer.current)
    lpFired.current = false
  }, [])

  const handlePointerUp = useCallback(() => {
    clearTimeout(lpTimer.current)
    if (!lpFired.current && !moved.current) {
      navigator.vibrate?.(count === 0 ? 30 : 15)
      onTap(code, count)
    }
    lpFired.current = false
  }, [code, count, onTap])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    onLongPress(code)
  }, [code, onLongPress])

  if (!visible || !matchesSearch) return null

  const stateClass = isDup ? 'dup' : have ? 'have' : ''

  const stateLabel = isDup ? `${count} cópias` : have ? 'Coletada' : 'Faltante'
  const [prefix, suffix] = code.split('_')

  return (
    <button
      type="button"
      className={`sticker-tile ${stateClass}`}
      style={{ '--card-tint': accentColor } as CSSProperties}
      aria-label={`${code}, ${stateLabel}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerCancel}
      onPointerUp={handlePointerUp}
      onContextMenu={handleContextMenu}
    >
      <span className="sticker-status" aria-hidden="true">
        {have ? <Check size={18} strokeWidth={3} /> : null}
      </span>
      <span className="s-num">{suffix}</span>
      <span className="sticker-label">
        <strong>{prefix}</strong>
        <small>{stateLabel}</small>
      </span>
      {isDup && <span className="s-badge">×{count}</span>}
    </button>
  )
}

export default memo(StickerTile)

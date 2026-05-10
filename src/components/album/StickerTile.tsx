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

  const lpTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const lpFired    = useRef(false)
  const moved      = useRef(false)
  const lastTouch  = useRef(0)

  const handleTouchStart = useCallback(() => {
    moved.current  = false
    lpFired.current = false
    lpTimer.current = setTimeout(() => {
      lpFired.current = true
      if (!moved.current) {
        navigator.vibrate?.(50)
        onLongPress(code)
      }
    }, 500)
  }, [code, onLongPress])

  const handleTouchMove = useCallback(() => {
    moved.current = true
    clearTimeout(lpTimer.current)
  }, [])

  const handleTouchEnd = useCallback(() => {
    lastTouch.current = Date.now()
    clearTimeout(lpTimer.current)
    if (!lpFired.current && !moved.current) {
      navigator.vibrate?.(count === 0 ? 30 : 15)
      onTap(code, count)
    }
    lpFired.current = false
  }, [code, count, onTap])

  const handleClick = useCallback(() => {
    if (Date.now() - lastTouch.current < 400) return
    onTap(code, count)
  }, [code, count, onTap])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    onLongPress(code)
  }, [code, onLongPress])

  if (!visible || !matchesSearch) return null

  const stateClass = isDup ? 'dup' : have ? 'have' : ''

  const stateLabel = isDup ? `${count} copies` : have ? 'Collected' : 'Missing'
  const [prefix] = code.split('_')

  return (
    <button
      type="button"
      className={`sticker-tile ${stateClass}`}
      style={{ '--card-tint': accentColor } as CSSProperties}
      aria-label={`${code}, ${stateLabel}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <span className="sticker-status" aria-hidden="true">
        {have ? <Check size={18} strokeWidth={3} /> : null}
      </span>
      <span className="s-num">{num}</span>
      <span className="sticker-label">
        <strong>{prefix}</strong>
        <small>{stateLabel}</small>
      </span>
      {isDup && <span className="s-badge">×{count}</span>}
    </button>
  )
}

export default memo(StickerTile)

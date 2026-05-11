'use client'

import { useEffect, useState, type CSSProperties } from 'react'

// Spectrum, OUTERMOST → INNERMOST per DESIGN.md §5
const RINGS = [
  '#6EC6E8', // sky blue (outermost)
  '#2E5FBF', // cobalt
  '#7B3FA8', // violet
  '#7A1A1A', // maroon
  '#C42020', // red
  '#E87C6A', // coral
  '#F5D020', // yellow
  '#A8D830', // lime
  '#3AB84A', // mid green
  '#1A7A46', // emerald
  '#0D4A28', // deep forest
  '#7EEBD0', // mint (innermost)
]

interface Props {
  baseSize?: number
  step?: number
  className?: string
  style?: CSSProperties
  foregroundColor?: string
  showForeground?: boolean
  ringCount?: number
}

export default function Tunnel26({
  baseSize = 220,
  step = 1.18,
  className = '',
  style,
  foregroundColor = '#000000',
  showForeground = true,
  ringCount = RINGS.length,
}: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const rings = RINGS.slice(RINGS.length - ringCount)

  return (
    <div
      className={`tunnel-26 ${className}`}
      aria-hidden="true"
      style={{ ['--tunnel-base' as string]: `${baseSize}px`, ...style }}
    >
      {rings.map((color, i) => {
        const scale = Math.pow(step, rings.length - i).toFixed(4)
        return (
          <span
            key={`${color}-${i}`}
            className="tunnel-ring"
            style={{
              color,
              transform: `translate(-50%, -50%) scale(${scale})`,
              zIndex: i + 1,
              animationDelay: `${i * 50}ms`,
            }}
          >
            <span>2</span>
            <span>6</span>
          </span>
        )
      })}
      {showForeground && (
        <span
          className="tunnel-ring tunnel-ring-fg"
          style={{
            color: foregroundColor,
            transform: 'translate(-50%, -50%) scale(1)',
            zIndex: 99,
            animationDelay: `${rings.length * 50}ms`,
          }}
        >
          <span>2</span>
          <span>6</span>
        </span>
      )}
    </div>
  )
}

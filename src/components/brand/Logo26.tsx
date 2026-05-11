import { type CSSProperties } from 'react'

interface Props {
  size?: number
  inverted?: boolean
  showTrophy?: boolean
  showFifa?: boolean
  className?: string
  style?: CSSProperties
}

export default function Logo26({
  size = 96,
  inverted = false,
  showTrophy = true,
  showFifa = true,
  className = '',
  style,
}: Props) {
  const fg = inverted ? '#FFFFFF' : '#000000'
  return (
    <span
      className={`logo26-lockup ${className}`}
      style={{
        ['--logo-fg' as string]: fg,
        ['--logo-size' as string]: `${size}px`,
        ...style,
      }}
    >
      <span className="logo26-glyph" aria-label="26">
        <span className="logo26-digit">2</span>
        <span className="logo26-digit">6</span>
        {showTrophy && (
          <span className="logo26-trophy" aria-hidden="true">
            <img src="/icon.png" alt="" />
          </span>
        )}
      </span>
      {showFifa && (
        <span className="logo26-wordmark" aria-hidden="true">
          <span className="logo26-fifa">FIFA</span>
          <span className="logo26-licensed">Official Licensed Product</span>
        </span>
      )}
    </span>
  )
}


import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copa 2026 · Figurinhas',
  description: 'Álbum de figurinhas Copa do Mundo 2026 — Panini',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0A1E4A',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

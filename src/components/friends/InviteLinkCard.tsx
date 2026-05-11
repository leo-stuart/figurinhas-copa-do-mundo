'use client'

import { useState } from 'react'
import { Copy, Check, Link as LinkIcon } from 'lucide-react'

interface Props {
  url: string
}

export default function InviteLinkCard({ url }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked — fall back to selection
      const el = document.getElementById('invite-url-input') as HTMLInputElement | null
      el?.select()
    }
  }

  return (
    <div className="friends-card">
      <div className="friends-card-header">
        <LinkIcon size={18} aria-hidden="true" />
        <h2>Seu link de convite</h2>
      </div>
      <p className="friends-card-sub">
        Compartilhe esse link com amigos. Quem clicar vira sua dupla de trocas automaticamente.
      </p>
      <div className="invite-row">
        <input
          id="invite-url-input"
          className="invite-url"
          readOnly
          value={url}
          onFocus={e => e.currentTarget.select()}
        />
        <button type="button" className="primary-button invite-copy" onClick={handleCopy}>
          {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
        </button>
      </div>
    </div>
  )
}

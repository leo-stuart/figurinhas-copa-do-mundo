'use client'

import { useState, useTransition } from 'react'
import { Check, User } from 'lucide-react'
import { setDisplayName } from '@/app/actions/friends'

interface Props {
  initialName: string
}

export default function DisplayNameForm({ initialName }: Props) {
  const [name, setName] = useState(initialName)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  const dirty = name.trim() !== initialName && name.trim().length > 0

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaved(false)
    startTransition(async () => {
      try {
        await setDisplayName(name)
        setSaved(true)
        setTimeout(() => setSaved(false), 1800)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar')
      }
    })
  }

  return (
    <form className="friends-card" onSubmit={handleSave}>
      <div className="friends-card-header">
        <User size={18} aria-hidden="true" />
        <h2>Seu nome de usuário</h2>
      </div>
      <p className="friends-card-sub">
        Como você aparece para amigos conectados. Eles não veem seu email.
      </p>
      <div className="invite-row">
        <input
          className="invite-url"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={40}
          minLength={1}
          required
          aria-label="Nome de usuário"
          placeholder="seu nome de usuário"
        />
        <button
          type="submit"
          className="primary-button invite-copy"
          disabled={pending || !dirty}
        >
          {saved ? <><Check size={16} /> Salvo</> : 'Salvar'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}

'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Trash2, Users } from 'lucide-react'
import { removeFriend } from '@/app/actions/friends'

interface Friend { userId: string; displayName: string }

interface Props {
  friends: Friend[]
}

export default function FriendsList({ friends }: Props) {
  const router = useRouter()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const handleRemove = (friendId: string) => {
    if (!confirm('Remover esse amigo? Você não verá mais trocas com ele.')) return
    setRemovingId(friendId)
    startTransition(async () => {
      try {
        await removeFriend(friendId)
        router.refresh()
      } finally {
        setRemovingId(null)
      }
    })
  }

  return (
    <div className="friends-card">
      <div className="friends-card-header">
        <Users size={18} aria-hidden="true" />
        <h2>Amigos conectados</h2>
      </div>
      {friends.length === 0 ? (
        <p className="friends-card-sub">
          Você ainda não tem amigos conectados. Compartilhe seu link acima para começar.
        </p>
      ) : (
        <ul className="friends-list">
          {friends.map(f => (
            <li key={f.userId} className="friend-row">
              <Link href={`/friends/${f.userId}`} className="friend-link" aria-label={`Ver trocas com ${f.displayName}`}>
                <span className="friend-avatar" aria-hidden="true">{initials(f.displayName)}</span>
                <span className="friend-name">{f.displayName}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="friend-remove"
                onClick={() => handleRemove(f.userId)}
                disabled={pending && removingId === f.userId}
                aria-label={`Remover ${f.displayName}`}
                title="Remover amigo"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase() ?? '').join('') || '?'
}

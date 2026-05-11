import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { getMatchesFor } from '@/app/actions/friends'
import MatchView from '@/components/friends/MatchView'

interface Props {
  params: Promise<{ friendId: string }>
}

export default async function FriendMatchPage({ params }: Props) {
  const { friendId } = await params

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect(`/auth?return=/friends/${friendId}`)

  let result
  try {
    result = await getMatchesFor(friendId)
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    if (message.includes('not_friends') || message.includes('self_match_not_allowed')) {
      redirect('/friends')
    }
    throw err
  }

  if (!result.friend) notFound()

  return (
    <div className="app-shell">
      <main className="app-container friends-container">
        <MatchView friendName={result.friend.displayName} match={result.match} />
      </main>
    </div>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/infrastructure/supabase/server'
import { ensureMyProfile, getMyInviteUrl, listFriends } from '@/app/actions/friends'
import InviteLinkCard from '@/components/friends/InviteLinkCard'
import DisplayNameForm from '@/components/friends/DisplayNameForm'
import FriendsList from '@/components/friends/FriendsList'

export default async function FriendsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/auth?return=/friends')

  const profile = await ensureMyProfile()
  const [{ url }, friends] = await Promise.all([
    getMyInviteUrl(),
    listFriends(),
  ])

  return (
    <div className="app-shell">
      <section className="album-hero">
        <div className="hero-stripe" aria-hidden="true" />
        <div className="album-hero-inner">
          <div className="hero-bar">
            <div className="hero-brand">
              <div className="hero-brand-text">
                <span className="hero-brand-kicker">Trocas</span>
                <span className="hero-brand-title">Amigos</span>
              </div>
            </div>
            <Link href="/album" className="icon-button" aria-label="Voltar ao álbum" title="Voltar ao álbum">
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <main className="app-container friends-container">
        <DisplayNameForm initialName={profile.displayName} />
        <InviteLinkCard url={url} />
        <FriendsList friends={friends} />
      </main>
    </div>
  )
}

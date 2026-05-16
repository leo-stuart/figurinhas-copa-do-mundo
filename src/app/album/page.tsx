import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { getUserStickers } from '@/app/actions/stickers'
import { ensureMyProfile } from '@/app/actions/friends'
import AlbumClient from '@/components/album/AlbumClient'

export default async function AlbumPage() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()

    if (!data?.claims) redirect('/auth')

    const userEmail = (data.claims.email as string | undefined) ?? ''
    const [initialStickers] = await Promise.all([
      getUserStickers(),
      ensureMyProfile(),
    ])

    return <AlbumClient initialStickers={initialStickers} userEmail={userEmail} />
  } catch (err) {
    // Next.js internal control-flow errors (redirect, dynamic usage marker) — let them propagate silently
    const digest = err && typeof err === 'object' && 'digest' in err && typeof err.digest === 'string' ? err.digest : ''
    if (digest.startsWith('NEXT_REDIRECT') || digest === 'DYNAMIC_SERVER_USAGE') {
      throw err
    }
    console.error('[AlbumPage] SSR error:', err)
    throw err
  }
}

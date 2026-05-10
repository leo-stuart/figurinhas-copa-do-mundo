import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { getUserStickers } from '@/app/actions/stickers'
import AlbumClient from '@/components/album/AlbumClient'

export default async function AlbumPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  if (!data?.claims) redirect('/auth')

  const userEmail = (data.claims.email as string | undefined) ?? ''
  const initialStickers = await getUserStickers()

  return <AlbumClient initialStickers={initialStickers} userEmail={userEmail} />
}

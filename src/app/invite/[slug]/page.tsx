import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { acceptInviteBySlug } from '@/app/actions/friends'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) {
    redirect(`/auth?return=${encodeURIComponent(`/invite/${slug}`)}`)
  }

  const result = await acceptInviteBySlug(slug)

  if (result.kind === 'not_found') notFound()
  if (result.kind === 'self') redirect('/friends')
  redirect(`/friends/${result.friendUserId}`)
}

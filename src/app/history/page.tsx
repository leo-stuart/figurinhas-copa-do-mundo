import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { getStickerHistory } from '@/app/actions/stickers'
import HistoryClient from '@/components/history/HistoryClient'

const PAGE_SIZE = 20

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HistoryPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/auth?return=/history')

  const params = await searchParams
  const rawPage = Number(params?.page ?? 0)
  const page = Number.isFinite(rawPage) && rawPage >= 0 ? Math.floor(rawPage) : 0

  const { entries, total } = await getStickerHistory(page, PAGE_SIZE)

  return (
    <HistoryClient
      entries={entries}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
    />
  )
}

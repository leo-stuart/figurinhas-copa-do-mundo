import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  redirect(data?.claims ? '/album' : '/auth')
}

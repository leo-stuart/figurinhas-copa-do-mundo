import type { SupabaseClient } from '@supabase/supabase-js'
import type { IFriendshipRepository } from '@/domain/repositories/IFriendshipRepository'
import type { Match } from '@/domain/entities/Match'

function orderPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a]
}

export class SupabaseFriendshipRepository implements IFriendshipRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listFriendIds(userId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('friendships')
      .select('user_a_id, user_b_id')
      .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)

    if (error) throw error
    return (data ?? []).map(row =>
      row.user_a_id === userId ? row.user_b_id : row.user_a_id
    )
  }

  async create(userIdA: string, userIdB: string): Promise<void> {
    const [a, b] = orderPair(userIdA, userIdB)
    const { error } = await this.supabase
      .from('friendships')
      .upsert({ user_a_id: a, user_b_id: b }, { onConflict: 'user_a_id,user_b_id', ignoreDuplicates: true })

    if (error) throw error
  }

  async remove(userIdA: string, userIdB: string): Promise<void> {
    const [a, b] = orderPair(userIdA, userIdB)
    const { error } = await this.supabase
      .from('friendships')
      .delete()
      .eq('user_a_id', a)
      .eq('user_b_id', b)

    if (error) throw error
  }

  async exists(userIdA: string, userIdB: string): Promise<boolean> {
    const [a, b] = orderPair(userIdA, userIdB)
    const { data, error } = await this.supabase
      .from('friendships')
      .select('user_a_id')
      .eq('user_a_id', a)
      .eq('user_b_id', b)
      .maybeSingle()

    if (error) throw error
    return Boolean(data)
  }

  async getMatches(friendUserId: string): Promise<Match> {
    const { data, error } = await this.supabase.rpc('get_friend_matches', {
      p_friend_id: friendUserId,
    })

    if (error) throw error
    const row = Array.isArray(data) ? data[0] : data
    return {
      friendDupesForMe: row?.friend_dupes_for_me ?? [],
      myDupesForFriend: row?.my_dupes_for_friend ?? [],
    }
  }
}

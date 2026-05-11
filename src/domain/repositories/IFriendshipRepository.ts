import type { Match } from '../entities/Match'

export interface IFriendshipRepository {
  listFriendIds(userId: string): Promise<string[]>
  create(userIdA: string, userIdB: string): Promise<void>
  remove(userIdA: string, userIdB: string): Promise<void>
  exists(userIdA: string, userIdB: string): Promise<boolean>
  getMatches(friendUserId: string): Promise<Match>
}

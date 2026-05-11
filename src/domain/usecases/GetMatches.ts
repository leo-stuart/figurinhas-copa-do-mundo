import type { IFriendshipRepository } from '../repositories/IFriendshipRepository'
import type { Match } from '../entities/Match'

export class GetMatches {
  constructor(private readonly friendships: IFriendshipRepository) {}

  async execute(friendUserId: string): Promise<Match> {
    return this.friendships.getMatches(friendUserId)
  }
}

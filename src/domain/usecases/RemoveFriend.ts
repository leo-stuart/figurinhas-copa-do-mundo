import type { IFriendshipRepository } from '../repositories/IFriendshipRepository'

export class RemoveFriend {
  constructor(private readonly friendships: IFriendshipRepository) {}

  async execute(meUserId: string, friendUserId: string): Promise<void> {
    await this.friendships.remove(meUserId, friendUserId)
  }
}

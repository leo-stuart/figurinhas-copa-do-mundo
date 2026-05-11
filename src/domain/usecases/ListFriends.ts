import type { IProfileRepository } from '../repositories/IProfileRepository'
import type { IFriendshipRepository } from '../repositories/IFriendshipRepository'
import type { Profile } from '../entities/Profile'

export class ListFriends {
  constructor(
    private readonly profiles: IProfileRepository,
    private readonly friendships: IFriendshipRepository,
  ) {}

  async execute(userId: string): Promise<Profile[]> {
    const friendIds = await this.friendships.listFriendIds(userId)
    if (friendIds.length === 0) return []
    const profiles = await this.profiles.getManyByUserIds(friendIds)
    const byId = new Map(profiles.map(p => [p.userId, p]))
    return friendIds
      .map(id => byId.get(id))
      .filter((p): p is Profile => Boolean(p))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  }
}

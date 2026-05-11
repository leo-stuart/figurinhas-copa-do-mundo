import type { IProfileRepository } from '../repositories/IProfileRepository'
import type { IFriendshipRepository } from '../repositories/IFriendshipRepository'

export type AcceptInviteResult =
  | { kind: 'accepted'; friendUserId: string }
  | { kind: 'self' }
  | { kind: 'not_found' }

export class AcceptInvite {
  constructor(
    private readonly profiles: IProfileRepository,
    private readonly friendships: IFriendshipRepository,
  ) {}

  async execute(meUserId: string, slug: string): Promise<AcceptInviteResult> {
    const target = await this.profiles.getBySlug(slug)
    if (!target) return { kind: 'not_found' }
    if (target.userId === meUserId) return { kind: 'self' }

    await this.friendships.create(meUserId, target.userId)
    return { kind: 'accepted', friendUserId: target.userId }
  }
}

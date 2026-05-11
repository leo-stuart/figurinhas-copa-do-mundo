import type { Profile } from '../entities/Profile'

export interface IProfileRepository {
  getByUserId(userId: string): Promise<Profile | null>
  getBySlug(slug: string): Promise<Profile | null>
  getManyByUserIds(userIds: string[]): Promise<Profile[]>
  create(profile: Profile): Promise<Profile>
  updateDisplayName(userId: string, displayName: string): Promise<Profile>
}

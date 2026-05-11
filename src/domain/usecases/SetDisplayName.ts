import type { IProfileRepository } from '../repositories/IProfileRepository'
import type { Profile } from '../entities/Profile'

export class SetDisplayName {
  constructor(private readonly profiles: IProfileRepository) {}

  async execute(userId: string, rawName: string): Promise<Profile> {
    const trimmed = rawName.trim()
    if (trimmed.length < 1 || trimmed.length > 40) {
      throw new Error('Nome deve ter entre 1 e 40 caracteres')
    }
    return this.profiles.updateDisplayName(userId, trimmed)
  }
}

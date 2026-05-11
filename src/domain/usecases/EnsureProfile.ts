import type { IProfileRepository } from '../repositories/IProfileRepository'
import type { Profile } from '../entities/Profile'

const SLUG_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const SLUG_LENGTH = 12
const MAX_RETRIES = 5

export class EnsureProfile {
  constructor(
    private readonly repo: IProfileRepository,
    private readonly randomBytes: (n: number) => Uint8Array,
  ) {}

  async execute(userId: string, email: string | undefined): Promise<Profile> {
    const existing = await this.repo.getByUserId(userId)
    if (existing) return existing

    const defaultName = deriveDisplayName(email, userId)

    let lastError: unknown
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const slug = this.generateSlug()
      try {
        return await this.repo.create({ userId, displayName: defaultName, inviteSlug: slug })
      } catch (err) {
        lastError = err
        const existingAfterRace = await this.repo.getByUserId(userId)
        if (existingAfterRace) return existingAfterRace
      }
    }
    throw lastError ?? new Error('Could not create profile')
  }

  private generateSlug(): string {
    const bytes = this.randomBytes(SLUG_LENGTH)
    let slug = ''
    for (let i = 0; i < SLUG_LENGTH; i++) slug += SLUG_ALPHABET[bytes[i] % SLUG_ALPHABET.length]
    return slug
  }
}

function deriveDisplayName(email: string | undefined, userId: string): string {
  if (email) {
    const local = email.split('@')[0]?.trim()
    if (local) return local.slice(0, 40)
  }
  return `Colecionador ${userId.slice(0, 6)}`
}

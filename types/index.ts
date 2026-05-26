// ─────────────────────────────────────────────
// types/index.ts
// ─────────────────────────────────────────────

export interface CloudinaryAsset {
  secure_url: string
  public_id: string
  width?: number
  height?: number
}

/** @deprecated Use CloudinaryAsset instead */
export type SanityImage = CloudinaryAsset

export interface SocialLink {
  _key: string
  platform: string
  url: string
  icon?: string
}

export interface ExperienceHighlight {
  _key: string
  role: string
  company: string
  year: string
  description?: string
}

export * from './user'
export * from './project'

// ─────────────────────────────────────────────
// types/index.ts
// ─────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

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

export interface UserProfile {
  _id: string
  name: string
  profileImage?: SanityImage
  heroVideo?: { asset?: { url?: string } }
  heroPoster?: { asset?: { url?: string } }
  tagline?: string
  aboutText?: string
  email?: string
  socialLinks?: SocialLink[]
  experienceHighlights?: ExperienceHighlight[]
}

export type GalleryItemType = 'image' | 'video'

export interface GalleryItem {
  _key: string
  type: GalleryItemType
  image?: SanityImage
  videoUrl?: string
  caption?: string
}

export type ProjectCategory =
  | 'Videography'
  | 'Branding'
  | 'Photography'
  | 'Digital Campaign'

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description?: unknown // PortableText blocks
  role?: string
  category?: ProjectCategory
  year?: string
  coverImage?: SanityImage
  coverVideoUrl?: string
  gallery?: GalleryItem[]
  featured?: boolean
  order?: number
}

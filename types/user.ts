import { CloudinaryAsset, SocialLink, ExperienceHighlight } from './index'

export interface UserProfile {
  _id: string
  name: string
  profileImage?: CloudinaryAsset
  heroVideo?: { asset?: { url?: string } }
  heroPoster?: CloudinaryAsset
  tagline?: string
  aboutText?: string
  email?: string
  socialLinks?: SocialLink[]
  experienceHighlights?: ExperienceHighlight[]
}

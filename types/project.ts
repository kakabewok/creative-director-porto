import { CloudinaryAsset } from './index'

export type GalleryItemType = 'image' | 'video'

export interface GalleryItem {
  _key: string
  type: GalleryItemType
  image?: CloudinaryAsset
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
  slug: {
    current: string
  }
  year: string
  category: ProjectCategory
  role?: string
  description?: any // PortableText blocks
  coverImage?: CloudinaryAsset
  coverVideo?: string
  gallery?: GalleryItem[]
  is_selected?: boolean
  order?: number
}

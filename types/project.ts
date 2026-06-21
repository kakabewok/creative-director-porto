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
  | 'Segment Development'
  | 'Performance Production'
  | 'Mass Choreography Coordination'
  | 'Creative Execution'
  | 'Stadium Ceremony Production'
  | 'Creative Concept'
  | 'Scenography'
  | 'Projection Mapping'
  | 'Visual Storytelling'
  | 'Family Musical Experience Design'
  | 'Creative Direction'

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  year: string
  categories?: string[]
  role?: string
  description?: any // PortableText blocks
  coverImage?: CloudinaryAsset
  coverVideo?: string
  gallery?: GalleryItem[]
  is_selected?: boolean
  order?: number
}

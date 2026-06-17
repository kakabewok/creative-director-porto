import { CloudinaryAsset } from './index'

export interface HeroMedia {
  _id: string
  title: string
  mediaType: 'image' | 'video'
  image?: CloudinaryAsset
  videoUrl?: string
  order: number
  isActive: boolean
}

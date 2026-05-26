import { optimizeCloudinaryUrl } from '@/lib/media'
import { PLACEHOLDER_IMAGES } from '@/data/mock/projects'
import type { Project } from '@/types'
import { getYoutubeThumbnail } from '@/lib/mediaUtils'

/**
 * Returns the best available cover image URL for a project:
 * 1. Cloudinary optimized URL
 * 2. Video thumbnail (if available)
 * 3. Local mock placeholder image
 */
export function getProjectCoverSrc(project: Project, width = 1600): string {
  // Direct Cloudinary URL from our cloudinaryAsset object
  if (project.coverImage?.secure_url) {
    return optimizeCloudinaryUrl(project.coverImage.secure_url)
  }

  if (project.coverVideo) {
    const thumb = getYoutubeThumbnail(project.coverVideo)
    if (thumb) return thumb
  }

  return PLACEHOLDER_IMAGES[project._id] || "/mock/project-placeholder.jpg"
}

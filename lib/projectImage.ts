import { urlForImage } from '@/sanity/image'
import { PLACEHOLDER_IMAGES } from '@/data/mock/projects'
import type { Project } from '@/types'
import { getYoutubeThumbnail } from '@/lib/mediaUtils'

/**
 * Returns the best available cover image URL for a project:
 * 1. Real Sanity CDN URL (when valid Sanity asset ref)
 * 2. Video thumbnail (if available)
 * 3. Local mock placeholder image
 */
export function getProjectCoverSrc(project: Project, width = 1200): string {
  const sanityUrl = urlForImage(project.coverImage, width)
  if (sanityUrl) return sanityUrl

  if (project.coverVideoUrl) {
    const thumb = getYoutubeThumbnail(project.coverVideoUrl)
    if (thumb) return thumb
  }

  return PLACEHOLDER_IMAGES[project._id] || "/mock/project-placeholder.jpg"
}

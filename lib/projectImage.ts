import { urlForImage } from '@/sanity/image'
import { PLACEHOLDER_IMAGES } from '@/data/mock/projects'
import type { Project } from '@/types'

/**
 * Returns the best available cover image URL for a project:
 * 1. Real Sanity CDN URL (when valid Sanity asset ref)
 * 2. Unsplash placeholder (for mock/demo data)
 * 3. Empty string (render dark placeholder)
 */
export function getProjectCoverSrc(project: Project, width = 1200): string {
  const sanityUrl = urlForImage(project.coverImage, width)
  if (sanityUrl) return sanityUrl
  return PLACEHOLDER_IMAGES[project._id] ?? ''
}

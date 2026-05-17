/**
 * Convert a YouTube / Vimeo watch URL to an embeddable URL.
 */
export function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`
  }

  return url
}

/**
 * Return a YouTube thumbnail URL from a watch URL.
 */
export function getYoutubeThumbnail(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
  }
  return ''
}

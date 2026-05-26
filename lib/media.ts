export function optimizeCloudinaryUrl(url?: string) {
  if (!url) return ""

  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto/"
  )
}

import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from '@/sanity/client'
import type { SanityImage } from '@/types'

const builder = createImageUrlBuilder(sanityClient)

// Sanity asset refs must match the pattern: image-<hash>-<width>x<height>-<ext>
// Mock/placeholder refs like 'image-ref-1' are intentionally invalid — return '' for those.
const VALID_REF_RE = /^image-[A-Za-z0-9]+-\d+x\d+-[a-z]+$/

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export function urlForImage(source: SanityImage | undefined, width = 1200): string {
  const ref = source?.asset?._ref
  if (!ref || !VALID_REF_RE.test(ref)) return ''
  try {
    return urlFor(source!).width(width).auto('format').url()
  } catch {
    return ''
  }
}

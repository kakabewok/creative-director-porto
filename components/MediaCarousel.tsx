import { forwardRef, useImperativeHandle, useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryItem } from '@/types'
import { urlForImage } from '@/sanity/image'
import { toEmbedUrl } from '@/lib/mediaUtils'

interface Props {
  items: GalleryItem[]
  onIndexChange?: (index: number) => void
}

export interface MediaCarouselHandle {
  paginate: (dir: number) => void
  canPaginate: boolean
  currentIndex: number
  total: number
}

function resolveImageSrc(item: GalleryItem): string {
  if (item.image) {
    const sanityUrl = urlForImage(item.image, 1600)
    if (sanityUrl) return sanityUrl
  }
  return ''
}

const MediaCarousel = forwardRef<MediaCarouselHandle, Props>(({ items, onIndexChange }, ref) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const total = items.length

  const paginate = useCallback(
    (dir: number) => {
      if (total <= 1) return
      setDirection(dir)
      // Stop at first/last item as requested, or loop
      // User suggested: "stop at last item (recommended for clarity)"
      setCurrent((prev) => {
        const next = prev + dir
        if (next < 0) return 0
        if (next >= total) return total - 1
        return next
      })
    },
    [total]
  )

  // Notify parent of index change
  useEffect(() => {
    onIndexChange?.(current)
  }, [current, onIndexChange])

  useImperativeHandle(ref, () => ({
    paginate,
    canPaginate: total > 1,
    currentIndex: current,
    total
  }), [paginate, total, current])

  if (total === 0) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1)
    touchStartX.current = null
  }

  const item = items[current]

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  const imgSrc = resolveImageSrc(item)

  return (
    <div
      className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Project media carousel"
    >
      {/* Slides */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {item.type === 'image' && imgSrc ? (
            <Image
              src={imgSrc}
              alt={item.image?.alt ?? item.caption ?? 'Gallery image'}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          ) : item.type === 'image' && !imgSrc ? (
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <span className="text-white/10 text-xs tracking-widest uppercase">
                {item.image?.alt ?? 'Image'}
              </span>
            </div>
          ) : item.type === 'video' && item.videoUrl ? (
            <iframe
              src={toEmbedUrl(item.videoUrl)}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.caption ?? 'Embedded video'}
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <span className="text-white/20 text-xs tracking-widest uppercase">No media</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient for overlay readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Caption */}
      {item.caption && item.type !== 'video' && (
        <div className="absolute bottom-12 left-4 right-4 pointer-events-none z-10">
          <p className="text-white/35 text-xs tracking-wider">{item.caption}</p>
        </div>
      )}

      {/* Dot indicators — always visible, small */}
      {/* {total > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
          aria-label="Slide indicators"
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )} */}
    </div>
  )
})

MediaCarousel.displayName = 'MediaCarousel'
export default MediaCarousel

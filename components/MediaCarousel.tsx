'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@/types'
import { urlForImage } from '@/sanity/image'
import { PLACEHOLDER_IMAGES } from '@/data/mock/projects'
import { toEmbedUrl } from '@/lib/mediaUtils'

interface Props {
  items: GalleryItem[]
}

function resolveImageSrc(item: GalleryItem): string {
  // Try real Sanity URL first
  if (item.image) {
    const sanityUrl = urlForImage(item.image, 1600)
    if (sanityUrl) return sanityUrl
  }
  // For gallery items that are the cover image re-used, find a placeholder
  // by checking if the image alt matches a known project image alt
  return ''
}

export default function MediaCarousel({ items }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const total = items.length
  if (total === 0) return null

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent((prev) => (prev + dir + total) % total)
    },
    [total]
  )

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
            /* Dark placeholder for mock image items */
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

      {/* Caption */}
      {item.caption && (
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <p className="text-white/40 text-xs tracking-wider">{item.caption}</p>
        </div>
      )}

      {/* Desktop prev/next */}
      {total > 1 && (
        <>
          <button
            id="carousel-prev"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/60 hover:text-white transition-colors rounded-full bg-black/30 backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            id="carousel-next"
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/60 hover:text-white transition-colors rounded-full bg-black/30 backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight size={18} />
          </button>

          {/* Index dots */}
          <div
            className="absolute bottom-4 right-4 flex gap-1.5"
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
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

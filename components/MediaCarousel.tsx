'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@/types'
import { urlForImage } from '@/sanity/image'
import { toEmbedUrl } from '@/lib/mediaUtils'

interface Props {
  items: GalleryItem[]
}

function resolveImageSrc(item: GalleryItem): string {
  if (item.image) {
    const sanityUrl = urlForImage(item.image, 1600)
    if (sanityUrl) return sanityUrl
  }
  return ''
}

export default function MediaCarousel({ items }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [hovered, setHovered] = useState(false)
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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

      {/* Fix 6: Prev/Next — desktop only, visible on hover only */}
      {total > 1 && (
        <>
          <AnimatePresence>
            {hovered && (
              <>
                <motion.button
                  key="prev"
                  id="carousel-prev"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => paginate(-1)}
                  aria-label="Previous slide"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/70 hover:text-white transition-colors rounded-full bg-black/40 backdrop-blur-sm hidden md:flex z-10"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  key="next"
                  id="carousel-next"
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => paginate(1)}
                  aria-label="Next slide"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/70 hover:text-white transition-colors rounded-full bg-black/40 backdrop-blur-sm hidden md:flex z-10"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Dot indicators — always visible, small */}
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
        </>
      )}
    </div>
  )
}

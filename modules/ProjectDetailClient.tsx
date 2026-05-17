'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { X, Info } from 'lucide-react'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import MediaCarousel, { type MediaCarouselHandle } from '@/components/MediaCarousel'
import DetailsDrawer from '@/components/DetailsDrawer'
import type { GalleryItem } from '@/types'

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectDetailClient({ project, allProjects }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const carouselRef = useRef<MediaCarouselHandle>(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  // Fix 5: Build ONE unified media list for the single carousel
  // Starts with the cover (image or video), then appends gallery items
  const allMediaItems = buildMediaItems(project)
  const totalMedia = allMediaItems.length

  return (
    <>
      <div className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center">
        {/* ── Left Navigation Zone (Prev Media) ── */}
        {totalMedia > 1 && (
          <button
            onClick={() => carouselRef.current?.paginate(-1)}
            className="hidden md:flex absolute left-0 top-0 bottom-0 w-[12%] lg:w-[15%] z-30 items-center justify-center group cursor-w-resize"
            aria-label="Previous image"
          >
            <span className="text-white/60 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Prev
            </span>
          </button>
        )}

        {/* ── Right Navigation Zone (Next Media) ── */}
        {totalMedia > 1 && (
          <button
            onClick={() => carouselRef.current?.paginate(1)}
            className="hidden md:flex absolute right-0 top-0 bottom-0 w-[12%] lg:w-[15%] z-30 items-center justify-center group cursor-e-resize"
            aria-label="Next image"
          >
            <span className="text-white/60 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Next
            </span>
          </button>
        )}

        {/* ── Unified media carousel (centered, max-width) ── */}
        <div className="relative w-full md:w-[76%] lg:w-[70%] max-w-7xl mx-auto">
          <MediaCarousel
            ref={carouselRef}
            items={allMediaItems}
            onIndexChange={setCurrentMediaIndex}
          />

          {/* Overlay UI on top of carousel */}

          {/* Top-right: Close */}
          <Link
            href="/work"
            id="project-close"
            aria-label="Back to work"
            className="absolute -top-12 right-0 md:top-5 md:right-5 z-40 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full bg-black/40 backdrop-blur-sm"
          >
            <X size={16} />
          </Link>

          {/* Mobile: details — top-left */}
          <button
            id="project-details-open-mobile"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open project details"
            className="absolute -top-12 left-0 md:hidden z-40 flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider text-white/60 hover:text-white border border-white/20 rounded-full backdrop-blur-sm bg-black/30 transition-all"
          >
            <Info size={12} />
            Details
          </button>

          {/* Bottom-left: title */}
          <div className="absolute -bottom-16 left-0 md:bottom-6 md:left-10 z-40 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-2xl md:text-5xl font-extralight tracking-tight drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Bottom-right: index + details */}
          <div className="absolute -bottom-16 right-0 md:bottom-6 md:right-10 z-40 flex items-center gap-4">
            <span className="text-white/30 text-xs tracking-widest hidden md:block drop-shadow">
              {String(currentMediaIndex + 1).padStart(2, '0')} / {String(totalMedia).padStart(2, '0')}
            </span>
            <button
              id="project-details-open"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open project details"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-light text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-sm bg-black/30"
            >
              <Info size={12} />
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Details drawer */}
      <DetailsDrawer
        project={drawerOpen ? project : null}
        onClose={closeDrawer}
      />
    </>
  )
}

// ─────────────────────────────────────────
// Helper: merge cover + gallery into one list
// ─────────────────────────────────────────
function buildMediaItems(project: Project): GalleryItem[] {
  const items: GalleryItem[] = []

  // 1. Cover image (if exists)
  if (project.coverImage) {
    items.push({
      _key: '__cover-img',
      type: 'image',
      image: project.coverImage,
    })
  }

  // 2. Cover video (if exists and no cover image, or always include after image)
  if (project.coverVideoUrl) {
    items.push({
      _key: '__cover-vid',
      type: 'video',
      videoUrl: project.coverVideoUrl,
      caption: project.title,
    })
  }

  // 3. Gallery items — skip any that duplicate the cover image
  if (project.gallery && project.gallery.length > 0) {
    const dedupKeys = new Set(['__cover-img', '__cover-vid'])
    for (const item of project.gallery) {
      if (!dedupKeys.has(item._key)) {
        items.push(item)
      }
    }
  }

  return items
}

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
import { useRouter } from 'next/navigation';

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectDetailClient({ project, allProjects }: Props) {
  const router = useRouter();
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        {/* ── Left Navigation Zone (Prev Media) ── */}
        {totalMedia > 1 && (
          <button
            onClick={() => carouselRef.current?.paginate(-1)}
            className="hidden md:flex absolute left-0 top-0 bottom-0 w-[12%] lg:w-[15%] z-30 items-center justify-center group cursor-pointer"
            aria-label="Previous image"
          >
            <span className="text-slate-900 dark:text-white/60 text-md tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Prev
            </span>
          </button>
        )}

        {/* ── Right Navigation Zone (Next Media) ── */}
        {totalMedia > 1 && (
          <button
            onClick={() => carouselRef.current?.paginate(1)}
            className="hidden md:flex absolute right-0 top-0 bottom-0 w-[12%] lg:w-[15%] z-30 items-center justify-center group cursor-pointer"
            aria-label="Next image"
          >
            <span className="text-slate-900 dark:text-white/60 text-md tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Next
            </span>
          </button>
        )}

        {/* ── Unified media carousel (centered, max-width) ── */}
        <div className="relative w-full md:w-[56%] lg:w-[75%] max-w-7xl mx-auto">
          <MediaCarousel
            ref={carouselRef}
            items={allMediaItems}
            onIndexChange={setCurrentMediaIndex}
          />

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
        </div>

        <button
          onClick={() => router.back()}
          id="project-close"
          aria-label="Back to work"
          className="text-md absolute top-6 right-0 md:top-3 md:right-5 z-40 w-9 h-9 flex items-center justify-center text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-white/70 transition-colors rounded-full cursor-pointer duration-400 font-semibold"
        >
          {/* <X size={16} /> */}
          CLOSE
        </button>

        <div className="absolute bottom-2 left-15 md:bottom-3 md:left-6 z-40 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-900 dark:text-white text-md md:text-md tracking-tight drop-shadow-2xl font-semibold uppercase"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      <div className="absolute bottom-16 right-0 md:bottom-3 md:right-5 z-40 flex items-center gap-4">
        <span className="text-slate-900 dark:text-white text-md tracking-wide hidden md:block font-semibold">
          {String(currentMediaIndex + 1).padStart(2, '0')} / {String(totalMedia).padStart(2, '0')}
        </span>
        <button
          id="project-details-open"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open project details"
          className="text-md font-semibold hidden md:flex items-center gap-2 tracking-widest uppercase text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-white/70 rounded-xs transition-all cursor-pointer duration-400"
        >
          {/* <Info size={12} /> */}
          Details
        </button>
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
export type CarouselMediaItem = GalleryItem & { resolvedUrl?: string }

function buildMediaItems(project: Project): CarouselMediaItem[] {
  const items: CarouselMediaItem[] = []

  // 1. Cover image (or mock fallback if missing)
  const coverUrl = getProjectCoverSrc(project, 1600)
  items.push({
    _key: '__cover-img',
    type: 'image',
    image: project.coverImage,
    resolvedUrl: coverUrl,
  })

  // 2. Cover video (optional)
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

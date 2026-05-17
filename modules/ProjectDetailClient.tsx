'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { X, Info } from 'lucide-react'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import MediaCarousel from '@/components/MediaCarousel'
import DetailsDrawer from '@/components/DetailsDrawer'
import type { GalleryItem } from '@/types'

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectDetailClient({ project, allProjects }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // Fix 5: Build ONE unified media list for the single carousel
  // Starts with the cover (image or video), then appends gallery items
  const allMediaItems = buildMediaItems(project)

  // Index among all projects
  const idx = allProjects.findIndex((p) => p._id === project._id)
  const total = allProjects.length
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < total - 1 ? allProjects[idx + 1] : null

  return (
    <>
      <div className="relative min-h-screen bg-black">
        {/* ── Unified media carousel (no separate hero image) ── */}
        <div className="relative">
          <MediaCarousel items={allMediaItems} />

          {/* Overlay UI on top of carousel */}

          {/* Top-right: Close */}
          <Link
            href="/work"
            id="project-close"
            aria-label="Back to work"
            className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full bg-black/40 backdrop-blur-sm"
          >
            <X size={16} />
          </Link>

          {/* Mobile: details — top-left */}
          <button
            id="project-details-open-mobile"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open project details"
            className="absolute top-5 left-5 z-20 md:hidden flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider text-white/60 hover:text-white border border-white/20 rounded-full backdrop-blur-sm bg-black/30 transition-all"
          >
            <Info size={12} />
            Details
          </button>

          {/* Bottom-left: title */}
          <div className="absolute bottom-6 left-6 md:left-10 z-20 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-3xl md:text-5xl font-extralight tracking-tight drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Bottom-right: index + details */}
          <div className="absolute bottom-6 right-6 md:right-10 z-20 flex items-center gap-4">
            <span className="text-white/30 text-xs tracking-widest hidden md:block drop-shadow">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
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

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <nav
            aria-label="Project navigation"
            className="flex justify-between items-center px-6 md:px-10 py-12 border-t border-white/8"
          >
            {prev ? (
              <Link
                href={`/work/${prev.slug.current}`}
                className="group flex flex-col gap-1"
                aria-label={`Previous: ${prev.title}`}
              >
                <span className="text-white/20 text-xs tracking-widest uppercase">Previous</span>
                <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/work/${next.slug.current}`}
                className="group flex flex-col gap-1 text-right"
                aria-label={`Next: ${next.title}`}
              >
                <span className="text-white/20 text-xs tracking-widest uppercase">Next</span>
                <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        )}
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

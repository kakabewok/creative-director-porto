'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import MediaCarousel from '@/components/MediaCarousel'
import DetailsDrawer from '@/components/DetailsDrawer'
import { toEmbedUrl } from '@/lib/mediaUtils'

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectDetailClient({ project, allProjects }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // Build gallery: if dedicated gallery exists, use it; else synthesise from cover
  const galleryItems = project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.coverImage
      ? [{ _key: 'cover', type: 'image' as const, image: project.coverImage }]
      : []

  // Index among all projects
  const idx = allProjects.findIndex((p) => p._id === project._id)
  const total = allProjects.length
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < total - 1 ? allProjects[idx + 1] : null

  const coverSrc = getProjectCoverSrc(project, 1600)

  return (
    <>
      <div className="relative min-h-screen bg-black">
        {/* Hero cover */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={project.coverImage?.alt ?? project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : project.coverVideoUrl ? (
            <iframe
              src={toEmbedUrl(project.coverVideoUrl)}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={project.title}
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close → back to work */}
          <Link
            href="/work"
            id="project-close"
            aria-label="Back to work"
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full bg-black/30 backdrop-blur-sm"
          >
            <X size={16} />
          </Link>

          {/* Mobile: details top-left */}
          <button
            id="project-details-open-mobile"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open project details"
            className="absolute top-5 left-5 md:hidden flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider text-white/60 hover:text-white border border-white/20 rounded-full backdrop-blur-sm bg-black/20 transition-all"
          >
            <Info size={12} />
            Details
          </button>

          {/* Bottom-left: title */}
          <div className="absolute bottom-6 left-6 md:left-10">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-3xl md:text-5xl font-extralight tracking-tight"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Bottom-right: index + details */}
          <div className="absolute bottom-6 right-6 md:right-10 flex items-center gap-4">
            <span className="text-white/30 text-xs tracking-widest hidden md:block">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              id="project-details-open"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open project details"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-light text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-sm bg-black/20"
            >
              <Info size={12} />
              Details
            </button>
          </div>
        </div>

        {/* Gallery carousel */}
        {galleryItems.length > 0 && (
          <section aria-label="Project gallery" className="mt-1">
            <MediaCarousel items={galleryItems} />
          </section>
        )}

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

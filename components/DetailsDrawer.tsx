'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '@/types'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import React from 'react'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function DetailsDrawer({ project, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* Trap focus */
  useEffect(() => {
    if (project) drawerRef.current?.focus()
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${project.title}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm md:max-w-md bg-[#0f0f0f] border-l border-white/8 overflow-y-auto outline-none"
          >
            {/* Close */}
            <button
              id="details-drawer-close"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full"
            >
              <X size={16} />
            </button>

            <div className="px-8 pt-16 pb-12 space-y-8">
              {/* Title */}
              <h2 className="text-white text-2xl font-light tracking-tight leading-snug">
                {project.title}
              </h2>

            <dl className="grid grid-cols-2 gap-y-5 gap-x-4">
              {project.year ? (
                <React.Fragment key="year">
                  <dt className="text-white/30 text-xs tracking-widest uppercase">Year</dt>
                  <dd className="text-white/70 text-sm font-light">{project.year}</dd>
                </React.Fragment>
              ) : null}

              {project.category ? (
                <React.Fragment key="category">
                  <dt className="text-white/30 text-xs tracking-widest uppercase">Category</dt>
                  <dd className="text-white/70 text-sm font-light">{project.category}</dd>
                </React.Fragment>
              ) : null}
            </dl>

            <div className="w-full h-px bg-white/8" />

              {/* Description */}
              {project.description ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <PortableTextRenderer value={project.description} />
                </div>
              ) : null}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

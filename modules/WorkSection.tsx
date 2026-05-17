'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import HomeNavbar from '@/components/HomeNavbar'
import ScrollTrigger from '@/components/ScrollTrigger'
import ProjectCard from '@/components/ProjectCard'
import TimelineView from '@/components/TimelineView'
import LayoutSwitcher, { type ViewMode } from '@/components/LayoutSwitcher'
import Link from 'next/link'

interface Props {
  projects: Project[]
  mode: 'overlay' | 'standalone'
}

export default function WorkSection({ projects, mode }: Props) {
  const isOverlay = mode === 'overlay'
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isWorkActive, setIsWorkActive] = useState(!isOverlay)

  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [projects]
  )

  return (
    <div className={isOverlay ? "relative z-10 bg-black" : "bg-black"}>
      {/* ScrollTrigger only tracks scroll state on the home page overlay, no URL routing */}
      {isOverlay && (
        <ScrollTrigger onActiveChange={setIsWorkActive} />
      )}

      {/* Embedded sticky navbar for overlay mode (since global navbar is hidden on home) */}
      {isOverlay && <HomeNavbar />}

      {/* ── Work content — switches between list / spectrum / timeline ── */}
      <section id="work" aria-label="Selected work" className="pt-10 pb-32">

        {/* Header: Only show "View All" link on home page overlay */}
        {/* <div className="px-6 md:px-10 mb-14 flex items-center justify-between max-w-3xl mx-auto">
          <p className="text-white/20 text-xs tracking-[0.25em] uppercase">
            {isOverlay ? 'Selected Work' : `${projects.length} Projects`}
          </p>
          {isOverlay && (
            <Link
              href="/work"
              className="text-white/30 text-xs tracking-widest uppercase hover:text-white/70 transition-colors"
            >
              View All →
            </Link>
          )}
        </div> */}

        {/* Layout views */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-16 px-6 pt-10"
            >
              {sorted.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={i}
                  coverSrc={getProjectCoverSrc(project, 1200)}
                  mode="list"
                  priority={i === 0}
                />
              ))}
            </motion.div>
          )}

          {viewMode === 'spectrum' && (
            <motion.div
              key="spectrum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
                {sorted.map((project, i) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    coverSrc={getProjectCoverSrc(project, 600)}
                    mode="spectrum"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {viewMode === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TimelineView projects={sorted} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Layout Switcher */}
      <AnimatePresence>
        {isWorkActive && (
          <motion.div
            key="work-layout-switcher"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <LayoutSwitcher mode={viewMode} onChange={setViewMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

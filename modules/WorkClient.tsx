'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import ProjectCard from '@/components/ProjectCard'
import LayoutSwitcher, { type ViewMode } from '@/components/LayoutSwitcher'
import TimelineView from '@/components/TimelineView'

interface Props {
  projects: Project[]
}

export default function WorkClient({ projects }: Props) {
  const [mode, setMode] = useState<ViewMode>('list')

  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [projects]
  )

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-16 px-6 pb-40"
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

        {mode === 'spectrum' && (
          <motion.div
            key="spectrum"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="px-6 pb-40"
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

        {mode === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <TimelineView projects={sorted} />
          </motion.div>
        )}
      </AnimatePresence>

      <LayoutSwitcher mode={mode} onChange={setMode} />
    </>
  )
}

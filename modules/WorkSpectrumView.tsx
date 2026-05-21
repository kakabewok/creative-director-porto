'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import ProjectCard from '@/components/ProjectCard'

interface Props {
  projects: Project[]
}

export default function WorkSpectrumView({ projects }: Props) {
  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [projects]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="px-6 pt-3"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 lg:gap-6">
        {sorted.map((project, i) => (
          <ProjectCard
            key={project._id}
            project={project}
            index={i}
            coverSrc={getProjectCoverSrc(project, 800)}
            mode="spectrum"
          />
        ))}
      </div>
    </motion.div>
  )
}

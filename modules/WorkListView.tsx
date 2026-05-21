'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import ProjectCard from '@/components/ProjectCard'

interface Props {
  projects: Project[]
}

export default function WorkListView({ projects }: Props) {
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
  )
}

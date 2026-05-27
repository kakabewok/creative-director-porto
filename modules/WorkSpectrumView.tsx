'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import ProjectCard from '@/components/ProjectCard'
import { PROJECTS_PER_PAGE } from '@/constants/pagination'
import LoadMoreButton from '@/components/work/LoadMoreButton'

interface Props {
  projects: Project[]
}

export default function WorkSpectrumView({ projects }: Props) {
  const searchParams = useSearchParams()
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)

  // Reset logic on filter/search change
  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE)
  }, [searchParams])

  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [projects]
  )

  const visibleProjects = sorted.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE)

    // Optional smooth scroll after load
    setTimeout(() => {
      window.scrollBy({
        top: 300,
        behavior: 'smooth',
      })
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="px-2 lg:px-5 pt-3"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4">
        {/* 
          Load More benefits:
          - avoids rendering huge project lists immediately
          - smoother animations
          - lower DOM load
          - better mobile performance
          - improved perceived performance
          - more cinematic browsing flow
        */}
        {visibleProjects.map((project, i) => (
          <ProjectCard
            key={project._id}
            project={project}
            index={i % PROJECTS_PER_PAGE}
            coverSrc={getProjectCoverSrc(project, 800)}
            mode="spectrum"
          />
        ))}
      </div>

      <LoadMoreButton
        onClick={handleLoadMore}
        isVisible={visibleCount < sorted.length}
      />
    </motion.div>
  )
}

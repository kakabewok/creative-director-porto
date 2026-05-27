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

const limit = Number(process.env.NEXT_PUBLIC_PROJECTS_PER_PAGE) || 30;

export default function WorkListView({ projects }: Props) {
  const searchParams = useSearchParams()
  const [visibleCount, setVisibleCount] = useState(limit)

  // Reset logic on filter/search change
  useEffect(() => {
    setVisibleCount(limit)
  }, [searchParams])

  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [projects]
  )

  const visibleProjects = sorted.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + limit)

    // Optional smooth scroll after load to improve UX naturally
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
      className="flex flex-col items-center gap-5 lg:gap-11 px-2 md:px-3 lg:px-4 pt-10"
    >
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
          index={i % limit}
          coverSrc={getProjectCoverSrc(project, 1200)}
          mode="list"
          priority={i === 0}
        />
      ))}

      <LoadMoreButton
        onClick={handleLoadMore}
        isVisible={visibleCount < sorted.length}
      />
    </motion.div>
  )
}

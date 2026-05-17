'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'

interface Props {
  projects: Project[]
}

const RADIUS = 180   // circle radius in px (desktop)
const RADIUS_SM = 120 // mobile

export default function TimelineView({ projects }: Props) {
  const [activeYear, setActiveYear] = useState<string | null>(null)

  // Group by year, sorted descending
  const byYear = useMemo(() => {
    return projects.reduce<Record<string, Project[]>>((acc, p) => {
      const y = p.year ?? 'Unknown'
      ;(acc[y] ??= []).push(p)
      return acc
    }, {})
  }, [projects])

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))
  const total = years.length

  // Featured project for active year (first by order)
  const featuredProject = useMemo(() => {
    if (!activeYear) return null
    const group = byYear[activeYear]
    return [...group].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))[0] ?? null
  }, [activeYear, byYear])

  const featuredSrc = featuredProject ? getProjectCoverSrc(featuredProject, 600) : ''

  return (
    <div className="w-full flex flex-col items-center pb-40 pt-8">
      {/* Circular diagram */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: RADIUS * 2 + 80, height: RADIUS * 2 + 80 }}
        role="region"
        aria-label="Timeline"
      >
        {/* Years on the circle */}
        {years.map((year, i) => {
          const angle = (i / total) * 360 - 90 // start from top
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * RADIUS
          const y = Math.sin(rad) * RADIUS
          const isActive = activeYear === year

          return (
            <button
              key={year}
              id={`timeline-year-${year}`}
              onClick={() => setActiveYear(isActive ? null : year)}
              aria-pressed={isActive}
              aria-label={`${year}: ${byYear[year].length} projects`}
              className="absolute flex flex-col items-center gap-1 group"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              {/* Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.6 : 1,
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.25 }}
                className="w-2 h-2 rounded-full"
              />
              {/* Year label */}
              <span
                className={`text-xs tracking-widest font-light transition-colors duration-200 whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-white/30 group-hover:text-white/70'
                }`}
              >
                {year}
              </span>
            </button>
          )
        })}

        {/* Center: circle outline */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${RADIUS * 2 + 80} ${RADIUS * 2 + 80}`}
          aria-hidden="true"
        >
          <circle
            cx={(RADIUS * 2 + 80) / 2}
            cy={(RADIUS * 2 + 80) / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Center: featured project cover / prompt */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {featuredProject && featuredSrc ? (
              <motion.div
                key={featuredProject._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Link
                  href={`/work/${featuredProject.slug.current}`}
                  aria-label={featuredProject.title}
                  className="block w-full h-full"
                >
                  <Image
                    src={featuredSrc}
                    alt={featuredProject.coverImage?.alt ?? featuredProject.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                  {/* Title overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                    <p className="text-white text-[10px] tracking-widest uppercase leading-tight">
                      {featuredProject.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ) : featuredProject && !featuredSrc ? (
              <motion.div
                key={`empty-${featuredProject._id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full h-full"
              >
                <Link
                  href={`/work/${featuredProject.slug.current}`}
                  className="text-white/40 text-[10px] tracking-widest uppercase text-center px-3 hover:text-white/70 transition-colors"
                >
                  {featuredProject.title}
                </Link>
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/15 text-[10px] tracking-widest uppercase text-center px-4"
              >
                Select a year
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project list for active year */}
      <AnimatePresence>
        {activeYear && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 w-full max-w-2xl px-6"
          >
            <p className="text-white/20 text-xs tracking-widest uppercase mb-6 text-center">
              {activeYear} — {byYear[activeYear].length} {byYear[activeYear].length === 1 ? 'project' : 'projects'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...byYear[activeYear]]
                .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
                .map((project, i) => {
                  const src = getProjectCoverSrc(project, 600)
                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35 }}
                    >
                      <Link
                        href={`/work/${project.slug.current}`}
                        className="group block"
                        aria-label={project.title}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                          {src ? (
                            <Image
                              src={src}
                              alt={project.coverImage?.alt ?? project.title}
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-zinc-800" />
                          )}
                        </div>
                        <p className="mt-2 text-white/50 text-xs tracking-widest uppercase truncate group-hover:text-white/80 transition-colors">
                          {project.title}
                        </p>
                      </Link>
                    </motion.div>
                  )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

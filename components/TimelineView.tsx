'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'

interface Props {
  projects: Project[]
}

export default function TimelineView({ projects }: Props) {
  const [activeYear, setActiveYear] = useState<string | null>(null)

  // Group projects by year, sorted descending
  const byYear = projects.reduce<Record<string, Project[]>>((acc, p) => {
    const y = p.year ?? 'Unknown'
    ;(acc[y] ??= []).push(p)
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="w-full max-w-3xl mx-auto px-6 pb-40">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="relative pl-10">
              {/* Year dot */}
              <button
                id={`timeline-year-${year}`}
                onClick={() => setActiveYear(activeYear === year ? null : year)}
                aria-expanded={activeYear === year}
                aria-controls={`timeline-projects-${year}`}
                className="flex items-center gap-4 group"
              >
                <div
                  className={`absolute left-0 top-1 w-[7px] h-[7px] rounded-full border transition-all duration-300 ${
                    activeYear === year
                      ? 'bg-white border-white scale-125'
                      : 'bg-transparent border-white/30 group-hover:border-white/70'
                  }`}
                />
                <span
                  className={`text-sm tracking-widest font-light transition-colors duration-200 ${
                    activeYear === year ? 'text-white' : 'text-white/30 group-hover:text-white/70'
                  }`}
                >
                  {year}
                </span>
                <span className="text-white/20 text-xs">
                  {byYear[year].length} {byYear[year].length === 1 ? 'project' : 'projects'}
                </span>
              </button>

              {/* Projects under year */}
              <AnimatePresence>
                {activeYear === year && (
                  <motion.div
                    id={`timeline-projects-${year}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {byYear[year].map((project, i) => {
                        const src = getProjectCoverSrc(project, 600)
                        return (
                          <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.35 }}
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
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { Project, ProjectCategory } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'

const CATEGORIES: ProjectCategory[] = ['Videography', 'Branding', 'Photography', 'Digital Campaign']

interface Props {
  projects: Project[]
}

export default function SearchClient({ projects }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null)

  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = projects.filter((p) => p.category === cat).length
      return acc
    }, {})
  }, [projects])

  const results = useMemo(() => {
    let list = projects
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.role?.toLowerCase().includes(q) ||
          p.year?.includes(q)
      )
    }
    return list
  }, [projects, query, activeCategory])

  const showResults = query.trim() !== '' || activeCategory !== null

  return (
    <div className="min-h-screen bg-black pt-24 pb-40 px-6 md:px-10">
      {/* Search input */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
          />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search for a title or term"
            aria-label="Search projects"
            autoComplete="off"
            className="w-full bg-transparent border-b border-white/15 pl-10 pr-4 py-4 text-white/70 text-sm font-light tracking-wide placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-2xl mx-auto mb-16">
        <p className="text-white/20 text-xs tracking-widest uppercase mb-6">or explore by</p>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              aria-pressed={activeCategory === cat}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-light border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'border-white/15 text-white/40 hover:border-white/40 hover:text-white/70'
              }`}
            >
              {cat} ({categoryCounts[cat] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto"
        >
          {results.length === 0 ? (
            <p className="text-white/20 text-sm tracking-widest text-center py-20">
              No results found.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {results.map((project, i) => {
                const src = getProjectCoverSrc(project, 600)
                return (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
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
                            sizes="(max-width:768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-800" />
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <span className="text-white text-xs tracking-widest uppercase">
                            {project.title}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-white/40 text-xs tracking-widest uppercase truncate group-hover:text-white/70 transition-colors">
                        {project.title}
                      </p>
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

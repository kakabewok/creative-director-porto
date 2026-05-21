'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { Project, ProjectCategory } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import { useDebounce } from '@/hooks/useDebounce'

const CATEGORIES: ProjectCategory[] = ['Videography', 'Branding', 'Photography', 'Digital Campaign']

interface Props {
  projects: Project[]
}

function SearchClientInner({ projects }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const initialCategory = (searchParams.get('category') as ProjectCategory) || null

  const [query, setQuery] = useState(initialQuery)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(initialCategory)

  const debouncedQuery = useDebounce(query, 300)

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedQuery.trim()) {
      params.set('q', debouncedQuery.trim())
    } else {
      params.delete('q')
    }

    if (activeCategory) {
      params.set('category', activeCategory)
    } else {
      params.delete('category')
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/search?${queryString}` : '/search'

    // Compare without the leading ? for searchParams.toString()
    const currentQueryString = searchParams.toString()
    const currentUrl = currentQueryString ? `/search?${currentQueryString}` : '/search'

    if (currentUrl !== newUrl) {
      router.replace(newUrl, { scroll: false })
    }
  }, [debouncedQuery, activeCategory, router, searchParams])

  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = projects.filter((p) => p.category === cat).length
      return acc
    }, {})
  }, [projects])

  const results = useMemo(() => {
    let list = projects
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.role?.toLowerCase().includes(q) ||
          p.year?.includes(q)
      )
    }
    return list
  }, [projects, debouncedQuery, activeCategory])

  const showResults = debouncedQuery.trim() !== '' || activeCategory !== null

  return (
    <div className="h-[calc(100dvh-68px)] bg-white dark:bg-black flex flex-col">
      {/* ── Upper section: search + categories (centered, upper-middle) ── */}
      <div className="flex flex-col items-center justify-center pt-[22vh] pb-12 px-6">
        {/* Search input — max width, centered */}
        <div className="w-full max-w-xl mb-10">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white/90 pointer-events-none"
            />
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search for a title or term"
              aria-label="Search projects"
              autoComplete="off"
              className="w-full bg-transparent appearance-none rounded-none border-t-0 border-x-0 border-b border-slate-900 dark:border-white/90 pl-7 pr-4 py-3 text-slate-900 dark:text-white/90 text-sm md:text-lg font-light tracking-wide placeholder:text-slate-900 dark:placeholder:text-white/90 text-center placeholder:text-center transition-colors focus:border-slate-900! dark:focus:border-white/90! focus:ring-0! focus:shadow-none! focus:outline-none! focus-visible:ring-0! focus-visible:outline-none!"
            />
          </div>
        </div>

        {/* Categories — centered under input */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-slate-900 dark:text-white/90 text-[11px] tracking-[0.25em] uppercase">or explore by</p>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                aria-pressed={activeCategory === cat}
                className={`cursor-pointer px-5 py-2 rounded-xs text-xs tracking-widest uppercase font-light border transition-all duration-400 ${activeCategory === cat
                    ? 'bg-slate-950 dark:bg-white text-slate-50 dark:text-black border-slate-950 dark:border-white'
                    : 'border-slate-900 dark:border-white/90 text-slate-900 dark:text-white/90 hover:border-slate-700 dark:hover:border-slate-200 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                {cat} ({categoryCounts[cat] ?? 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 px-6 md:px-10 pb-24"
        >
          {results.length === 0 ? (
            <p className="text-white/20 text-sm tracking-widest text-center py-16">
              No results found.
            </p>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-6 lg:gap-7">
              {results.map((project, i) => {
                const src = getProjectCoverSrc(project, 800)

                // Construct URL with current search params
                const currentParams = searchParams.toString()
                const href = currentParams
                  ? `/work/${project.slug.current}?${currentParams}`
                  : `/work/${project.slug.current}`

                return (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={href}
                      className="group block"
                      aria-label={project.title}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                        {src ? (
                          <Image
                            src={src}
                            alt={project.coverImage?.alt ?? project.title}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-400 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-800" />
                        )}
                      </div>
                      <p className="duration-400 mt-4 text-slate-900 dark:text-white/40 text-xs tracking-widest uppercase truncate group-hover:text-slate-400 dark:group-hover:text-white/70 transition-colors">
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

export default function SearchClient(props: Props) {
  return (
    <Suspense fallback={<div className="h-[calc(100dvh-68px)] bg-white dark:bg-black"></div>}>
      <SearchClientInner {...props} />
    </Suspense>
  )
}

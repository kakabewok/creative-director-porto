'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface Props {
  project: Project
  index: number
  coverSrc: string
  mode?: 'list' | 'spectrum'
  priority?: boolean
}

export default function ProjectCard({ project, index, coverSrc, mode = 'list', priority = false }: Props) {
  const isSpectrum = mode === 'spectrum'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={isSpectrum ? 'relative group cursor-pointer' : 'relative group cursor-pointer w-full'}
    >
      <Link href={`/work/${project.slug.current}`} aria-label={project.title}>
        {/* Image wrapper */}
        <div
          className={`relative overflow-hidden bg-zinc-900 ${isSpectrum ? 'aspect-video' : 'w-full aspect-video max-w-3xl mx-auto'
            }`}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={project.coverImage?.alt ?? project.title}
              fill
              sizes={isSpectrum ? '(max-width:768px) 50vw, 17vw' : '(max-width:768px) 100vw, 768px'}
              className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          ) : (
            /* Placeholder when no real image */
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-br from-zinc-800 to-zinc-950">
              <div className="w-full h-px bg-white/10" />
            </div>
          )}

          {/* Spectrum hover overlay */}
          {isSpectrum && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="group-hover:text-white text-xs md:text-sm tracking-widest uppercase font-light transition-colors duration-300">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* List mode title */}
        {!isSpectrum && (
          <div className="flex items-end justify-between mt-1.5 max-w-3xl mx-auto px-1">
            <h2 className="text-slate-900 dark:text-white/80 text-sm font-semibold tracking-widest uppercase group-hover:text-slate-800 dark:group-hover:text-slate-50 transition-colors duration-300">
              {project.title}
            </h2>
            <span className="text-slate-900 dark:text-white/80 text-xs tracking-wider">
              {project.year}
            </span>
          </div>
        )}
      </Link>
    </motion.article>
  )
}

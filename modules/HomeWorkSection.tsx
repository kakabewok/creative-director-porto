import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import HomeNavbar from '@/components/HomeNavbar' // v2


interface Props {
  projects: Project[]
}

/**
 * The Work layer that slides OVER the fixed hero on the home page.
 *
 * Layout mechanics:
 * - relative + z-10 → sits on top of the fixed hero (z-0)
 * - bg-black → fully covers the hero as it slides up
 * - HomeNavbar inside → sticky top-0, moves with this section,
 *   becomes sticky once it hits the top of the viewport
 */
export default function HomeWorkSection({ projects }: Props) {
  const sorted = [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="relative z-10 bg-black">
      {/* ── Sticky Navbar — part of the Work layer ── */}
      <HomeNavbar />

      {/* ── Work content ── */}
      <section
        id="work"
        aria-label="Selected work"
        className="pt-16 pb-32"
      >
        {/* Section header */}
        <div className="px-6 md:px-10 mb-14 flex items-center justify-between max-w-3xl mx-auto">
          <p className="text-white/20 text-xs tracking-[0.25em] uppercase">
            Selected Work
          </p>
          <Link
            href="/work"
            className="text-white/30 text-xs tracking-widest uppercase hover:text-white/70 transition-colors"
            aria-label="View all work"
          >
            View All →
          </Link>
        </div>

        {/* Project list */}
        <div className="flex flex-col items-center gap-16 px-6">
          {sorted.map((project, i) => {
            const src = getProjectCoverSrc(project, 1200)
            return (
              <article
                key={project._id}
                className="w-full max-w-3xl group"
              >
                <Link
                  href={`/work/${project.slug.current}`}
                  aria-label={project.title}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900">
                    {src ? (
                      <Image
                        src={src}
                        alt={project.coverImage?.alt ?? project.title}
                        fill
                        sizes="(max-width:768px) 100vw, 768px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority={i === 0}
                        loading={i === 0 ? undefined : 'lazy'}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-800" />
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-3 px-1">
                    <h2 className="text-white/80 text-sm font-light tracking-widest uppercase group-hover:text-white transition-colors duration-200">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      {project.category && (
                        <span className="text-white/25 text-xs tracking-wider hidden sm:block">
                          {project.category}
                        </span>
                      )}
                      <span className="text-white/30 text-xs tracking-wider">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

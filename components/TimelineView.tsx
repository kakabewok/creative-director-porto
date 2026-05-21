'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import type { Project } from '@/types'
import { getProjectCoverSrc } from '@/lib/projectImage'
import Link from 'next/link'

interface Props {
  projects: Project[]
}

export default function TimelineView({ projects }: Props) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  // Use container option so Framer Motion tracks the internal scroll of containerRef
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // Map scroll progress to project index
      const index = Math.floor(v * projects.length)
      setActiveIndex(Math.min(index, projects.length - 1))
    })
  }, [scrollYProgress, projects.length])

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(1200)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Disable page scroll while Timeline is active
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const isDesktop = windowWidth >= 1024
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isMobile = windowWidth < 768

  // Adjust arc radius based on screen size
  const radius = isMobile ? 120 : (isTablet ? 220 : 300)

  // Compress point density along the arc (smaller = denser)
  const spreadFactor = isMobile ? 0.9 : (isTablet ? 0.78 : 0.7)

  // Angle spacing determines how far apart the items are
  const angleSpacing = (isMobile ? Math.PI / 6 : Math.PI / 8) * spreadFactor

  const scrollHeight = `${Math.max(200, projects.length * 30)}vh`

  const xOffset = isMobile ? radius * 0.2 : radius * 0.5

  // Calculate points for items and connector lines
  const points = projects.map((project, i) => {
    const distance = i - activeIndex
    const currentAngle = distance * angleSpacing

    // X logic: bulge left
    // x = (1 - cos) * radius - offset
    // This makes the center item furthest to the left.
    const x = (1 - Math.cos(currentAngle)) * radius - xOffset
    const y = Math.sin(currentAngle) * radius

    return { x, y, distance, currentAngle, isActive: i === activeIndex, project, index: i }
  })

  // SVG Center Coordinates
  const cx = isMobile ? 150 : (isTablet ? 300 : 400)
  const cy = isMobile ? 200 : (isTablet ? 300 : 400)

  // Prevent hydration mismatch but ensure containerRef is rendered for useScroll
  if (!mounted) {
    return (
      <div className="h-screen overflow-hidden w-full opacity-0">
        <div ref={containerRef} className="h-full overflow-y-auto" />
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden w-full">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scroll-smooth no-scrollbar touch-pan-y"
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="relative w-full" style={{ height: scrollHeight }}>
          <div className="border border-red-500 sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden">

            {/* LEFT/TOP: ACTIVE IMAGE PREVIEW */}
            <div className={`absolute z-10 bg-zinc-900 flex items-center justify-center rounded-xs overflow-hidden shadow-sm transition-all duration-400 ${isMobile
              ? 'top-[12%] left-1/2 -translate-x-1/2 w-[260px] aspect-[4/3]'
              : 'left-[10%] md:left-[15%] lg:left-[20%] w-[320px] md:w-[550px] aspect-[16/9]'
              }`}>
              {projects.map((project, i) => {
                const isActive = i === activeIndex
                const coverSrc = getProjectCoverSrc(project, 800)

                if (!isActive) return null

                return (
                  <motion.div
                    key={project._id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/work/${project.slug.current}`}
                      className="block w-full h-full relative cursor-pointer group"
                    >
                      {coverSrc ? (
                        <Image
                          src={coverSrc}
                          alt={project.coverImage?.alt || project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 260px, 400px"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                          <span className="text-zinc-500 text-xs tracking-widest uppercase">
                            No Image
                          </span>
                        </div>
                      )}
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* RIGHT/BOTTOM: TIMELINE ARC */}
            <div className={`border border-red-500 absolute pointer-events-none flex items-center justify-center ${isMobile
              ? 'top-[55%] left-1/2 -translate-x-1/2 w-[300px] h-[400px]'
              : 'right-0 top-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px]'
              }`}>

              {/* SINGLE CONTINUOUS ORBIT PATH */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {(() => {
                  // Draw a single continuous arc from top to bottom
                  const maxAngle = Math.PI / 1.15
                  const startX = cx + (1 - Math.cos(-maxAngle)) * radius - xOffset + 6
                  const startY = cy + Math.sin(-maxAngle) * radius
                  const endX = cx + (1 - Math.cos(maxAngle)) * radius - xOffset + 6
                  const endY = cy + Math.sin(maxAngle) * radius

                  // Angle span is > 180 degrees, so large arc flag is 1
                  // Sweeping counter-clockwise from top to bottom while bulging left
                  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 1 0 ${endX} ${endY}`

                  return (
                    <path
                      d={pathData}
                      // stroke="rgba(255,255,255,0.1)"
                      stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}
                      strokeWidth="1"
                      fill="none"
                    />
                  )
                })()}
              </svg>

              {/* TIMELINE NODES */}
              {points.map((pt, i) => {
                if (Math.abs(pt.currentAngle) > Math.PI / 1.2) return null

                // Calculate text offset from the dot (pushing outwards to the left)
                const textOffsetX = -24 * Math.cos(pt.currentAngle)
                const textOffsetY = 24 * Math.sin(pt.currentAngle)

                // Depending on circle side, anchor the text differently
                const isLeftOfDot = textOffsetX < 0

                return (
                  <motion.div
                    key={pt.project._id}
                    className="absolute left-1/2 top-1/2 w-0 h-0"
                    style={{
                      zIndex: pt.isActive ? 10 : 1,
                    }}
                    initial={false}
                    animate={{
                      x: pt.x,
                      y: pt.y,
                      opacity: pt.isActive ? 1 : Math.max(0.1, 1 - Math.abs(pt.distance) * 0.4),
                      scale: pt.isActive ? 1.05 : Math.max(0.65, 0.85 - Math.abs(pt.distance) * 0.06),
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Dot (centered exactly on pt.x, pt.y) */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      animate={{
                        width: pt.isActive ? 12 : 8,
                        height: pt.isActive ? 12 : 8,
                        backgroundColor: pt.isActive
                          ? (isDark ? "#ffffff" : "#18181b")
                          : (isDark ? "#a1a1aa" : "#71717a"),
                        boxShadow: pt.isActive ? "0 0 12px rgba(255,255,255,0.6)" : "none"
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Text Content - positioned along the arc, strictly horizontal */}
                    <motion.div
                      className="absolute left-1/2 top-1/2"
                      initial={false}
                      animate={{
                        x: textOffsetX,
                        y: textOffsetY,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 flex flex-col justify-center gap-[2px] leading-[0.95] whitespace-nowrap ${isLeftOfDot ? 'right-0 items-end text-right' : 'left-0 items-start text-left'
                          }`}
                      >
                        <motion.span
                          className="tracking-wider uppercase"
                          animate={{
                            color: pt.isActive
                              ? (isDark ? "#ffffff" : "#18181b")
                              : (isDark ? "#a1a1aa" : "#71717a"),
                            fontWeight: pt.isActive ? 500 : 300,
                            fontSize: pt.isActive ? (isMobile ? "11px" : "16px") : (isMobile ? "11px" : "14px"),
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {pt.project.title}
                        </motion.span>

                        <motion.span
                          className="tracking-[0.15em]"
                          animate={{
                            color: pt.isActive
                              ? (isDark ? "#ffffff" : "#18181b")
                              : (isDark ? "#a1a1aa" : "#71717a"),
                            fontWeight: pt.isActive ? 400 : 300,
                            fontSize: pt.isActive ? (isMobile ? "9px" : "11px") : (isMobile ? "9px" : "10px"),
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {pt.project.year || "Unknown"}
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

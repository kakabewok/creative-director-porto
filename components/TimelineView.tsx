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

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const index = Math.floor(v * projects.length)
      setActiveIndex(Math.min(index, projects.length - 1))
    })
  }, [scrollYProgress, projects.length])

  const [windowWidth, setWindowWidth] = useState(1200)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
  const radius = isMobile ? 120 : (isTablet ? 220 : 280)
  const labelRadius = radius + 20

  const spreadFactor = isMobile ? 0.9 : (isTablet ? 0.78 : 0.7)
  const angleSpacing = (isMobile ? Math.PI / 6 : Math.PI / 8) * spreadFactor

  const scrollHeight = `${Math.max(200, projects.length * 30)}vh`

  const points = projects.map((project, i) => {
    const distance = i - activeIndex
    const currentAngle = distance * angleSpacing

    // Perfectly centered circular orbit
    const x = Math.cos(currentAngle) * radius
    const y = Math.sin(currentAngle) * radius
    
    // Label positioning radially outwards
    const textOffsetX = (labelRadius - radius) * Math.cos(currentAngle)
    const textOffsetY = (labelRadius - radius) * Math.sin(currentAngle)

    return { x, y, textOffsetX, textOffsetY, distance, currentAngle, isActive: i === activeIndex, project, index: i }
  })

  // Container dimensions
  const svgWidth = isMobile ? 300 : (isTablet ? 600 : 800)
  const svgHeight = isMobile ? 400 : (isTablet ? 700 : 900)
  
  // Center for the SVG
  const cx = svgWidth / 2
  const cy = svgHeight / 2

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
          {/* SHARED PARENT CONTAINER */}
          <div className="sticky top-0 relative w-full h-screen overflow-hidden flex items-center justify-center">

            {/* IMAGE CONTAINER */}
            <div
              className="
                z-20
                flex
                items-center
                justify-center
                absolute right-4 top-1/2 -translate-y-1/2
                md:relative md:right-auto md:top-auto md:-translate-y-0
                w-[130px]
                md:w-[35vw]
                lg:w-[26vw]
                max-w-[400px]
                aspect-[4/3]
                md:aspect-[16/9]
                bg-zinc-900
                rounded-md
                overflow-hidden
                shadow-xl
                transition-all
                duration-500
              "
            >
              {projects.map((project, i) => {
                const isActive = i === activeIndex
                const coverSrc = getProjectCoverSrc(project, 1200)

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
                          sizes="(max-width: 768px) 82vw, (max-width: 1024px) 60vw, 48vw"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* TIMELINE ARC */}
            <div 
              className="
                absolute 
                pointer-events-none 
                flex 
                items-center 
                justify-center 
                left-0 
                -translate-x-[40%] 
                md:left-1/2 
                md:-translate-x-1/2 
                top-1/2 
                -translate-y-1/2 
              "
              style={{
                width: svgWidth,
                height: svgHeight
              }}
            >
              {/* SINGLE CONTINUOUS ORBIT PATH */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {(() => {
                  const maxAngle = Math.PI / 2
                  const startX = cx + Math.cos(-maxAngle) * radius
                  const startY = cy + Math.sin(-maxAngle) * radius
                  const endX = cx + Math.cos(maxAngle) * radius
                  const endY = cy + Math.sin(maxAngle) * radius

                  // Sweep flag = 1 (clockwise) draws the right side of the circle
                  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`

                  return (
                    <path
                      d={pathData}
                      stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}
                      strokeWidth="1"
                      fill="none"
                    />
                  )
                })()}
              </svg>

              {/* TIMELINE NODES */}
              {points.map((pt, i) => {
                if (Math.abs(pt.currentAngle) > Math.PI / 2.05) return null

                return (
                  <motion.div
                    key={pt.project._id}
                    className="absolute left-1/2 top-1/2 w-0 h-0"
                    style={{
                      zIndex: pt.isActive ? 30 : 10,
                      pointerEvents: 'auto',
                    }}
                    initial={false}
                    animate={{
                      x: pt.x,
                      y: pt.y,
                      opacity: pt.isActive ? 1 : Math.max(0.2, 1 - Math.abs(pt.distance) * 0.4),
                      scale: pt.isActive ? 1.05 : Math.max(0.65, 0.85 - Math.abs(pt.distance) * 0.06),
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Dot */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
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

                    {/* Clickable Label */}
                    <motion.div
                      className="absolute left-1/2 top-1/2"
                      initial={false}
                      animate={{
                        x: pt.textOffsetX,
                        y: pt.textOffsetY,
                        rotate: pt.currentAngle * (180 / Math.PI),
                      }}
                      style={{ originX: 0, originY: 0.5 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/work/${pt.project.slug.current}`}
                        className="group absolute top-1/2 -translate-y-1/2 left-0 flex flex-col justify-center gap-[2px] cursor-pointer transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
                        style={{
                          opacity: pt.isActive ? 1 : 0.6,
                        }}
                      >
                        <span
                          className={`uppercase break-words leading-[1.1] transition-colors duration-300 max-w-[180px] ${
                            pt.isActive
                              ? "text-black dark:text-white font-bold text-[11px] md:text-[14px]"
                              : "text-neutral-400 dark:text-neutral-500 font-medium text-[11px] md:text-[14px]"
                          }`}
                        >
                          {pt.project.title}
                        </span>

                        <span
                          className={`tracking-[0.15em] transition-colors duration-300 ${
                            pt.isActive
                              ? "text-black dark:text-white font-medium text-[9px] md:text-[11px]"
                              : "text-neutral-400 dark:text-neutral-500 font-normal text-[9px] md:text-[11px]"
                          }`}
                        >
                          {pt.project.year || "Unknown"}
                        </span>
                      </Link>
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

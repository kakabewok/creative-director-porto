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
  const [windowWidth, setWindowWidth] = useState(1200)
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  // useEffect(() => {
  //   const savedY = sessionStorage.getItem('workScrollY')
  //   if (savedY && containerRef.current) {
  //     setTimeout(() => { // ← TAMBAH TIMEOUT
  //       if (containerRef.current) {
  //         containerRef.current.scrollTop = parseInt(savedY)
  //         sessionStorage.removeItem('workScrollY')
  //       }
  //     }, 50)
  //   }
  // }, [])

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const index = Math.floor(v * projects.length)
      setActiveIndex(Math.min(index, projects.length - 1))
    })
  }, [scrollYProgress, projects.length])

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const savedY = sessionStorage.getItem('workScrollY')
    if (savedY && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = parseInt(savedY)
          sessionStorage.removeItem('workScrollY')
        }
      }, 800)
    }
  }, [mounted])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const isDesktop = windowWidth >= 1024
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isMobile = windowWidth < 768

  // Vertical spacing between items
  const itemSpacing = isMobile ? 65 : (isTablet ? 80 : 100)

  const scrollHeight = `${Math.max(200, projects.length * 30)}vh`

  const points = projects.map((project, i) => {
    const distance = i - activeIndex

    // Vertical positioning
    const y = distance * itemSpacing

    return { y, distance, isActive: i === activeIndex, project, index: i }
  })

  if (!mounted) {
    return (
      <div className="h-screen overflow-hidden w-full opacity-0">
        <div ref={containerRef} className="h-full overflow-y-auto" />
      </div>
    )
  }

  // overflow-hidden
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
          <div className="sticky top-0 w-full h-screen overflow-hidden flex md:flex-row-reverse items-center justify-center z-50 pointer-events-none md:gap-16 lg:gap-32">

            {/* IMAGE CONTAINER */}
            <div
              className="
                z-20
                flex
                items-center
                justify-center
                pointer-events-auto
                absolute right-5 top-1/2 -translate-y-1/2
                md:relative md:right-auto md:top-auto md:translate-y-0
                w-[130px]
                md:w-[35vw]
                lg:w-[26vw]
                max-w-[400px]
                aspect-4/3
                md:aspect-video
                bg-zinc-900
                rounded-none
                overflow-hidden
                shadow-sm
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
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >

                    <Link
                      href={`/work/${project.slug.current}`}
                      onClick={() => sessionStorage.setItem('workScrollY', containerRef.current?.scrollTop.toString() ?? '0')}
                      className="block w-full h-full relative cursor-pointer group"
                    >
                      {coverSrc ? (
                        <Image
                          src={coverSrc}
                          alt={project.title}
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
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* TIMELINE (Vertical) */}
            <div
              className="
                pointer-events-none 
                absolute left-6 top-0
                md:relative md:left-auto md:top-auto
                h-full
                w-[150px] md:w-[200px] lg:w-[220px] shrink-0
                mask-[linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]
                [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]
                md:mask-[linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]
                md:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]
              "
            >
              {/* VERTICAL LINE */}
              <div
                className="
                  absolute left-[5.5px] top-0 h-full w-px 
                  bg-gradient-to-b 
                  from-transparent via-neutral-300 to-transparent 
                  dark:from-transparent dark:via-neutral-700 dark:to-transparent
                "
              />

              {/* TIMELINE NODES ANCHOR */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                {points.map((pt) => {
                  // Hide items that are too far vertically to improve performance
                  if (Math.abs(pt.distance) > 12) return null

                  return (
                    <motion.div
                      key={pt.project._id}
                      className="absolute left-0 top-0 pointer-events-auto flex items-start gap-3 md:gap-4 w-[140px] md:w-[200px] lg:w-[220px]"
                      style={{
                        zIndex: pt.isActive ? 30 : 10,
                        // Center vertically so `y: 0` is exactly in the middle
                        translateY: '-50%'
                      }}
                      initial={false}
                      animate={{
                        y: pt.y,
                        opacity: pt.isActive ? 1 : 0.6,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      {/* DOT */}
                      <motion.div
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-black dark:bg-white"
                        initial={false}
                        animate={{
                          scale: pt.isActive ? 1 : 0.6,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />

                      {/* Clickable Label */}
                      <Link
                        href={`/work/${pt.project.slug.current}`}
                        onClick={() => sessionStorage.setItem('workScrollY', containerRef.current?.scrollTop.toString() ?? '0')}
                        className={`group flex flex-col justify-center gap-[2px] cursor-pointer transition-all duration-900 hover:translate-x-1 hover:opacity-100 ${pt.isActive ? "opacity-100" : "opacity-95"
                          }`}
                      >
                        <span
                          className={`uppercase leading-none tracking-tight max-w-[140px] md:max-w-[220px] wrap-break-words transition-all duration-500 ${pt.isActive
                            ? "text-black dark:text-white font-bold text-[16px] md:text-[19px]"
                            : "text-neutral-300 dark:text-neutral-600 font-medium text-[11px] md:text-[14px]"
                            }`}
                        >
                          {pt.project.title}
                        </span>

                        <span
                          className={`tracking-[0.15em] transition-all duration-500 ${pt.isActive
                            ? "text-black dark:text-white font-medium text-[9px] md:text-[11px]"
                            : "text-neutral-400 dark:text-neutral-500 font-normal text-[9px] md:text-[11px]"
                            }`}
                        >
                          {pt.project.year || "Unknown"}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

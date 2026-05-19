'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'biography', label: 'Biography' },
  { id: 'contact', label: 'Contact' },
  { id: 'downloads', label: 'Downloads' },
]

export default function InformationNav() {
  const [active, setActive] = useState('biography')

  const isClickingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       for (const entry of entries) {
  //         if (entry.isIntersecting) setActive(entry.target.id)
  //       }
  //     },
  //     { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  //   )
  //   SECTIONS.forEach(({ id }) => {
  //     const el = document.getElementById(id)
  //     if (el) observer.observe(el)
  //   })
  //   return () => observer.disconnect()
  // }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return

        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-10% 0px -50% 0px', threshold: 0 }
    )
    
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // const scrollTo = (id: string) => {
  //   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }

  const scrollTo = (id: string) => {
    isClickingRef.current = true
    setActive(id)

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      isClickingRef.current = false
    }, 800)
  }

  return (
    // Fix 7: floating pill nav at bottom-center like LayoutSwitcher
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      aria-label="Information page sections"
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xs px-2 py-2"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          id={`info-nav-${id}`}
          onClick={() => scrollTo(id)}
          aria-current={active === id ? 'location' : undefined}
          className={`px-5 py-2 rounded-xs text-xs font-normal uppercase transition-all duration-400 cursor-pointer ${
            active === id
              ? 'dark:bg-white dark:text-slate-900 bg-slate-900 text-white'
              : 'dark:text-white/40 dark:hover:text-white/80 text-black/40 hover:text-black/80'
          }`}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  )
}

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
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md border border-white/8 rounded-xs px-2 py-2"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          id={`info-nav-${id}`}
          onClick={() => scrollTo(id)}
          aria-current={active === id ? 'location' : undefined}
          className={`px-5 py-2 rounded-xs text-xs font-light tracking-widest uppercase transition-all duration-400 cursor-pointer ${
            active === id
              ? 'bg-white text-black'
              : 'text-white/40 hover:text-white/80'
          }`}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  )
}

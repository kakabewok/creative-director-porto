'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'biography', label: 'Biography' },
  { id: 'contact', label: 'Contact' },
  { id: 'downloads', label: 'Downloads' },
]

export default function InformationNav() {
  const [active, setActive] = useState('biography')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    // Fix 7: floating pill nav at bottom-center like LayoutSwitcher
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      aria-label="Information page sections"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md border border-white/8 rounded-full px-2 py-2"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          id={`info-nav-${id}`}
          onClick={() => scrollTo(id)}
          aria-current={active === id ? 'location' : undefined}
          className={`px-5 py-2 rounded-full text-xs font-light tracking-widest uppercase transition-all duration-200 ${
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

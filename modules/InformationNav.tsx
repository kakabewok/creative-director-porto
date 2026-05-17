'use client'

import { useState, useEffect } from 'react'

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
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
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
    <nav aria-label="Information page sections" className="flex flex-col gap-1">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          id={`info-nav-${id}`}
          onClick={() => scrollTo(id)}
          aria-current={active === id ? 'location' : undefined}
          className={`text-left text-sm font-light tracking-widest uppercase transition-colors duration-200 py-1 ${
            active === id ? 'text-white' : 'text-white/25 hover:text-white/60'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

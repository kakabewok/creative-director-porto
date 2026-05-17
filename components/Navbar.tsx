'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Information', href: '/information' },
  { label: 'Search', href: '/search' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      setScrolled(v > 80)
    })
    return unsub
  }, [scrollY])

  // On the home page: navbar floats over hero at top, then slides up + sticks
  const navBg = isHome
    ? scrolled
      ? 'bg-[#0a0a0a]'
      : 'bg-transparent'
    : 'bg-[#0a0a0a]'

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${navBg}`}
      initial={isHome ? { y: 0 } : { y: 0 }}
      animate={{ y: 0 }}
    >
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-white/90 text-sm font-light tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-light tracking-[0.14em] uppercase transition-colors duration-200
                    ${active ? 'text-white' : 'text-white/50 hover:text-white/90'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.header>
  )
}

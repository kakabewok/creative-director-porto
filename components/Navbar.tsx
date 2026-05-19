'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Information', href: '/information' },
  { label: 'Search', href: '/search' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // On home page: completely hidden — the HomeWorkSection has its own
  // embedded sticky navbar that moves with the work layer.
  if (isHome) return null

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-xs">
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-white/90 text-xs md:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        <Link
          href="/work"
          className="text-white/90 text-xs md:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Work
        </Link>

        <Link
          href="/information"
          className="text-white/90 text-xs md:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-white transition-colors"
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className="text-white/90 text-xs md:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-white transition-colors"
          aria-label="Search"
        >
          Search
        </Link>
      </nav>
    </header>
  )
}

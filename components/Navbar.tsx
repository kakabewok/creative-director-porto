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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <nav
        className="flex items-center justify-evenly px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-white/90 text-sm font-bold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        <Link
          href="/work"
          className="text-white/90 text-sm font-bold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Work
        </Link>

        <Link
          href="/information"
          className="text-white/90 text-sm font-bold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className="text-white/90 text-sm font-bold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Search"
        >
          Search
        </Link>

        {/* <ul className="flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-light tracking-[0.14em] uppercase transition-colors duration-200 ${
                    active ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul> */}
      </nav>
    </header>
  )
}

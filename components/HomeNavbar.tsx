'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// const NAV_LINKS = [
//   { label: 'Work', href: '/work' },
//   { label: 'Information', href: '/information' },
//   { label: 'Search', href: '/search' },
// ]

/**
 * Navbar embedded inside HomeWorkSection.
 * Uses `position: sticky; top: 0` so it:
 *   1. Moves together with the Work section as it slides up over the hero
 *   2. Sticks to the viewport top once the Work section reaches it
 */
export default function HomeNavbar() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-sm"
      aria-label="Site header"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        {/* Left — Brand */}
        <Link
          href="/"
          className="text-white/90 text-sm md:text-md font-semibold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        <Link
          href="/work"
          className="text-white/90 text-sm md:text-md font-semibold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Home"
        >
          Work
        </Link>

        <Link
          href="/information"
          className="text-white/90 text-sm md:text-md font-semibold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className="text-white/90 text-sm md:text-md font-semibold tracking-[0.18em] uppercase hover:text-white transition-colors"
          aria-label="Search"
        >
          Search
        </Link>

        {/* Right — Nav links */}
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

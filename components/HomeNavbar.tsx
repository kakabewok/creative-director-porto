'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HomeNavbar() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-sm"
      aria-label="Site header"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-5 border border-red-500"
        aria-label="Main navigation"
      >
        {/* Left — Brand */}
        <Link
          href="/"
          className="text-white text-xs md:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-white/50 transition-colors"
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        <Link
          href="/work"
          className="text-white text-xs md:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-white/50 transition-colors"
          aria-label="Home"
        >
          Work
        </Link>

        <Link
          href="/information"
          className="text-white text-xs md:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-white/50 transition-colors"
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className="text-white text-xs md:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-white/50 transition-colors"
          aria-label="Search"
        >
          Search
        </Link>
      </nav>
    </header>
  )
}

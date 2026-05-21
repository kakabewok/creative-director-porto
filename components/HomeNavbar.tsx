'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HomeNavbar() {
  const pathname = usePathname()
  // bg-[#0a0a0a]/95
  return (
    <header
      className="sticky top-0 z-20 bg-transparent backdrop-blur-xs"
      aria-label="Site header"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        {/* Left — Brand */}
        <Link
          href="/"
          className={`${pathname === '/' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-xs md:text-[15px] lg:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-slate-500 dark:hover:text-white/50 transition-colors`}
          aria-label="Home"
        >
          Rangga Djoned
        </Link>

        <Link
          href="/work"
          className={`${pathname === '/work' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-xs md:text-[15px] lg:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-slate-500 dark:hover:text-white/50 transition-colors`}
          aria-label="Home"
        >
          Work
        </Link>

        <Link
          href="/information"
          className={`${pathname === '/information' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-xs md:text-[15px] lg:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-slate-500 dark:hover:text-white/50 transition-colors`}
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className={`${pathname === '/search' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-xs md:text-[15px] lg:text-lg cursor-pointer font-semibold tracking-normal uppercase duration-500 hover:text-slate-500 dark:hover:text-white/50 transition-colors`}
          aria-label="Search"
        >
          Search
        </Link>
      </nav>
    </header>
  )
}

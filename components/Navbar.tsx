'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Information', href: '/information' },
  { label: 'Search', href: '/search' },
]

export default function Navbar() {
  const pathname = usePathname()
  const theme = useTheme()
  const [imageError, setImageError] = useState(false)
  const isHome = pathname === '/'

  // On home page: completely hidden — the HomeWorkSection has its own
  // embedded sticky navbar that moves with the work layer.
  if (isHome) return null

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-transparent backdrop-blur-xs">
      <nav
        className="flex items-center justify-between px-2 md:px-3 lg:px-6 py-5"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="relative flex items-center overflow-hidden h-[36px] w-[130px] md:h-[44px] md:w-[180px] lg:h-[52px] lg:w-[220px] shrink-0 transition-opacity duration-400 hover:opacity-70"
          aria-label="Home"
        >
          {(!theme || imageError) ? (
            <span className={`${pathname === '/' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-[13px] md:text-[15px] lg:text-lg font-semibold tracking-normal duration-400 uppercase`}>
              Rangga Djoned
            </span>
          ) : (
            <Image
              src={theme === 'dark' ? '/logo/logo-white-new.png' : '/logo/logo-dark-new.png'}
              alt="Rangga Djoned"
              fill
              className="object-contain object-left origin-left"
              sizes="(max-width: 768px) 130px, (max-width: 1024px) 320px, 380px"
              priority
              onError={() => setImageError(true)}
            />
          )}
        </Link>

        <Link
          href="/work"
          className={`${pathname.startsWith('/work') ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-[13px] md:text-[15px] lg:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-slate-500 dark:hover:text-white/80 transition-colors`}
          aria-label="Work"
        >
          Work
        </Link>

        <Link
          href="/information"
          className={`${pathname === '/information' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-[13px] md:text-[15px] lg:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-slate-500 dark:hover:text-white/80 transition-colors`}
          aria-label="Information"
        >
          Information
        </Link>

        <Link
          href="/search"
          className={`${pathname === '/search' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} text-[13px] md:text-[15px] lg:text-lg font-semibold tracking-normal duration-400 uppercase hover:text-slate-500 dark:hover:text-white/80 transition-colors`}
          aria-label="Search"
        >
          Search
        </Link>
      </nav>
    </header>
  )
}

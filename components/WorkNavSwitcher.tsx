'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { List, Grid2X2, Clock } from 'lucide-react'

const MODES = [
  { href: '/work', id: 'list', icon: <List size={14} />, label: 'List' },
  { href: '/work/spectrum', id: 'spectrum', icon: <Grid2X2 size={14} />, label: 'Grid' },
  { href: '/work/timeline', id: 'timeline', icon: <Clock size={14} />, label: 'Timeline' },
]

const VIEW_ROUTES = ['/work', '/work/spectrum', '/work/timeline']

interface Props {
  visible?: boolean
}

export default function WorkNavSwitcher({ visible = true }: Props) {
  const pathname = usePathname()

  // Auto-hide on project detail pages (/work/[slug])
  const isSlugPage = pathname.startsWith('/work/') && !VIEW_ROUTES.includes(pathname)
  const shouldShow = visible && !isSlugPage

  // const isActive = (href: string) => pathname === href
  const isActiveMode = (href: string, id: string) => {
    // Jika tombol yang dicek adalah LIST, bikin dia aktif di path '/' ATAU '/work'
    if (id.toLowerCase() === 'list') {
      return pathname === '/' || pathname === '/work';
    }

    // Untuk mode lainnya (SPECTRUM, TIMELINE, dll), cek normal sesuai href-nya
    return pathname === href;
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="work-nav-switcher"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40"
        >
          {/* <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xs px-2 py-2">
            {MODES.map(({ href, id, label }) => (
              <Link
                key={id}
                href={href}
                id={`work-nav-${id}`}
                scroll={false}
                aria-current={isActive(href) ? 'page' : undefined}
                aria-label={`Switch to ${label} view`}
                className={`font-normal flex items-center gap-1.5 px-4 py-2 rounded-xs text-xs tracking-widest uppercase transition-all duration-400 ${isActive(href)
                  ? 'dark:bg-white dark:text-slate-900 bg-slate-900 text-white'
                  : 'dark:text-white/40 dark:hover:text-white/80 text-black/40 hover:text-black/80'
                  }`}
              >
                <span className="hidden sm:inline cursor-pointer font-normal">{label}</span>
              </Link>
            ))}
          </div> */}

          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xs px-2 py-2">
            {MODES.map(({ href, id, label }) => {
              // Jalankan fungsi pengecekan dinamis di sini
              const isModeActive = isActiveMode(href, id);

              return (
                <Link
                  key={id}
                  href={href}
                  id={`work-nav-${id}`}
                  scroll={true}
                  onClick={() => {
                    // Reset scroll position when switching views
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    // Also clear any saved scroll position from sessionStorage
                    sessionStorage.removeItem('workScrollY')
                  }}
                  aria-current={isModeActive ? 'page' : undefined}
                  aria-label={`Switch to ${label} view`}
                  className={`font-normal flex items-center gap-1.5 px-4 py-2 rounded-xs text-xs tracking-widest uppercase transition-all duration-400 ${isModeActive
                    ? 'dark:bg-white dark:text-slate-900 bg-slate-900 text-white'
                    : 'dark:text-white/40 dark:hover:text-white/80 text-black/40 hover:text-black/80'
                    }`}
                >
                  <span className="cursor-pointer font-normal">{label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

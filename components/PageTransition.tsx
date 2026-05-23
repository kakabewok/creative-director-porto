'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Elevate the entire stacking context only for the timeline page
  // so the timeline arc (z-60) is guaranteed to stay above the navbar (z-50).
  // For other pages, explicitly set z-0 to prevent inconsistent jumping
  // when Framer Motion removes the opacity inline style.
  const isTimeline = pathname === '/work/timeline'

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={isTimeline ? 'relative z-20' : 'relative z-0'}
        initial={{ opacity: 0.5, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.50 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

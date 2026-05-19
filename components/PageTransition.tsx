'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0.5, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.50}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

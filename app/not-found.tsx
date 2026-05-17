'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <p className="text-white/10 text-[8rem] font-extralight leading-none select-none">
          404
        </p>
        <p className="text-white/30 text-xs tracking-[0.25em] uppercase">
          Page not found
        </p>
        <div className="flex items-center justify-center gap-8 pt-4">
          <Link
            href="/"
            className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
          >
            Work
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Props {
  name: string
  tagline: string
}

export default function HeroClient({ name, tagline }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Attempt autoplay (muted guarantees it works)
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black" aria-label="Hero section">
      {/* Background video — using a free Cloudinary sample */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        preload="auto"
        poster=""
      >
        {/*
          Replace these src values with your Cloudinary video URLs.
          Format: https://res.cloudinary.com/<cloud_name>/video/upload/<public_id>.webm
          Providing webm first (smaller) then mp4 as fallback.
        */}
        <source
          src="https://res.cloudinary.com/demo/video/upload/elephants.webm"
          type="video/webm"
        />
        <source
          src="https://res.cloudinary.com/demo/video/upload/elephants.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"
        aria-hidden="true"
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-white text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.08em] mb-6 leading-none"
        >
          {name}
        </motion.h1>

        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-white/40 text-xs sm:text-sm tracking-[0.22em] uppercase font-light max-w-xs sm:max-w-sm"
          >
            {tagline}
          </motion.p>
        )}

        {/* Subtle scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <Link
            href="/work"
            aria-label="View Work"
            className="text-white/25 text-xs tracking-[0.25em] uppercase hover:text-white/60 transition-colors"
          >
            Work
          </Link>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </main>
  )
}

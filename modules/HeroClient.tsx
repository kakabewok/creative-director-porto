'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Props {
  name: string
  tagline: string
}

export default function HeroClient({ name, tagline }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <>
      {/*
        ── FIXED HERO ──────────────────────────────────────────────────
        position: fixed so it stays in place while the Work section
        scrolls over it. z-index: 0 so Work (z-10) covers it.
      */}
      <section
        className="fixed inset-0 z-0 overflow-hidden bg-black"
        aria-label="Hero section"
      >
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
          disablePictureInPicture
          // @ts-ignore
          disableRemotePlayback
        >
          <source
            src="https://res.cloudinary.com/demo/video/upload/elephants.webm"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/demo/video/upload/elephants.mp4"
            type="video/mp4"
          />
        </video>

        {/* Vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-normal mb-6 leading-none uppercase"
          >
            {name}
          </motion.h1>

          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="text-white/40 text-xs sm:text-sm tracking-[0.22em] uppercase font-light max-w-xs sm:max-w-sm"
            >
              {tagline}
            </motion.p>
          )}

          {/* Scroll cue */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase select-none">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
            />
          </motion.div> */}
        </div>
      </section>

      {/*
        ── SCROLL SPACER ───────────────────────────────────────────────
        This div lives in the normal document flow.
        Its height = 100vh creates the scroll distance the user must
        travel before the Work section begins to appear.
      */}
      <div className="h-screen" aria-hidden="true" />
    </>
  )
}

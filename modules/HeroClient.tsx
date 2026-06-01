'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { UserProfile } from '@/types'
import { mockUser } from '@/data/mock/user'

interface Props {
  user: UserProfile
}

export default function HeroClient({ user }: Props) {
  const [mounted, setMounted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const heroVideo =
    user?.heroVideo?.asset?.url ||
    mockUser.heroVideo?.asset?.url

  const heroPoster =
    user?.heroPoster?.secure_url ||
    mockUser.heroPoster?.secure_url

  useEffect(() => {
    setMounted(true)
  }, [])

  // old
  // useEffect(() => {
  //   if (!mounted) return
  //   const video = videoRef.current
  //   if (!video) return

  //   const attemptPlay = async () => {
  //     try {
  //       video.muted = true
  //       video.defaultMuted = true
  //       await video.play()
  //     } catch (err) {
  //       console.log("Autoplay blocked:", err)
  //     }
  //   }

  //   attemptPlay()
  // }, [mounted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force set
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.muted = true
    video.volume = 0

    video.play().catch(() => { })
  }, [mounted])

  return (
    <>
      <section
        className="fixed inset-0 z-0 overflow-hidden bg-black"
        aria-label="Hero section"
      >
        {/* Background video */}
        {/* old */}
        {/* <motion.video
          ref={videoRef as any}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.2 }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video> */}

        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          // @ts-ignore
          webkit-playsinline=""
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.6 }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Vignette */}
        <div
          className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 pointer-events-none"
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
            {user?.name}
          </motion.h1>

          {user?.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="text-white/40 text-xs sm:text-sm tracking-[0.22em] uppercase font-light max-w-xs sm:max-w-sm"
            >
              {user?.tagline}
            </motion.p>
          )}
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

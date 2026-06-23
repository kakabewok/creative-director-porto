'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserProfile, HeroMedia } from '@/types'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import Image from 'next/image'

interface Props {
  user: UserProfile
  heroMedia: HeroMedia[]
}

export default function HeroClient({ user, heroMedia }: Props) {
  const [mounted, setMounted] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, watchDrag: true },
    [Fade()]
  )

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Ref array for video elements to control playback
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const clearAutoPlayTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startAutoPlayTimer = useCallback(() => {
    clearAutoPlayTimer()
    // Auto advance after 4 seconds for images
    timerRef.current = setTimeout(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 4000)
  }, [emblaApi, clearAutoPlayTimer])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })

    const currentMedia = heroMedia[index]
    if (currentMedia.mediaType === 'video') {
      clearAutoPlayTimer()
      const currentVideo = videoRefs.current[index]
      if (currentVideo) {
        currentVideo.play().catch(() => { })
      }
    } else {
      // It's an image, start timer
      startAutoPlayTimer()
    }
  }, [emblaApi, heroMedia, clearAutoPlayTimer, startAutoPlayTimer])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('pointerDown', clearAutoPlayTimer)
    emblaApi.on('pointerUp', () => {
      // Resume timer if current slide is image
      const index = emblaApi.selectedScrollSnap()
      if (heroMedia[index].mediaType === 'image') {
        startAutoPlayTimer()
      }
    })
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('pointerDown', clearAutoPlayTimer)
      emblaApi.off('pointerUp', () => { })
      clearAutoPlayTimer()
    }
  }, [emblaApi, onSelect, clearAutoPlayTimer, startAutoPlayTimer, heroMedia])

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
  }, [])



  // Handler for when video ends
  const handleVideoEnded = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  return (
    <>
      <section
        className="fixed inset-0 z-0 overflow-hidden bg-black"
        aria-label="Hero section"
      >
        {/* Embla Carousel Viewport */}
        <div className="absolute inset-0 w-full h-full" ref={emblaRef}>
          <div className="flex h-full w-full touch-pan-y">
            {heroMedia.sort((a, b) => a.order - b.order).map((media, index) => (
              <div
                key={media._id}
                className="relative flex-[0_0_100%] min-w-0 h-full w-full"
              >
                {media.mediaType === 'image' && media.image?.secure_url && (
                  <Image
                    src={media.image.secure_url}
                    alt={media.title || 'Hero image'}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                )}
                {media.mediaType === 'video' && media.video?.secure_url && (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                    disablePictureInPicture
                    controlsList="nopictureinpicture"
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                    onEnded={handleVideoEnded}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  >
                    <source src={media.video.secure_url} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
          <AnimatePresence>
            {mounted && selectedIndex === 0 && user?.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="lg:leading-normal text-left text-white/95 text-xl md:text-2xl lg:text-3xl tracking-tighter capitalize font-semibold max-w-full lg:max-w-5xl px-4 whitespace-pre-line drop-shadow-xs "
              >
                "{user?.tagline}"
              </motion.p>
            )}
          </AnimatePresence>
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

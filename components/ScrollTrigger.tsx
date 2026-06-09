'use client'

import { useEffect, useRef } from 'react'

interface Props {
  onActiveChange?: (active: boolean) => void
}

/**
 * ScrollTrigger
 *
 * Renders a zero-height sentinel div.
 * Uses a scroll listener to detect when the sentinel crosses the 70% viewport threshold
 * (i.e., when the Work section covers at least 30% of the screen from the bottom).
 */
export default function ScrollTrigger({ onActiveChange }: Props) {
  const isActiveRef = useRef<boolean>(false)

  useEffect(() => {
    const sentinel = document.getElementById('scroll-route-sentinel')
    if (!sentinel) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sentinel) return
          const rect = sentinel.getBoundingClientRect()

          // Trigger when the top of the work section is at or above 70% of the viewport height
          // (meaning it has scrolled up by at least 30% of the viewport)
          const isAboveThreshold = rect.top <= window.innerHeight * 0.7

          if (isActiveRef.current !== isAboveThreshold) {
            isActiveRef.current = isAboveThreshold
            onActiveChange?.(isAboveThreshold)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [onActiveChange])

  return (
    <div
      id="scroll-route-sentinel"
      aria-hidden="true"
      style={{ height: 0, overflow: 'hidden' }}
    />
  )
}


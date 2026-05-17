'use client'

import { useEffect, useRef } from 'react'

interface Props {
  onActiveChange?: (active: boolean) => void
}

/**
 * ScrollTrigger
 *
 * Renders a zero-height sentinel div.
 * Uses IntersectionObserver to detect when the sentinel crosses the
 * viewport top edge — then calls onActiveChange(true/false) to notify parent state.
 */
export default function ScrollTrigger({ onActiveChange }: Props) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const isActiveRef = useRef<boolean>(false)

  useEffect(() => {
    const sentinel = document.getElementById('scroll-route-sentinel')
    if (!sentinel) return

    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(() => {
        // Sentinel above viewport = work section is covering the hero
        const isAboveViewport =
          !entry.isIntersecting && entry.boundingClientRect.top < 0

        if (isActiveRef.current !== isAboveViewport) {
          isActiveRef.current = isAboveViewport
          onActiveChange?.(isAboveViewport)
        }
      }, 80)
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
      rootMargin: "0px",
    })

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      clearTimeout(debounceRef.current)
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

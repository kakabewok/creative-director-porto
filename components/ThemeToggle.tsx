'use client'

import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme, mounted])

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) return null

  // bottom-16 left-5

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="duration-400 cursor-pointer fixed left-2 top-1/2 -translate-y-1/2 z-60 w-7 h-7 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all text-black dark:text-white shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-[14px] h-[14px] transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <FiMoon className="text-slate-600 w-[14px] h-[14px] transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  )
}

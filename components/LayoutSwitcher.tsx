'use client'

import { motion } from 'framer-motion'
import { List, Grid2X2, Clock } from 'lucide-react'

export type ViewMode = 'list' | 'spectrum' | 'timeline'

interface Props {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

const MODES: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
  { id: 'list', icon: <List size={14} />, label: 'List' },
  { id: 'spectrum', icon: <Grid2X2 size={14} />, label: 'Spectrum' },
  { id: 'timeline', icon: <Clock size={14} />, label: 'Timeline' },
]

export default function LayoutSwitcher({ mode, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md border border-white/8 rounded-xs px-2 py-2">
      {MODES.map(({ id, icon, label }) => (
        <button
          key={id}
          id={`layout-switcher-${id}`}
          onClick={() => onChange(id)}
          aria-pressed={mode === id}
          aria-label={`Switch to ${label} view`}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xs text-xs font-light tracking-widest uppercase transition-all duration-400 ${
            mode === id
              ? 'bg-white text-black'
              : 'text-white/40 hover:text-white/80'
          }`}
        >
          {/* {icon} */}
          <span className="hidden sm:inline cursor-pointer">{label}</span>
        </button>
      ))}
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { Project } from '@/types'
import ScrollTrigger from '@/components/ScrollTrigger'
import WorkListView from '@/modules/WorkListView'
import WorkNavSwitcher from '@/components/WorkNavSwitcher'
import HomeNavbar from '@/components/HomeNavbar'

interface Props {
  projects: Project[]
  mode: 'overlay' | 'standalone'
  view?: 'list'
}

export default function WorkSection({ projects, mode }: Props) {
  const isOverlay = mode === 'overlay'
  const [isWorkActive, setIsWorkActive] = useState(!isOverlay)

  return (
    <div className={isOverlay ? 'relative z-10 bg-white dark:bg-black' : 'bg-white dark:bg-black'}>
      {/* ScrollTrigger only on home overlay — controls nav visibility on scroll */}
      {isOverlay && (
        <ScrollTrigger onActiveChange={setIsWorkActive} />
      )}

      {/* Embedded sticky navbar for overlay mode */}
      {isOverlay && <HomeNavbar />}

      <section id="work" aria-label="Selected work" className="pb-32 min-h-screen">
        <WorkListView projects={projects} />
      </section>

      {/* Floating route-based nav switcher — fades in when work section is active */}
      <WorkNavSwitcher visible={isWorkActive || mode === 'standalone'} />
    </div>
  )
}

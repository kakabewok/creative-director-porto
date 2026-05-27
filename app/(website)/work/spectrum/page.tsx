import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchProjects } from '@/lib/sanity/fetchers'
import WorkSpectrumView from '@/modules/WorkSpectrumView'

export const revalidate = Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600;;

export const metadata: Metadata = {
  title: 'Work — Spectrum',
  description: 'Browse the full spectrum of Rangga Djoned\'s work',
}

export default async function SpectrumPage() {
  const projects = await fetchProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-black" aria-label="Work spectrum view">
      <h1 className="sr-only">Work — Spectrum</h1>
      <section id="work" aria-label="Selected work" className="pb-32 min-h-screen">
        <Suspense fallback={<div className="h-screen bg-white dark:bg-black" />}>
          <WorkSpectrumView projects={projects} />
        </Suspense>
      </section>
    </main>
  )
}

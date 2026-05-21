import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/fetchData'
import WorkSpectrumView from '@/modules/WorkSpectrumView'

export const metadata: Metadata = {
  title: 'Work — Spectrum',
  description: 'Browse the full spectrum of Rangga Djoned\'s work — a grid of cinematic projects spanning videography, branding, photography, and digital campaigns.',
}

export default async function SpectrumPage() {
  const projects = await fetchProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-black" aria-label="Work spectrum view">
      <h1 className="sr-only">Work — Spectrum</h1>
      <section id="work" aria-label="Selected work" className="pb-32 min-h-screen">
        <WorkSpectrumView projects={projects} />
      </section>
    </main>
  )
}

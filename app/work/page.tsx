import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/fetchData'
import WorkClient from '@/modules/WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore the portfolio of Rangga Djoned — a curated collection of cinematic projects spanning videography, branding, photography, and digital campaigns.',
}

export default async function WorkPage() {
  const projects = await fetchProjects()

  return (
    <main className="min-h-screen bg-black pt-24" aria-label="Work page">
      {/* Page heading */}
      <header className="px-6 md:px-10 mb-14">
        <h1 className="sr-only">Work</h1>
        <div className="flex items-center justify-between">
          <p className="text-white/20 text-xs tracking-[0.25em] uppercase">
            {projects.length} Projects
          </p>
        </div>
      </header>

      <WorkClient projects={projects} />
    </main>
  )
}

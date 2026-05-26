import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/sanity/fetchers'
import WorkListView from '@/modules/WorkListView'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore the portfolio of Rangga Djoned — a curated collection of cinematic projects spanning videography, branding, photography, and digital campaigns.',
}

export default async function WorkPage() {
  const projects = await fetchProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-black" aria-label="Work page">
      <h1 className="sr-only">Work</h1>
      <section id="work" aria-label="Selected work" className="pb-32 min-h-screen">
        <WorkListView projects={projects} />
      </section>
    </main>
  )
}

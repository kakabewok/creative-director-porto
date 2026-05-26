import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/sanity/fetchers'
import TimelineView from '@/components/TimelineView'

export const metadata: Metadata = {
  title: 'Work — Timeline',
  description: 'Explore Rangga Djoned\'s work in chronological order — an interactive timeline of cinematic projects across videography, branding, photography, and digital campaigns.',
}

export default async function TimelinePage() {
  const projects = await fetchProjects()

  const sorted = [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <main className="min-h-screen bg-white dark:bg-black" aria-label="Work timeline view">
      <h1 className="sr-only">Work — Timeline</h1>
      <TimelineView projects={sorted} />
    </main>
  )
}

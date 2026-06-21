import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/sanity/fetchers'
import TimelineView from '@/components/TimelineView'
import { getLatestYear } from '@/lib/getLatestYear'

export const metadata: Metadata = {
  title: 'Work — Timeline',
  description: 'Explore Rangga Djoned\'s work in chronological order — an interactive timeline of cinematic projects.',
}

export default async function TimelinePage() {
  const projects = await fetchProjects()

  // Sort by most recent year descending (newest first)
  const sorted = [...projects].sort(
    (a, b) => getLatestYear(b.year) - getLatestYear(a.year)
  )

  return (
    <main className="min-h-screen bg-white dark:bg-black" aria-label="Work timeline view">
      <h1 className="sr-only">Work — Timeline</h1>
      <TimelineView projects={sorted} />
    </main>
  )
}

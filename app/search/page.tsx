import type { Metadata } from 'next'
import { fetchProjects } from '@/lib/fetchData'
import SearchClient from '@/modules/SearchClient'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search and explore the portfolio of Rangga Djoned by title, category, or year.',
}

export default async function SearchPage() {
  const projects = await fetchProjects()

  return (
    <>
      <main aria-label="Search page">
        <h1 className="sr-only">Search</h1>
        <SearchClient projects={projects} />
      </main>
    </>
  )
}

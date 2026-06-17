import type { Metadata } from 'next'
import { fetchUser, fetchProjects, fetchHeroMedia } from '@/lib/sanity/fetchers'
import HeroClient from '@/modules/HeroClient'
import WorkSection from '@/modules/WorkSection'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Rangga Djoned - Creative Director',
  description:
    'Portfolio of Rangga Djoned - Creative Director based in Jakarta, Indonesia.',
}

// read scroll tiger

export default async function HomePage() {
  const [user, projects, heroMedia] = await Promise.all([fetchUser(), fetchProjects(), fetchHeroMedia()])

  return (
    <main>
      <HeroClient user={user} heroMedia={heroMedia} />
      <WorkSection projects={projects} mode="overlay" view="list" />
    </main>
  )
}

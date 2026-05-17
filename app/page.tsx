import type { Metadata } from 'next'
import { fetchUser, fetchProjects } from '@/lib/fetchData'
import HeroClient from '@/modules/HeroClient'
import HomeWorkSection from '@/modules/HomeWorkSection'

export const metadata: Metadata = {
  title: 'Rangga Djoned — Creative Director & Visual Storyteller',
  description:
    'Portfolio of Rangga Djoned — Creative Director & Visual Storyteller based in Jakarta, Indonesia.',
}

export default async function HomePage() {
  const [user, projects] = await Promise.all([fetchUser(), fetchProjects()])

  return (
    <main>
      <HeroClient name={user.name} tagline={user.tagline ?? ''} />
      <HomeWorkSection projects={projects} />
    </main>
  )
}

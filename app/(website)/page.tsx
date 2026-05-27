import type { Metadata } from 'next'
import { fetchUser, fetchProjects } from '@/lib/sanity/fetchers'
import HeroClient from '@/modules/HeroClient'
import WorkSection from '@/modules/WorkSection'
import Navbar from '@/components/Navbar'

export const revalidate = Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600;;

export const metadata: Metadata = {
  title: 'Rangga Djoned — Creative Director',
  description:
    'Portfolio of Rangga Djoned — Creative Director based in Jakarta, Indonesia.',
}

export default async function HomePage() {
  const [user, projects] = await Promise.all([fetchUser(), fetchProjects()])

  return (
    <>
      <Navbar />
      <main>
        <HeroClient user={user} />
        <WorkSection projects={projects} mode="overlay" view="list" />
      </main>
    </>

  )
}

import type { Metadata } from 'next'
import { fetchUser } from '@/lib/fetchData'
import HeroClient from '@/modules/HeroClient'

export const metadata: Metadata = {
  title: 'Rangga Djoned — Creative Director & Visual Storyteller',
  description:
    'Portfolio of Rangga Djoned — Creative Director & Visual Storyteller based in Jakarta, Indonesia.',
}

export default async function HomePage() {
  const user = await fetchUser()

  return (
    <HeroClient
      name={user.name}
      tagline={user.tagline ?? ''}
    />
  )
}

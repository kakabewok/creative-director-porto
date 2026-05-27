import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchProjectBySlug, fetchProjects } from '@/lib/sanity/fetchers'
import ProjectDetailClient from '@/modules/ProjectDetailClient'

export const revalidate = Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600;;

export async function generateStaticParams() {
  const projects = await fetchProjects()
  return projects.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata(
  props: PageProps<'/work/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const project = await fetchProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  const ogImage = project.coverImage?.secure_url
    ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80'

  function portableTextToPlain(blocks: any[] = []): string {
    return blocks.map(b => b.children?.map((c: any) => c.text).join('') ?? '').join(' ')
  }

  const plainDescription = portableTextToPlain(project.description).slice(0, 160) ||
    (project.role ? `${project.title} — ${project.role} (${project.year ?? ''})` : project.title);

  return {
    title: project.title,
    description: plainDescription,
    openGraph: {
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  }
}

export default async function ProjectDetailPage(
  props: PageProps<'/work/[slug]'>
) {
  const { slug } = await props.params
  const [project, allProjects] = await Promise.all([
    fetchProjectBySlug(slug),
    fetchProjects(),
  ])

  if (!project) notFound()

  return (
    <main aria-label={`Project: ${project.title}`}>
      <ProjectDetailClient project={project} allProjects={allProjects} />
    </main>
  )
}

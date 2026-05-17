import type { Metadata, PageProps } from 'next'
import { notFound } from 'next/navigation'
import { fetchProjectBySlug, fetchProjects } from '@/lib/fetchData'
import ProjectDetailClient from '@/modules/ProjectDetailClient'

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

  return {
    title: project.title,
    description: project.role
      ? `${project.title} — ${project.role} (${project.year ?? ''})`
      : project.title,
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

import { sanityClient } from '@/sanity/client'
import { userQuery, projectsQuery, projectBySlugQuery } from '@/sanity/queries'
import { mockUser } from '@/data/mock/user'
import { mockProjects } from '@/data/mock/projects'
import type { UserProfile, Project } from '@/types'

// ─────────────────────────────────────────
// Fetch user profile — fallback to mock
// ─────────────────────────────────────────
export async function fetchUser(): Promise<UserProfile> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'placeholder') {
    return mockUser
  }

  try {
    const data = await sanityClient.fetch<UserProfile>(userQuery)
    if (!data) return mockUser
    return data
  } catch {
    return mockUser
  }
}

// ─────────────────────────────────────────
// Fetch all projects — fallback to mock
// ─────────────────────────────────────────
export async function fetchProjects(): Promise<Project[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'placeholder') {
    return mockProjects
  }

  try {
    const data = await sanityClient.fetch<Project[]>(projectsQuery)
    if (!data || data.length === 0) return mockProjects
    return data
  } catch {
    return mockProjects
  }
}

// ─────────────────────────────────────────
// Fetch single project by slug — fallback to mock
// ─────────────────────────────────────────
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'placeholder') {
    return mockProjects.find((p) => p.slug.current === slug) ?? null
  }

  try {
    const data = await sanityClient.fetch<Project>(projectBySlugQuery, { slug })
    if (!data) {
      return mockProjects.find((p) => p.slug.current === slug) ?? null
    }
    return data
  } catch {
    return mockProjects.find((p) => p.slug.current === slug) ?? null
  }
}

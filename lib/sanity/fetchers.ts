import { sanityClient } from "./client"
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY, USER_QUERY } from "./queries"
import { mockProjects } from "@/data/mock/projects"
import { mockUser } from "@/data/mock/user"
import { Project, UserProfile } from "@/types"

export async function fetchProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await sanityClient.fetch<Project[]>(PROJECTS_QUERY, {},
      {
        next: {
          revalidate: Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600,
          tags: ['projects']
        }
      })
    return sanityProjects?.length > 0 ? sanityProjects : mockProjects as any
  } catch (error) {
    console.error("Failed to fetch projects from Sanity, using mock data", error)
    return mockProjects as any
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await sanityClient.fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug },
      {
        next: {
          revalidate: Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600,
          tags: ['projects']
        }
      })
    return project || (mockProjects.find((p) => p.slug.current === slug) as any) || null
  } catch (error) {
    console.error(`Failed to fetch project ${slug} from Sanity, using mock data`, error)
    return (mockProjects.find((p) => p.slug.current === slug) as any) || null
  }
}

export async function fetchUser(): Promise<UserProfile> {
  try {
    const user = await sanityClient.fetch<UserProfile>(USER_QUERY, {},
      {
        next: {
          revalidate: Number(process.env.NEXT_PUBLIC_PROJECT_REVALIDATE_TIME) || 3600,
          tags: ['user']
        }
      })
    return user || mockUser as any
  } catch (error) {
    console.error("Failed to fetch user from Sanity, using mock data", error)
    return mockUser as any
  }
}

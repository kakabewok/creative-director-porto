// GROQ queries for Sanity

export const userQuery = `*[_type == "user"][0]{
  _id,
  name,
  profileImage{
    asset,
    alt
  },
  tagline,
  aboutText,
  email,
  socialLinks[]{
    _key,
    platform,
    url,
    icon
  },
  experienceHighlights[]{
    _key,
    role,
    company,
    year,
    description
  }
}`

export const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt desc)[0...50]{
  _id,
  title,
  slug,
  description,
  role,
  category,
  year,
  coverImage{
    asset,
    alt
  },
  coverVideoUrl,
  gallery[]{
    _key,
    type,
    image{
      asset,
      alt
    },
    videoUrl,
    caption
  },
  featured,
  order
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  role,
  category,
  year,
  coverImage{
    asset,
    alt
  },
  coverVideoUrl,
  gallery[]{
    _key,
    type,
    image{
      asset,
      alt
    },
    videoUrl,
    caption
  },
  featured,
  order
}`

export const categoriesQuery = `*[_type == "project"]{
  category
}`

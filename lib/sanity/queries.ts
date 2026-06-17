import groq from "groq"

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    year,
    category,
    role,
    description,
    coverImage {
      secure_url,
      public_id,
      width,
      height
    },
    "coverVideo": coverVideoUrl,
    gallery[] {
      _key,
      type,
      image {
        secure_url,
        public_id,
        width,
        height
      },
      videoUrl,
      caption
    },
    "is_selected": featured
  }
`

export const USER_QUERY = groq`*[_type == "user"][0]{
  _id,
  name,
  profileImage {
    secure_url,
    public_id,
    width,
    height
  },
  heroVideo{
    asset->{
      url
    }
  },
  heroPoster {
    secure_url,
    public_id,
    width,
    height
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

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    category,
    role,
    description,
    coverImage {
      secure_url,
      public_id,
      width,
      height
    },
    "coverVideo": coverVideoUrl,
    gallery[] {
      _key,
      type,
      image {
        secure_url,
        public_id,
        width,
        height
      },
      videoUrl,
      caption
    },
    "is_selected": featured
  }
`

export const HERO_MEDIA_QUERY = groq`
  *[_type == "heroMedia" && isActive == true] | order(order asc) {
    _id,
    title,
    mediaType,
    image {
      secure_url,
      public_id,
      width,
      height
    },
    videoUrl,
    order,
    isActive
  }
`


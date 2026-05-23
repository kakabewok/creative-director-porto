// sanity/schemas/user.ts
// ─────────────────────────────────────────────────
// User profile schema — matches UserProfile TypeScript type exactly.

export const userSchema = {
  name: 'user',
  title: 'User Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'heroVideo',
      title: 'Hero Opening Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Fullscreen looping hero background video',
    },
    {
      name: 'heroPoster',
      title: 'Hero Video Poster',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short slogan that appears under your name on the homepage.',
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      rows: 6,
      description: 'Biography / about text. Use double line breaks for paragraphs.',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Icon Key',
              type: 'string',
              description: 'Lowercase platform name: instagram, behance, linkedin, pinterest, youtube, vimeo, twitter',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    },
    {
      name: 'experienceHighlights',
      title: 'Experience Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'year', title: 'Year / Period', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'role', subtitle: 'company' },
          },
        },
      ],
    },
  ],
}

// sanity/schemas/user.ts
// ─────────────────────────────────────────────────
// User profile schema — uses cloudinaryImage for image fields.

import { cloudinaryAssetSourcePlugin } from "sanity-plugin-cloudinary";

export const userSchema = {
  name: 'user',
  title: 'User Profile',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'cloudinary.asset',
      group: 'media',
      options: {
        sources: [cloudinaryAssetSourcePlugin],
        cloudinary: {
          folder: 'portofolio/profile',
          uploadPreset: 'porto-rd-preset'
        }
      }
    },
    {
      name: 'videoHero',
      title: 'Hero Video',
      type: 'cloudinary.asset',
      group: 'media',
      description: 'Upload the video that will be played in the background of the hero section. Video must be silent and the duration is max 10 second.'
    },
    // {
    //   name: 'heroPoster',
    //   title: 'Hero Video Poster',
    //   type: 'cloudinary.asset',
    //   group: 'media',
    // },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      description: 'Short slogan that appears under your name on the homepage.',
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      rows: 6,
      group: 'basic',
      description: 'Biography / about text. Use double line breaks for paragraphs.',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'basic',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Add your social media links like Instagram, LinkedIn, Pinterest, etc. In the icon key, use the lowercase platform name.',
      type: 'array',
      group: 'basic',
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
    // {
    //   name: 'experienceHighlights',
    //   title: 'Experience Highlights',
    //   type: 'array',
    //   group: 'basic',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         { name: 'role', title: 'Role', type: 'string' },
    //         { name: 'company', title: 'Company', type: 'string' },
    //         { name: 'year', title: 'Year / Period', type: 'string' },
    //         { name: 'description', title: 'Description', type: 'text', rows: 3 },
    //       ],
    //       preview: {
    //         select: { title: 'role', subtitle: 'company' },
    //       },
    //     },
    //   ],
    // },
  ],
}

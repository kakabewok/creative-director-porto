// sanity/schemas/project.ts
// ─────────────────────────────────────────────────
// Project schema — uses cloudinaryImage for all image fields.

export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [
    {
      title: 'Order Priority',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'order',
      title: 'Order Priority',
      type: 'number',
      description: 'Lower number = appears first. Leave blank to sort by creation date.',
      initialValue: 99,
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g. Creative Director, Art Director, Photographer',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Videography', value: 'Videography' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Photography', value: 'Photography' },
          { title: 'Digital Campaign', value: 'Digital Campaign' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'cloudinary.asset',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverVideoUrl',
      title: 'Cover Video URL',
      type: 'url',
      description: 'Optional YouTube or Vimeo URL used as the hero video.',
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Item',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'cloudinary.asset',
              hidden: ({ parent }: { parent: { type?: string } }) =>
                parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube or Vimeo URL.',
              hidden: ({ parent }: { parent: { type?: string } }) =>
                parent?.type !== 'video',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'caption', subtitle: 'type' },
            prepare({ title, subtitle }: any) {
              return { title: title ?? subtitle }
            },
          },
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured to highlight this project.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
}

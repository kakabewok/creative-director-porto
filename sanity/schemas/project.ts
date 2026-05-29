export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'media', title: 'Media' },
  ],
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
      group: 'basic',
      description: 'Lower number = appears first. Leave blank to sort by creation date.',
      // initialValue: 99,
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'title', maxLength: 96 },
      description: 'Used for the URL of the project page. Generated from title.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'array',
      group: 'basic',
      description: 'Used for the project page. Supports rich text including links.',
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
      group: 'basic',
      description: 'e.g. Creative Director, Art Director, Photographer, etc.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Creative Direction', value: 'Creative Direction' },
          { title: 'Branding & Identity', value: 'Branding' },
          { title: 'Digital Campaigns', value: 'Digital Campaign' },
          { title: 'Commercials / Film', value: 'Commercials' },
          { title: 'Photography', value: 'Photography' },
          { title: 'Videography', value: 'Videography' },
          { title: 'Experiential / Spatial', value: 'Experiential' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'basic',
      description: 'e.g. 2024',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'cloudinary.asset',
      group: 'media',
      description: 'Used for the cover image of the project.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverVideoUrl',
      title: 'Cover Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Vimeo URL used as the hero video in the project page. Optional.',
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'media',
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
      group: 'basic',
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

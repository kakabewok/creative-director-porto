import { defineField, defineType } from 'sanity'

export const heroMediaSchema = defineType({
  name: 'heroMedia',
  title: 'Hero Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this media item',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'cloudinary.asset',
      description: 'Select an image from Cloudinary',
      hidden: ({ document }) => document?.mediaType !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Enter the URL of the video (e.g. Cloudinary MP4 URL)',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this media appears in the carousel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this media in the carousel',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, mediaType, isActive, order }) {
      return {
        title: title || 'Untitled',
        subtitle: `[${order}] ${mediaType} - ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})

import type { Project } from '@/types'

/**
 * Placeholder images from Unsplash (free, no auth required).
 * These are used as stand-ins until real Sanity assets are uploaded.
 * The _ref field uses a real Unsplash URL instead of a Sanity asset ref,
 * so we handle it directly in the image components as a fallback src.
 */

export const PLACEHOLDER_IMAGES: Record<string, string> = {
  'proj-1': 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80&auto=format&fit=crop',
  'proj-2': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop',
  'proj-3': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
  'proj-4': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80&auto=format&fit=crop',
  'proj-5': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80&auto=format&fit=crop',
  'proj-6': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop',
  'proj-7': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80&auto=format&fit=crop',
  'proj-8': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80&auto=format&fit=crop',
  'proj-9': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop',
  'proj-10': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-11': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-12': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-13': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-14': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-15': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
  'proj-16': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&auto=format&fit=crop',
}

export const mockProjects: Project[] = [
  {
    _id: 'proj-1',
    title: 'Ephemeral Light',
    slug: { current: 'ephemeral-light' },
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'A cinematic exploration of light and shadow across the Indonesian archipelago. Shot over twelve months, this series captures the fleeting moments between dusk and dark — when the world holds its breath.',
          },
        ],
      },
    ],
    role: 'Creative Director & Cinematographer',
    category: 'Videography',
    year: '2024',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-1', _type: 'reference' },
      alt: 'Golden light filtering through bamboo forest',
    },
    coverVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    gallery: [
      {
        _key: 'g1',
        type: 'image',
        image: {
          _type: 'image',
          asset: { _ref: 'image-ref-g1', _type: 'reference' },
          alt: 'Misty mountain sunrise',
        },
      },
      {
        _key: 'g2',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        caption: 'Behind the scenes — golden hour shoot',
      },
      {
        _key: 'g3',
        type: 'image',
        image: {
          _type: 'image',
          asset: { _ref: 'image-ref-g3', _type: 'reference' },
          alt: 'Silhouette against volcanic skyline',
        },
      },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'proj-2',
    title: 'Archipelago Drift',
    slug: { current: 'archipelago-drift' },
    description: [
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'A documentary portrait of island life — fishermen, weavers, and the rituals that bind communities to their ancestral seas. Raw, intimate, and unflinching.',
          },
        ],
      },
    ],
    role: 'Director & Photographer',
    category: 'Photography',
    year: '2023',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-2', _type: 'reference' },
      alt: 'Fisherman silhouette at dawn over calm waters',
    },
    gallery: [],
    featured: true,
    order: 2,
  },
  {
    _id: 'proj-3',
    title: 'Void Identity',
    slug: { current: 'void-identity' },
    description: [
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's3',
            text: 'Brand identity system for a luxury fashion label rooted in minimalism and negative space. Every mark, every weight, every silence was intentional.',
          },
        ],
      },
    ],
    role: 'Brand Director',
    category: 'Branding',
    year: '2023',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-3', _type: 'reference' },
      alt: 'Clean monochrome brand mark on textured paper',
    },
    gallery: [],
    featured: false,
    order: 3,
  },
  {
    _id: 'proj-4',
    title: 'Pulse Campaign',
    slug: { current: 'pulse-campaign' },
    description: [
      {
        _type: 'block',
        _key: 'b4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's4',
            text: '360° digital campaign for a global beverage brand entering the Southeast Asian market. Integrated strategy, motion graphics, and social-first storytelling.',
          },
        ],
      },
    ],
    role: 'Creative Director',
    category: 'Digital Campaign',
    year: '2022',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-4', _type: 'reference' },
      alt: 'Vibrant campaign visual with bold typography',
    },
    gallery: [],
    featured: false,
    order: 4,
  },
  {
    _id: 'proj-5',
    title: 'Sacred Geometry',
    slug: { current: 'sacred-geometry' },
    description: [
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's5',
            text: 'An architectural photography series exploring the intersection of traditional Javanese temple design and modernist geometry.',
          },
        ],
      },
    ],
    role: 'Photographer',
    category: 'Photography',
    year: '2022',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-5', _type: 'reference' },
      alt: 'Dramatic aerial view of Borobudur temple at dawn',
    },
    gallery: [],
    featured: false,
    order: 5,
  },
  {
    _id: 'proj-6',
    title: 'Resonance',
    slug: { current: 'resonance' },
    description: [
      {
        _type: 'block',
        _key: 'b6',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's6',
            text: 'A music video for a leading Indonesian indie artist — blending analogue film textures with digital compositing to create something hauntingly timeless.',
          },
        ],
      },
    ],
    role: 'Director & Editor',
    category: 'Videography',
    year: '2021',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-6', _type: 'reference' },
      alt: 'Artist silhouette in grainy film aesthetic',
    },
    coverVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    gallery: [],
    featured: false,
    order: 6,
  },
  {
    _id: 'proj-7',
    title: 'Terra Firma',
    slug: { current: 'terra-firma' },
    description: [
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's7',
            text: 'Visual identity and campaign for a sustainable agriculture brand. Earthy, raw, and rooted in truth.',
          },
        ],
      },
    ],
    role: 'Art Director',
    category: 'Branding',
    year: '2021',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-7', _type: 'reference' },
      alt: 'Hands holding soil with brand mark embossed',
    },
    gallery: [],
    featured: false,
    order: 7,
  },
  {
    _id: 'proj-8',
    title: 'Night Market',
    slug: { current: 'night-market' },
    description: [
      {
        _type: 'block',
        _key: 'b8',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's8',
            text: 'Street photography across the night markets of Java — steam, neon, laughter, and the quiet dignity of ordinary life after dark.',
          },
        ],
      },
    ],
    role: 'Photographer',
    category: 'Photography',
    year: '2020',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-8', _type: 'reference' },
      alt: 'Neon-lit street food stall with bokeh crowd',
    },
    gallery: [],
    featured: false,
    order: 8,
  },
  {
    _id: 'proj-9',
    title: 'Liminal Spaces',
    slug: { current: 'liminal-spaces' },
    description: [
      {
        _type: 'block',
        _key: 'b9',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's9',
            text: 'A short film about in-between moments — airports, corridors, waiting rooms. Places designed for passing through, never for staying.',
          },
        ],
      },
    ],
    role: 'Director',
    category: 'Videography',
    year: '2020',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-9', _type: 'reference' },
      alt: 'Empty airport terminal with long perspective lines',
    },
    gallery: [],
    featured: false,
    order: 9,
  },
  {
    _id: 'proj-10',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-11',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-12',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-13',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-14',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-15',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
  {
    _id: 'proj-16',
    title: 'After the Rain',
    slug: { current: 'after-the-rain' },
    description: [
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's10',
            text: 'Editorial fashion photography shot in the aftermath of a Javanese monsoon — wet streets, grey skies, and the strange beauty of what storms leave behind.',
          },
        ],
      },
    ],
    role: 'Photographer & Creative Director',
    category: 'Photography',
    year: '2019',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-ref-10', _type: 'reference' },
      alt: 'Fashion editorial on reflective wet pavement',
    },
    gallery: [],
    featured: false,
    order: 10,
  },
]

import type { Project } from '@/types'

/**
 * Placeholder images from Unsplash (free, no auth required).
 * These are used as stand-ins until real Sanity assets are uploaded.
 * The _ref field uses a real Unsplash URL instead of a Sanity asset ref,
 * so we handle it directly in the image components as a fallback src.
 */

export const PLACEHOLDER_IMAGES: Record<string, string> = {
  'proj-1': 'https://images.unsplash.com/photo-1536240478700-b869ad10e2f4?w=1200&q=80',
  'proj-2': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
  'proj-3': 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80',
  'proj-4': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
  'proj-5': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
  'proj-6': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80',
  'proj-7': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80',
  'proj-8': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
  'proj-9': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80',
  'proj-10': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
  'proj-11': 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1200&q=80',
  'proj-12': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
  'proj-13': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
  'proj-14': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'proj-15': 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=1200&q=80',
  'proj-16': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
  'proj-17': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
  'proj-18': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'proj-19': 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&q=80',
  'proj-20': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
  'proj-21': 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80',
  'proj-22': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80',
  'proj-23': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
  'proj-24': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  'proj-25': 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&q=80',
  'proj-26': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'proj-27': 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&q=80',
  'proj-28': 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80',
  'proj-29': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
  'proj-30': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  'proj-31': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  'proj-32': 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80',
  'proj-33': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
  'proj-34': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
  'proj-35': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
}

export const mockProjects: Project[] = [
  {
    _id: 'proj-2',
    title: 'Archipelago Drift',
    slug: { current: 'archipelago-drift' },
    description: [
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'A visual diary of coastal communities and maritime traditions.' }],
      }
    ],
    role: 'Lead Photographer',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-2'], public_id: 'mock-cover-2' },
    gallery: [
        { _key: 'g2-0', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80', public_id: 'mock-2-0' } },
        { _key: 'g2-1', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80', public_id: 'mock-2-1' } },
        { _key: 'g2-2', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80', public_id: 'mock-2-2' } },
        { _key: 'g2-3', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', public_id: 'mock-2-3' } }
      ] as any,
    is_selected: true,
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
        children: [{ _type: 'span', _key: 's3', text: 'A minimalist brand identity system designed for a contemporary art gallery.' }],
      }
    ],
    role: 'Art Director',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-3'], public_id: 'mock-cover-3' },
    gallery: [
        { _key: 'g3-0', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80', public_id: 'mock-3-0' } },
        { _key: 'g3-1', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80', public_id: 'mock-3-1' } },
        { _key: 'g3-v', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' }
      ] as any,
    is_selected: true,
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
        children: [{ _type: 'span', _key: 's4', text: 'An energetic social media campaign driving engagement for a fitness app.' }],
      }
    ],
    role: 'Campaign Director',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-4'], public_id: 'mock-cover-4' },
    gallery: [
        { _key: 'g4-0', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80', public_id: 'mock-4-0' } },
        { _key: 'g4-1', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80', public_id: 'mock-4-1' } },
        { _key: 'g4-2', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=1200&q=80', public_id: 'mock-4-2' } }
      ] as any,
    is_selected: true,
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
        children: [{ _type: 'span', _key: 's5', text: 'Exploring the mathematical perfection in nature and architecture.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-5'], public_id: 'mock-cover-5' },
    gallery: [
        { _key: 'g5-0', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80', public_id: 'mock-5-0' } },
        { _key: 'g5-1', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1200&q=80', public_id: 'mock-5-1' } },
        { _key: 'g5-2', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80', public_id: 'mock-5-2' } },
        { _key: 'g5-3', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80', public_id: 'mock-5-3' } }
      ] as any,
    is_selected: true,
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
        children: [{ _type: 'span', _key: 's6', text: 'An audiovisual journey through soundscapes and architectural forms.' }],
      }
    ],
    role: 'Director',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-6'], public_id: 'mock-cover-6' },
    gallery: [
        { _key: 'g6-0', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80', public_id: 'mock-6-0' } },
        { _key: 'g6-1', type: 'image', image: { secure_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80', public_id: 'mock-6-1' } }
      ] as any,
    is_selected: true,
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
        children: [{ _type: 'span', _key: 's7', text: 'Complete brand overhaul for an eco-conscious lifestyle brand.' }],
      }
    ],
    role: 'Brand Designer',
    categories: [],
    year: '2024',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-7'], public_id: 'mock-cover-7' },
    gallery: [] as any,
    is_selected: false,
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
        children: [{ _type: 'span', _key: 's8', text: 'Street photography series capturing the vibrant energy of night markets.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-8'], public_id: 'mock-cover-8' },
    gallery: [] as any,
    is_selected: false,
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
        children: [{ _type: 'span', _key: 's9', text: 'A short film exploring the transitional moments in everyday life.' }],
      }
    ],
    role: 'Director of Photography',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-9'], public_id: 'mock-cover-9' },
    gallery: [] as any,
    is_selected: false,
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
        children: [{ _type: 'span', _key: 's10', text: 'A moody, reflective photography series shot exclusively during the monsoon season.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-10'], public_id: 'mock-cover-10' },
    gallery: [] as any,
    is_selected: false,
    order: 10,
  },
  {
    _id: 'proj-11',
    title: 'Vertigo',
    slug: { current: 'vertigo' },
    description: [
      {
        _type: 'block',
        _key: 'b11',
        style: 'normal',
        children: [{ _type: 'span', _key: 's11', text: 'A high-impact social media campaign designed for the upcoming music festival season.' }],
      }
    ],
    role: 'Campaign Manager',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-11'], public_id: 'mock-cover-11' },
    gallery: [] as any,
    is_selected: false,
    order: 11,
  },
  {
    _id: 'proj-12',
    title: 'Daybreak',
    slug: { current: 'daybreak' },
    description: [
      {
        _type: 'block',
        _key: 'b12',
        style: 'normal',
        children: [{ _type: 'span', _key: 's12', text: 'A sensitive and inspiring awareness campaign focusing on mental health.' }],
      }
    ],
    role: 'Creative Director',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-12'], public_id: 'mock-cover-12' },
    gallery: [] as any,
    is_selected: false,
    order: 12,
  },
  {
    _id: 'proj-13',
    title: 'Frequency',
    slug: { current: 'frequency' },
    description: [
      {
        _type: 'block',
        _key: 'b13',
        style: 'normal',
        children: [{ _type: 'span', _key: 's13', text: 'Music documentary exploring the underground electronic music scene in Jakarta.' }],
      }
    ],
    role: 'Director',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-13'], public_id: 'mock-cover-13' },
    gallery: [] as any,
    is_selected: false,
    order: 13,
  },
  {
    _id: 'proj-14',
    title: 'Meridian',
    slug: { current: 'meridian' },
    description: [
      {
        _type: 'block',
        _key: 'b14',
        style: 'normal',
        children: [{ _type: 'span', _key: 's14', text: 'High fashion editorial shot in a desert landscape showcasing the summer collection.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2023',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-14'], public_id: 'mock-cover-14' },
    gallery: [] as any,
    is_selected: false,
    order: 14,
  },
  {
    _id: 'proj-15',
    title: 'Obsidian',
    slug: { current: 'obsidian' },
    description: [
      {
        _type: 'block',
        _key: 'b15',
        style: 'normal',
        children: [{ _type: 'span', _key: 's15', text: 'A sleek, premium brand identity designed for a new luxury watch brand.' }],
      }
    ],
    role: 'Art Director',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-15'], public_id: 'mock-cover-15' },
    gallery: [] as any,
    is_selected: false,
    order: 15,
  },
  {
    _id: 'proj-16',
    title: 'Kasa Studio',
    slug: { current: 'kasa-studio' },
    description: [
      {
        _type: 'block',
        _key: 'b16',
        style: 'normal',
        children: [{ _type: 'span', _key: 's16', text: 'A dynamic creative agency brand system with flexible modular assets.' }],
      }
    ],
    role: 'Creative Director',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-16'], public_id: 'mock-cover-16' },
    gallery: [] as any,
    is_selected: false,
    order: 16,
  },
  {
    _id: 'proj-17',
    title: 'Senja Collective',
    slug: { current: 'senja-collective' },
    description: [
      {
        _type: 'block',
        _key: 'b17',
        style: 'normal',
        children: [{ _type: 'span', _key: 's17', text: 'A short documentary film highlighting the fishermen community at dusk along the coastal villages.' }],
      }
    ],
    role: 'Cinematographer',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-17'], public_id: 'mock-cover-17' },
    gallery: [] as any,
    is_selected: false,
    order: 17,
  },
  {
    _id: 'proj-18',
    title: 'Kintsugi',
    slug: { current: 'kintsugi' },
    description: [
      {
        _type: 'block',
        _key: 'b18',
        style: 'normal',
        children: [{ _type: 'span', _key: 's18', text: 'An intimate portrait series documenting the aging craftsmen of Java.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-18'], public_id: 'mock-cover-18' },
    gallery: [] as any,
    is_selected: false,
    order: 18,
  },
  {
    _id: 'proj-19',
    title: 'Hutan',
    slug: { current: 'hutan' },
    description: [
      {
        _type: 'block',
        _key: 'b19',
        style: 'normal',
        children: [{ _type: 'span', _key: 's19', text: 'An eco-tourism brand identity for a sustainable resort in Borneo.' }],
      }
    ],
    role: 'Art Director',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-19'], public_id: 'mock-cover-19' },
    gallery: [] as any,
    is_selected: false,
    order: 19,
  },
  {
    _id: 'proj-20',
    title: 'Current',
    slug: { current: 'current' },
    description: [
      {
        _type: 'block',
        _key: 'b20',
        style: 'normal',
        children: [{ _type: 'span', _key: 's20', text: 'A vibrant digital campaign capturing the essence of a surf lifestyle brand.' }],
      }
    ],
    role: 'Campaign Director',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-20'], public_id: 'mock-cover-20' },
    gallery: [] as any,
    is_selected: false,
    order: 20,
  },
  {
    _id: 'proj-21',
    title: 'Undercurrent',
    slug: { current: 'undercurrent' },
    description: [
      {
        _type: 'block',
        _key: 'b21',
        style: 'normal',
        children: [{ _type: 'span', _key: 's21', text: 'An underwater fashion film promoting ocean conservation and sustainable practices.' }],
      }
    ],
    role: 'Director & Editor',
    categories: [],
    year: '2022',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-21'], public_id: 'mock-cover-21' },
    gallery: [] as any,
    is_selected: false,
    order: 21,
  },
  {
    _id: 'proj-22',
    title: 'Bloom',
    slug: { current: 'bloom' },
    description: [
      {
        _type: 'block',
        _key: 'b22',
        style: 'normal',
        children: [{ _type: 'span', _key: 's22', text: 'Botanical editorial highlighting the unique and endangered flora of Kalimantan.' }],
      }
    ],
    role: 'Lead Photographer',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-22'], public_id: 'mock-cover-22' },
    gallery: [] as any,
    is_selected: false,
    order: 22,
  },
  {
    _id: 'proj-23',
    title: 'Lumen',
    slug: { current: 'lumen' },
    description: [
      {
        _type: 'block',
        _key: 'b23',
        style: 'normal',
        children: [{ _type: 'span', _key: 's23', text: 'A modern and radiant lighting design studio identity system.' }],
      }
    ],
    role: 'Lead Designer',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-23'], public_id: 'mock-cover-23' },
    gallery: [] as any,
    is_selected: false,
    order: 23,
  },
  {
    _id: 'proj-24',
    title: 'Zero',
    slug: { current: 'zero' },
    description: [
      {
        _type: 'block',
        _key: 'b24',
        style: 'normal',
        children: [{ _type: 'span', _key: 's24', text: 'A futuristic launch campaign for a new Electric Vehicle (EV) automotive brand.' }],
      }
    ],
    role: 'Creative Director',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-24'], public_id: 'mock-cover-24' },
    gallery: [] as any,
    is_selected: false,
    order: 24,
  },
  {
    _id: 'proj-25',
    title: 'Kinetic',
    slug: { current: 'kinetic' },
    description: [
      {
        _type: 'block',
        _key: 'b25',
        style: 'normal',
        children: [{ _type: 'span', _key: 's25', text: 'A high-octane motorsport brand film focusing on speed, motion, and precision.' }],
      }
    ],
    role: 'Director',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-25'], public_id: 'mock-cover-25' },
    gallery: [] as any,
    is_selected: false,
    order: 25,
  },
  {
    _id: 'proj-26',
    title: 'Raw',
    slug: { current: 'raw' },
    description: [
      {
        _type: 'block',
        _key: 'b26',
        style: 'normal',
        children: [{ _type: 'span', _key: 's26', text: 'A documentary series capturing the authentic and unvarnished street life of Jakarta.' }],
      }
    ],
    role: 'Documentary Photographer',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-26'], public_id: 'mock-cover-26' },
    gallery: [] as any,
    is_selected: false,
    order: 26,
  },
  {
    _id: 'proj-27',
    title: 'Nuvola',
    slug: { current: 'nuvola' },
    description: [
      {
        _type: 'block',
        _key: 'b27',
        style: 'normal',
        children: [{ _type: 'span', _key: 's27', text: 'Playful yet premium coffee brand packaging and visual identity.' }],
      }
    ],
    role: 'Art Director',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-27'], public_id: 'mock-cover-27' },
    gallery: [] as any,
    is_selected: false,
    order: 27,
  },
  {
    _id: 'proj-28',
    title: 'Echo',
    slug: { current: 'echo' },
    description: [
      {
        _type: 'block',
        _key: 'b28',
        style: 'normal',
        children: [{ _type: 'span', _key: 's28', text: 'An influencer and content-driven campaign to boost a new music streaming app.' }],
      }
    ],
    role: 'Digital Strategist',
    categories: [],
    year: '2021',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-28'], public_id: 'mock-cover-28' },
    gallery: [] as any,
    is_selected: false,
    order: 28,
  },
  {
    _id: 'proj-29',
    title: 'Dissolve',
    slug: { current: 'dissolve' },
    description: [
      {
        _type: 'block',
        _key: 'b29',
        style: 'normal',
        children: [{ _type: 'span', _key: 's29', text: 'Experimental art video utilizing time-lapse and extreme slow motion to study natural decay.' }],
      }
    ],
    role: 'Creative Director',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-29'], public_id: 'mock-cover-29' },
    gallery: [] as any,
    is_selected: false,
    order: 29,
  },
  {
    _id: 'proj-30',
    title: 'Altitude',
    slug: { current: 'altitude' },
    description: [
      {
        _type: 'block',
        _key: 'b30',
        style: 'normal',
        children: [{ _type: 'span', _key: 's30', text: 'A breathtaking landscape photography series shot in the Lombok highlands.' }],
      }
    ],
    role: 'Photographer',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-30'], public_id: 'mock-cover-30' },
    gallery: [] as any,
    is_selected: false,
    order: 30,
  },
  {
    _id: 'proj-31',
    title: 'Basalt',
    slug: { current: 'basalt' },
    description: [
      {
        _type: 'block',
        _key: 'b31',
        style: 'normal',
        children: [{ _type: 'span', _key: 's31', text: 'A stark, minimalist clothing label identity focusing on typography and monochrome aesthetics.' }],
      }
    ],
    role: 'Brand Designer',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-31'], public_id: 'mock-cover-31' },
    gallery: [] as any,
    is_selected: false,
    order: 31,
  },
  {
    _id: 'proj-32',
    title: 'Prism',
    slug: { current: 'prism' },
    description: [
      {
        _type: 'block',
        _key: 'b32',
        style: 'normal',
        children: [{ _type: 'span', _key: 's32', text: 'A colorful and dynamic campaign promoting the youth fashion week in Jakarta.' }],
      }
    ],
    role: 'Campaign Director',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-32'], public_id: 'mock-cover-32' },
    gallery: [] as any,
    is_selected: false,
    order: 32,
  },
  {
    _id: 'proj-33',
    title: 'Signal',
    slug: { current: 'signal' },
    description: [
      {
        _type: 'block',
        _key: 'b33',
        style: 'normal',
        children: [{ _type: 'span', _key: 's33', text: 'Corporate brand film for a leading tech startup launch in Southeast Asia.' }],
      }
    ],
    role: 'Director',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-33'], public_id: 'mock-cover-33' },
    gallery: [] as any,
    is_selected: false,
    order: 33,
  },
  {
    _id: 'proj-34',
    title: 'Monolith',
    slug: { current: 'monolith' },
    description: [
      {
        _type: 'block',
        _key: 'b34',
        style: 'normal',
        children: [{ _type: 'span', _key: 's34', text: 'Architecture photography series focusing on brutalist buildings across the city.' }],
      }
    ],
    role: 'Architecture Photographer',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-34'], public_id: 'mock-cover-34' },
    gallery: [] as any,
    is_selected: false,
    order: 34,
  },
  {
    _id: 'proj-35',
    title: 'Arka',
    slug: { current: 'arka' },
    description: [
      {
        _type: 'block',
        _key: 'b35',
        style: 'normal',
        children: [{ _type: 'span', _key: 's35', text: 'A sophisticated architecture firm brand and collateral suite.' }],
      }
    ],
    role: 'Art Director',
    categories: [],
    year: '2020',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-35'], public_id: 'mock-cover-35' },
    gallery: [] as any,
    is_selected: false,
    order: 35,
  },
]

const fs = require('fs');

const videoUrls = [
  'https://images.unsplash.com/photo-1536240478700-b869ad10e2f4?w=1200&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
  'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80',
  'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'
];

const photoUrls = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80'
];

const brandUrls = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80',
  'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=1200&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
  'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80'
];

const campaignUrls = [
  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
  'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1200&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80'
];

const projectsData = [
  // Videography (9)
  { id: 1, title: 'Ephemeral Light', cat: 'Videography', desc: 'A cinematic exploration of light and shadow across the Indonesian archipelago. Shot over twelve months, this series captures the fleeting moments between dusk and dark — when the world holds its breath.', role: 'Director & Cinematographer' },
  { id: 6, title: 'Resonance', cat: 'Videography', desc: 'An audiovisual journey through soundscapes and architectural forms.', role: 'Director' },
  { id: 9, title: 'Liminal Spaces', cat: 'Videography', desc: 'A short film exploring the transitional moments in everyday life.', role: 'Director of Photography' },
  { id: 13, title: 'Frequency', cat: 'Videography', desc: 'Music documentary exploring the underground electronic music scene in Jakarta.', role: 'Director' },
  { id: 17, title: 'Senja Collective', cat: 'Videography', desc: 'A short documentary film highlighting the fishermen community at dusk along the coastal villages.', role: 'Cinematographer' },
  { id: 21, title: 'Undercurrent', cat: 'Videography', desc: 'An underwater fashion film promoting ocean conservation and sustainable practices.', role: 'Director & Editor' },
  { id: 25, title: 'Kinetic', cat: 'Videography', desc: 'A high-octane motorsport brand film focusing on speed, motion, and precision.', role: 'Director' },
  { id: 29, title: 'Dissolve', cat: 'Videography', desc: 'Experimental art video utilizing time-lapse and extreme slow motion to study natural decay.', role: 'Creative Director' },
  { id: 33, title: 'Signal', cat: 'Videography', desc: 'Corporate brand film for a leading tech startup launch in Southeast Asia.', role: 'Director' },

  // Photography (10)
  { id: 2, title: 'Archipelago Drift', cat: 'Photography', desc: 'A visual diary of coastal communities and maritime traditions.', role: 'Lead Photographer' },
  { id: 5, title: 'Sacred Geometry', cat: 'Photography', desc: 'Exploring the mathematical perfection in nature and architecture.', role: 'Photographer' },
  { id: 8, title: 'Night Market', cat: 'Photography', desc: 'Street photography series capturing the vibrant energy of night markets.', role: 'Photographer' },
  { id: 10, title: 'After the Rain', cat: 'Photography', desc: 'A moody, reflective photography series shot exclusively during the monsoon season.', role: 'Photographer' },
  { id: 14, title: 'Meridian', cat: 'Photography', desc: 'High fashion editorial shot in a desert landscape showcasing the summer collection.', role: 'Photographer' },
  { id: 18, title: 'Kintsugi', cat: 'Photography', desc: 'An intimate portrait series documenting the aging craftsmen of Java.', role: 'Photographer' },
  { id: 22, title: 'Bloom', cat: 'Photography', desc: 'Botanical editorial highlighting the unique and endangered flora of Kalimantan.', role: 'Lead Photographer' },
  { id: 26, title: 'Raw', cat: 'Photography', desc: 'A documentary series capturing the authentic and unvarnished street life of Jakarta.', role: 'Documentary Photographer' },
  { id: 30, title: 'Altitude', cat: 'Photography', desc: 'A breathtaking landscape photography series shot in the Lombok highlands.', role: 'Photographer' },
  { id: 34, title: 'Monolith', cat: 'Photography', desc: 'Architecture photography series focusing on brutalist buildings across the city.', role: 'Architecture Photographer' },

  // Branding (9)
  { id: 3, title: 'Void Identity', cat: 'Branding', desc: 'A minimalist brand identity system designed for a contemporary art gallery.', role: 'Art Director' },
  { id: 7, title: 'Terra Firma', cat: 'Branding', desc: 'Complete brand overhaul for an eco-conscious lifestyle brand.', role: 'Brand Designer' },
  { id: 15, title: 'Obsidian', cat: 'Branding', desc: 'A sleek, premium brand identity designed for a new luxury watch brand.', role: 'Art Director' },
  { id: 16, title: 'Kasa Studio', cat: 'Branding', desc: 'A dynamic creative agency brand system with flexible modular assets.', role: 'Creative Director' },
  { id: 19, title: 'Hutan', cat: 'Branding', desc: 'An eco-tourism brand identity for a sustainable resort in Borneo.', role: 'Art Director' },
  { id: 23, title: 'Lumen', cat: 'Branding', desc: 'A modern and radiant lighting design studio identity system.', role: 'Lead Designer' },
  { id: 27, title: 'Nuvola', cat: 'Branding', desc: 'Playful yet premium coffee brand packaging and visual identity.', role: 'Art Director' },
  { id: 31, title: 'Basalt', cat: 'Branding', desc: 'A stark, minimalist clothing label identity focusing on typography and monochrome aesthetics.', role: 'Brand Designer' },
  { id: 35, title: 'Arka', cat: 'Branding', desc: 'A sophisticated architecture firm brand and collateral suite.', role: 'Art Director' },

  // Digital Campaign (7)
  { id: 4, title: 'Pulse Campaign', cat: 'Digital Campaign', desc: 'An energetic social media campaign driving engagement for a fitness app.', role: 'Campaign Director' },
  { id: 11, title: 'Vertigo', cat: 'Digital Campaign', desc: 'A high-impact social media campaign designed for the upcoming music festival season.', role: 'Campaign Manager' },
  { id: 12, title: 'Daybreak', cat: 'Digital Campaign', desc: 'A sensitive and inspiring awareness campaign focusing on mental health.', role: 'Creative Director' },
  { id: 20, title: 'Current', cat: 'Digital Campaign', desc: 'A vibrant digital campaign capturing the essence of a surf lifestyle brand.', role: 'Campaign Director' },
  { id: 24, title: 'Zero', cat: 'Digital Campaign', desc: 'A futuristic launch campaign for a new Electric Vehicle (EV) automotive brand.', role: 'Creative Director' },
  { id: 28, title: 'Echo', cat: 'Digital Campaign', desc: 'An influencer and content-driven campaign to boost a new music streaming app.', role: 'Digital Strategist' },
  { id: 32, title: 'Prism', cat: 'Digital Campaign', desc: 'A colorful and dynamic campaign promoting the youth fashion week in Jakarta.', role: 'Campaign Director' }
];

// Sort by ID to place them in proj-1 to proj-35 order
projectsData.sort((a, b) => a.id - b.id);

let vidIdx = 0;
let phoIdx = 0;
let braIdx = 0;
let camIdx = 0;

const assignedUrls = {};

projectsData.forEach(p => {
  let url = '';
  if (p.cat === 'Videography') { url = videoUrls[vidIdx++]; }
  else if (p.cat === 'Photography') { url = photoUrls[phoIdx++]; }
  else if (p.cat === 'Branding') { url = brandUrls[braIdx++]; }
  else if (p.cat === 'Digital Campaign') { url = campaignUrls[camIdx++]; }
  assignedUrls['proj-' + p.id] = url;
});

function getYear(id) {
  if (id <= 7) return '2024';
  if (id <= 14) return '2023';
  if (id <= 21) return '2022';
  if (id <= 28) return '2021';
  return '2020';
}

function generateGallery(id) {
  if (id === 1) {
    return `[
      { _key: 'g1-1', type: 'image', image: { secure_url: '${assignedUrls['proj-2']}', public_id: 'mock-1' } },
      { _key: 'g1-2', type: 'image', image: { secure_url: '${assignedUrls['proj-3']}', public_id: 'mock-2' } },
      { _key: 'g1-v', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' }
    ]`;
  }
  if (id >= 2 && id <= 6) {
    // 2-4 gallery images
    const count = (id % 3) + 2; // 2, 3, 4
    let items = [];
    for(let i=0; i<count; i++) {
      // Pick some other URLs just to be unique within the gallery
      let randomId = ((id + i * 5) % 35) + 1;
      items.push(`{ _key: 'g${id}-${i}', type: 'image', image: { secure_url: '${assignedUrls['proj-'+randomId]}', public_id: 'mock-${id}-${i}' } }`);
    }
    return `[\n        ${items.join(',\n        ')}\n      ]`;
  }
  return `[]`;
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

let fileContent = `import type { Project } from '@/types'

/**
 * Placeholder images from Unsplash (free, no auth required).
 * These are used as stand-ins until real Sanity assets are uploaded.
 * The _ref field uses a real Unsplash URL instead of a Sanity asset ref,
 * so we handle it directly in the image components as a fallback src.
 */

export const PLACEHOLDER_IMAGES: Record<string, string> = {
`;

for (let i = 1; i <= 35; i++) {
  fileContent += `  'proj-${i}': '${assignedUrls['proj-'+i]}',\n`;
}

fileContent += `}

export const mockProjects: Project[] = [
`;

projectsData.forEach(p => {
  fileContent += `  {
    _id: 'proj-${p.id}',
    title: '${p.title.replace(/'/g, "\\'")}',
    slug: { current: '${generateSlug(p.title)}' },
    description: [
      {
        _type: 'block',
        _key: 'b${p.id}',
        style: 'normal',
        children: [{ _type: 'span', _key: 's${p.id}', text: '${p.desc.replace(/'/g, "\\'")}' }],
      }
    ],
    role: '${p.role}',
    category: '${p.cat}' as any,
    year: '${getYear(p.id)}',
    coverImage: { secure_url: PLACEHOLDER_IMAGES['proj-${p.id}'], public_id: 'mock-cover-${p.id}' },
    gallery: ${generateGallery(p.id)} as any,
    is_selected: ${p.id <= 6 ? 'true' : 'false'},
    order: ${p.id},
  },
`;
});

fileContent += `]
`;

fs.writeFileSync('d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/data/mock/projects.ts', fileContent);

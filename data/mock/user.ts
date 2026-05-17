import type { UserProfile } from '@/types'

export const mockUser: UserProfile = {
  _id: 'mock-user-1',
  name: 'Rangga Djoned',
  tagline: 'Creative Director & Visual Storyteller',
  aboutText: `I am a creative director and visual storyteller based in Jakarta, Indonesia. My work spans across videography, branding, photography, and digital campaigns — always with a focus on atmosphere, narrative, and aesthetic precision.

With over a decade of experience collaborating with brands, agencies, and artists, I bring a cinematic sensibility to every project. I believe great visual work is not just seen — it is felt.

My process begins with listening: to the client, to the brief, to the silence between words. From there, I build worlds that resonate.`,
  email: 'hello@ranggadjoned.com',
  socialLinks: [
    {
      _key: 'sl-1',
      platform: 'Instagram',
      url: 'https://instagram.com/ranggadjoned',
      icon: 'instagram',
    },
    {
      _key: 'sl-2',
      platform: 'Behance',
      url: 'https://behance.net/ranggadjoned',
      icon: 'behance',
    },
    {
      _key: 'sl-3',
      platform: 'Pinterest',
      url: 'https://pinterest.com/ranggadjoned',
      icon: 'pinterest',
    },
    {
      _key: 'sl-4',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/ranggadjoned',
      icon: 'linkedin',
    },
    {
      _key: 'sl-5',
      platform: 'YouTube',
      url: 'https://youtube.com/@ranggadjoned',
      icon: 'youtube',
    },
  ],
  experienceHighlights: [
    {
      _key: 'ex-1',
      role: 'Creative Director',
      company: 'Freelance / Independent',
      year: '2018 – Present',
      description: 'Leading creative direction for brands, artists, and agencies across South East Asia.',
    },
    {
      _key: 'ex-2',
      role: 'Art Director',
      company: 'Dentsu Indonesia',
      year: '2015 – 2018',
      description: 'Overseeing visual identity and campaign production for major consumer brands.',
    },
    {
      _key: 'ex-3',
      role: 'Senior Photographer',
      company: 'Getty Images Partner',
      year: '2012 – 2015',
      description: 'Editorial and commercial photography across fashion, culture, and lifestyle.',
    },
  ],
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchUser } from '@/lib/fetchData'
import { urlForImage } from '@/sanity/image'
import InformationNav from '@/modules/InformationNav'

export const metadata: Metadata = {
  title: 'Information',
  description: 'Biography, contact, and downloads for Rangga Djoned — Creative Director & Visual Storyteller.',
}

const SOCIAL_ICONS: Record<string, string> = {
  instagram: '📷',
  behance: '🅱',
  pinterest: '📌',
  linkedin: '🔗',
  youtube: '▶',
  twitter: '✕',
  vimeo: '🎬',
}

export default async function InformationPage() {
  const user = await fetchUser()
  const profileSrc = urlForImage(user.profileImage, 800)

  return (
    <main className="min-h-screen bg-black pt-20 pb-28" aria-label="Information page">
      {/* Floating section nav — rendered here, positioned fixed via CSS */}
      <InformationNav />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-12 mb-20">
          {/* Left — profile image */}
          <div className="relative">
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
              {profileSrc ? (
                <Image
                  src={profileSrc}
                  alt={user.profileImage?.alt ?? `${user.name} portrait`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                /* Placeholder silhouette */
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950 flex items-end p-8">
                  <p className="text-white/10 text-6xl font-extralight">
                    {user.name.split(' ').map(w => w[0]).join('')}
                  </p>
                </div>
              )}
            </div>
            {/* Name below image */}
            <p className="mt-4 text-white/30 text-xs tracking-widest uppercase">{user.name}</p>
          </div>

          {/* Right — about text */}
          <div className="flex flex-col gap-8">
            <h1 className="text-white text-3xl md:text-4xl font-extralight tracking-tight leading-snug">
              {user.tagline ?? 'Creative Director & Visual Storyteller'}
            </h1>

            {user.aboutText && (
              <div className="space-y-5">
                {user.aboutText.split('\n\n').map((para, i) => (
                  <p key={i} className="text-white/50 font-light leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8 mb-16" />

        {/* ── Biography section ── */}
        <section id="biography" aria-labelledby="bio-heading" className="mb-20 scroll-mt-24">
          <h2 id="bio-heading" className="text-white/20 text-xs tracking-widest uppercase mb-8">
            Biography
          </h2>

          {user.experienceHighlights && user.experienceHighlights.length > 0 ? (
            <div className="space-y-8">
              {user.experienceHighlights.map((exp) => (
                <div
                  key={exp._key}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 border-b border-white/5 pb-8"
                >
                  <div>
                    <p className="text-white/25 text-xs tracking-widest">{exp.year}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-light mb-1">{exp.role}</p>
                    <p className="text-white/40 text-xs tracking-wider mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-white/30 text-sm font-light leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/20 text-sm font-light">No biography entries yet.</p>
          )}
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-white/8 mb-16" />

        {/* ── Contact section ── */}
        <section id="contact" aria-labelledby="contact-heading" className="mb-20 scroll-mt-24">
          <h2 id="contact-heading" className="text-white/20 text-xs tracking-widest uppercase mb-8">
            Contact
          </h2>

          <div className="space-y-6">
            {user.email && (
              <div>
                <p className="text-white/20 text-xs tracking-widest uppercase mb-2">Email</p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-white/70 text-sm font-light hover:text-white transition-colors"
                >
                  {user.email}
                </a>
              </div>
            )}

            {user.socialLinks && user.socialLinks.length > 0 && (
              <div>
                <p className="text-white/20 text-xs tracking-widest uppercase mb-4">Social</p>
                <div className="flex flex-wrap gap-4">
                  {user.socialLinks.map((link) => (
                    <a
                      key={link._key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase text-white/40 hover:text-white hover:border-white/30 transition-all"
                    >
                      <span aria-hidden="true">
                        {SOCIAL_ICONS[link.icon?.toLowerCase() ?? ''] ?? '↗'}
                      </span>
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-white/8 mb-16" />

        {/* ── Downloads section ── */}
        <section id="downloads" aria-labelledby="downloads-heading" className="scroll-mt-24">
          <h2 id="downloads-heading" className="text-white/20 text-xs tracking-widest uppercase mb-8">
            Downloads
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              aria-label="Download High Resolution Images"
              className="group flex items-center justify-between px-6 py-4 border border-white/10 hover:border-white/30 transition-all"
            >
              <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">
                High Resolution Images
              </span>
              <span className="text-white/20 text-xs group-hover:text-white/50 transition-colors ml-8">↗</span>
            </a>
            <a
              href="#"
              aria-label="Download CV PDF"
              className="group flex items-center justify-between px-6 py-4 border border-white/10 hover:border-white/30 transition-all"
            >
              <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">
                Curriculum Vitae (PDF)
              </span>
              <span className="text-white/20 text-xs group-hover:text-white/50 transition-colors ml-8">↓</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

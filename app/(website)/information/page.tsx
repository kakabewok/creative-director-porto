import type { Metadata } from 'next'
import Image from 'next/image'
import { fetchUser } from '@/lib/sanity/fetchers'
import { optimizeCloudinaryUrl } from '@/lib/media'
import InformationNav from '@/modules/InformationNav'
import {
  SiInstagram,
  SiPinterest,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Information',
  description: 'Biography, contact, and downloads for Rangga Djoned',
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: <SiInstagram className="text-[#E4405F]" />,
  pinterest: <SiPinterest className="text-[#BD081C]" />,
  linkedin: <FaLinkedin className="text-[#0A66C2]" />,
  x: <FaXTwitter className="text-slate-900 dark:text-white" />,
};

export default async function InformationPage() {
  const user = await fetchUser()

  let profileSrc = ''
  if (user.profileImage?.secure_url) {
    profileSrc = optimizeCloudinaryUrl(user.profileImage.secure_url)
  }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-black pt-4 lg:pt-8 pb-28" aria-label="Information page">
        {/* Floating section nav — rendered here, positioned fixed via CSS */}
        <InformationNav />
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* ── Two-column layout ── */}
          <section id="biography" className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-11 lg:gap-20 pt-5 lgpt-12 mb-10 lg:mb-20">
              {/* Left — profile image */}
              <div className="relative">
                <h1 className='text-slate-900 dark:text-white font-semibold text-lg md:text-3xl mb-5 tracking-tight'>BIOGRAPHY</h1>
                <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden rounded-sm">
                  {profileSrc ? (
                    <Image
                      src={profileSrc}
                      alt={`${user.name} portrait`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <Image
                      src={profileSrc}
                      alt={`${user.name} portrait`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                {/* Name below image */}
                {/* <p className="mt-4 text-white/30 text-xs tracking-widest uppercase">{user.name}</p> */}
              </div>

              {/* Right — about text */}
              <div className="flex flex-col gap-8">
                <h1 className="text-slate-950 dark:text-white text-xl md:text-2xl font-normal tracking-tight leading-snug mt-5">
                  {user.tagline ?? 'Creative Director'}
                </h1>

                {user.aboutText && (
                  <div className="space-y-5">
                    {user.aboutText.split('\n\n').map((para, i) => (
                      <p key={i} className="text-slate-700 dark:text-white/50 font-light leading-relaxed text-sm">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Divider */}
          {/* <div className="w-full h-px bg-white/8 mb-16" /> */}

          {/* ── Biography section ── */}
          {/* <section id="biography" aria-labelledby="bio-heading" className="mb-20 scroll-mt-24">
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
        </section> */}

          {/* Divider */}
          <div className="w-full h-px bg-white/8 mb-16" />

          {/* ── Contact section ── */}
          <section id="contact" aria-labelledby="contact-heading" className="mb-10 lg:mb-20 scroll-mt-24">
            {/* <h2 id="contact-heading" className="text-white/20 text-xs tracking-widest uppercase mb-8">
            Contact
          </h2> */}
            <h1 className='text-slate-950 dark:text-white font-semibold text-lg md:text-xl mb-5 tracking-tight'>CONTACT</h1>

            <div className="space-y-6">
              {user.email && (
                <div>
                  <p className="text-slate-950 dark:text-white/90 text-xs tracking-widest uppercase mb-2">Email</p>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-slate-400 hover:text-slate-950 dark:text-white/40 dark:hover:text-white text-sm transition-all duration-400"
                  >
                    {user.email}
                  </a>
                </div>
              )}

              {user.socialLinks && user.socialLinks.length > 0 && (
                <div>
                  <p className="text-slate-950 dark:text-white/90 text-xs tracking-widest uppercase mb-2">Social</p>
                  <div className="flex flex-wrap gap-4">
                    {user.socialLinks.map((link) => (
                      <a
                        key={link._key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="flex items-center gap-1 px-1 py-1 rounded-xs text-sm text-slate-400 hover:text-slate-950 dark:text-white/40 dark:hover:text-white hover:border-white/30 transition-all duration-400"
                      >
                        <span aria-hidden="true">
                          {/* {SOCIAL_ICONS[link.icon?.toLowerCase() ?? ''] ?? '↗'} */}
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
            {/* <h2 id="downloads-heading" className="text-white/20 text-xs tracking-widest uppercase mb-8">
            Downloads
          </h2> */}
            <h1 className='text-slate-950 dark:text-white/90 font-semibold text-lg md:text-xl mb-5 tracking-tight'>DOWNLOADS</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-[420px]">
              <a
                href="#"
                aria-label="Download High Resolution Images"
                className="duration-400 group flex items-center justify-between px-6 py-4 border border-slate-200 hover:border-slate-500 dark:border-white/20 dark:hover:border-white/30 transition-all"
              >
                <span className="text-slate-700 hover:text-slate-950 dark:text-white/60 text-sm font-light dark:group-hover:text-white transition-colors">
                  High Resolution Images
                </span>
                <span className="text-slate-700 hover:text-slate-950 dark:text-white/20 text-xs dark:group-hover:text-white/50 transition-colors ml-8">↗</span>
              </a>
              <a
                href="#"
                aria-label="Download CV PDF"
                className="duration-400 group flex items-center justify-between px-6 py-4 border border-slate-200 hover:border-slate-500 dark:border-white/20 dark:hover:border-white/30 transition-all"
              >
                <span className="text-slate-700 hover:text-slate-950 dark:text-white/60 text-sm font-light dark:group-hover:text-white transition-colors">
                  Curriculum Vitae (PDF)
                </span>
                <span className="text-slate-700 hover:text-slate-950 dark:text-white/20 text-xs dark:group-hover:text-white/50 transition-colors ml-8">↓</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

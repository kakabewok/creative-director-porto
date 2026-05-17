import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Rangga Djoned — Creative Director & Visual Storyteller',
    template: '%s | Rangga Djoned',
  },
  description:
    'Portfolio of Rangga Djoned — Creative Director & Visual Storyteller based in Jakarta, Indonesia. Videography, Branding, Photography, Digital Campaigns.',
  keywords: ['Creative Director', 'Visual Storyteller', 'Videography', 'Branding', 'Photography', 'Jakarta'],
  authors: [{ name: 'Rangga Djoned' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rangga Djoned',
  },
}

import ThemeToggle from '@/components/ThemeToggle'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-full">
        <Navbar />
        <ThemeToggle />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}

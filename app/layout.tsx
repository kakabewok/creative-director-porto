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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full`}>
      <body className="bg-black text-white antialiased min-h-full">
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}

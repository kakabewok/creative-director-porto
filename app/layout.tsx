import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { fetchUser } from '@/lib/sanity/fetchers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const user = await fetchUser()
  const siteName = user?.name || 'Rangga Djoned'
  const titleDefault = `${siteName} - Creative Director`
  const ogImage = user?.profileImage?.secure_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80'

  return {
    title: {
      default: titleDefault,
      template: `%s | ${siteName}`,
    },
    description: user?.tagline || 'Portfolio of Rangga Djoned - Creative Director based in Jakarta, Indonesia.',
    keywords: ['Creative Director', 'Videography', 'Branding', 'Photography', 'Jakarta', 'Event', 'stage', 'stage lighting', 'stage sound', 'stage audio', 'stage visual', siteName],
    authors: [{ name: siteName }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage]
    }
  }
}

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
        {children}
      </body>
    </html>
  )
}

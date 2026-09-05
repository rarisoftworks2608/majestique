import { Playfair_Display, Montserrat } from 'next/font/google'
import '@/styles/globals.css'
import { SITE, SITE_URL, organizationSchema, websiteSchema } from '@/lib/site'
import Providers from '@/components/layout/Providers'

/* Self-hosted by Next at build time — no render-blocking request to
   fonts.googleapis.com, and `display: swap` + automatic size-adjust
   fallbacks keep CLS at zero while the webfont loads. */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'luxury real estate Pune',
    'premium apartments Pune',
    'Majestique Landmarks',
    'MahaRERA registered projects Pune',
    'flats in Kharadi',
    'flats in Balewadi',
    'property in Baner Pune',
    'real estate developer Pune',
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE_URL,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  category: 'real estate',
}

export const viewport = {
  themeColor: '#3D090F',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* Site-wide structured data. Emitted server-side so crawlers and AI
            answer engines see it in the initial HTML without running JS. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

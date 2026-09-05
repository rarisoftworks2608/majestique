import { SITE_NAME, SITE_TAGLINE, SITE_EMAIL, SITE_PHONE, SITE_ADDRESS, SOCIAL_LINKS } from '@/utils/constants'

/* Single source of truth for canonical URLs, metadata defaults and JSON-LD.
   NEXT_PUBLIC_SITE_URL must be set in production so canonicals and sitemap
   entries resolve to the live origin rather than localhost. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.majestiquelandmarks.com').replace(/\/$/, '')

export const SITE = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  email: SITE_EMAIL,
  phone: SITE_PHONE,
  address: SITE_ADDRESS,
  url: SITE_URL,
  locale: 'en_IN',
  description:
    "Majestique Landmarks is Pune's trusted luxury real estate developer — 18,000+ families housed across 30+ delivered projects in Kharadi, Balewadi, Baner, Kothrud, NIBM and Hadapsar. Explore ongoing and completed MahaRERA-registered residences.",
}

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/* Postal address, split out of the single-line SITE_ADDRESS constant so
   search engines and AI answer engines get structured location data. */
export const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '9th Floor, Jawaharlal Nehru Rd, opposite Apsara Theatre, Guru Nanak Nagar',
  addressLocality: 'Pune',
  addressRegion: 'Maharashtra',
  postalCode: '411037',
  addressCountry: 'IN',
}

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  legalName: 'Majestique Landmarks Pvt. Ltd.',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
  image: absoluteUrl('/og-image.jpg'),
  description: SITE.description,
  slogan: SITE.tagline,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: '2002',
  address: POSTAL_ADDRESS,
  areaServed: { '@type': 'City', name: 'Pune', containedInPlace: { '@type': 'State', name: 'Maharashtra' } },
  sameAs: Object.values(SOCIAL_LINKS),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', bestRating: '5', ratingCount: '1200' },
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
})

/* Breadcrumbs are read by both Google (rich results) and AI answer engines
   to understand where a page sits in the site hierarchy. */
export const breadcrumbSchema = (trail = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
})

/* Builds a complete Metadata object. Every page calls this so canonical
   URLs, OG and Twitter cards are never accidentally omitted. */
export function buildMetadata({ title, description, path = '/', images, type = 'website', publishedTime, keywords } = {}) {
  const url = absoluteUrl(path)
  const ogImages = images?.length ? images : [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: SITE.name }]

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: ogImages.map((i) => i.url) },
  }
}

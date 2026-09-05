import { notFound } from 'next/navigation'
import View from '@/views/media/PressCoverageDetail'
import { CLIPPINGS } from '@/data/pressCoverage'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return CLIPPINGS.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = CLIPPINGS.find((c) => c.slug === slug)
  if (!item) return {}

  return buildMetadata({
    title: item.headline,
    description: item.excerpt,
    path: `/media/press-coverage/${item.slug}`,
    type: 'article',
    publishedTime: item.dateISO,
    images: item.image ? [{ url: absoluteUrl(item.image.src || item.image), width: 1200, height: 630, alt: item.headline }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const item = CLIPPINGS.find((c) => c.slug === slug)
  if (!item) notFound()

  /* NewsArticle with the originating masthead as publisher — this is press
     coverage *about* Majestique, not content published by it. */
  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.headline,
    description: item.excerpt,
    datePublished: item.dateISO,
    articleSection: item.category,
    publisher: { '@type': 'NewsMediaOrganization', name: item.publication },
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/media/press-coverage/${item.slug}`) },
    ...(item.image ? { image: absoluteUrl(item.image.src || item.image) } : {}),
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Press Coverage', path: '/media/press-coverage' },
    { name: item.headline, path: `/media/press-coverage/${item.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

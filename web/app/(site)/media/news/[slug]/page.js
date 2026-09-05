import View from '@/views/media/NewsDetail'
import { getNewsItem, unwrapOne } from '@/lib/api-server'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE_URL } from '@/lib/site'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = unwrapOne(await getNewsItem(slug), 'news')
  if (!item?.title) {
    return buildMetadata({ title: 'News', description: 'Latest news from Majestique Landmarks.', path: `/media/news/${slug}` })
  }

  return buildMetadata({
    title: item.title,
    description: item.excerpt || item.summary || `${item.title} — Majestique Landmarks news.`,
    path: `/media/news/${slug}`,
    type: 'article',
    publishedTime: item.publishedAt || item.createdAt,
    images: item.image ? [{ url: item.image, width: 1200, height: 630, alt: item.title }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const item = unwrapOne(await getNewsItem(slug), 'news')

  const schema = item?.title
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.excerpt || item.summary || undefined,
        datePublished: item.publishedAt || item.createdAt,
        dateModified: item.updatedAt || item.publishedAt || item.createdAt,
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/media/news/${slug}`) },
        ...(item.image ? { image: item.image } : {}),
      }
    : null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/media/news' },
    { name: item?.title || 'Article', path: `/media/news/${slug}` },
  ]

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

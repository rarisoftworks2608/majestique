import { notFound } from 'next/navigation'
import View from '@/views/media/ArticleDetail'
import { ARTICLES } from '@/data/articles'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = ARTICLES.find((a) => a.slug === slug)
  if (!item) return {}

  return buildMetadata({
    title: item.headline,
    description: item.excerpt,
    path: `/media/articles/${item.slug}`,
    type: 'article',
    publishedTime: item.dateISO,
    images: item.image ? [{ url: absoluteUrl(item.image.src || item.image), width: 1200, height: 630, alt: item.headline }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const item = ARTICLES.find((a) => a.slug === slug)
  if (!item) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.headline,
    description: item.excerpt,
    datePublished: item.dateISO,
    articleSection: item.category,
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/media/articles/${item.slug}`) },
    ...(item.image ? { image: absoluteUrl(item.image.src || item.image) } : {}),
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/media/articles' },
    { name: item.headline, path: `/media/articles/${item.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

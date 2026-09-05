import { notFound } from 'next/navigation'
import View from '@/views/media/BlogDetail'
import { BLOGS } from '@/data/blogs'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE, SITE_URL } from '@/lib/site'

/* Every blog post is pre-rendered at build time — crawlers and AI answer
   engines get complete HTML with no client fetch in the critical path. */
export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = BLOGS.find((b) => b.slug === slug)
  if (!blog) return {}

  return buildMetadata({
    title: blog.title,
    description: blog.seoDescription || blog.excerpt,
    path: `/media/blogs/${blog.slug}`,
    type: 'article',
    publishedTime: blog.dateISO,
    images: blog.image ? [{ url: absoluteUrl(blog.image.src || blog.image), width: 1200, height: 630, alt: blog.title }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const blog = BLOGS.find((b) => b.slug === slug)
  if (!blog) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.seoDescription || blog.excerpt,
    datePublished: blog.dateISO,
    dateModified: blog.dateISO,
    articleSection: blog.category,
    author: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/media/blogs/${blog.slug}`) },
    ...(blog.image ? { image: absoluteUrl(blog.image.src || blog.image) } : {}),
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Media', path: '/media/blogs' },
    { name: 'Blogs', path: '/media/blogs' },
    { name: blog.title, path: `/media/blogs/${blog.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

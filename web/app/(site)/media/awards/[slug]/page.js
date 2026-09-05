import { notFound } from 'next/navigation'
import View from '@/views/media/AwardDetail'
import { AWARDS } from '@/data/awards'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE, SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return AWARDS.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const award = AWARDS.find((a) => a.slug === slug)
  if (!award) return {}

  const title = `${award.award} — ${award.platform}`
  return buildMetadata({
    title,
    description: award.desc,
    path: `/media/awards/${award.slug}`,
    type: 'article',
    images: award.image ? [{ url: absoluteUrl(award.image.src || award.image), width: 1200, height: 630, alt: title }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const award = AWARDS.find((a) => a.slug === slug)
  if (!award) notFound()

  /* schema.org/Award isn't a standalone type — the recognised pattern is an
     organization holding the award, expressed here so answer engines can
     attribute the honour correctly. */
  const awardSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: award.award,
    description: award.desc,
    award: award.award,
    dateCreated: String(award.year),
    about: { '@id': `${SITE_URL}/#organization` },
    creator: { '@type': 'Organization', name: SITE.name, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/media/awards/${award.slug}`) },
    ...(award.image ? { image: absoluteUrl(award.image.src || award.image) } : {}),
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Awards', path: '/media/awards' },
    { name: award.award, path: `/media/awards/${award.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(awardSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

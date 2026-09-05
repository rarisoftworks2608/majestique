import View from '@/views/JobDetail'
import { getJob, unwrapOne } from '@/lib/api-server'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE, SITE_URL, POSTAL_ADDRESS } from '@/lib/site'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { id } = await params
  const job = unwrapOne(await getJob(id), 'job')
  if (!job?.title) {
    return buildMetadata({ title: 'Careers', description: 'Open roles at Majestique Landmarks, Pune.', path: `/careers/${id}` })
  }

  return buildMetadata({
    title: `${job.title} — Careers`,
    description: `${job.title} (${job.type || 'Full-time'}) at Majestique Landmarks, Pune. Join Pune's most prestigious luxury real estate team.`,
    path: `/careers/${id}`,
  })
}

export default async function Page({ params }) {
  const { id } = await params
  const job = unwrapOne(await getJob(id), 'job')

  /* JobPosting is one of the highest-value schema types available here —
     it makes openings eligible for Google Jobs. */
  const schema = job?.title
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description || job.title,
        datePosted: job.createdAt || job.postedAt,
        ...(job.closingDate ? { validThrough: job.closingDate } : {}),
        employmentType: (job.type || 'FULL_TIME').toUpperCase().replace(/[\s-]/g, '_'),
        hiringOrganization: { '@type': 'Organization', name: SITE.name, sameAs: SITE_URL },
        jobLocation: { '@type': 'Place', address: POSTAL_ADDRESS },
        ...(job.department ? { occupationalCategory: job.department } : {}),
        directApply: true,
        url: absoluteUrl(`/careers/${id}`),
      }
    : null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
    { name: job?.title || 'Opening', path: `/careers/${id}` },
  ]

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

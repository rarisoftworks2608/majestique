import View from '@/views/projects/ProjectDetail'
import { getProject, unwrapOne } from '@/lib/api-server'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE_URL, POSTAL_ADDRESS } from '@/lib/site'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = unwrapOne(await getProject(slug), 'project')

  if (!project?.title) {
    return buildMetadata({
      title: 'Project',
      description: 'Explore MahaRERA-registered residential and commercial developments by Majestique Landmarks across Pune.',
      path: `/projects/${slug}`,
    })
  }

  const description =
    project.metaDescription ||
    project.shortDescription ||
    `${project.title} — ${project.configuration || 'premium residences'} at ${project.location || 'Pune'} by Majestique Landmarks. MahaRERA registered.`

  return buildMetadata({
    title: project.title,
    description,
    path: `/projects/${slug}`,
    images: project.coverImage ? [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const project = unwrapOne(await getProject(slug), 'project')

  /* Residence schema gives search and answer engines the structured facts
     (location, configuration, RERA id) they need to surface this project
     for "3 BHK in Kharadi"-style queries. */
  const schema = project?.title
    ? {
        '@context': 'https://schema.org',
        '@type': 'Residence',
        name: project.title,
        description: project.shortDescription || project.description || undefined,
        url: absoluteUrl(`/projects/${slug}`),
        ...(project.coverImage ? { image: project.coverImage } : {}),
        address: { ...POSTAL_ADDRESS, ...(project.location ? { streetAddress: project.location } : {}) },
        provider: { '@id': `${SITE_URL}/#organization` },
        ...(project.reraNumber ? { identifier: { '@type': 'PropertyValue', name: 'MahaRERA', value: project.reraNumber } } : {}),
      }
    : null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project?.title || 'Project', path: `/projects/${slug}` },
  ]

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

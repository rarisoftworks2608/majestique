import View from '@/views/media/EventDetail'
import { getEvent, unwrapOne } from '@/lib/api-server'
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE_URL } from '@/lib/site'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = unwrapOne(await getEvent(slug), 'event')
  if (!event?.title) {
    return buildMetadata({ title: 'Event', description: 'Events hosted by Majestique Landmarks in Pune.', path: `/media/events/${slug}` })
  }

  return buildMetadata({
    title: event.title,
    description: event.excerpt || event.description?.slice(0, 160) || `${event.title} — a Majestique Landmarks event.`,
    path: `/media/events/${slug}`,
    type: 'article',
    images: event.image ? [{ url: event.image, width: 1200, height: 630, alt: event.title }] : undefined,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const event = unwrapOne(await getEvent(slug), 'event')

  const schema = event?.title
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.excerpt || event.description || undefined,
        startDate: event.eventDate || event.startDate,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: event.location || 'Pune', address: event.location || 'Pune, Maharashtra, India' },
        organizer: { '@id': `${SITE_URL}/#organization` },
        url: absoluteUrl(`/media/events/${slug}`),
        ...(event.image ? { image: event.image } : {}),
      }
    : null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/media/events' },
    { name: event?.title || 'Event', path: `/media/events/${slug}` },
  ]

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <View />
    </>
  )
}

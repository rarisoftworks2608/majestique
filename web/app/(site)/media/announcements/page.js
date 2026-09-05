import View from '@/views/media/Announcements'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Announcements",
  description: "Official announcements, project updates, and company news from Majestique Landmarks, Pune's premier luxury real estate developer.",
  path: "/media/announcements",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Media",
    "path": "/media"
  },
  {
    "name": "Announcements",
    "path": "/media/announcements"
  }
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <View />
    </>
  )
}

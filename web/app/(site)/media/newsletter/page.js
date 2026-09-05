import View from '@/views/media/Newsletter'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Newsletter",
  description: "Subscribe to the Majestique Landmarks newsletter for exclusive updates on new projects, events, luxury living insights, and pre-launch invitations.",
  path: "/media/newsletter",
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
    "name": "Newsletter",
    "path": "/media/newsletter"
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

import View from '@/views/media/Events'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Events | Launches, Ceremonies & Celebrations",
  description: "Explore Majestique Landmarks' project launches, ceremonies, CSR initiatives, and community celebrations across Pune.",
  path: "/media/events",
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
    "name": "Events",
    "path": "/media/events"
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

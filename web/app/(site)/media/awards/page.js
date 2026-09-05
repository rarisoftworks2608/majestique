import View from '@/views/media/Awards'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Awards & Recognition | Industry Honors",
  description: "Majestique Landmarks' award-winning legacy, recognized by Economic Times, Times Group, Realty+, and leading industry platforms for excellence in real estate development and luxury living across Pune.",
  path: "/media/awards",
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
    "name": "Awards",
    "path": "/media/awards"
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

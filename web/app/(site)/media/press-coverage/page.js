import View from '@/views/media/PressEvents'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Press Coverage | Majestique Landmarks in the Media",
  description: "Read editorial features, award announcements, CSR stories, and press recognition of Majestique Landmarks across India's leading publications: Economic Times, Times of India, Lokmat, Pudhari, and Sakal.",
  path: "/media/press-coverage",
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
    "name": "Press Coverage",
    "path": "/media/press-coverage"
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

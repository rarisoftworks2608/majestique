import View from '@/views/media/Testimonials'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Testimonials | Real Stories From Real Families",
  description: "Watch genuine testimonials from Majestique Landmarks' channel partners and residents across Krutarth, The Crown, and Rhythm County.",
  path: "/media/testimonials",
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
    "name": "Testimonials",
    "path": "/media/testimonials"
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

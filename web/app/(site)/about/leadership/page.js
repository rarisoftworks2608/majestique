import View from '@/views/about/Leadership'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Leadership",
  description: "Meet the visionary leaders behind Majestique Landmarks, the founding family whose integrity, ambition, and decades of entrepreneurial excellence have shaped Pune's most trusted real estate brand.",
  path: "/about/leadership",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "About",
    "path": "/about"
  },
  {
    "name": "Leadership",
    "path": "/about/leadership"
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

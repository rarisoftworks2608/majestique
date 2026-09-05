import View from '@/views/about/Legacy'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Our Legacy",
  description: "The founding story of Majestique Landmarks, spanning three decades of crafting landmark residences in Pune with integrity, innovation, and uncompromising quality.",
  path: "/about/legacy",
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
    "name": "Legacy",
    "path": "/about/legacy"
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

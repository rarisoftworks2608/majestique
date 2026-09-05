import View from '@/views/projects/Ongoing'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Ongoing Projects",
  description: "Explore Majestique Landmarks' current luxury residential projects under construction across Pune: Kharadi, Balewadi, Baner, NIBM Annex, Kothrud and more.",
  path: "/projects/ongoing",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Projects",
    "path": "/projects"
  },
  {
    "name": "Ongoing",
    "path": "/projects/ongoing"
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

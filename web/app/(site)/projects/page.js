import View from '@/views/projects/AllProjects'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "All Projects",
  description: "Explore all Majestique Landmarks luxury residential and commercial developments across Pune: ongoing and completed projects in Kharadi, Balewadi, Baner, Kothrud and more.",
  path: "/projects",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Projects",
    "path": "/projects"
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

import View from '@/views/projects/Completed'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Completed Projects",
  description: "Browse Majestique Landmarks' portfolio of ${COMPLETED_PROJECTS.length}+ delivered, MahaRERA-registered developments across Pune.",
  path: "/projects/completed",
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
    "name": "Completed",
    "path": "/projects/completed"
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

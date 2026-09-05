import View from '@/views/about/Milestones'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Milestones",
  description: "Every milestone reflects Majestique Landmarks' commitment to excellence, innovation, and the trust of thousands of families who have chosen us. Explore the achievements that shape our journey.",
  path: "/about/milestones",
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
    "name": "Milestones",
    "path": "/about/milestones"
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

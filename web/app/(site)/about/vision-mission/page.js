import View from '@/views/about/VisionMission'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Vision & Mission",
  description: "The vision, mission, and philosophy that drives Majestique Landmarks, delivering premium developments through discipline, innovation, sustainability, and trust across Pune.",
  path: "/about/vision-mission",
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
    "name": "Vision Mission",
    "path": "/about/vision-mission"
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

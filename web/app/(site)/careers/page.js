import View from '@/views/Careers'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Careers",
  description: "Soar high on your career graph. Come join Team Majestique. Explore current openings and build your career with Pune's premier luxury real estate brand.",
  path: "/careers",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Careers",
    "path": "/careers"
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

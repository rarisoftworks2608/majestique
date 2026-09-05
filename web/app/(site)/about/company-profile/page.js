import View from '@/views/about/CompanyProfile'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Company Profile",
  description: "Majestique Landmarks: Pune's trusted premium real estate developer crafting timeless landmarks with vision, trust, and architectural excellence.",
  path: "/about/company-profile",
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
    "name": "Company Profile",
    "path": "/about/company-profile"
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

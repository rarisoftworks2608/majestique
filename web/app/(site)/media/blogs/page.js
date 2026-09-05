import View from '@/views/media/Blogs'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Insights Journal | Real Estate & Living",
  description: "Explore Majestique Landmarks' editorial journal: real estate market trends, investment insights, homebuyer guides, infrastructure updates, and luxury lifestyle perspectives for Pune's modern property market.",
  path: "/media/blogs",
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
    "name": "Blogs",
    "path": "/media/blogs"
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

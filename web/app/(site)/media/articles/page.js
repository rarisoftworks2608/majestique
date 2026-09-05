import View from '@/views/media/Articles'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Articles | Brand Campaigns & Features",
  description: "Majestique Landmarks' brand articles, festive greetings, and publication features: creative campaigns shared with Pune across Lokmat, Sakal, Pudhari, Saamana, and Times of India.",
  path: "/media/articles",
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
    "name": "Articles",
    "path": "/media/articles"
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

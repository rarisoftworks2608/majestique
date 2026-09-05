import View from '@/views/PrivacyPolicy'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Majestique Landmarks Private Limited: how we collect, use, disclose, and protect your personal information.",
  path: "/privacy-policy",
})

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Privacy Policy",
    "path": "/privacy-policy"
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

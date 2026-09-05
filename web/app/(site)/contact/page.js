import View from '@/views/Contact'
import { buildMetadata, breadcrumbSchema, SITE, POSTAL_ADDRESS, SITE_URL } from '@/lib/site'

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with Majestique Landmarks. Buy property, seek a job, or register as a channel partner.",
  path: "/contact",
})

/* ContactPage + the office's postal/phone details — this is the page most
   likely to be surfaced for "Majestique Landmarks office / phone number"
   style queries in both search and AI answer engines. */
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Majestique Landmarks',
  url: `${SITE_URL}/contact`,
  mainEntity: {
    '@id': `${SITE_URL}/#organization`,
    '@type': 'RealEstateAgent',
    name: SITE.name,
    telephone: SITE.phone,
    email: SITE.email,
    address: POSTAL_ADDRESS,
  },
}

const breadcrumbs = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Contact",
    "path": "/contact"
  }
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <View />
    </>
  )
}

import CertificateList from '@/views/CertificateList'
import { EC_CERTIFICATES } from '@/data/certificates'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'EC Certificates',
  description:
    'Environmental Clearance (EC) certificates and letters for Majestique Landmarks projects and group entities, available to download.',
  path: '/ec-certificates',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'EC Certificates', path: '/ec-certificates' },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <CertificateList
        title="EC Certificates"
        subtitle="Environmental Clearance certificates and letters for our projects and group entities"
        breadcrumbLabel="EC Certificates"
        items={EC_CERTIFICATES}
      />
    </>
  )
}

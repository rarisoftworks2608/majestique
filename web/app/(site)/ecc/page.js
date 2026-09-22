import CertificateList from '@/views/CertificateList'
import { COMPLIANCE_REPORTS } from '@/data/certificates'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Compliance Report Certificates',
  description:
    'Environmental compliance report certificates for Majestique Landmarks projects and group entities, available to download.',
  path: '/ecc',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compliance Report Certificates', path: '/ecc' },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <CertificateList
        title="Compliance Report Certificates"
        subtitle="Environmental compliance reports for our projects and group entities"
        breadcrumbLabel="Compliance Reports"
        items={COMPLIANCE_REPORTS}
      />
    </>
  )
}

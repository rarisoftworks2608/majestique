import CertificateList from '../components/ui/CertificateList'
import Seo from '../components/ui/Seo'
import { EC_CERTIFICATES } from '../data/certificates'

export default function EcCertificates() {
  return (
    <>
      <Seo
        title="EC Certificates"
        description="Environmental Clearance (EC) certificates and letters for Majestique Landmarks projects and group entities, available to download."
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

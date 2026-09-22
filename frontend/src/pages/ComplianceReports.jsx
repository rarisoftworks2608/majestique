import CertificateList from '../components/ui/CertificateList'
import Seo from '../components/ui/Seo'
import { COMPLIANCE_REPORTS } from '../data/certificates'

export default function ComplianceReports() {
  return (
    <>
      <Seo
        title="Compliance Report Certificates"
        description="Environmental compliance report certificates for Majestique Landmarks projects and group entities, available to download."
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

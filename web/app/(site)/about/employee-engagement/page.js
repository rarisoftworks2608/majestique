import View from '@/views/about/EmployeeEngagement'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Employee Engagement',
  description:
    "Photographs from life at Majestique Landmarks: Ganpati celebrations, the MPL season and Women's Day across our teams.",
  path: '/about/employee-engagement',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/legacy' },
  { name: 'Employee Engagement', path: '/about/employee-engagement' },
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

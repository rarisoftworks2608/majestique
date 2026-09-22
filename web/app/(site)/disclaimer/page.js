import View from '@/views/Disclaimer'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Disclaimer',
  description:
    "Disclaimer for the Majestique Landmarks website. Project information is being updated in line with RERA 2016; please verify all details independently.",
  path: '/disclaimer',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Disclaimer', path: '/disclaimer' },
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

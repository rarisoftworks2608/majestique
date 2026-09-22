import View from '@/views/media/Csr'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Corporate Social Responsibility',
  description:
    "Badlaav by Majestique — our CSR initiatives across Pune, from the Beat The Heat summer relief drive and river clean-ups to Diwali celebrations with children at Mahatma Gandhi School, Yerwada.",
  path: '/media/csr',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Media', path: '/media/press-coverage' },
  { name: 'CSR', path: '/media/csr' },
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

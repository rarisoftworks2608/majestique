import View from '@/views/about/PeopleCulture'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'People & Culture',
  description:
    "The people who build Majestique Landmarks and the culture behind them: excellence, belonging and purpose-driven work.",
  path: '/about/people-culture',
})

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/legacy' },
  { name: 'People & Culture', path: '/about/people-culture' },
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

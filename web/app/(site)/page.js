import View from '@/views/Home'
import { buildMetadata, breadcrumbSchema } from '@/lib/site'

export const metadata = buildMetadata({
  title: { absolute: 'Majestique Landmarks | Luxury Real Estate Developer in Pune' },
  description: "Pune's premier luxury real estate developer, with 20M+ sq ft under development, 18,000+ happy families, and 30+ landmark developments across Pune's finest addresses.",
  path: "/",
})

export default function Page() {
  return (
    <>
      <View />
    </>
  )
}

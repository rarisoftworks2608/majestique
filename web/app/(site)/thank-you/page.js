import { Suspense } from 'react'
import View from '@/views/ThankYou'
import { buildMetadata } from '@/lib/site'

export const metadata = {
  ...buildMetadata({
    title: 'Thank You',
    description: 'Thank you for contacting Majestique Landmarks. Our team will be in touch shortly.',
    path: '/thank-you',
  }),
  /* A confirmation page has no value in search results, and indexing it would
     let people land here without ever submitting a form. */
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <View />
    </Suspense>
  )
}

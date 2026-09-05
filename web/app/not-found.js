import SiteChrome from '@/components/layout/SiteChrome'
import NotFoundView from '@/views/NotFound'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
}

/* Root-level not-found renders outside the (site) group, so it pulls in the
   site chrome itself to keep header/footer navigation available. */
export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundView />
    </SiteChrome>
  )
}

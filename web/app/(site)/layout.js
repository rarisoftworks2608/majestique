import SiteChrome from '@/components/layout/SiteChrome'

/* Public-site chrome (navbar / footer / smooth scroll). The admin panel
   lives outside this group so it never loads the marketing chrome. */
export default function SiteLayout({ children }) {
  return <SiteChrome>{children}</SiteChrome>
}

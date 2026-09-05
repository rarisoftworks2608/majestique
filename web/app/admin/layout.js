/* The whole admin surface is kept out of search indexes. Applied at the
   /admin layout so it covers the login page and every dashboard route. */
export const metadata = {
  title: { default: 'Admin', template: '%s | Majestique Admin' },
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminRootLayout({ children }) {
  return children
}

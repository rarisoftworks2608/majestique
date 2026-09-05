'use client'

import { AuthProvider } from '@/context/AuthContext'

/* Client boundary for app-wide context. Kept deliberately thin: the admin
   auth context is the only global client state, and page content is passed
   through as `children` so it stays a Server Component. */
export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

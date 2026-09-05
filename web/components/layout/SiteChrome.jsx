'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCTA from '../ui/FloatingCTA'
import { initLenis, destroyLenis, scrollToTop } from '../../lib/lenis'

/* Replaces the old react-router Layout. `children` arrives as an already-
   rendered Server Component tree, so wrapping it here does not pull page
   content into the client bundle.

   The previous AnimatePresence page-transition wrapper was removed: it
   required the whole page subtree to be a client component and delayed
   first paint on navigation, which is the single biggest LCP regression
   risk in a Next App Router port. Next's own streaming navigation covers
   the same perceived-smoothness need. */
export default function SiteChrome({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useEffect(() => {
    scrollToTop(true)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}

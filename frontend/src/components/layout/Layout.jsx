import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCTA from '../ui/FloatingCTA'
import { initLenis, destroyLenis, scrollToTop } from '../../lib/lenis'

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
}

export default function Layout({ children }) {
  const { pathname } = useLocation()

  /* Init Lenis smooth scroll once */
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  /* Instant scroll-to-top on every route change */
  useEffect(() => {
    scrollToTop(true)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* Floating enquiry button — appears after 300px scroll, hidden on /contact */}
      <FloatingCTA />
    </div>
  )
}

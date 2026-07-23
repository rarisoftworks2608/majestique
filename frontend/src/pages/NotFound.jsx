import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/ui/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" noindex />
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--luxury-dark)' }}
      >
        {/* Decorative ambient glow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: '640px', height: '640px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(157,134,104,0.18) 0%, transparent 70%)' }}
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />

        <div className="text-center px-6 relative">
          <motion.p
            className="font-display mb-4"
            style={{ fontSize: '8rem', lineHeight: 1, color: 'rgba(157,134,104,0.18)' }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.7 },
              scale: { duration: 0.7 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
            }}
          >
            404
          </motion.p>
          <motion.h1
            className="font-times text-3xl font-normal mb-4"
            style={{ color: 'var(--beige)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>
          <motion.p
            className="font-body text-sm mb-8"
            style={{ color: 'rgba(243,239,232,0.88)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
          >
            <Link to="/" className="btn-gold inline-block transition-transform duration-300 hover:scale-105">
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

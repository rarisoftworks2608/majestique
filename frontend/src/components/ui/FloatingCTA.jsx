import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Bot } from 'lucide-react'
import { SITE_PHONE } from '../../utils/constants'

const HIDDEN_PATHS = ['/contact', '/admin']
const WHATSAPP_NUMBER = '917448099000'
const WHATSAPP_MSG = encodeURIComponent(
  'Hello! I am interested in Majestique Landmarks properties. Please share more details.'
)

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 right-6 z-40 flex flex-col gap-3 items-end"
        >
          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group flex items-center gap-0 overflow-hidden transition-all duration-300"
            style={{
              background: '#25D366',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
              borderRadius: '0',
              width: '48px',
              height: '48px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.width = '162px'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.width = '48px'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.35)'
            }}
            aria-label="Chat on WhatsApp"
          >
            <span className="flex items-center justify-center shrink-0" style={{ width: '48px', height: '48px' }}>
              <MessageCircle size={18} color="white" />
            </span>
            <span
              className="font-ui text-[0.58rem] tracking-[0.18em] uppercase whitespace-nowrap overflow-hidden pr-4"
              style={{ color: 'white', maxWidth: '120px' }}
            >
              WhatsApp
            </span>
          </motion.a>

          {/* Call */}
          <motion.a
            href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group flex items-center gap-0 overflow-hidden transition-all duration-300"
            style={{
              background: '#050505',
              border: '1px solid rgba(157,134,104,0.35)',
              boxShadow: '0 4px 20px rgba(5,5,5,0.45)',
              borderRadius: '0',
              width: '48px',
              height: '48px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.width = '162px'
              e.currentTarget.style.borderColor = '#9D8668'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(5,5,5,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.width = '48px'
              e.currentTarget.style.borderColor = 'rgba(157,134,104,0.35)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,5,5,0.45)'
            }}
            aria-label={`Call ${SITE_PHONE}`}
          >
            <span className="flex items-center justify-center shrink-0" style={{ width: '48px', height: '48px' }}>
              <Phone size={17} color="#9D8668" />
            </span>
            <span
              className="font-ui text-[0.58rem] tracking-[0.18em] uppercase whitespace-nowrap overflow-hidden pr-4"
              style={{ color: '#9D8668', maxWidth: '120px' }}
            >
              Call Us
            </span>
          </motion.a>

          {/* Bot / Assistant — TODO: wire up destination once chat provider is decided */}
          <motion.button
            type="button"
            onClick={() => console.log('TODO: wire up bot/chat action')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.19, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group flex items-center gap-0 overflow-hidden transition-all duration-300"
            style={{
              background: '#9D8668',
              boxShadow: '0 4px 20px rgba(157,134,104,0.4)',
              borderRadius: '0',
              width: '48px',
              height: '48px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.width = '162px'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(157,134,104,0.55)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.width = '48px'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(157,134,104,0.4)'
            }}
            aria-label="Chat with us"
          >
            <span className="flex items-center justify-center shrink-0" style={{ width: '48px', height: '48px' }}>
              <Bot size={18} color="white" />
            </span>
            <span
              className="font-ui text-[0.58rem] tracking-[0.18em] uppercase whitespace-nowrap overflow-hidden pr-4"
              style={{ color: 'white', maxWidth: '120px' }}
            >
              Chat with us
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

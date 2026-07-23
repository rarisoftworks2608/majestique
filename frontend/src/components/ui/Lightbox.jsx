import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, activeIndex, onClose, onNext, onPrev }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft') onPrev()
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (activeIndex === null) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: 'rgba(5,5,5,0.96)' }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center z-10 transition-colors duration-200"
          style={{ border: '1px solid rgba(157,134,104,0.4)', color: 'var(--gold)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--luxury-dark)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
        >
          <X size={18} />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 transition-all duration-200"
            style={{ border: '1px solid rgba(157,134,104,0.3)', color: 'var(--gold)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(157,134,104,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[85vh] mx-16"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[activeIndex]?.url || images[activeIndex]}
            alt={images[activeIndex]?.caption || `Image ${activeIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain"
            style={{ boxShadow: '0 24px 80px rgba(5,5,5,0.8)' }}
          />
          {images[activeIndex]?.caption && (
            <p
              className="absolute bottom-0 left-0 right-0 text-center py-3 font-body text-sm"
              style={{ background: 'rgba(5,5,5,0.7)', color: 'rgba(243,239,232,0.7)' }}
            >
              {images[activeIndex].caption}
            </p>
          )}
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 transition-all duration-200"
            style={{ border: '1px solid rgba(157,134,104,0.3)', color: 'var(--gold)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(157,134,104,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Counter */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 font-ui text-xs tracking-widest"
          style={{ color: 'rgba(157,134,104,0.6)' }}
        >
          {activeIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

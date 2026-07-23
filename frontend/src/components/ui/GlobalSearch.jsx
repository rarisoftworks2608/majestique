import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SEARCH_SECTIONS = [
  { label: 'Ongoing Projects', path: '/projects/ongoing', category: 'Projects' },
  { label: 'Completed Projects', path: '/projects/completed', category: 'Projects' },
  { label: 'Redevelopment', path: '/redevelopment', category: 'Services' },
  { label: 'Press Coverage', path: '/media/press-coverage', category: 'Media' },
  { label: 'Announcements', path: '/media/announcements', category: 'Media' },
  { label: 'Events', path: '/media/events', category: 'Media' },
  { label: 'Blogs', path: '/media/blogs', category: 'Media' },
  { label: 'Testimonials', path: '/media/testimonials', category: 'Media' },
  { label: 'Our Legacy', path: '/about/legacy', category: 'About' },
  { label: 'Leadership', path: '/about/leadership', category: 'About' },
  { label: 'Milestones', path: '/about/milestones', category: 'About' },
  { label: 'Vision & Mission', path: '/about/vision-mission', category: 'About' },
  { label: 'Careers', path: '/careers', category: 'Company' },
  { label: 'Contact Us', path: '/contact', category: 'Company' },
  { label: 'Newsletter', path: '/media/newsletter', category: 'Media' },
]

const BROWSE = [
  { label: 'Ongoing Projects', path: '/projects/ongoing' },
  { label: 'Completed Projects', path: '/projects/completed' },
  { label: 'Press Coverage', path: '/media/press-coverage' },
  { label: 'Events', path: '/media/events' },
  { label: 'Blogs', path: '/media/blogs' },
  { label: 'Contact Us', path: '/contact' },
]

const POPULAR = [
  '3BHK Luxury Homes',
  'Kharadi Apartments',
  'Redevelopment Pune',
  'New Launch 2025',
  'Schedule a Site Visit',
  'Baner Projects',
]

export default function GlobalSearch({ isOpen, onClose }) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = query.length > 1
    ? SEARCH_SECTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavigate = (path) => {
    navigate(path)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) handleNavigate(filtered[0].path)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[300] flex flex-col"
          style={{
            background: 'rgba(243,239,232,0.98)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
        >
          {/* Gold accent line top */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #9D8668, #736452, transparent)' }} />

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 lg:px-16 py-5"
            style={{ borderBottom: '1px solid rgba(157,134,104,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full" style={{ background: '#9D8668' }} />
              <span className="font-ui text-[0.56rem] tracking-[0.32em] uppercase font-semibold"
                style={{ color: '#9D8668' }}>
                Majestique Landmarks &nbsp;/&nbsp; Search
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2.5 group transition-all duration-200"
            >
              <span className="font-ui text-[0.6rem] tracking-[0.22em] uppercase font-bold transition-colors duration-200"
                style={{ color: 'rgba(5,5,5,0.55)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#9D8668')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(5,5,5,0.55)')}>
                Close
              </span>
              <div
                className="w-9 h-9 flex items-center justify-center border transition-all duration-200 group-hover:border-[#9D8668] group-hover:bg-[rgba(157,134,104,0.08)]"
                style={{ borderColor: 'rgba(5,5,5,0.15)', color: 'rgba(5,5,5,0.5)' }}
              >
                <X size={15} />
              </div>
              <span className="font-ui text-[0.52rem] tracking-widest uppercase hidden sm:block"
                style={{ color: 'rgba(157,134,104,0.5)' }}>
                [ESC]
              </span>
            </button>
          </div>

          {/* Main search area */}
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 pb-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-3xl mx-auto"
            >
              {/* Label */}
              <p className="font-ui text-[0.56rem] tracking-[0.36em] uppercase mb-8 text-center font-semibold"
                style={{ color: '#9D8668' }}>
                ✦ &nbsp; What are you looking for? &nbsp; ✦
              </p>

              {/* Search input */}
              <div className="relative mb-10"
                style={{ borderBottom: '2px solid #9D8668' }}>
                <Search size={22} className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(157,134,104,0.6)' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, media, pages…"
                  className="w-full bg-transparent outline-none pl-10 pr-4 py-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    color: '#050505',
                    caretColor: '#9D8668',
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Results / suggestions */}
              <AnimatePresence mode="wait">
                {query.length > 1 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-10"
                  >
                    {filtered.length === 0 ? (
                      <p className="font-body text-sm text-center" style={{ color: 'rgba(5,5,5,0.4)' }}>
                        No results found for &ldquo;{query}&rdquo;
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {filtered.slice(0, 6).map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left group transition-all duration-200"
                            style={{
                              border: '1px solid rgba(157,134,104,0.18)',
                              background: '#fff',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#9D8668'
                              e.currentTarget.style.background = 'rgba(157,134,104,0.06)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(157,134,104,0.18)'
                              e.currentTarget.style.background = '#fff'
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <span className="font-ui text-[0.52rem] tracking-[0.22em] uppercase px-2.5 py-1 font-semibold"
                                style={{ color: '#fff', background: '#9D8668' }}>
                                {item.category}
                              </span>
                              <span className="font-ui text-[0.78rem] tracking-[0.1em] uppercase font-bold"
                                style={{ color: '#1A1A1A' }}>
                                {item.label}
                              </span>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: '#9D8668' }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="suggestions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Browse section label */}
                    <p className="font-ui text-[0.52rem] tracking-[0.3em] uppercase mb-4 font-semibold"
                      style={{ color: 'rgba(157,134,104,0.7)' }}>
                      Browse
                    </p>

                    {/* Browse cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-10">
                      {BROWSE.map((s) => (
                        <button
                          key={s.path}
                          onClick={() => handleNavigate(s.path)}
                          className="flex items-center justify-between px-5 py-4 text-left group transition-all duration-200"
                          style={{
                            border: '1px solid rgba(157,134,104,0.2)',
                            background: '#fff',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#9D8668'
                            e.currentTarget.style.background = 'rgba(157,134,104,0.06)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(157,134,104,0.2)'
                            e.currentTarget.style.background = '#fff'
                          }}
                        >
                          <span className="font-ui text-[0.68rem] tracking-[0.12em] uppercase font-bold"
                            style={{ color: '#1A1A1A' }}>
                            {s.label}
                          </span>
                          <ArrowRight size={12}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                            style={{ color: '#9D8668', flexShrink: 0 }} />
                        </button>
                      ))}
                    </div>

                    {/* Popular searches */}
                    <div className="flex flex-wrap gap-2 justify-center items-center pt-6"
                      style={{ borderTop: '1px solid rgba(157,134,104,0.15)' }}>
                      <div className="flex items-center gap-1.5 mr-2">
                        <TrendingUp size={11} style={{ color: '#9D8668' }} />
                        <span className="font-ui text-[0.54rem] tracking-[0.24em] uppercase font-semibold"
                          style={{ color: '#9D8668' }}>
                          Popular
                        </span>
                      </div>
                      {POPULAR.map((q) => (
                        <button
                          key={q}
                          onClick={() => setQuery(q)}
                          className="font-ui text-[0.62rem] tracking-wider uppercase font-semibold px-3.5 py-2 transition-all duration-200"
                          style={{
                            color: 'rgba(5,5,5,0.55)',
                            border: '1px solid rgba(157,134,104,0.22)',
                            background: 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#fff'
                            e.currentTarget.style.background = '#9D8668'
                            e.currentTarget.style.borderColor = '#9D8668'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(5,5,5,0.55)'
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.borderColor = 'rgba(157,134,104,0.22)'
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

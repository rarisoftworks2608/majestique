import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import { CSR_INTRO, CSR_INITIATIVES, CSR_PHOTO_COUNT } from '../../data/csr'

const HERO = '/images/csr/badlaav/09.jpg'

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Csr() {
  /* the lightbox tracks which initiative and which photo within it, so the
     arrows walk one album without spilling into the next */
  const [view, setView] = useState(null)
  const album = view ? CSR_INITIATIVES[view.a] : null

  const step = (delta) => {
    if (!view) return
    const n = CSR_INITIATIVES[view.a].photos.length
    setView({ a: view.a, i: (view.i + delta + n) % n })
  }

  useEffect(() => {
    if (!view) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setView(null)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  })

  return (
    <>
      <Seo
        title="Corporate Social Responsibility"
        description="Badlaav by Majestique — our CSR initiatives across Pune, from summer relief and river clean-ups to Diwali with children at Mahatma Gandhi School, Yerwada."
      />
      <PageHero
        title="Corporate Social Responsibility"
        subtitle="Badlaav by Majestique — a shared mission to ignite meaningful transformation"
        bgImage={HERO}
      />

      {/* ── Intro ───────────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.28),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(212,175,55,0.04)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            BADLAAV
          </span>
        </div>

        <div className="container-luxury relative">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="section-label mb-4" style={{ color: 'var(--gold-dark)' }}>{CSR_INTRO.label}</p>
            <h2
              className="font-times font-normal leading-tight mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}
            >
              {CSR_INTRO.title}
            </h2>
            <div className="w-16 h-px mx-auto mb-7" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              {CSR_INTRO.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Initiatives ─────────────────────────────────────────── */}
      {CSR_INITIATIVES.map((init, a) => {
        const dark = a % 2 === 1
        return (
          <section
            key={init.slug}
            className="section-pad relative overflow-hidden"
            style={{ background: dark ? 'var(--luxury-dark)' : '#fff' }}
          >
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: `linear-gradient(90deg,transparent,rgba(212,175,55,${dark ? 0.5 : 0.22}),transparent)` }}
            />

            <div className="container-luxury relative">
              {/* Editorial header: cover image beside the copy, sides swapping per section */}
              <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14 ${dark ? 'lg:[direction:rtl]' : ''}`}>
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-6 relative"
                  style={{ direction: 'ltr' }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                    <img
                      src={init.cover}
                      alt={`${init.title} — Majestique Landmarks CSR`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="absolute font-ui text-[10px] tracking-[0.28em] uppercase px-4 py-2"
                    style={{ top: 0, left: 0, background: 'var(--gold)', color: 'var(--luxury-dark)' }}
                  >
                    {init.year}
                  </span>
                </motion.div>

                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  className="lg:col-span-6"
                  style={{ direction: 'ltr' }}
                >
                  <p className="section-label mb-4" style={{ color: dark ? 'rgba(212,175,55,0.85)' : 'var(--gold-dark)' }}>
                    {init.label}
                  </p>
                  <h2
                    className="font-times font-normal leading-tight mb-6"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: dark ? 'var(--beige)' : 'var(--luxury-dark)' }}
                  >
                    {init.title}
                  </h2>
                  <div className="w-14 h-px mb-7" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />

                  {init.body.map((para, i) => (
                    <p
                      key={i}
                      className="font-body text-sm leading-relaxed mb-4 last:mb-0"
                      style={{ color: dark ? 'rgba(243,239,232,0.6)' : 'rgba(26,26,26,0.82)' }}
                    >
                      {para}
                    </p>
                  ))}

                  {init.pullQuote && (
                    <p
                      className="font-times italic mt-7 pl-5"
                      style={{
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                        color: dark ? 'var(--gold-light)' : 'var(--gold-dark)',
                        borderLeft: '2px solid rgba(212,175,55,0.5)',
                      }}
                    >
                      {init.pullQuote}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Gallery */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-ui text-[11px] tracking-[0.22em] uppercase" style={{ color: dark ? 'rgba(212,175,55,0.8)' : 'var(--gold-dark)' }}>
                  From the day
                </span>
                <span className="flex-1 h-px" style={{ background: `rgba(212,175,55,${dark ? 0.25 : 0.2})` }} />
                <span className="flex items-center gap-2 font-body text-xs" style={{ color: dark ? 'rgba(243,239,232,0.55)' : 'rgba(26,26,26,0.6)' }}>
                  <Camera size={12} style={{ color: 'var(--gold)' }} /> {init.photos.length} photographs
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {init.photos.map((src, i) => (
                  <motion.button
                    key={src}
                    type="button"
                    onClick={() => setView({ a, i })}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.4) }}
                    className="group relative overflow-hidden"
                    style={{
                      aspectRatio: '4/3',
                      background: dark ? 'rgba(255,255,255,0.03)' : 'var(--cream)',
                      border: `1px solid rgba(212,175,55,${dark ? 0.22 : 0.16})`,
                    }}
                    aria-label={`${init.title}, photo ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${init.label} — photo ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.4), transparent 60%)' }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'var(--luxury-dark2)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="absolute top-5 left-5 w-8 h-8 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2" style={{ color: 'rgba(212,175,55,0.75)' }}>
              {CSR_PHOTO_COUNT} photographs across {CSR_INITIATIVES.length} initiatives
            </p>
            <h2 className="font-times text-2xl font-normal" style={{ color: 'var(--beige)' }}>
              The work continues. So does the invitation to join it.
            </h2>
          </div>
          <Link to="/contact" className="btn-gold inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            Get In Touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────── */}
      <AnimatePresence>
        {view && album && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            style={{ background: 'rgba(18,18,18,0.97)' }}
            onClick={() => setView(null)}
          >
            <button
              type="button"
              onClick={() => setView(null)}
              aria-label="Close"
              className="absolute top-6 right-6 p-2"
              style={{ color: 'rgba(243,239,232,0.7)' }}
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous photo"
              className="absolute left-4 md:left-10 p-3"
              style={{ color: 'rgba(243,239,232,0.7)' }}
            >
              <ChevronLeft size={30} />
            </button>

            <motion.div
              key={`${view.a}-${view.i}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
              style={{ width: 'min(1100px, 88vw)', height: 'min(76vh, 800px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={album.photos[view.i]}
                alt={`${album.label} — photo ${view.i + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next photo"
              className="absolute right-4 md:right-10 p-3"
              style={{ color: 'rgba(243,239,232,0.7)' }}
            >
              <ChevronRight size={30} />
            </button>

            <p
              className="absolute bottom-6 inset-x-0 text-center font-ui text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'rgba(243,239,232,0.55)' }}
            >
              {album.label} {album.year} — {view.i + 1} / {album.photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

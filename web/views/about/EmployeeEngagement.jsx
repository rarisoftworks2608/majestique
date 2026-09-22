'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import { ENGAGEMENT_ALBUMS, ENGAGEMENT_PHOTO_COUNT } from '../../data/engagementAlbums'
import heroImg from '../../assets/carrers.jpg'

export default function EmployeeEngagement() {
  /* lightbox holds the album index and the photo index within it, so the
     arrows can walk through one album without leaving it */
  const [view, setView] = useState(null)

  const album = view ? ENGAGEMENT_ALBUMS[view.a] : null
  const step = (delta) => {
    if (!view) return
    const count = ENGAGEMENT_ALBUMS[view.a].photos.length
    setView({ a: view.a, i: (view.i + delta + count) % count })
  }

  /* Escape closes, arrows walk the album, and the page behind must not scroll
     while the lightbox is up. */
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
      <PageHero
        title="Employee Engagement"
        subtitle="Festivals, tournaments and the everyday moments that make Majestique more than a workplace"
        bgImage={heroImg}
      />

      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }} />

        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Life at Majestique"
              title={<>Moments We <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Share</em></>}
              subtitle={`${ENGAGEMENT_PHOTO_COUNT} photographs across ${ENGAGEMENT_ALBUMS.length} albums, from Ganpati mornings to the MPL finals.`}
              align="center"
            />
          </div>

          {ENGAGEMENT_ALBUMS.map((alb, a) => (
            <div key={alb.slug} className="mb-16 last:mb-0">
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="font-times font-normal" style={{ fontSize: '1.4rem', color: 'var(--luxury-dark)' }}>
                  {alb.title}
                </h2>
                <span className="font-ui text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--gold-dark)' }}>
                  {alb.year}
                </span>
                <span className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.2)' }} />
                <span className="font-body" style={{ fontSize: '0.75rem', color: 'rgba(26,26,26,0.45)' }}>
                  {alb.photos.length} photos
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {alb.photos.map((src, i) => (
                  <motion.button
                    key={src}
                    type="button"
                    onClick={() => setView({ a, i })}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.4) }}
                    className="group relative overflow-hidden"
                    style={{ aspectRatio: '4/3', background: '#fff', border: '1px solid rgba(212,175,55,0.16)' }}
                    aria-label={`${alb.title} ${alb.year}, photo ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${alb.title} ${alb.year} — photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.35), transparent 60%)' }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
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
              <Image
                src={album.photos[view.i]}
                alt={`${album.title} ${album.year} — photo ${view.i + 1}`}
                fill
                sizes="88vw"
                className="object-contain"
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
              {album.title} {album.year} — {view.i + 1} / {album.photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

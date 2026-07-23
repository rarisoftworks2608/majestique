import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Newspaper,
  Calendar, ArrowRight,
} from 'lucide-react'
import Seo from '../../components/ui/Seo'
import SectionHeader from '../../components/ui/SectionHeader'
import PageHero from '../../components/ui/PageHero'
import imgHero from '../../assets/real-estate-press-relese.jpg'
import { CLIPPINGS, CATEGORY_META, CATEGORIES, PUBLICATIONS } from '../../data/pressCoverage'

/* ── Animation helpers ───────────────────────────────────────────── */
const fU = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ── Regular Clipping Card ───────────────────────────────────────── */
function ClippingCard({ item, idx, onViewClipping }) {
  const CatIcon = CATEGORY_META[item.category]?.icon || Newspaper
  const catColor = CATEGORY_META[item.category]?.color || '#9d8668'
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="button"
      tabIndex={0}
      aria-label={`Read press coverage: ${item.headline}`}
      className="group flex flex-col overflow-hidden bg-white cursor-pointer"
      style={{
        border: '1px solid rgba(157,134,104,0.14)',
        boxShadow: '0 2px 16px rgba(5,5,5,0.05)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
      onClick={onViewClipping}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onViewClipping() } }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 56px rgba(5,5,5,0.12)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Top rule */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${item.pubColor}, transparent)` }} />

      {/* Newspaper image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3', background: '#f9f6f1', flexShrink: 0 }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.headline}
            className="w-full h-full object-contain p-2.5 transition-transform duration-600 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F9F5EF 0%, #EAE3D8 50%, #F3EFE8 100%)' }}>
            <div className="text-center">
              <div
                className="w-14 h-14 flex items-center justify-center mx-auto mb-2"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 8px 24px rgba(157,134,104,0.35)' }}
              >
                <Newspaper size={22} style={{ color: '#fff' }} />
              </div>
              <span className="font-ui text-[0.44rem] tracking-[0.22em] uppercase" style={{ color: 'rgba(157,134,104,0.6)' }}>
                {item.publication}
              </span>
            </div>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className="flex items-center gap-1 font-ui text-[0.44rem] tracking-[0.22em] uppercase px-2 py-0.5"
            style={{ background: catColor, color: '#fff' }}
          >
            <CatIcon size={8} /> {item.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-ui text-[0.46rem] tracking-[0.22em] uppercase px-2 py-0.5"
            style={{ background: `${item.pubColor}14`, color: item.pubColor, border: `1px solid ${item.pubColor}28` }}
          >
            {item.publication}
          </span>
          <span className="flex items-center gap-1 font-ui text-[0.44rem] tracking-widest" style={{ color: 'rgba(44,62,88,0.36)' }}>
            <Calendar size={8} /> {item.date}
          </span>
        </div>

        <h3
          className="font-times font-normal leading-snug mb-2"
          style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', color: 'var(--luxury-dark)', letterSpacing: '0.005em' }}
        >
          {item.headline}
        </h3>

        <p className="font-body leading-relaxed mb-4 flex-1" style={{ fontSize: '0.78rem', color: 'rgba(26,26,26,0.82)', lineHeight: 1.7 }}>
          {item.excerpt}
        </p>

        <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(157,134,104,0.1)' }}>
          <span className="font-ui text-[0.44rem] tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.5)' }}>
            {item.type}
          </span>
          <span
            className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'var(--gold)' }}
          >
            <ArrowRight size={10} color="white" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function PressEvents() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedYear,   setSelectedYear]   = useState('all')

  // Unique years, descending
  const years = useMemo(() => {
    const ys = [...new Set(CLIPPINGS.map(c => new Date(c.dateISO).getFullYear()))]
    return ys.sort((a, b) => b - a)
  }, [])

  // Filter by category + year, sorted newest first
  const filtered = useMemo(() => {
    let base = CLIPPINGS
    if (activeCategory !== 'All') base = base.filter(c => c.category === activeCategory)
    if (selectedYear   !== 'all') base = base.filter(c => new Date(c.dateISO).getFullYear() === Number(selectedYear))
    return [...base].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
  }, [activeCategory, selectedYear])

  // Group filtered items by year, descending
  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(c => {
      const y = new Date(c.dateISO).getFullYear()
      if (!map[y]) map[y] = []
      map[y].push(c)
    })
    return Object.entries(map).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [filtered])

  const stats = [
    { v: `${CLIPPINGS.length}+`, l: 'Press Features' },
    { v: `${PUBLICATIONS.length}`, l: 'Publications' },
    { v: `${CLIPPINGS.filter(c => c.category === 'Awards').length}`, l: 'Award Features' },
    { v: `${CLIPPINGS.filter(c => c.category === 'CSR').length}`, l: 'CSR Stories' },
  ]

  return (
    <>
      <Seo
        title="Press Coverage — Majestique Landmarks in the Media"
        description="Read editorial features, award announcements, CSR stories, and press recognition of Majestique Landmarks across India's leading publications — Economic Times, Times of India, Lokmat, Pudhari, and Sakal."
      />

      <PageHero
        label="Media"
        title="Press Coverage"
        subtitle="Editorial features, award announcements, and press recognition — Majestique Landmarks as covered by India's leading media houses."
        breadcrumbs={[{ label: 'Media', href: '/media/press-coverage' }, { label: 'Press Coverage' }]}
        bgImage={imgHero}
      />

      {/* ── Stats Band ───────────────────────────────────────────── */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9d8668 0%, #c4a455 28%, #d4b465 55%, #b89050 80%, #9d8668 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(255,230,130,0.22) 0%, transparent 55%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/20">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-8 px-4"
              >
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#fff' }}>
                  {s.v}
                </p>
                <div className="w-6 h-px mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.38)' }} />
                <p className="font-ui text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + All Clippings ────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.18),transparent)' }} />
        <div className="container-luxury">

          <div className="mb-12 text-center">
            <SectionHeader
              label="All Press Coverage"
              title={<>Media Stories &amp; <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Recognition</em></>}
              subtitle="A curated archive of our press coverage — from CSR initiatives to brand milestones across Pune's leading publications."
              align="center"
            />
          </div>

          {/* ── Category filter ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {CATEGORIES.map(cat => {
              const CatIcon = CATEGORY_META[cat]?.icon || Newspaper
              const catColor = CATEGORY_META[cat]?.color || '#9d8668'
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase px-5 py-3 transition-all duration-300"
                  style={{
                    background: isActive ? catColor : 'transparent',
                    color:      isActive ? '#fff' : 'rgba(26,26,26,0.82)',
                    border:     `1px solid ${isActive ? catColor : 'rgba(157,134,104,0.28)'}`,
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = catColor; e.currentTarget.style.color = catColor } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.28)'; e.currentTarget.style.color = 'rgba(26,26,26,0.82)' } }}
                >
                  <CatIcon size={10} /> {cat}
                </button>
              )
            })}
          </div>

          {/* ── Year filter dropdown ── */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="font-ui text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Filter by Year
            </span>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="font-ui text-xs tracking-[0.12em] uppercase appearance-none pr-9 pl-4 py-3 cursor-pointer outline-none transition-all duration-300"
                style={{
                  background:   'white',
                  color:        'var(--ink)',
                  border:       '1px solid rgba(157,134,104,0.40)',
                  minWidth:     '130px',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(157,134,104,0.40)')}
              >
                <option value="all">All Years</option>
                {years.map(yr => (
                  <option key={yr} value={String(yr)}>{yr}</option>
                ))}
              </select>
              {/* Chevron icon */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── Year-grouped clippings ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${selectedYear}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {grouped.length === 0 ? (
                <div className="text-center py-20">
                  <Newspaper size={40} className="mx-auto mb-4" style={{ color: 'rgba(157,134,104,0.25)' }} />
                  <p className="font-times text-xl" style={{ color: 'rgba(26,26,26,0.65)' }}>No coverage found for this filter.</p>
                </div>
              ) : (
                grouped.map(([year, items]) => (
                  <div key={year} className="mb-14">
                    {/* Year header */}
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="font-display font-light leading-none select-none"
                        style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', color: 'var(--gold)', opacity: 0.85, letterSpacing: '-0.03em' }}
                      >
                        {year}
                      </span>
                      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(157,134,104,0.45), transparent)' }} />
                      <span className="font-ui text-[0.46rem] tracking-[0.26em] uppercase" style={{ color: 'rgba(44,62,88,0.35)', whiteSpace: 'nowrap' }}>
                        {items.length} {items.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>

                    {/* Items grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {items.map((item, idx) => (
                        <ClippingCard key={item.id} item={item} idx={idx}
                          onViewClipping={() => navigate(`/media/press-coverage/${item.slug}`)} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Publications Strip ────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 relative"
        style={{ background: 'var(--cream)', borderTop: '1px solid rgba(157,134,104,0.15)' }}
      >
        <div className="container-luxury">
          <p className="font-ui text-[0.48rem] tracking-[0.36em] uppercase text-center mb-10" style={{ color: 'rgba(157,134,104,0.6)' }}>
            As Featured In India&apos;s Leading Publications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {PUBLICATIONS.map((pub, i) => (
              <motion.div
                key={pub.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className="w-20 h-20 flex items-center justify-center transition-all duration-350"
                  style={{
                    border: '1px solid rgba(157,134,104,0.2)',
                    background: 'white',
                    boxShadow: '0 2px 12px rgba(5,5,5,0.05)',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 28px ${pub.color}22`; e.currentTarget.style.borderColor = `${pub.color}55` }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,5,5,0.05)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.2)' }}
                >
                  <span
                    className="font-display font-light"
                    style={{ fontSize: '0.92rem', color: pub.color, letterSpacing: '0.06em' }}
                  >
                    {pub.abbr}
                  </span>
                </div>
                <span className="font-ui text-[0.44rem] tracking-[0.18em] uppercase text-center" style={{ color: 'rgba(10,10,10,0.4)', maxWidth: '80px' }}>
                  {pub.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.05) 0%, transparent 68%)' }} />
        {/* Corner brackets */}
        {[['top-6 left-6','border-l border-t'],['top-6 right-6','border-r border-t'],['bottom-6 left-6','border-l border-b'],['bottom-6 right-6','border-r border-b']].map(([pos, border]) => (
          <div key={pos} className={`absolute ${pos} w-10 h-10 ${border} opacity-20`} style={{ borderColor: 'var(--gold)' }} />
        ))}

        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Build With A Brand You Trust</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Majestique Landmarks —<br />Recognized by Those Who Matter Most
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Endorsed by India's leading media houses and validated by 18,000+ satisfied families —
              Majestique Landmarks remains Pune's most trusted real estate brand.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold">Explore Our Projects</Link>
              <Link to="/media/awards" className="btn-outline-dark">View Awards</Link>
              <Link to="/contact" className="btn-outline-dark">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}

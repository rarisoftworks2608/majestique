import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, ArrowRight, Trophy, Rocket } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import { newsApi } from '../../services/api'
import { formatDate, truncate, getImageUrl } from '../../utils/helpers'
import Seo from '../../components/ui/Seo'
import newsHeroImg from '../../assets/Announcement.jpg'

const HIGHLIGHTS = [
  {
    id: 'hl-1',
    tag: 'Award',
    icon: Trophy,
    title: 'Real Estate Developer of the Year 2024',
    desc: 'Majestique Landmarks has been honoured with the prestigious "Real Estate Developer of the Year" award at the ET Business Awards 2024, recognising our commitment to quality, transparency, and timely delivery across Pune.',
    date: 'November 2024',
  },
  {
    id: 'hl-2',
    tag: 'Award',
    icon: Trophy,
    title: 'Most Promising Real Estate Brand of 2023',
    desc: 'Recognised as the Most Promising Real Estate Brand of 2023 — a testament to our rapid growth and customer-first philosophy in Pune\'s luxury residential market.',
    date: 'December 2023',
  },
  {
    id: 'hl-3',
    tag: 'Project Launch',
    icon: Rocket,
    title: 'Majestique Evolvus — Central Kharadi Launch',
    desc: 'We proudly announce the launch of Evolvus in Central Kharadi — offering 2, 3 & 4 BHK residences at one of Pune\'s most connected and sought-after addresses.',
    date: 'March 2024',
  },
]

function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden" style={{ background: 'var(--cream)', boxShadow: '0 2px 16px rgba(5,5,5,0.08)' }}>
      <div className="skeleton w-full" style={{ aspectRatio: '16/9' }} />
      <div className="p-6">
        <div className="skeleton h-3 w-24 mb-3 rounded" />
        <div className="skeleton h-6 w-full mb-2 rounded" />
        <div className="skeleton h-4 w-full mb-1 rounded" />
        <div className="skeleton h-4 w-3/4 mb-5 rounded" />
        <div className="skeleton h-3 w-28 rounded" />
      </div>
    </div>
  )
}

function NewsCard({ article, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-luxury overflow-hidden flex flex-col"
    >
      <Link
        to={`/media/news/${article.slug}`}
        className="block relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={getImageUrl(article.coverImage, '/images/news-placeholder.jpg')}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.querySelector('.img-fallback').style.display = 'flex'
          }}
        />
        <div className="img-fallback absolute inset-0 items-center justify-center"
          style={{ display: 'none', background: 'var(--luxury-dark2)' }}>
          <Newspaper size={36} style={{ color: 'rgba(157,134,104,0.25)' }} />
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'rgba(26,18,9,0.3)' }} />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="font-times font-normal text-xl leading-snug mb-3" style={{ color: 'var(--luxury-dark)' }}>
          <Link
            to={`/media/news/${article.slug}`}
            className="transition-colors duration-300"
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--luxury-dark)' }}
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(26,26,26,0.84)' }}>
            {truncate(article.excerpt, 120)}
          </p>
        )}
        <Link
          to={`/media/news/${article.slug}`}
          className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mt-auto transition-colors duration-300"
          style={{ color: 'var(--gold-dark)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
        >
          Read More <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function News() {
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading]         = useState(true)
  const [selectedYear, setSelectedYear] = useState('all')

  useEffect(() => {
    setLoading(true)
    newsApi.getAll({ limit: 500 })
      .then((res) => setAllArticles(res.data?.articles || []))
      .catch(() => setAllArticles([]))
      .finally(() => setLoading(false))
  }, [])

  /* ── Derived data ── */

  // Unique years extracted from articles, descending
  const years = useMemo(() => {
    const ys = [...new Set(
      allArticles.map((a) => new Date(a.publishedAt).getFullYear())
    )]
    return ys.sort((a, b) => b - a)
  }, [allArticles])

  // Filtered + sorted (newest first) list
  const filtered = useMemo(() => {
    const base = [...allArticles].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    )
    if (selectedYear === 'all') return base
    return base.filter(
      (a) => new Date(a.publishedAt).getFullYear() === Number(selectedYear)
    )
  }, [allArticles, selectedYear])

  // Grouped by year → [[year, articles[]], …] descending
  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach((a) => {
      const y = new Date(a.publishedAt).getFullYear()
      if (!map[y]) map[y] = []
      map[y].push(a)
    })
    return Object.entries(map).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [filtered])

  const handleYearChange = (yr) => {
    setSelectedYear(yr)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Seo
        title="Latest News"
        description="Stay updated with Majestique Landmarks' latest news — awards, project launches, milestones and announcements from Pune's premier luxury developer."
      />
      <PageHero
        title="Latest News"
        subtitle="Awards, project launches, milestones and announcements from Majestique"
        breadcrumb={['Home', 'Media', 'News']}
        bgImage={newsHeroImg}
      />

      {/* ── Company Highlights ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="container-luxury">
          <div className="mb-12">
            <SectionHeader
              label="Highlights"
              title="Company Milestones & Recognitions"
              subtitle="Key moments that define Majestique's journey as Pune's most trusted luxury real estate developer."
              align="center"
              light
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 flex flex-col"
                style={{ border: '1px solid rgba(157,134,104,0.18)', background: 'rgba(157,134,104,0.04)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.1 + 0.15 }}
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ border: '1px solid rgba(157,134,104,0.35)', background: 'rgba(157,134,104,0.08)' }}>
                    <item.icon size={18} style={{ color: 'var(--gold)' }} />
                  </motion.div>
                  <span className="font-ui text-xs tracking-wider uppercase px-2 py-0.5"
                    style={{ background: 'rgba(157,134,104,0.15)', color: 'var(--gold-dark)', border: '1px solid rgba(157,134,104,0.3)' }}>
                    {item.tag}
                  </span>
                </div>
                <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(243,239,232,0.4)' }}>
                  {item.date}
                </p>
                <h3 className="font-times text-xl leading-snug mb-3" style={{ color: 'var(--beige)' }}>{item.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(243,239,232,0.92)', fontWeight: 400 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Articles ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">

          {/* Header + filters row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeader label="Press & Media" title="All Articles" />

            {/* Year filter */}
            {!loading && years.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="font-ui text-[0.54rem] tracking-[0.22em] uppercase mr-1"
                  style={{ color: 'rgba(44,62,88,0.45)' }}>
                  Year
                </span>

                {/* All */}
                <button
                  onClick={() => handleYearChange('all')}
                  className="relative font-ui text-[0.54rem] tracking-[0.18em] uppercase px-4 py-2 transition-colors duration-300"
                  style={{
                    color: selectedYear === 'all' ? '#fff' : 'rgba(44,62,88,0.6)',
                    border: `1px solid ${selectedYear === 'all' ? 'var(--gold)' : 'rgba(157,134,104,0.30)'}`,
                  }}
                >
                  {selectedYear === 'all' && (
                    <motion.span layoutId="newsYearPill" className="absolute inset-0" style={{ background: 'var(--gold)', zIndex: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative" style={{ zIndex: 1 }}>All</span>
                </button>

                {years.map((yr) => {
                  const isActive = selectedYear === String(yr)
                  return (
                    <button
                      key={yr}
                      onClick={() => handleYearChange(String(yr))}
                      className="relative font-ui text-[0.54rem] tracking-[0.18em] uppercase px-4 py-2 transition-colors duration-300"
                      style={{
                        color: isActive ? '#fff' : 'rgba(44,62,88,0.6)',
                        border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(157,134,104,0.30)'}`,
                      }}
                    >
                      {isActive && (
                        <motion.span layoutId="newsYearPill" className="absolute inset-0" style={{ background: 'var(--gold)', zIndex: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative" style={{ zIndex: 1 }}>{yr}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => <NewsCardSkeleton key={i} />)}
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
              <p className="font-times text-2xl mb-2" style={{ color: 'var(--luxury-dark)' }}>
                {selectedYear === 'all' ? 'More articles coming soon' : `No articles found for ${selectedYear}`}
              </p>
              <p className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.5)' }}>
                Check back for the latest press and media coverage from Majestique.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {grouped.map(([year, items]) => (
                  <div key={year} className="mb-16">

                    {/* Year header */}
                    <div className="flex items-center gap-5 mb-8">
                      <span
                        className="font-display font-light leading-none select-none"
                        style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', color: 'var(--gold)', opacity: 0.85, letterSpacing: '-0.03em' }}
                      >
                        {year}
                      </span>
                      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(157,134,104,0.45), transparent)' }} />
                      <span className="font-ui text-[0.5rem] tracking-[0.28em] uppercase"
                        style={{ color: 'rgba(44,62,88,0.4)', whiteSpace: 'nowrap' }}>
                        {items.length} {items.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>

                    {/* Articles grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((article, i) => (
                        <NewsCard key={article.id} article={article} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </section>
    </>
  )
}

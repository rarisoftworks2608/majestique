import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import CountUp from '../../components/ui/CountUp'
import Seo from '../../components/ui/Seo'
import { ARTICLES, ARTICLE_CATEGORIES, ARTICLE_CATEGORY_META, ARTICLE_PUBLICATIONS } from '../../data/articles'
import imgHero from '../../assets/Article/Sakal_Valentine_2026.jpg'

/* ── Animation helpers ───────────────────────────────────────────── */
const fU = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
})

const FEATURED_ARTICLE = ARTICLES.find(a => a.featured) || ARTICLES[0]
const GRID_ARTICLES = ARTICLES.filter(a => a.id !== FEATURED_ARTICLE.id)

/* ── Premium Article Card — portrait "campaign poster" treatment ── */
function ArticleCard({ article, idx, onView }) {
  const catMeta = ARTICLE_CATEGORY_META[article.category] || { color: '#9d8668' }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.5), ease: [0.25, 0.46, 0.45, 0.94] }}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${article.headline}`}
      onClick={onView}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onView() } }}
      className="art-card group relative flex flex-col overflow-hidden bg-white cursor-pointer"
      style={{
        border: '1px solid rgba(157,134,104,0.16)',
        boxShadow: '0 4px 20px rgba(5,5,5,0.06)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 26px 64px rgba(5,5,5,0.16)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,5,5,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Poster image — portrait aspect for campaign creatives */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#f9f6f1' }}>
        <img
          src={article.image}
          alt={article.headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="art-shine absolute inset-0 pointer-events-none" aria-hidden />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.55) 100%)' }} />

        {/* Category ribbon corner */}
        <div className="absolute top-0 left-0">
          <div
            className="font-ui text-[0.42rem] tracking-[0.2em] uppercase px-3.5 py-1.5"
            style={{ background: catMeta.color, color: '#fff', clipPath: 'polygon(0 0, 100% 0, 86% 100%, 0% 100%)' }}
          >
            {article.category}
          </div>
        </div>

        {/* Publication badge */}
        <div className="absolute top-2.5 right-2.5">
          <span
            className="font-ui text-[0.5rem] font-bold tracking-widest px-2 py-1"
            style={{ background: 'rgba(5,5,5,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}
          >
            {article.publication}
          </span>
        </div>

        {/* Headline over image */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          <p className="flex items-center gap-1.5 font-ui text-[0.5rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(243,239,232,0.7)' }}>
            <Calendar size={9} /> {article.date}
          </p>
          <h3 className="font-times font-normal leading-snug" style={{ fontSize: '1.05rem', color: '#fff' }}>
            {article.headline}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-body leading-relaxed mb-4 flex-1" style={{ fontSize: '0.78rem', color: 'rgba(26,26,26,0.82)', lineHeight: 1.7 }}>
          {article.excerpt}
        </p>
        <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(157,134,104,0.1)' }}>
          <span className="font-ui text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--luxury-dark)' }}>
            View Article
          </span>
          <span
            className="w-7 h-7 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--gold)]"
            style={{ background: 'var(--luxury-dark)' }}
          >
            <ArrowRight size={12} color="white" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function Articles() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return GRID_ARTICLES
    return GRID_ARTICLES.filter(a => a.category === activeCategory)
  }, [activeCategory])

  const stats = [
    { value: `${ARTICLES.length}+`, label: 'Brand Articles' },
    { value: `${ARTICLE_PUBLICATIONS.length}`, label: 'Publications' },
    { value: `${ARTICLE_CATEGORIES.length - 1}`, label: 'Campaign Types' },
    { value: '3', label: 'Years Running' },
  ]

  return (
    <>
      <Seo
        title="Articles — Brand Campaigns & Features"
        description="Majestique Landmarks' brand articles, festive greetings, and publication features — creative campaigns shared with Pune across Lokmat, Sakal, Pudhari, Saamana, and Times of India."
      />

      <PageHero
        label="Media"
        title="Articles"
        subtitle="The brand stories, campaigns, and festive greetings we've shared with Pune — creative features published across the city's leading publications."
        breadcrumbs={[{ label: 'Media', href: '/media/articles' }, { label: 'Articles' }]}
        bgImage={imgHero}
      />

      {/* ── Stats Band ───────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9d8668 0%, #c4a455 28%, #d4b465 55%, #b89050 80%, #9d8668 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(255,230,130,0.25) 0%, transparent 55%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-9 px-4 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.24)', transition: 'transform 0.35s ease' }}
              >
                <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)' }} />
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', color: '#fff' }}>
                  <CountUp value={s.value} />
                </p>
                <div className="w-7 h-px mx-auto mb-2.5" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <p className="font-ui text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Article — dark spotlight ───────────────────── */}
      {FEATURED_ARTICLE && (
        <section className="relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 12% 15%, rgba(157,134,104,0.22) 0%, transparent 55%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 88% 85%, rgba(157,134,104,0.14) 0%, transparent 50%)' }} />
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />

          <div className="container-luxury relative py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                  <img src={FEATURED_ARTICLE.image} alt={FEATURED_ARTICLE.headline} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(5,5,5,0.75) 100%)' }} />
                </div>
                <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 hidden sm:block" style={{ borderColor: 'var(--gold)' }} />
                <div className="absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 hidden sm:block" style={{ borderColor: 'var(--gold)' }} />
                <div
                  className="absolute -bottom-5 left-5 sm:left-8 flex items-center gap-2 px-4 py-2.5"
                  style={{ background: 'var(--gold)', boxShadow: '0 14px 34px rgba(157,134,104,0.5)' }}
                >
                  <Sparkles size={13} color="#1A1A1A" />
                  <span className="font-ui text-[0.58rem] font-bold tracking-[0.18em] uppercase" style={{ color: '#1A1A1A' }}>
                    Featured Story
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="font-ui text-[0.6rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5"
                    style={{ background: 'rgba(157,134,104,0.16)', color: 'var(--gold)', border: '1px solid rgba(157,134,104,0.4)' }}
                  >
                    {FEATURED_ARTICLE.publication}
                  </span>
                  <span className="flex items-center gap-1.5 font-ui text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(243,239,232,0.45)' }}>
                    <Calendar size={11} /> {FEATURED_ARTICLE.date}
                  </span>
                </div>

                <h2 className="font-times font-normal leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', color: 'var(--beige)' }}>
                  {FEATURED_ARTICLE.headline}
                </h2>

                <p className="font-body leading-relaxed mb-9" style={{ fontSize: '1rem', color: 'rgba(243,239,232,0.75)', maxWidth: '480px', lineHeight: 1.8 }}>
                  {FEATURED_ARTICLE.excerpt}
                </p>

                <Link
                  to={`/media/articles/${FEATURED_ARTICLE.slug}`}
                  className="inline-flex items-center gap-2.5 font-ui text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  style={{ padding: '0.9rem 2.2rem', background: 'var(--gold)', color: '#1A1A1A' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)' }}
                >
                  Read Full Story <ArrowUpRight size={14} />
                </Link>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* ── Filter + Grid ──────────────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.18),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(157,134,104,0.04)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            ARTICLES
          </span>
        </div>

        <div className="container-luxury relative">
          <div className="mb-12 text-center">
            <SectionHeader
              label="Browse Articles"
              title={<>Campaigns &amp; <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Features</em></>}
              subtitle="Every brand campaign, festive greeting, and publication feature we've shared with the city — organised by the story they tell."
              align="center"
            />
          </div>

          {/* ── Category filter — sliding pill ── */}
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 mb-14 mx-auto p-1.5"
            style={{ background: 'rgba(157,134,104,0.06)', border: '1px solid rgba(157,134,104,0.16)', borderRadius: '999px', width: 'fit-content', maxWidth: '100%' }}
          >
            {ARTICLE_CATEGORIES.map(cat => {
              const CatIcon = ARTICLE_CATEGORY_META[cat]?.icon || Sparkles
              const catColor = ARTICLE_CATEGORY_META[cat]?.color || '#9d8668'
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative flex items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase px-5 py-2.5 transition-colors duration-300"
                  style={{ color: isActive ? '#fff' : 'rgba(26,26,26,0.75)', borderRadius: '999px' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="artCategoryPill"
                      className="absolute inset-0"
                      style={{ background: catColor, borderRadius: '999px', zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2" style={{ zIndex: 1 }}>
                    <CatIcon size={11} /> {cat}
                  </span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <Sparkles size={40} className="mx-auto mb-4" style={{ color: 'rgba(157,134,104,0.25)' }} />
                  <p className="font-times text-xl" style={{ color: 'rgba(26,26,26,0.65)' }}>No articles found for this filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filtered.map((article, idx) => (
                    <ArticleCard key={article.id} article={article} idx={idx}
                      onView={() => navigate(`/media/articles/${article.slug}`)} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Publications strip — auto-scrolling marquee ───────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 relative"
        style={{ background: 'white', borderTop: '1px solid rgba(157,134,104,0.15)' }}
      >
        <div className="container-luxury mb-10">
          <p className="font-ui text-[0.48rem] tracking-[0.36em] uppercase text-center" style={{ color: 'rgba(157,134,104,0.6)' }}>
            Published Across Pune&apos;s Leading Newspapers
          </p>
        </div>
        <div
          className="art-marquee relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="art-marquee-track flex items-center gap-10 lg:gap-16 w-max">
            {[...ARTICLE_PUBLICATIONS, ...ARTICLE_PUBLICATIONS].map((pub, i) => (
              <div key={i} className="group flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className="w-20 h-20 flex items-center justify-center transition-all duration-350"
                  style={{ border: '1px solid rgba(157,134,104,0.2)', background: 'var(--cream)', boxShadow: '0 2px 12px rgba(5,5,5,0.05)', transition: 'box-shadow 0.3s, border-color 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 28px ${pub.color}22`; e.currentTarget.style.borderColor = `${pub.color}55` }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,5,5,0.05)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.2)' }}
                >
                  <span className="font-display font-light" style={{ fontSize: '0.92rem', color: pub.color, letterSpacing: '0.06em' }}>
                    {pub.abbr}
                  </span>
                </div>
                <span className="font-ui text-[0.44rem] tracking-[0.18em] uppercase text-center" style={{ color: 'rgba(10,10,10,0.4)', maxWidth: '90px' }}>
                  {pub.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.05) 0%, transparent 68%)' }} />
        {[['top-6 left-6', 'border-l border-t'], ['top-6 right-6', 'border-r border-t'], ['bottom-6 left-6', 'border-l border-b'], ['bottom-6 right-6', 'border-r border-b']].map(([pos, border]) => (
          <div key={pos} className={`absolute ${pos} w-10 h-10 ${border} opacity-20 transition-all duration-500 hover:opacity-50 hover:scale-110`} style={{ borderColor: 'var(--gold)' }} />
        ))}

        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Stay In The Story</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Follow Every Majestique Campaign
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              From festive greetings to milestone features, explore how Majestique Landmarks tells its story across Pune&apos;s leading publications.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/media/press-coverage" className="btn-gold transition-transform duration-300 hover:scale-105">Press Coverage</Link>
              <Link to="/media/awards" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Awards &amp; Recognition</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .art-shine {
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .group:hover .art-shine {
          animation: artShineSweep 1s ease forwards;
        }
        @keyframes artShineSweep {
          0%   { transform: translateX(-120%); opacity: 0.85; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        .art-marquee-track { animation: artMarqueeScroll 32s linear infinite; }
        .art-marquee:hover .art-marquee-track { animation-play-state: paused; }
        @keyframes artMarqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-shine, .art-marquee-track { animation: none !important; }
        }
      `}</style>
    </>
  )
}

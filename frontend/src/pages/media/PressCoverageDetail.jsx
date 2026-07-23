import { useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Newspaper, FileText } from 'lucide-react'
import Seo from '../../components/ui/Seo'
import { CLIPPINGS, CATEGORY_META } from '../../data/pressCoverage'

export default function PressCoverageDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const item = useMemo(() => CLIPPINGS.find(c => c.slug === slug), [slug])

  const related = useMemo(() => {
    if (!item) return []
    const sameCategory = CLIPPINGS.filter(c => c.id !== item.id && c.category === item.category)
    const rest = CLIPPINGS.filter(c => c.id !== item.id && c.category !== item.category)
    return [...sameCategory, ...rest].slice(0, 3)
  }, [item])

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center">
          <Newspaper size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
          <h1 className="font-times text-3xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Press release not found</h1>
          <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.82)' }}>
            The press coverage you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/media/press-coverage" className="btn-outline-gold">← Back to Press Coverage</Link>
        </div>
      </div>
    )
  }

  const CatIcon = CATEGORY_META[item.category]?.icon || Newspaper
  const catColor = CATEGORY_META[item.category]?.color || '#9d8668'

  return (
    <>
      <Seo
        title={`${item.headline} — Press Coverage | Majestique Landmarks`}
        description={item.excerpt}
      />

      <div className="py-16" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate('/media/press-coverage')}
              className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mb-10 transition-colors duration-300"
              style={{ color: 'var(--gold-dark)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
            >
              <ArrowLeft size={14} /> Back to Press Coverage
            </motion.button>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <span
                className="flex items-center gap-1.5 font-ui text-[0.5rem] tracking-[0.22em] uppercase px-2.5 py-1"
                style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}
              >
                <CatIcon size={9} /> {item.category}
              </span>
              <span className="flex items-center gap-1.5 font-ui text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.5)' }}>
                <Calendar size={10} /> Published on {item.date}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-times font-normal text-center leading-tight mb-10"
              style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)', color: 'var(--luxury-dark)', letterSpacing: '0.005em' }}
            >
              {item.headline}
            </motion.h1>

            {/* Image or PDF placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`w-full flex justify-center ${item.pdf ? 'mb-4' : 'mb-12'}`}
            >
              {item.image ? (
                <div
                  className="overflow-hidden"
                  style={{ background: '#f8f5f0', border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 12px 48px rgba(5,5,5,0.1)' }}
                >
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="max-w-full h-auto object-contain"
                    style={{ maxHeight: '560px' }}
                  />
                </div>
              ) : (
                <div
                  className="w-full flex items-center justify-center py-16"
                  style={{ background: 'linear-gradient(135deg, #F9F5EF, #EAE3D8, #F3EFE8)', border: '1px solid rgba(157,134,104,0.18)' }}
                >
                  <div className="text-center">
                    <div
                      className="w-20 h-20 flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 12px 36px rgba(157,134,104,0.40)' }}
                    >
                      <Newspaper size={30} color="#fff" />
                    </div>
                    <span className="font-ui text-[0.5rem] tracking-[0.28em] uppercase" style={{ color: 'rgba(157,134,104,0.65)' }}>
                      {item.publication}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* PDF link */}
            {item.pdf && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <motion.a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 font-ui text-[0.6rem] tracking-[0.18em] uppercase px-4 py-2 transition-colors duration-200"
                  style={{ color: 'var(--gold-dark)', border: '1px solid rgba(157,134,104,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
                >
                  <FileText size={12} /> View Full Clipping (PDF)
                </motion.a>
              </motion.div>
            )}

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body leading-relaxed"
              style={{ color: 'rgba(26,26,26,0.85)', fontSize: '0.98rem', lineHeight: 1.9 }}
            >
              <p className="mb-5">
                <strong style={{ color: 'var(--luxury-dark)' }}>{item.publication}, {item.date}: </strong>
                {item.excerpt}
              </p>
              <p>
                This coverage forms part of <strong style={{ color: 'var(--luxury-dark)' }}>{item.type}</strong>,
                {' '}reflecting Majestique Landmarks' continued recognition across Pune's leading publications as
                a trusted name in luxury real estate.
              </p>
            </motion.div>

            {/* Bottom nav */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(157,134,104,0.2)' }}
            >
              <Link
                to="/media/press-coverage"
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
              >
                <ArrowLeft size={14} /> Back to Press Coverage
              </Link>
              <Link
                to="/projects/ongoing"
                className="btn-gold transition-transform duration-300 hover:scale-105"
                style={{ fontSize: '0.75rem', padding: '0.625rem 1.5rem' }}
              >
                Explore Our Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Press Releases */}
      {related.length > 0 && (
        <section className="py-20" style={{ background: 'var(--cream)', borderTop: '1px solid rgba(157,134,104,0.15)' }}>
          <div className="container-luxury">
            <p className="font-ui text-[0.5rem] tracking-[0.3em] uppercase text-center mb-10" style={{ color: 'rgba(157,134,104,0.6)' }}>
              Related Press Releases
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((r, i) => {
                const RCatIcon = CATEGORY_META[r.category]?.icon || Newspaper
                const rCatColor = CATEGORY_META[r.category]?.color || '#9d8668'
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/media/press-coverage/${r.slug}`}
                      className="group flex flex-col overflow-hidden bg-white h-full"
                      style={{ border: '1px solid rgba(157,134,104,0.16)', boxShadow: '0 2px 16px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s ease, transform 0.35s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 48px rgba(5,5,5,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#f9f6f1' }}>
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.headline}
                            className="w-full h-full object-contain p-3 transition-transform duration-600 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F9F5EF 0%, #EAE3D8 50%, #F3EFE8 100%)' }}>
                            <Newspaper size={26} style={{ color: 'var(--gold)' }} />
                          </div>
                        )}
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className="flex items-center gap-1 font-ui text-[0.42rem] tracking-[0.2em] uppercase px-2 py-0.5"
                            style={{ background: rCatColor, color: '#fff' }}
                          >
                            <RCatIcon size={7} /> {r.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <span
                          className="font-ui text-[0.42rem] tracking-[0.2em] uppercase mb-2 inline-block px-2 py-0.5"
                          style={{ background: `${r.pubColor}14`, color: r.pubColor, border: `1px solid ${r.pubColor}28` }}
                        >
                          {r.publication}
                        </span>
                        <h3 className="font-times font-normal leading-snug" style={{ fontSize: '0.92rem', color: 'var(--luxury-dark)' }}>
                          {r.headline}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

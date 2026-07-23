import { useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Trophy, ArrowUpRight, FileText, Images } from 'lucide-react'
import Seo from '../../components/ui/Seo'
import { AWARDS, PLATFORM_META, CATEGORY_META } from '../../data/awards'

/* ── Image + gallery + certificate — keyed by award.id so state resets on navigation ── */
function AwardMedia({ award }) {
  const [activeImage, setActiveImage] = useState(award.image ?? null)
  const galleryImages = award.image ? [award.image, ...(award.gallery || [])] : (award.gallery || [])

  return (
    <>
      {/* Image or trophy placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full flex justify-center mb-4"
      >
        {activeImage ? (
          <div
            className="overflow-hidden"
            style={{ background: '#111', border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 12px 48px rgba(5,5,5,0.1)' }}
          >
            <img
              src={activeImage}
              alt={award.award}
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
                <Trophy size={30} color="#fff" />
              </div>
              <span className="font-ui text-[0.5rem] tracking-[0.28em] uppercase" style={{ color: 'rgba(157,134,104,0.65)' }}>
                {award.date}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Gallery thumbnails */}
      {galleryImages.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center justify-center gap-2.5 mb-6"
        >
          <Images size={12} style={{ color: 'rgba(157,134,104,0.5)' }} />
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveImage(img)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.2 + i * 0.05 } }}
              whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
              className="overflow-hidden flex-shrink-0"
              style={{
                width: '56px',
                height: '42px',
                border: `2px solid ${activeImage === img ? 'var(--gold)' : 'rgba(157,134,104,0.25)'}`,
                opacity: activeImage === img ? 1 : 0.65,
                transition: 'opacity 0.2s, border-color 0.2s',
              }}
            >
              <img src={img} alt={`${award.award} — photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Certificate link */}
      {award.certificate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <motion.a
            href={award.certificate}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-ui text-[0.6rem] tracking-[0.18em] uppercase px-4 py-2 transition-colors duration-200"
            style={{ color: 'var(--gold-dark)', border: '1px solid rgba(157,134,104,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
          >
            <FileText size={12} /> View Certificate (PDF)
          </motion.a>
        </motion.div>
      )}
    </>
  )
}

export default function AwardDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const award = useMemo(() => AWARDS.find(a => a.slug === slug), [slug])

  const platMeta = (award && PLATFORM_META[award.platform]) || { color: '#9d8668' }
  const catMeta = (award && CATEGORY_META[award.category]) || { color: '#9d8668' }

  const related = useMemo(() => {
    if (!award) return []
    const sameCategory = AWARDS.filter(a => a.id !== award.id && a.category === award.category)
    const rest = AWARDS.filter(a => a.id !== award.id && a.category !== award.category)
    return [...sameCategory, ...rest].slice(0, 3)
  }, [award])

  if (!award) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center">
          <Trophy size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
          <h1 className="font-times text-3xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Award not found</h1>
          <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.82)' }}>
            The award you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/media/awards" className="btn-outline-gold">← Back to Awards</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={`${award.award} — ${award.platform} | Majestique Landmarks`}
        description={award.desc}
      />

      <div className="py-16" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate('/media/awards')}
              className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mb-10 transition-colors duration-300"
              style={{ color: 'var(--gold-dark)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
            >
              <ArrowLeft size={14} /> Back to Awards
            </motion.button>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <span
                className="font-ui text-[0.5rem] tracking-[0.22em] uppercase px-2.5 py-1"
                style={{ background: `${platMeta.color}14`, color: platMeta.color, border: `1px solid ${platMeta.color}30` }}
              >
                {award.platform}
              </span>
              <span
                className="font-ui text-[0.5rem] tracking-[0.22em] uppercase px-2.5 py-1"
                style={{ background: `${catMeta.color}14`, color: catMeta.color, border: `1px solid ${catMeta.color}30` }}
              >
                {award.category}
              </span>
              <span className="flex items-center gap-1.5 font-ui text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.5)' }}>
                <Calendar size={10} /> {award.date}
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
              {award.award}
            </motion.h1>

            <AwardMedia award={award} key={award.id} />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-body leading-relaxed mt-8"
              style={{ color: 'rgba(26,26,26,0.85)', fontSize: '0.98rem', lineHeight: 1.9 }}
            >
              <p className="mb-5">
                <strong style={{ color: 'var(--luxury-dark)' }}>{award.platform}, {award.date}: </strong>
                {award.desc}
              </p>
              <p>
                Presented for <strong style={{ color: 'var(--luxury-dark)' }}>{award.project}</strong>, this recognition
                falls under the <strong style={{ color: 'var(--luxury-dark)' }}>{award.category}</strong> category,
                {' '}reflecting Majestique Landmarks&apos; continued commitment to excellence across every facet of luxury real estate development.
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
                to="/media/awards"
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
              >
                <ArrowLeft size={14} /> Back to Awards
              </Link>
              <Link
                to="/projects"
                className="btn-gold transition-transform duration-300 hover:scale-105"
                style={{ fontSize: '0.75rem', padding: '0.625rem 1.5rem' }}
              >
                Explore Projects <ArrowUpRight size={13} style={{ display: 'inline', marginLeft: '4px' }} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Awards */}
      {related.length > 0 && (
        <section className="py-20" style={{ background: 'var(--cream)', borderTop: '1px solid rgba(157,134,104,0.15)' }}>
          <div className="container-luxury">
            <p className="font-ui text-[0.5rem] tracking-[0.3em] uppercase text-center mb-10" style={{ color: 'rgba(157,134,104,0.6)' }}>
              Related Awards
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/media/awards/${r.slug}`}
                    className="group flex flex-col overflow-hidden bg-white h-full"
                    style={{ border: '1px solid rgba(157,134,104,0.16)', boxShadow: '0 2px 16px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s ease, transform 0.35s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 48px rgba(5,5,5,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#f9f6f1' }}>
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.award}
                          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F9F5EF 0%, #EAE3D8 50%, #F3EFE8 100%)' }}>
                          <Trophy size={26} style={{ color: 'var(--gold)' }} />
                        </div>
                      )}
                      <span
                        className="absolute top-2.5 right-2.5 font-ui text-[0.42rem] tracking-[0.2em] uppercase px-2 py-0.5"
                        style={{ background: 'var(--gold)', color: '#fff' }}
                      >
                        {r.date}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-ui text-[0.42rem] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>
                        {r.platform}
                      </p>
                      <h3 className="font-times font-normal leading-snug" style={{ fontSize: '0.92rem', color: 'var(--luxury-dark)' }}>
                        {r.award}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

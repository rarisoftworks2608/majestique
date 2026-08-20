import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Clock, FileText, Layers,
  MapPin, ArrowRight,
} from 'lucide-react'
import imgProject from '../../assets/ongoing_project_vertical.jpg'

/* ─────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon:  MapPin,
    title: 'Prime Locations',
    desc:  'Connected addresses with lasting potential.',
  },
  {
    Icon:  Layers,
    title: 'Exceptional Quality',
    desc:  'Craftsmanship that stands the test of time.',
  },
  {
    Icon:  Clock,
    title: 'Timely Delivery',
    desc:  'Promises made. Promises delivered.',
  },
  {
    Icon:  FileText,
    title: 'Customer First',
    desc:  'Relationships that go beyond possession.',
  },
]


/* ─────────────────────────────────────────────────────────────────────
   FEATURE CARD
──────────────────────────────────────────────────────────────────────── */
function FeatureCard({ Icon, title, desc, index }) {
  const isRightCol = index % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative px-5 py-4 cursor-default transition-colors duration-300"
      style={{
        borderTop:  '1px solid rgba(212,175,55,0.14)',
        borderLeft: isRightCol ? '1px solid rgba(212,175,55,0.14)' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      {/* Gold reveal bar on hover */}
      <div
        className="absolute top-[-1px] left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }}
      />

      {/* Icon */}
      <motion.div
        className="w-8 h-8 flex items-center justify-center mb-2.5"
        style={{
          border:     '1px solid rgba(212,175,55,0.22)',
          background: 'rgba(212,175,55,0.06)',
        }}
        whileHover={{ scale: 1.12, rotate: 8, backgroundColor: 'rgba(212,175,55,0.14)' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon size={15} style={{ color: '#D4AF37' }} strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <p
        className="font-ui text-[0.72rem] tracking-[0.14em] uppercase font-semibold mb-2 transition-colors duration-300"
        style={{ color: '#1A1A1A' }}
      >
        {title}
      </p>

      {/* Gold rule */}
      <div
        className="mb-2 transition-all duration-400 group-hover:w-8"
        style={{ width: '18px', height: '1px', background: '#D4AF37' }}
      />

      {/* Description */}
      <p
        className="font-body leading-relaxed"
        style={{
          fontSize:   'clamp(1rem, 1.2vw, 1.1rem)',
          color:      'rgba(26,26,26,0.85)',
          fontWeight: 400,
          lineHeight: 1.75,
        }}
      >
        {desc}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────────────────── */
export default function WhyChooseUsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#fff' }}>

      {/* ── Top accent line ── */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.28),transparent)' }} />

      {/* ══════════════════════════════════════════════════════
          SECTION HEADER  — left-aligned, generous breathing room
      ══════════════════════════════════════════════════════ */}
      <div className="container-luxury" style={{ paddingTop: 'clamp(2rem,4vh,3rem)', paddingBottom: 'clamp(1.5rem,3vh,2.5rem)' }}>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-ui text-[0.78rem] tracking-[0.28em] uppercase font-bold mb-4"
          style={{ color: 'var(--gold)' }}
        >
          ✦ &nbsp; Why Majestique &nbsp; ✦
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          style={{
            width: '44px', height: '1px',
            background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))',
            transformOrigin: 'left',
            marginBottom: '1.5rem',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light leading-tight mb-3"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: 'var(--ink)', letterSpacing: '0.01em', maxWidth: '620px', textWrap: 'balance' }}
        >
          Built on Trust. Defined by{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>Excellence.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="font-body"
          style={{
            fontSize:   'clamp(1rem, 1.2vw, 1.1rem)',
            color:      'rgba(26,26,26,0.85)',
            fontWeight: 400,
            maxWidth:   'none',
            lineHeight: 1.8,
            textWrap:   'pretty',
          }}
        >
          Every Majestique space is created with a commitment to quality, transparency,
          timely delivery, and thoughtful design.
        </motion.p>

      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN GRID  — image left  |  features right
      ══════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[40%_60%]"
        style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}
      >

        {/* ════════════════════════════════
            LEFT — Single image + stats
        ════════════════════════════════ */}
        <motion.div
          className="relative overflow-hidden lg:min-h-full"
          style={{ minHeight: 'clamp(220px,32vh,380px)' }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image — subtle scroll parallax */}
          <motion.img
            src={imgProject}
            alt="Majestique Development"
            className="absolute w-full object-cover"
            style={{ top: '-8%', height: '116%', y: imgY }}
            loading="lazy"
          />

          {/* Gradient overlay — heavy at bottom for stats legibility */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top,rgba(26,26,26,0.90) 0%,rgba(26,26,26,0.22) 52%,transparent 100%)' }}
          />

          {/* Vertical label */}
          <div
            className="absolute left-5 top-1/2 select-none pointer-events-none"
            style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}
          >
            <span className="font-ui text-[0.46rem] tracking-[0.35em] uppercase whitespace-nowrap" style={{ color: 'rgba(212,175,55,0.6)' }}>
              Est. 2002 · Pune
            </span>
          </div>

        </motion.div>

        {/* ════════════════════════════════
            RIGHT — Features grid + CTA
        ════════════════════════════════ */}
        <div
          className="flex flex-col"
          style={{ borderLeft: '1px solid rgba(212,175,55,0.12)', background: '#FAF6EF' }}
        >
          {/* 2 × 3 features grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-4"
            style={{ borderTop: '1px solid rgba(212,175,55,0.14)', background: '#fff' }}
          >
            <Link
              to="/about/legacy"
              className="inline-flex items-center justify-center gap-2.5 font-ui text-[0.6rem] tracking-[0.22em] uppercase group transition-all duration-300 flex-1 sm:flex-none"
              style={{ color: '#fff', background: '#6B0D1A', border: '1px solid #6B0D1A', padding: '0.85rem 2rem' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3D090F'; e.currentTarget.style.borderColor = '#3D090F' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6B0D1A'; e.currentTarget.style.borderColor = '#6B0D1A' }}
            >
              Why Majestique
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>

      {/* ── Bottom accent line ── */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />

    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Clock, FileText, Layers,
  MapPin, Sparkles, BadgeCheck, ArrowRight,
} from 'lucide-react'
import imgProject from '../../assets/ongoing_project_vertical.jpg'

/* ─────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon:  Clock,
    title: 'Proven Track Record',
    desc:  'Proven track record of successful developments across Pune, delivered on schedule — without exception.',
  },
  {
    Icon:  MapPin,
    title: 'Prime Growth Locations',
    desc:  'Thoughtfully planned communities in prime growth locations offering seamless connectivity and enduring value.',
  },
  {
    Icon:  FileText,
    title: 'Complete Transparency',
    desc:  'Customer-first approach with complete transparency — no hidden charges from reservation through final possession.',
  },
  {
    Icon:  Sparkles,
    title: 'Lifestyle Amenities',
    desc:  'Innovative design and lifestyle-focused amenities that redefine everyday living at every Majestique development.',
  },
  {
    Icon:  Layers,
    title: 'Superior Build Quality',
    desc:  'Superior construction quality and uncompromising attention to detail in every square foot we build.',
  },
  {
    Icon:  BadgeCheck,
    title: 'Long-Term Value',
    desc:  'A strong legacy of trust built across thousands of families with a commitment to long-term investment value.',
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
        borderTop:  '1px solid rgba(157,134,104,0.14)',
        borderLeft: isRightCol ? '1px solid rgba(157,134,104,0.14)' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(157,134,104,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      {/* Gold reveal bar on hover */}
      <div
        className="absolute top-[-1px] left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'linear-gradient(90deg,#9D8668,#DDD2C2)' }}
      />

      {/* Icon */}
      <motion.div
        className="w-8 h-8 flex items-center justify-center mb-2.5"
        style={{
          border:     '1px solid rgba(157,134,104,0.22)',
          background: 'rgba(157,134,104,0.06)',
        }}
        whileHover={{ scale: 1.12, rotate: 8, backgroundColor: 'rgba(157,134,104,0.14)' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon size={15} style={{ color: '#9D8668' }} strokeWidth={1.5} />
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
        style={{ width: '18px', height: '1px', background: '#9D8668' }}
      />

      {/* Description */}
      <p
        className="font-body leading-relaxed"
        style={{
          fontSize:   'clamp(1rem, 1.2vw, 1.1rem)',
          color:      'rgba(10,10,10,0.85)',
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
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.28),transparent)' }} />

      {/* ══════════════════════════════════════════════════════
          SECTION HEADER  — left-aligned, generous breathing room
      ══════════════════════════════════════════════════════ */}
      <div className="container-luxury" style={{ paddingTop: 'clamp(2rem,4vh,3rem)', paddingBottom: 'clamp(1.5rem,3vh,2.5rem)' }}>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-ui text-[0.72rem] tracking-[0.30em] uppercase font-bold mb-3"
          style={{ color: '#9D8668' }}
        >
          ✦ &nbsp; Why Majestique
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg,#9D8668,#DDD2C2)',
            transformOrigin: 'left',
            margin: '0 0 1rem',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light leading-tight mb-3"
          style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3.2rem)', color: '#1A1A1A', letterSpacing: '0.01em', maxWidth: '620px', textWrap: 'balance' }}
        >
          A Legacy Built on Trust. A Future Defined by{' '}
          <em style={{ fontStyle: 'italic', color: '#9D8668' }}>Excellence.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="font-body"
          style={{
            fontSize:   'clamp(1rem, 1.2vw, 1.1rem)',
            color:      'rgba(10,10,10,0.85)',
            fontWeight: 400,
            maxWidth:   'none',
            lineHeight: 1.8,
            textWrap:   'pretty',
          }}
        >
          For years, homebuyers have chosen Majestique for one simple reason — confidence
          in our commitment to quality, transparency, timely delivery, and customer satisfaction.
        </motion.p>

      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN GRID  — image left  |  features right
      ══════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[40%_60%]"
        style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}
      >

        {/* ════════════════════════════════
            LEFT — Single image + stats
        ════════════════════════════════ */}
        <motion.div
          className="relative overflow-hidden lg:min-h-full"
          style={{ minHeight: 'clamp(260px,40vh,480px)' }}
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
            style={{ background: 'linear-gradient(to top,rgba(5,5,5,0.90) 0%,rgba(5,5,5,0.22) 52%,transparent 100%)' }}
          />

          {/* Gold corner bracket — top left */}
          <div
            className="absolute top-6 left-6 w-9 h-9"
            style={{
              borderTop:  '2px solid rgba(157,134,104,0.65)',
              borderLeft: '2px solid rgba(157,134,104,0.65)',
            }}
          />
          {/* Gold corner bracket — bottom right (above stats) */}
          <div
            className="absolute right-6 w-9 h-9"
            style={{
              bottom:      '96px',
              borderBottom:'2px solid rgba(157,134,104,0.55)',
              borderRight: '2px solid rgba(157,134,104,0.55)',
            }}
          />

          {/* Vertical label */}
          <div
            className="absolute left-5 top-1/2 select-none pointer-events-none"
            style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}
          >
            <span className="font-ui text-[0.46rem] tracking-[0.35em] uppercase whitespace-nowrap" style={{ color: 'rgba(157,134,104,0.6)' }}>
              Est. 2002 · Pune
            </span>
          </div>

        </motion.div>

        {/* ════════════════════════════════
            RIGHT — Features grid + CTA
        ════════════════════════════════ */}
        <div
          className="flex flex-col"
          style={{ borderLeft: '1px solid rgba(157,134,104,0.12)', background: '#FAFAF8' }}
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
            style={{ borderTop: '1px solid rgba(157,134,104,0.14)', background: '#fff' }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2.5 font-ui text-[0.6rem] tracking-[0.22em] uppercase group transition-all duration-300 flex-1 sm:flex-none"
              style={{ color: '#fff', background: '#9D8668', border: '1px solid #9D8668', padding: '0.85rem 2rem' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#736452'; e.currentTarget.style.borderColor = '#736452' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#9D8668'; e.currentTarget.style.borderColor = '#9D8668' }}
            >
              Explore Projects
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about/legacy"
              className="inline-flex items-center justify-center gap-2.5 font-ui text-[0.6rem] tracking-[0.22em] uppercase group transition-all duration-300 flex-1 sm:flex-none"
              style={{ color: '#1A1A1A', background: 'transparent', border: '1px solid rgba(10,10,10,0.2)', padding: '0.85rem 2rem' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#9D8668'; e.currentTarget.style.color = '#9D8668' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.2)'; e.currentTarget.style.color = '#1A1A1A' }}
            >
              About Majestique
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>

      {/* ── Bottom accent line ── */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />

    </section>
  )
}

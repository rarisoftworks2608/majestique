import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import veniceImg from '../../assets/company_overview1.jpeg'

const ease = [0.16, 1, 0.3, 1]

const STATS = [
  { value: 20,  suffix: '+',  label: 'Years of Excellence' },
  { value: 18,  suffix: 'K+', label: 'Families'             },
  { value: 30,  suffix: '+',  label: 'Developments'         },
]

function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.floor(v).toString()),
    })
    return ctrl.stop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref} translate="no" className="notranslate">{display}{suffix}</span>
}

export default function AboutPreviewSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ background: '#fff' }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
    >
      {/* Top border */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
      />
      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: 'clamp(400px, 58vh, 560px)' }}>

        {/* ── LEFT — content ── */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-14 relative z-10">

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="font-ui text-[0.78rem] tracking-[0.28em] uppercase font-bold block mb-4"
          >
            <span style={{ color: 'var(--gold)' }}>✦ &nbsp; Company Overview &nbsp; ✦</span>
          </motion.span>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
            style={{ width: '44px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', transformOrigin: 'left', marginBottom: '1.5rem' }}
          />

          {/* Heading — each line staggered */}
          <div className="font-display font-light leading-tight mb-5 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: 'var(--ink)', letterSpacing: '0.01em' }}
            >
              Building Landmarks.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.50, ease }}
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: 'var(--ink)', letterSpacing: '0.01em' }}
            >
              Creating{' '}
              <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Legacies.</em>
            </motion.div>
          </div>

          {/* Company description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.72, ease }}
            className="mb-7"
          >
            <p
              className="font-body"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(26,26,26,0.85)', fontWeight: 400, lineHeight: 1.8, maxWidth: '440px' }}
            >
              Since 2007, Majestique Landmarks has shaped Pune with thoughtfully designed spaces built on trust, quality, and lasting value.
            </p>
          </motion.div>

          {/* Brand credibility counters */}
          <motion.div
            style={{ borderTop: '1px solid rgba(212,175,55,0.18)', borderBottom: '1px solid rgba(212,175,55,0.18)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.82, ease }}
            className="grid grid-cols-3 mb-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.88 + i * 0.07, ease }}
                className="py-5 text-center"
                style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(212,175,55,0.14)' : 'none' }}
              >
                <p
                  className="font-display font-light leading-none mb-1"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', color: 'var(--gold-dark)', letterSpacing: '-0.025em' }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  className="font-ui tracking-[0.12em] uppercase"
                  style={{ fontSize: '0.5rem', color: 'rgba(26,26,26,0.48)', lineHeight: 1.4 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.84, ease }}
            >
              <Link to="/about/legacy"
                className="inline-flex items-center gap-2 font-ui tracking-[0.18em] uppercase transition-all duration-300 group"
                style={{ fontSize: '0.54rem', padding: '0.82rem 1.9rem', background: 'var(--gold-dark)', color: '#fff', border: '1px solid var(--gold-dark)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-darker)'; e.currentTarget.style.borderColor = 'var(--gold-darker)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold-dark)'; e.currentTarget.style.borderColor = 'var(--gold-dark)' }}
              >
                Discover Our Story <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT — image panel ── */}
        <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
          {/* Image */}
          <motion.img
            src={veniceImg}
            alt="Majestique"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.12, opacity: 0 }}
            whileInView={{ scale: 1.06, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.5, ease }}
          />

          {/* Top ivory panel — slides upward */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20"
            style={{ height: '51%', background: '#fff' }}
            initial={{ y: '0%' }}
            whileInView={{ y: '-101%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Bottom ivory panel — slides downward */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20"
            style={{ height: '51%', background: '#fff' }}
            initial={{ y: '0%' }}
            whileInView={{ y: '101%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 hidden lg:block z-[5]"
            style={{ width: '80px', background: 'linear-gradient(to right, #fff, transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-24 z-[5]"
            style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.18), transparent)' }} />


          {/* Gold seam line at split point */}
          <motion.div
            className="absolute inset-x-0 z-10 pointer-events-none"
            style={{ top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
          />
        </div>

      </div>
    </motion.section>
  )
}

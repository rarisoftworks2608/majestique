import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { ScrollTrigger } from '../../lib/gsap'
import veniceImg from '../../assets/company_overview1.jpeg'

const ease = [0.16, 1, 0.3, 1]

const STATS = [
  { value: 20,  suffix: '+',  label: 'Years of Excellence' },
  { value: 18,  suffix: 'K+', label: 'Happy Families'      },
  { value: 30,  suffix: '+',  label: 'Developments'         },
  { value: 100, suffix: '%',  label: 'On-Time Delivery'     },
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

  return <span ref={ref}>{display}{suffix}</span>
}

export default function AboutPreviewSection() {
  const imgRef     = useRef(null)
  const sectionRef = useRef(null)

  /* ── Scroll-linked transforms ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  /* Each layer moves at a different rate for depth */
  const labelY    = useTransform(smooth, [0, 1], ['30px',  '-20px'])
  const headingY  = useTransform(smooth, [0, 1], ['55px',  '-35px'])
  const paraY     = useTransform(smooth, [0, 1], ['40px',  '-25px'])
  const ctaY      = useTransform(smooth, [0, 1], ['25px',  '-15px'])
  const rightY    = useTransform(smooth, [0, 1], ['45px',  '-45px'])
  const topLineX  = useTransform(smooth, [0, 1], ['-8%',    '8%'])
  const botLineX  = useTransform(smooth, [0, 1], ['8%',    '-8%'])

  /* GSAP parallax on image itself */
  useEffect(() => {
    if (!imgRef.current) return
    const anim = gsap.fromTo(imgRef.current,
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
    )
    return () => { anim.kill(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#fff' }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
    >
      {/* Top border — drifts sideways on scroll */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)',
          x: topLineX,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
      />
      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)',
          x: botLineX,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: 'clamp(440px, 78vh, 720px)' }}>

        {/* ── LEFT — content ── */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-14 relative z-10">

          {/* Label — scrolls up fastest (lightest layer) */}
          <motion.span
            style={{ y: labelY }}
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
            className="mb-5"
            style={{ width: '44px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', transformOrigin: 'left' }}
          />

          {/* Heading — each line staggered + scroll parallax */}
          <motion.div
            style={{ y: headingY }}
            className="font-display font-light leading-[1.06] mb-5 overflow-hidden"
            initial={false}
          >
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
              style={{ fontSize: 'clamp(2rem, 3.6vw, 4.2rem)', color: 'var(--ink)', letterSpacing: '0.01em' }}
            >
              Building Landmarks.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.50, ease }}
              style={{ fontSize: 'clamp(2rem, 3.6vw, 4.2rem)', letterSpacing: '0.01em' }}
            >
              Creating{' '}
              <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Legacies.</em>
            </motion.div>
          </motion.div>

          {/* Company description — mid-speed parallax */}
          <motion.div
            style={{ y: paraY }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.72, ease }}
            className="mb-7"
          >
            <p
              className="font-body mb-4"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(10,10,10,0.85)', fontWeight: 400, lineHeight: 1.8, maxWidth: '440px' }}
            >
              Founded on the principles of trust, integrity, and excellence, Majestique Landmarks has evolved into one of Pune's most respected real estate developers, delivering thoughtfully designed residential and commercial destinations that enrich lifestyles and create lasting value.
            </p>
            <p
              className="font-body"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(10,10,10,0.72)', fontWeight: 400, lineHeight: 1.8, maxWidth: '440px' }}
            >
              Entering real estate in 2007, we continue to shape vibrant communities that reflect modern aspirations while maintaining the highest standards of craftsmanship and reliability.
            </p>
          </motion.div>

          {/* Brand credibility counters */}
          <motion.div
            style={{ y: paraY, borderTop: '1px solid rgba(157,134,104,0.18)', borderBottom: '1px solid rgba(157,134,104,0.18)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.82, ease }}
            className="grid grid-cols-4 mb-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.88 + i * 0.07, ease }}
                className="py-5 text-center"
                style={{ borderRight: i < 3 ? '1px solid rgba(157,134,104,0.14)' : 'none' }}
              >
                <p
                  className="font-display font-light leading-none mb-1"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', color: 'var(--gold-dark)', letterSpacing: '-0.025em' }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  className="font-ui tracking-[0.12em] uppercase"
                  style={{ fontSize: '0.5rem', color: 'rgba(10,10,10,0.48)', lineHeight: 1.4 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA — slowest parallax (feels anchored) */}
          <motion.div style={{ y: ctaY }} className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.84, ease }}
            >
              <Link to="/about/company-profile"
                className="inline-flex items-center gap-2 font-ui tracking-[0.18em] uppercase transition-all duration-300"
                style={{ fontSize: '0.54rem', padding: '0.82rem 1.9rem', background: 'var(--gold)', color: '#fff', border: '1px solid var(--gold)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
              >
                About Us <ArrowUpRight size={10} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.96, ease }}
            >
              <Link to="/about/legacy"
                className="inline-flex items-center gap-2 font-ui tracking-[0.18em] uppercase transition-all duration-300"
                style={{ fontSize: '0.54rem', padding: '0.82rem 1.9rem', background: 'transparent', color: 'var(--ink)', border: '1px solid rgba(10,10,10,0.22)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.22)'; e.currentTarget.style.color = 'var(--ink)' }}
              >
                Our Legacy
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT — image panel with scroll parallax ── */}
        <motion.div
          className="relative overflow-hidden"
          style={{ minHeight: '400px', y: rightY }}
        >
          {/* Image */}
          <motion.img
            ref={imgRef}
            src={veniceImg}
            alt="Majestique"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: 'transform' }}
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

          {/* Corner brackets */}
          <motion.div
            className="absolute top-5 right-5 w-9 h-9 border-r-2 border-t-2 z-30"
            style={{ borderColor: 'rgba(157,134,104,0.65)' }}
            initial={{ opacity: 0, x: 10, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.25, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <motion.div
            className="absolute bottom-5 right-5 w-9 h-9 border-r-2 border-b-2 z-30"
            style={{ borderColor: 'rgba(157,134,104,0.38)' }}
            initial={{ opacity: 0, x: 10, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.38, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Gold seam line at split point */}
          <motion.div
            className="absolute inset-x-0 z-10 pointer-events-none"
            style={{ top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(157,134,104,0.5), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </motion.section>
  )
}

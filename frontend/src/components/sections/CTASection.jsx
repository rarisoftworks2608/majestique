import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, CalendarDays, ArrowRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { ScrollTrigger } from '../../lib/gsap'
import imgVenice from '../../assets/JLL_PUN_Majestique_Venice_29_ELV_Primary.png'

const TRUST = ['MahaRERA Registered', '18,000+ Happy Families', 'Debt-Free Developer', 'ET Award Winner 2024']

export default function CTASection() {
  const imgRef    = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!imgRef.current) return
    const anim = gsap.fromTo(imgRef.current,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
    )
    return () => { anim.kill(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#F9F5EF' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />

      {/* Decorative dot pattern top-left */}
      <div className="absolute top-0 left-0 w-72 h-72 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(157,134,104,1) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]" style={{ minHeight: '80vh' }}>

        {/* ── Left — editorial content ── */}
        <div className="flex flex-col justify-center py-16 lg:py-24 px-8 lg:px-16 relative z-10">

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-ui text-[0.82rem] tracking-[0.28em] uppercase font-bold block mb-6"
            style={{ color: 'var(--gold)' }}
          >
            ✦ &nbsp; Begin Your Journey &nbsp; ✦
          </motion.span>

          {/* Large editorial heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-display font-light leading-[0.95] mb-2"
              style={{ fontSize: 'clamp(3rem, 7vw, 8.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
            >
              Discover
            </h2>
            <h2
              className="font-display font-light leading-[0.95] mb-2"
              style={{ fontSize: 'clamp(3rem, 7vw, 8.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
            >
              Your
            </h2>
            <h2
              className="font-display italic leading-[0.95]"
              style={{ fontSize: 'clamp(3rem, 7vw, 8.5rem)', color: 'var(--gold-dark)', letterSpacing: '-0.02em', fontWeight: 300 }}
            >
              Landmark
            </h2>
            <h2
              className="font-display font-light leading-[0.95]"
              style={{ fontSize: 'clamp(3rem, 7vw, 8.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}
            >
              Address.
            </h2>
          </motion.div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 mb-6"
            style={{ width: '52px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', transformOrigin: 'left' }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="font-body mb-9"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.125rem)', color: 'rgba(10,10,10,0.84)', fontWeight: 400, maxWidth: '440px', lineHeight: 1.85 }}
          >
            Schedule a personal consultation and explore Pune&apos;s most sought-after addresses —
            crafted to become a legacy, not just a home.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 font-ui tracking-[0.2em] uppercase transition-all duration-300"
              style={{ fontSize: '0.6rem', padding: '1rem 2.4rem', background: 'var(--gold)', color: '#fff', border: '1px solid var(--gold)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            >
              <CalendarDays size={12} /> Schedule a Visit
            </Link>
            <a href="tel:+917448099000"
              className="inline-flex items-center gap-2.5 font-ui tracking-[0.2em] uppercase transition-all duration-300"
              style={{ fontSize: '0.6rem', padding: '1rem 2.4rem', background: 'transparent', color: 'var(--ink)', border: '1px solid rgba(10,10,10,0.28)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.28)'; e.currentTarget.style.color = 'var(--ink)' }}
            >
              <Phone size={12} /> Call Us Now
            </a>
            <Link to="/projects"
              className="inline-flex items-center gap-2 font-ui tracking-[0.2em] uppercase group transition-colors duration-300"
              style={{ fontSize: '0.6rem', color: 'rgba(10,10,10,0.38)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-dark)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(10,10,10,0.38)')}
            >
              Explore Projects <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.65 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
            style={{ borderTop: '1px solid rgba(157,134,104,0.15)', paddingTop: '1.75rem' }}
          >
            {TRUST.map(badge => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
                <span className="font-ui text-[0.46rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(10,10,10,0.38)' }}>
                  {badge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — building image ── */}
        <div className="relative overflow-hidden hidden lg:block">
          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={imgRef}
              src={imgVenice}
              alt="Majestique Venice"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: 'transform', transform: 'scale(1.12)' }}
              loading="lazy"
            />
          </div>
          {/* Light warm blend on left edge */}
          <div className="absolute inset-y-0 left-0 w-20"
            style={{ background: 'linear-gradient(to right, #F9F5EF, transparent)' }} />

          {/* Subtle overlay to keep premium but bright */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(249,245,239,0.08) 0%, rgba(249,245,239,0.12) 100%)' }} />

          {/* Corner ornaments */}
          <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.5)' }} />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.35)' }} />

          {/* Floating frosted card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="absolute bottom-8 left-8 px-6 py-5"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(157,134,104,0.28)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(10,10,10,0.1)',
            }}
          >
            <div className="h-px mb-3 w-7" style={{ background: 'var(--gold)' }} />
            <p className="font-display font-light text-xl mb-0.5" style={{ color: 'var(--gold-dark)', letterSpacing: '-0.01em' }}>
              Majestique Venice
            </p>
            <p className="font-ui text-[0.46rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(10,10,10,0.42)' }}>
              Signature Series · Pune
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, Globe, Target } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import Seo from '../../components/ui/Seo'
import visionHeroImg from '../../assets/Mission_vision.jpg'
import visionContentImg from '../../assets/vision.jpg'

const MISSION_POINTS = [
  'Create thoughtfully designed, high-quality developments that combine innovation and sustainability',
  'Maintain the highest standards of integrity, transparency, and execution across every project',
  'Enrich lives through exceptional spaces and foster long-term relationships with our customers',
  'Contribute positively to the communities we serve through responsible development practices',
  'Deliver customer-centric experiences that inspire confidence from booking to final possession',
  'Build enduring value for customers, investors, and the communities we call home',
]

const CARDS = [
  {
    icon: Compass,
    label: 'Philosophy',
    title: 'Our Philosophy',
    body: 'To create landmark developments that combine luxury, innovation, sustainability, and timeless value while maintaining the highest standards of transparency, trust, and customer satisfaction.',
    accent: false,
  },
  {
    icon: Globe,
    label: 'Vision',
    title: 'Our Vision',
    body: 'To be recognized as one of India\'s most trusted and admired real estate brands, creating exceptional developments that redefine lifestyles, inspire communities, and deliver lasting value for generations.',
    accent: true,
  },
  {
    icon: Target,
    label: 'Mission',
    title: 'Our Mission',
    body: 'To create thoughtfully designed, high-quality developments that combine innovation, sustainability, and customer-centricity while maintaining the highest standards of integrity, transparency, and execution.',
    accent: false,
  },
]

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

export default function VisionMission() {
  return (
    <>
      <Seo
        title="Vision & Mission"
        description="The vision, mission, and philosophy that drives Majestique Landmarks — delivering premium developments through discipline, innovation, sustainability, and trust across Pune."
      />
      <PageHero
        title="Vision, Mission & Philosophy"
        subtitle="The purpose and principles that guide every decision, every development, and every promise we make to our customers and communities."
        breadcrumb={['Home', 'About', 'Vision & Mission']}
        bgImage={visionHeroImg}
      />

      {/* ── Philosophy — light full-width quote ───────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(157,134,104,0.06) 0%, transparent 65%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display tracking-widest" style={{ fontSize: 'clamp(10rem, 28vw, 28rem)', color: 'rgba(157,134,104,0.03)', lineHeight: 1 }}>"</span>
        </div>
        <div className="container-luxury relative text-center max-w-4xl mx-auto">
          <motion.div {...fU()}>
            <span className="section-label block mb-6">Our Philosophy</span>
            <p className="font-times font-normal leading-relaxed mb-8" style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2rem)', color: 'var(--luxury-dark)' }}>
              To create landmark developments that combine luxury, innovation, sustainability, and timeless value — while maintaining the highest standards of transparency, trust, and customer satisfaction.
            </p>
            <div className="mx-auto mb-7" style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(26,26,26,0.82)' }}>
              This philosophy is not a statement — it is the operational standard that governs every Majestique project, from the first site survey to the final handover. Every decision is measured against it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Vision ─────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Our Vision</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                To Shape the Future of<br />Urban Living.
              </h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'rgba(26,26,26,0.85)' }}>
                To be recognized as one of India's most trusted and admired real estate brands, creating exceptional developments that redefine lifestyles, inspire communities, and deliver lasting value for generations.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
                This vision is not aspirational — it is operational. Every MahaRERA filing, every on-time handover, every debt-free balance sheet is a direct expression of where we are headed.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/about/milestones" className="btn-gold transition-transform duration-300 hover:scale-105">Our Journey</Link>
                <Link to="/about/leadership" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Meet Our Leaders</Link>
              </div>
            </motion.div>

            <motion.div {...fR(0.12)} className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src= {visionContentImg}
                  alt="Majestique Vision — Premium Urban Development"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.5)' }} />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.5)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission — light numbered grid ──────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Our Mission"
              title="Delivering Excellence at Every Step."
              subtitle="To create thoughtfully designed, high-quality developments that combine innovation, sustainability, and customer-centricity — while maintaining the highest standards of integrity, transparency, and execution."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {MISSION_POINTS.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="flex items-start gap-5 p-6 bg-white"
                style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 20px rgba(5,5,5,0.05)', transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.4)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(5,5,5,0.09)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 4px 16px rgba(157,134,104,0.3)' }}>
                  <span className="font-ui text-xs font-semibold" style={{ color: 'var(--luxury-dark)' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.85)' }}>{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Pillars — cards ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-14 text-center">
            <SectionHeader
              label="At A Glance"
              title="Philosophy, Vision & Mission"
              subtitle="Three pillars that define the Majestique way — every project we build is a direct expression of these foundational commitments."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="p-8 text-center relative overflow-hidden bg-white"
                style={{
                  border: card.accent ? '1px solid rgba(157,134,104,0.45)' : '1px solid rgba(157,134,104,0.15)',
                  boxShadow: card.accent ? '0 8px 40px rgba(157,134,104,0.12)' : '0 2px 20px rgba(5,5,5,0.04)',
                  transition: 'box-shadow 0.35s, transform 0.35s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 56px rgba(5,5,5,0.1)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = card.accent ? '0 8px 40px rgba(157,134,104,0.12)' : '0 2px 20px rgba(5,5,5,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {card.accent && (
                  <div className="absolute top-0 inset-x-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold-dark), transparent)' }} />
                )}
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.12 + 0.15 }}
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: card.accent ? 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)' : 'rgba(157,134,104,0.08)',
                    border: card.accent ? 'none' : '1px solid rgba(157,134,104,0.22)',
                    boxShadow: card.accent ? '0 6px 24px rgba(157,134,104,0.3)' : 'none',
                  }}
                >
                  <card.icon size={24} style={{ color: card.accent ? 'var(--luxury-dark)' : 'var(--gold)' }} />
                </motion.div>
                <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>{card.label}</p>
                <h3 className="font-times text-2xl mb-3" style={{ color: 'var(--luxury-dark)' }}>{card.title}</h3>
                <div className="gold-line-center mb-4" />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.84)' }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto — light elegant ─────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.28),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.28),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.05) 0%, transparent 65%)' }} />
        <div className="container-luxury max-w-3xl mx-auto text-center relative">
          <motion.span {...fU()} className="section-label block mb-6">The Majestique Belief</motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display select-none mb-1"
            style={{ fontSize: '4rem', color: 'rgba(157,134,104,0.18)', lineHeight: 0.6 }}
          >
            &ldquo;
          </motion.div>

          {/* Tier 1 — the premise */}
          <div className="space-y-2 mb-7">
            {[
              'We believe a home is more than square feet and a price tag.',
              'It is where your family truly belongs.',
            ].map((text, i) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="font-times italic leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.7vw, 1.2rem)', color: 'rgba(44,62,88,0.55)' }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Tier 2 — the turn, warmed toward gold */}
          <div className="space-y-2 mb-8">
            {[
              'Where milestones are marked, and memories are made.',
              'Where generations return, again and again.',
            ].map((text, i) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                className="font-times italic leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: 'var(--gold-dark)' }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Divider marking the shift from musing to declaration */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mx-auto mb-8"
            style={{ width: '48px', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', transformOrigin: 'center' }}
          />

          {/* Tier 3 — the declaration */}
          <div className="space-y-3">
            {[
              'At Majestique, we do not sell homes — we deliver lifestyles.',
              'With discipline, excellence, and an unwavering commitment to your trust.',
            ].map((text, i) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.65 + i * 0.12 }}
                className="font-times font-normal leading-snug"
                style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.65rem)', color: 'var(--luxury-dark)' }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-10 mx-auto"
            style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', transformOrigin: 'center' }}
          />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-25" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-25" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center">
          <motion.div {...fU()}>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--luxury-dark)' }}>
              See Our Vision Come to Life
            </h2>
            <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Explore our ongoing and completed MahaRERA-registered projects across Pune — and discover what it means to live in a Majestique home.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
              <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
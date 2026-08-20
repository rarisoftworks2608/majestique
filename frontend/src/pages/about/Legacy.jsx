import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/ui/Seo'
import SectionHeader from '../../components/ui/SectionHeader'
import legacyHero from '../../assets/legacy in business.jpg'
import legacyImg from '../../assets/legacy_pic.jpg'

const MILESTONES = [
  {
    year: '1992', number: '01', label: 'The Foundation',
    title: 'The Beginning of an Entrepreneurial Legacy',
    desc: 'The foundation of the group was established through a successful textile business venture, driven by vision, determination, and a commitment to delivering quality products and customer satisfaction across India.',
    side: 'left',
  },
  {
    year: '2002', number: '02', label: 'Real Estate',
    title: 'Entering The World of Real Estate',
    desc: 'Recognizing the evolving aspirations of modern urban families, the group expanded into real estate with the launch of Majestique Landmarks, focused on delivering lifestyle-oriented residential developments.',
    side: 'right',
  },
  {
    year: '2007', number: '03', label: 'Trust',
    title: 'Building Trust Through Delivery',
    desc: 'Customer trust, transparency, and timely delivery became the defining pillars of the Majestique philosophy, setting a new standard in an industry known for delays and opacity.',
    side: 'left',
  },
  {
    year: '2012', number: '04', label: 'Premium',
    title: 'Expanding Into Premium Urban Living',
    desc: 'The portfolio evolved from affordable housing to premium and luxury developments, offering elevated lifestyles, contemporary amenities, and thoughtfully designed communities across Pune.',
    side: 'right',
  },
  {
    year: '2018', number: '05', label: 'Scale',
    title: 'Scaling New Heights',
    desc: 'With landmark developments and thousands of satisfied families, Majestique Landmarks emerged as one of Pune\'s most trusted and respected developers, a brand synonymous with quality.',
    side: 'left',
  },
  {
    year: 'Today', number: '06', label: 'Future',
    title: 'Shaping The Future of Urban Living',
    desc: 'Majestique Landmarks continues to create future-ready developments inspired by global architecture, smart urban planning, and refined lifestyle experiences, building landmarks for generations.',
    side: 'right',
  },
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Legacy() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.75', 'end 0.4'] })
  const spineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <>
      <Seo
        title="Our Legacy"
        description="The founding story of Majestique Landmarks, spanning three decades of crafting landmark residences in Pune with integrity, innovation, and uncompromising quality."
      />

      {/* ── Page Banner ───────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden -mt-20 lg:-mt-[118px]"
        style={{ minHeight: 'clamp(360px, 48vh, 520px)' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={legacyHero}
            alt="Majestique Landmarks"
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* Layered overlay: dark sweep left + bottom vignette */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(100deg, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.52) 45%, rgba(26,26,26,0.12) 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.55) 0%, transparent 50%)' }}
          />
          {/* Warm gold left glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(212,175,55,0.1) 0%, transparent 50%)' }}
          />
        </div>

        {/* Top gold rule */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold-dark), transparent)' }}
        />

        {/* Content */}
        <div className="container-luxury relative z-10 pb-14 pt-28">

          {/* Est. tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-7 h-px" style={{ background: 'var(--gold)' }} />
            <span className="font-ui text-[0.62rem] tracking-[0.28em] uppercase" style={{ color: 'var(--gold)' }}>Est. 1992</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease }}
            className="font-times font-normal leading-[1.06] mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', color: 'var(--beige)', letterSpacing: '-0.015em' }}
          >
            Our{' '}
            <em className="not-italic" style={{ color: 'var(--gold-light)' }}>Legacy</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="font-body text-sm leading-[1.85] max-w-lg"
            style={{ color: 'rgba(243,239,232,0.92)', fontWeight: 400 }}
          >
            From a single entrepreneurial vision to Pune's most trusted real estate brand, built across three decades with integrity, discipline, and an unwavering commitment to excellence.
          </motion.p>

          {/* Animated gold accent bar */}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '52px' }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="block mt-7"
            style={{ height: '1.5px', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}
          />
        </div>

        {/* Bottom gold rule */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.28), transparent)' }}
        />
      </section>

      {/* ── Origin story ──────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="section-label block mb-3">The Beginning</span>
              <div className="gold-line" />
              <h2
                className="font-times font-normal leading-tight mb-6"
                style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}
              >
                A Vision Born in Pune,<br />A Legacy Built on Trust
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.85)' }}>
                <p>In 1992, what began as a textile enterprise built on integrity and customer trust gradually evolved into one of Pune's most respected real estate brands. The founding family's commitment to quality, punctuality, and transparent business, values honed across 45 retail stores nationwide, became the bedrock of Majestique Landmarks.</p>
                <p>In 2002, Majestique Landmarks entered real estate with a singular mission: to deliver homes with a lifestyle for deserving families across Pune. The principles that built the textile business became the foundations of every home we build.</p>
                <p>Today, with 16+ landmark projects, 18,000+ families housed, and a debt-free balance sheet, Majestique stands as a testament to what integrity, discipline, and vision can build over three decades.</p>
              </div>
              <div className="mt-8">
                <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img
                  src={legacyImg}
                  alt="Majestique Landmarks Legacy"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,9,0.45) 0%, transparent 60%)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-16 text-center">
            <SectionHeader
              label="Timeline"
              title="Chapters of Excellence"
              subtitle="From a clothing store in 1992 to Pune's most recognised real estate developer, every chapter defined by vision, trust, and excellence."
              align="center"
            />
          </div>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* Spine line — track (static) */}
            <div
              className="absolute left-1/2 top-0 bottom-0 hidden md:block"
              style={{ width: '2px', background: 'rgba(212,175,55,0.15)', transform: 'translateX(-50%)' }}
            />
            {/* Spine line — scroll-linked fill */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 hidden md:block"
              style={{ width: '2px', background: 'linear-gradient(to bottom, var(--gold), var(--gold-dark))', transform: 'translateX(-50%)', transformOrigin: 'top', scaleY: spineProgress, boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
            />

            <div className="space-y-0">
              {MILESTONES.map((item, i) => {
                const isLeft = item.side === 'left'
                return (
                  <div key={item.year} className="relative">
                    <div className={`flex flex-col md:flex-row items-center gap-0 ${isLeft ? '' : 'md:flex-row-reverse'}`}>

                      {/* Card */}
                      <div className={`flex-1 flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} py-6`}>
                        <motion.div
                          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="relative w-full max-w-sm"
                          style={{ background: 'white', border: '1px solid rgba(212,175,55,0.18)', boxShadow: '0 4px 24px rgba(26,26,26,0.06)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
                          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 48px rgba(26,26,26,0.12)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,26,26,0.06)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                          <div className="p-7 relative overflow-hidden">
                            <span className="absolute -top-2 right-3 font-display select-none pointer-events-none" style={{ fontSize: '5.5rem', color: 'rgba(212,175,55,0.05)', lineHeight: 1 }}>{item.number}</span>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="inline-flex items-center justify-center px-3 py-1 font-times text-xl" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: 'var(--luxury-dark)', minWidth: '72px' }}>{item.year}</span>
                              <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>{item.label}</span>
                            </div>
                            <h3 className="font-times text-xl leading-snug mb-3" style={{ color: 'var(--luxury-dark)' }}>{item.title}</h3>
                            <div className="w-8 h-px mb-3" style={{ background: 'rgba(212,175,55,0.35)' }} />
                            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.84)' }}>{item.desc}</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Node */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.45, delay: 0.25, type: 'spring', stiffness: 200 }}
                        className="hidden md:flex flex-col items-center flex-shrink-0 z-10"
                        style={{ width: '72px' }}
                      >
                        <div className="w-14 h-14 flex items-center justify-center" style={{ background: 'white', border: '2px solid var(--gold)', boxShadow: '0 0 0 6px rgba(212,175,55,0.08), 0 4px 20px rgba(26,26,26,0.1)' }}>
                          <div className="w-6 h-6" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }} />
                        </div>
                      </motion.div>

                      <div className="flex-1 hidden md:block" />
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div className="md:hidden flex justify-center">
                        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand promise ─────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display tracking-widest uppercase" style={{ fontSize: 'clamp(6rem, 18vw, 18rem)', color: 'rgba(212,175,55,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}>LEGACY</span>
        </div>
        <div className="container-luxury relative text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span className="section-label block mb-6">The Majestique Promise</span>
            <div className="font-display mb-3 select-none" style={{ fontSize: '5rem', color: 'rgba(212,175,55,0.15)', lineHeight: 0.7 }}>"</div>
            <p className="font-times font-normal leading-relaxed mb-8" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', color: 'var(--luxury-dark)' }}>
              We do not merely build homes. We deliver a lifestyle, built with discipline, superior quality, and a reputation earned over three decades of unbroken trust.
            </p>
            <div className="mx-auto mb-6" style={{ width: '60px', height: '1px', background: 'var(--gold)' }} />
            <p className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.45)' }}>The Founding Philosophy of Majestique Landmarks</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury relative text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="section-label block mb-3">The Legacy Continues</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>Be Part of Our Next Chapter</h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>Explore our ongoing and completed projects across Pune's finest micro-markets: Balewadi, Kharadi, NIBM, Hadapsar, and Kothrud.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">View Ongoing Projects</Link>
              <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
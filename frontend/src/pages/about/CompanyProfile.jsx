import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, Gem, ShieldCheck, Users, Leaf, Building2, Star, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import Seo from '../../components/ui/Seo'
import CountUp from '../../components/ui/CountUp'
import companyHeroImg from '../../assets/legacy in business.jpg'

const CORE_VALUES = [
  { icon: Clock,       title: 'Discipline',    num: '01', desc: 'Precision, accountability, and timely execution form the foundation of our operations. We uphold the highest standards of professionalism across every commitment.' },
  { icon: Star,        title: 'Excellence',    num: '02', desc: 'Every development is built with meticulous attention to quality, design, and aesthetics. True luxury lies in thoughtful details and uncompromising standards.' },
  { icon: ShieldCheck, title: 'Transparency',  num: '03', desc: 'Trust is earned through honesty. We maintain transparent business practices, MahaRERA compliance, and customer-first communication at every stage.' },
  { icon: Gem,         title: 'Value',         num: '04', desc: 'We create developments balancing luxury, functionality, and long-term investment appreciation — ensuring meaningful value for homeowners and investors.' },
  { icon: Users,       title: 'Reputation',    num: '05', desc: 'Three decades of on-time delivery and customer satisfaction have built a reputation founded on trust, credibility, and enduring relationships.' },
  { icon: Leaf,        title: 'Sustainability', num: '06', desc: 'Responsible development shapes better futures. Our projects integrate eco-conscious planning, efficient infrastructure, and sustainable urban practices.' },
]

const PROFILE_POINTS = [
  'Architectural excellence & contemporary design',
  'Strategic urban micro-market locations',
  'Timely possession — a promise always kept',
  'Luxury lifestyle experiences for every family',
  'Sustainable, future-ready development practices',
  'Customer-centric planning & post-handover support',
  'Long-term investment value creation',
]

const DELIVERY_POINTS = [
  { icon: Clock,       label: 'Timely Possession' },
  { icon: Building2,   label: 'Construction Quality' },
  { icon: ShieldCheck, label: 'Transparent Communication' },
  { icon: Gem,         label: 'Premium Specifications' },
  { icon: Star,        label: 'Exceptional Customer Experience' },
  { icon: Users,       label: 'Long-Term Relationship Building' },
]

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fS = (d = 0) => ({ initial: { opacity: 0, scale: 0.94 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

export default function CompanyProfile() {
  return (
    <>
      <Seo
        title="Company Profile"
        description="Majestique Landmarks — Pune's trusted premium real estate developer crafting timeless landmarks with vision, trust, and architectural excellence."
      />
      <PageHero
        title="Crafting Timeless Landmarks"
        subtitle="With Vision, Trust & Excellence — For over two decades, Majestique Landmarks has been shaping premium urban experiences through thoughtfully designed developments, architectural excellence, and customer-first values."
        breadcrumb={['Home', 'About', 'Company Profile']}
        bgImage={companyHeroImg}
      />

      {/* ── Company Intro ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Who We Are</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Building More Than Homes —<br />Creating Enduring Legacies
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.85)' }}>
                <p>Majestique Landmarks is a premium real estate developer recognized for delivering sophisticated residential developments across Pune's most desirable locations. Rooted in strong business ethics and guided by a commitment to quality, the company has consistently created spaces that combine elegant design, strategic connectivity, and long-term value.</p>
                <p>With a legacy that began in the textile industry and evolved into real estate excellence, Majestique Landmarks has grown into a trusted name synonymous with transparency, timely delivery, and refined urban living.</p>
                <p>Every development reflects our philosophy of creating not just structures, but thoughtfully curated lifestyle experiences that elevate the way people live, connect, and thrive.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
                <Link to="/about/vision-mission" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Our Vision</Link>
              </div>
            </motion.div>

            <motion.div {...fR(0.12)} className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://majestiqueproperties.com/wp-content/uploads/2025/03/Evolvus-By-Majestique-Landmarks-Elevation-Image-01-scaled.webp"
                  alt="Majestique Evolvus"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(5,5,5,0.45) 100%)' }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-ui text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(157,134,104,0.75)' }}>Featured — Ongoing</p>
                  <p className="font-times text-lg" style={{ color: 'white' }}>Majestique Evolvus, Kharadi</p>
                </div>
              </div>
              <motion.div {...fU(0.38)} className="absolute -bottom-6 -right-6 p-5 text-center" style={{ background: 'var(--luxury-dark)', border: '1px solid rgba(157,134,104,0.35)', minWidth: '130px' }}>
                <p className="font-times text-3xl leading-none" style={{ color: 'var(--gold)' }}><CountUp value="30+" /></p>
                <p className="font-ui text-[0.6rem] tracking-widest uppercase mt-1" style={{ color: 'rgba(243,239,232,0.4)' }}>Years of Legacy</p>
              </motion.div>
              <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats band ────────────────────────────────────────────── */}
      <section className="py-14 relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.28),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.28),transparent)' }} />
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { v: '30+', l: 'Years of Business' },
              { v: '16+', l: 'Landmark Projects' },
              { v: '18K+', l: 'Families Housed' },
              { v: '10M+', l: 'Sq Ft Delivered' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-center py-8 px-4"
                style={{ borderRight: i < 3 ? '1px solid rgba(157,134,104,0.18)' : 'none' }}
              >
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--luxury-dark)' }}><CountUp value={s.v} /></p>
                <div className="w-6 h-px mx-auto mb-2" style={{ background: 'var(--gold)' }} />
                <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(44,62,88,0.42)' }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ───────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display tracking-widest uppercase" style={{ fontSize: 'clamp(8rem, 24vw, 24rem)', color: 'rgba(157,134,104,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}>STORY</span>
        </div>
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()} className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src="https://majestiqueproperties.com/wp-content/uploads/2025/03/Rhythm-County-Elevation-01-scaled.webp"
                  alt="Majestique Rhythm County"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.32) 0%, transparent 55%)' }} />
              </div>
              <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            </motion.div>
            <motion.div {...fR(0.1)}>
              <span className="section-label block mb-3">Our Story</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}>
                The Story Behind<br />The Brand
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(44,62,88,0.7)' }}>
                <p>The journey of Majestique Landmarks began with entrepreneurial ambition, visionary leadership, and an unwavering commitment to excellence. What started as a successful textile enterprise gradually transformed into one of Pune's most respected real estate brands.</p>
                <p>Driven by deep market understanding and evolving urban aspirations, the company expanded into real estate with a mission to deliver developments that offer exceptional value, premium quality, and elevated lifestyles.</p>
                <p>Today, Majestique Landmarks continues to shape modern city living with future-ready developments inspired by global standards and timeless architectural principles.</p>
              </div>
              <motion.div {...fU(0.3)} className="mt-8 p-6 relative" style={{ borderLeft: '3px solid var(--gold)', background: 'var(--cream)' }}>
                <div className="font-display select-none mb-1" style={{ fontSize: '3.5rem', color: 'rgba(157,134,104,0.2)', lineHeight: 0.7 }}>"</div>
                <p className="font-times text-lg italic leading-relaxed" style={{ color: 'rgba(44,62,88,0.82)' }}>
                  From textiles to timeless landmarks — every era defined by the same north star: excellence without compromise.
                </p>
                <p className="font-ui text-xs tracking-widest uppercase mt-4" style={{ color: 'rgba(157,134,104,0.55)' }}>— Founding Philosophy</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Core Values"
              title="The Principles That Define Us"
              subtitle="Six foundational values that guide every decision, every development, and every relationship we build — inherited from three decades of entrepreneurial excellence."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative overflow-hidden bg-white"
                style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 20px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 56px rgba(5,5,5,0.1)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.45)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(5,5,5,0.05)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                <div className="p-8 relative">
                  <span className="absolute top-3 right-4 font-display select-none pointer-events-none" style={{ fontSize: '5.5rem', color: 'rgba(157,134,104,0.05)', lineHeight: 1 }}>{val.num}</span>
                  <motion.div
                    {...fS(i * 0.08 + 0.15)}
                    className="w-14 h-14 flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.1), rgba(157,134,104,0.04))', border: '1px solid rgba(157,134,104,0.2)' }}
                  >
                    <val.icon size={22} style={{ color: 'var(--gold)' }} />
                  </motion.div>
                  <h3 className="font-times text-xl mb-2" style={{ color: 'var(--luxury-dark)' }}>{val.title}</h3>
                  <div className="w-8 h-px mb-3" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.84)' }}>{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Focus ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fR(0.12)} className="order-1 lg:order-2 relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://majestiqueproperties.com/wp-content/uploads/2025/03/Aravali-01-scaled.webp"
                  alt="Majestique Aravali"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.28) 0%, transparent 60%)' }} />
              </div>
              <motion.div {...fU(0.4)} className="absolute -bottom-5 -left-5 p-5" style={{ background: 'var(--cream)', border: '1px solid rgba(157,134,104,0.25)', boxShadow: '0 8px 32px rgba(5,5,5,0.08)' }}>
                <p className="font-times text-2xl leading-none mb-1" style={{ color: 'var(--luxury-dark)' }}><CountUp value="16+" /></p>
                <p className="font-ui text-[0.6rem] tracking-widest uppercase" style={{ color: 'rgba(44,62,88,0.42)' }}>Landmark Projects</p>
              </motion.div>
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            </motion.div>
            <motion.div {...fL()} className="order-2 lg:order-1">
              <span className="section-label block mb-3">Our Focus</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}>
                A Legacy Built On<br />Quality & Trust
              </h2>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(26,26,26,0.84)' }}>
                Majestique Landmarks combines decades of entrepreneurial expertise with a modern vision for urban development. Every project is thoughtfully designed to deliver comfort, sophistication, and enduring quality across Pune's key growth corridors.
              </p>
              <ul className="space-y-3">
                {PROFILE_POINTS.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                      <ArrowRight size={10} style={{ color: 'var(--luxury-dark)' }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.86)' }}>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Committed to Deliver ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Our Commitment"
              title="Committed Beyond Promises"
              subtitle="At Majestique Landmarks, delivery is more than completing a project — it is about fulfilling aspirations, building trust, and creating spaces that families proudly call home."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELIVERY_POINTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="flex items-center gap-5 p-6 bg-white"
                style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 16px rgba(5,5,5,0.04)', transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 40px rgba(5,5,5,0.09)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.38)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.04)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                  <item.icon size={20} style={{ color: 'var(--luxury-dark)' }} />
                </div>
                <p className="font-times text-lg" style={{ color: 'var(--luxury-dark)' }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        {/* Radial warm glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Discover Majestique</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Find Your Majestique Address
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Explore our ongoing and completed MahaRERA-registered projects across Pune's finest micro-markets — Balewadi, Kharadi, NIBM, Hadapsar, and Kothrud.
            </p>
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
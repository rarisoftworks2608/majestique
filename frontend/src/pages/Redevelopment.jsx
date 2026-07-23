import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Award, Eye, Clock, TrendingUp, HardHat, Users, ShieldCheck, Gem,
  Home, Waves, Building2, Car, Leaf, MapPin,
  ClipboardList, LayoutTemplate, Scale, KeyRound,
  ArrowRight, CheckCircle2, Phone, Mail, MessageSquare, Send,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Seo from '../components/ui/Seo'
import nfsImg from '../assets/majestique_new_friends-kothrud-pune-majestique_landmarks.avif'
import nfsElevImg from '../assets/NFS-Evelvation-01-2048x1152.webp'
import rhythmImg from '../assets/Rhythm-County-Elevation-01-2048x1152.webp'
import towersImg from '../assets/Majestique-Towers-Elevation-01-2048x1152.webp'
import twilightImg from '../assets/twilight-balewadi-pune-majestique_landmarks.avif'
import contactBgImg from '../assets/Contact-Us-Majestique.jpg'

/* ── Data ─────────────────────────────────────────────────── */
const STATS = [
  { value: '30+', label: 'Years of Expertise' },
  { value: '50+', label: 'Societies Redeveloped' },
  { value: '₹0',  label: 'Cost to Residents' },
  { value: '100%', label: 'RERA Compliant' },
]

const APPROACH = [
  'Maximizing land potential',
  'Enhancing lifestyle quality',
  'Delivering larger and better-planned homes',
  'Creating modern community experiences',
  'Increasing long-term property value',
  'Ensuring complete transparency throughout',
]

const WHY_TRUST = [
  { num: '01', icon: Award,       title: 'Proven Legacy of Trust',         desc: 'With years of experience in delivering landmark developments across Pune, we bring reliability, credibility, and professional expertise to every redevelopment partnership.' },
  { num: '02', icon: Eye,         title: 'Transparent Redevelopment Process', desc: 'We maintain complete clarity across approvals, timelines, agreements, financials, and project execution to ensure complete confidence for society members.' },
  { num: '03', icon: Clock,       title: 'Timely Delivery Commitment',     desc: 'Our strong project management systems and execution capabilities ensure on-time delivery without compromising construction quality.' },
  { num: '04', icon: TrendingUp,  title: 'Financial Strength & Stability', desc: 'Backed by a strong business foundation and extensive industry experience, we deliver redevelopment projects with financial confidence and operational stability.' },
  { num: '05', icon: HardHat,     title: 'Premium Construction Standards', desc: 'Every development is built using superior construction practices, high-quality materials, refined finishes, and modern architectural standards.' },
  { num: '06', icon: Users,       title: 'End-to-End In-House Expertise',  desc: 'From architecture and planning to legal consultation and project management, our experienced in-house teams ensure smooth coordination and flawless execution.' },
  { num: '07', icon: ShieldCheck, title: 'RERA-Compliant Developments',    desc: 'All our redevelopment projects follow complete regulatory compliance, ensuring trust, accountability, and peace of mind for residents.' },
  { num: '08', icon: Gem,         title: 'Future-Ready Lifestyle Planning', desc: 'We create modern communities equipped with premium amenities, enhanced security systems, efficient layouts, and sustainable infrastructure.' },
]

const PROCESS = [
  { num: '01', icon: ClipboardList, title: 'Society Consultation & Feasibility', desc: 'We begin with a detailed understanding of the society\'s requirements, property potential, and redevelopment opportunities.' },
  { num: '02', icon: LayoutTemplate, title: 'Planning & Design Strategy',        desc: 'Our experts create optimized master plans focused on space enhancement, modern amenities, functionality, and aesthetic excellence.' },
  { num: '03', icon: Scale,          title: 'Legal & Regulatory Approvals',      desc: 'Our in-house legal and technical teams ensure smooth approvals, documentation, and complete compliance throughout the process.' },
  { num: '04', icon: HardHat,        title: 'Construction & Execution',          desc: 'With advanced construction methodologies and disciplined execution systems, we ensure quality-driven and timely project delivery.' },
  { num: '05', icon: KeyRound,       title: 'Handover & Community Transformation', desc: 'The result is a premium, future-ready residential community designed to elevate lifestyles and maximize long-term value.' },
]

const BENEFITS = [
  { icon: Home,       title: 'Larger & Better-Planned Homes',     desc: 'Redevelopment offers homeowners the opportunity to upgrade to more spacious residences with optimized layouts and enhanced functionality.' },
  { icon: Waves,      title: 'Modern Lifestyle Amenities',        desc: 'Residents benefit from contemporary amenities such as clubhouses, fitness centers, landscaped gardens, children\'s play areas, smart security systems, and recreational spaces.' },
  { icon: TrendingUp, title: 'Enhanced Property Value',           desc: 'Modern infrastructure, premium amenities, and improved building quality significantly increase the long-term appreciation and market value of the property.' },
  { icon: Building2,  title: 'Improved Infrastructure & Safety',  desc: 'Redeveloped projects incorporate advanced structural engineering, fire safety systems, efficient utilities, and modern construction standards.' },
  { icon: Car,        title: 'Better Parking & Open Spaces',      desc: 'With modern planning solutions such as podium and basement parking, more open spaces become available for community living and recreational activities.' },
  { icon: Leaf,       title: 'Sustainable Urban Living',          desc: 'New-age developments integrate eco-conscious infrastructure, energy-efficient systems, and sustainable planning practices for a better future.' },
]

const PROJECTS = [
  {
    name: 'New Friends Society, Kothrud',
    location: 'Kothrud, Pune',
    desc: 'A landmark redevelopment transforming a well-established residential community into a premium urban lifestyle destination. Thoughtfully designed to offer luxury residences, enhanced amenities, and contemporary living experiences in one of Pune\'s most prestigious neighborhoods.',
    image: nfsImg,
    config: '2, 3 & 4 BHK',
    tag: 'Ongoing',
  },
  {
    name: 'Majestique Krutarth – Market Yard',
    location: 'Market Yard, Pune',
    desc: 'A modern redevelopment initiative crafted to redefine everyday living through intelligent planning, refined architecture, and upgraded lifestyle infrastructure designed for evolving urban families.',
    image: rhythmImg,
    config: '2 & 3 BHK',
    tag: 'Ongoing',
  },
]

const QUALITY_POINTS = [
  'Structural excellence',
  'Premium specifications',
  'Contemporary architectural design',
  'Smart space utilization',
  'Efficient project management',
  'Seamless customer communication',
  'Sustainable development practices',
]

/* ── Animations ────────────────────────────────────────────── */
const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

export default function Redevelopment() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', society: '', location: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Redevelopment"
        description="Partner with Majestique Landmarks for premium society redevelopment in Pune — transparent, timely, and built on trust."
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="Reimagining Communities. Rebuilding Legacies."
        subtitle="Premium Redevelopment Solutions Designed For Modern Urban Living — transforming aging spaces into future-ready lifestyle destinations."
        breadcrumb={['Home', 'Redevelopment']}
        bgImage={nfsImg}
      />

      {/* ── Stats Band ────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        {/* Background image — visible but overlaid */}
        <div className="absolute inset-0">
          <img src={towersImg} alt="" aria-hidden className="w-full h-full object-cover object-center opacity-[0.28]" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0.82) 100%)' }} />
        </div>
        {/* Gold shimmer borders */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.6),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.45),transparent)' }} />
        <div className="container-luxury relative py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                {...fU(i * 0.12)}
                className="text-center py-8 px-6 group relative"
                style={{ borderRight: i < 3 ? '1px solid rgba(157,134,104,0.22)' : 'none' }}
              >
                {/* Gold accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '2rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="h-0.5 mx-auto mb-5"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
                />
                {/* Number */}
                <p
                  className="font-times leading-none mb-4"
                  style={{
                    fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                    background: 'linear-gradient(135deg, #d4b896 0%, var(--gold) 45%, #c4a97d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </p>
                {/* Thin divider */}
                <div className="w-6 h-px mx-auto mb-4" style={{ background: 'rgba(157,134,104,0.55)' }} />
                {/* Label */}
                <p className="font-ui text-[0.62rem] tracking-[0.28em] uppercase" style={{ color: 'rgba(243,239,232,0.72)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        {/* Ghost watermark */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display uppercase tracking-widest" style={{ fontSize: 'clamp(6rem,18vw,18rem)', color: 'rgba(157,134,104,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}>REBUILD</span>
        </div>
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Introduction</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Transforming Existing Spaces Into Landmark Communities
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(44,62,88,0.72)' }}>
                <p>Urban landscapes continue to evolve, and redevelopment has become the foundation for creating smarter, safer, and more luxurious living environments. At Majestique Landmarks, we specialize in delivering redevelopment projects that preserve the emotional value of existing communities while introducing contemporary architecture, premium amenities, and future-ready infrastructure.</p>
                <p>With decades of real estate expertise, financial strength, and a proven track record of timely delivery, we ensure every redevelopment journey is transparent, seamless, and built on trust.</p>
              </div>
              <Link to="/contact" className="btn-gold transition-transform duration-300 hover:scale-105">Start the Conversation</Link>
            </motion.div>

            {/* Approach list */}
            <motion.div {...fR(0.1)} className="lg:pt-8">
              <div className="p-8 bg-white" style={{ border: '1px solid rgba(157,134,104,0.16)', boxShadow: '0 8px 40px rgba(5,5,5,0.06)' }}>
                <div className="h-1 w-full -mt-8 mb-8" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                <p className="font-ui text-[0.62rem] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>Our Approach Focuses On</p>
                <div className="w-8 h-px mb-6" style={{ background: 'var(--gold)' }} />
                <ul className="space-y-0">
                  {APPROACH.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
                      className="flex items-center gap-4 py-3"
                      style={{ borderBottom: i < APPROACH.length - 1 ? '1px solid rgba(157,134,104,0.1)' : 'none' }}
                    >
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                        <ArrowRight size={10} style={{ color: 'white' }} />
                      </div>
                      <span className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.8)' }}>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(157,134,104,0.15)' }}>
                  <p className="font-times italic text-base" style={{ color: 'rgba(44,62,88,0.6)' }}>
                    Every redevelopment project is thoughtfully executed to deliver comfort, security, elegance, and sustainable urban living.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Societies Trust Us ────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury">
          <div className="text-center mb-16">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Why Choose Us</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', color: 'var(--luxury-dark)' }}>
                Why Societies Trust Majestique Landmarks
              </h2>
            </motion.div>
          </div>

          {/* Feature rows — editorial numbered list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {WHY_TRUST.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.08 }}
                className="group flex items-start gap-5 p-7 bg-white transition-all duration-300"
                style={{
                  borderBottom: '1px solid rgba(157,134,104,0.12)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(157,134,104,0.12)' : 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(5,5,5,0.08)'; e.currentTarget.style.zIndex = '1'; e.currentTarget.style.position = 'relative' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.zIndex = '0' }}
              >
                {/* Faded number */}
                <div className="flex-shrink-0 w-14 text-right">
                  <span className="font-display select-none" style={{ fontSize: '2.8rem', color: 'rgba(157,134,104,0.1)', lineHeight: 1 }}>{item.num}</span>
                </div>
                {/* Icon */}
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.12), rgba(157,134,104,0.04))', border: '1px solid rgba(157,134,104,0.22)' }}>
                  <item.icon size={18} style={{ color: 'var(--gold)' }} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-times text-lg mb-1.5" style={{ color: 'var(--luxury-dark)' }}>{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.62)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Redevelopment Process ─────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        {/* Ghost watermark */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display uppercase" style={{ fontSize: 'clamp(5rem,15vw,15rem)', color: 'rgba(157,134,104,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}>PROCESS</span>
        </div>
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Heading */}
            <motion.div {...fL()} className="lg:sticky lg:top-32">
              <span className="section-label block mb-3">Our Approach</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Our Redevelopment Approach
              </h2>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(44,62,88,0.68)' }}>
                A structured, transparent, and resident-first process — from the first conversation to the moment you step into your new home.
              </p>
              {/* Progress indicator */}
              <div className="flex items-center gap-3">
                {PROCESS.map((_, i) => (
                  <div key={i} className="h-0.5 flex-1" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark))' }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-ui text-[0.55rem] tracking-wider uppercase" style={{ color: 'rgba(92,74,48,0.5)' }}>Start</span>
                <span className="font-ui text-[0.55rem] tracking-wider uppercase" style={{ color: 'rgba(92,74,48,0.5)' }}>Completion</span>
              </div>
            </motion.div>

            {/* Steps — vertical timeline */}
            <div className="relative">
              {/* Connecting vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-5 top-6 bottom-6 w-px origin-top"
                style={{ background: 'linear-gradient(to bottom, var(--gold), rgba(157,134,104,0.15))' }}
              />
              <div className="space-y-0">
                {PROCESS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.12 }}
                    className="relative flex gap-8 pb-10 group"
                  >
                    {/* Step circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 + i * 0.12, type: 'spring', stiffness: 200 }}
                        className="w-10 h-10 flex items-center justify-center font-display text-sm transition-all duration-300 group-hover:scale-110"
                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: 'var(--luxury-dark)', fontWeight: 700 }}
                      >
                        {step.num}
                      </motion.div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-10" style={{ borderBottom: i < PROCESS.length - 1 ? '1px solid rgba(157,134,104,0.1)' : 'none' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 flex items-center justify-center"
                          style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.18)' }}>
                          <step.icon size={14} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h3 className="font-times text-xl" style={{ color: 'var(--luxury-dark)' }}>{step.title}</h3>
                      </div>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.65)' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />
        <div className="container-luxury relative">
          <div className="text-center mb-16">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Benefits</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', color: 'var(--luxury-dark)' }}>
                Advantages of Redevelopment
              </h2>
              <p className="font-body text-base leading-relaxed max-w-2xl mx-auto mt-4" style={{ color: 'rgba(26,26,26,0.65)' }}>
                Redevelopment is not just about a new building — it is a complete lifestyle upgrade that benefits every resident.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="group bg-white relative overflow-hidden transition-all duration-350"
                style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 16px rgba(5,5,5,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 52px rgba(5,5,5,0.1)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.04)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)' }}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                <div className="p-7">
                  <div className="w-12 h-12 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.14), rgba(157,134,104,0.04))', border: '1px solid rgba(157,134,104,0.22)' }}>
                    <b.icon size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                  <h3 className="font-times text-xl mb-3" style={{ color: 'var(--luxury-dark)' }}>{b.title}</h3>
                  <div className="w-8 h-px mb-3" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.65)' }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury">
          <div className="text-center mb-16">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Signature Projects</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', color: 'var(--luxury-dark)' }}>
                Signature Redevelopment Projects
              </h2>
            </motion.div>
          </div>
          <div className="space-y-8">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden group`}
                style={{ border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 4px 32px rgba(5,5,5,0.07)' }}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`} style={{ aspectRatio: '16/10', minHeight: '280px' }}>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(5,5,5,0.3) 100%)' }} />
                  <div className="absolute top-5 left-5">
                    <span className="font-ui text-[0.58rem] tracking-widest uppercase px-3 py-1.5"
                      style={{ background: 'var(--gold)', color: 'var(--luxury-dark)', fontWeight: 600 }}>
                      {proj.tag}
                    </span>
                  </div>
                  {/* Corner ornaments */}
                  <div className="absolute bottom-5 left-5 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.55)' }} />
                  <div className="absolute bottom-5 right-5 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.55)' }} />
                </div>
                {/* Content */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                  style={{ background: 'var(--pearl)' }}>
                  <span className="font-ui text-[0.6rem] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>Redevelopment Project</span>
                  <h3 className="font-times font-normal mb-1" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--luxury-dark)' }}>{proj.name}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin size={12} style={{ color: 'var(--gold)' }} />
                    <span className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.55)' }}>{proj.location}</span>
                    <span className="font-ui text-[0.58rem] tracking-wider uppercase px-2 py-0.5 ml-2"
                      style={{ background: 'rgba(157,134,104,0.14)', color: 'var(--gold-dark)', border: '1px solid rgba(157,134,104,0.25)' }}>
                      {proj.config}
                    </span>
                  </div>
                  <div className="w-10 h-px mb-5" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                  <p className="font-body text-sm leading-relaxed mb-8" style={{ color: 'rgba(44,62,88,0.7)' }}>{proj.desc}</p>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase w-fit transition-all duration-300"
                    style={{ color: 'var(--luxury-dark)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--luxury-dark)' }}
                  >
                    Enquire About This Project <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust & Emotional Section ─────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <img src={nfsElevImg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,18,9,0.92) 0%, rgba(26,18,9,0.8) 50%, rgba(26,18,9,0.95) 100%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="section-pad container-luxury relative text-center max-w-4xl mx-auto">
          <motion.div {...fU()}>
            {/* Decorative gold quote mark */}
            <div className="font-display text-center mb-4 select-none" style={{ fontSize: '6rem', color: 'rgba(157,134,104,0.18)', lineHeight: 0.6 }}>"</div>
            <span className="section-label block mb-5" style={{ color: 'rgba(157,134,104,0.65)' }}>Trust & Legacy</span>
            <h2 className="font-times font-normal mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--beige)', lineHeight: 1.15 }}>
              Preserving Memories.<br />Creating New Beginnings.
            </h2>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-times italic text-xl leading-relaxed mb-6" style={{ color: 'rgba(243,239,232,0.65)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
              A home is more than a structure — it is a collection of memories, emotions, and generations of shared experiences. We understand the emotional value attached to every home and community.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(243,239,232,0.48)' }}>
              At Majestique Landmarks, redevelopment is approached with sensitivity, responsibility, and respect for the people who have built their lives within these spaces. Our goal is to preserve the essence of the community while introducing a new era of modern, secure, and elevated living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Quality & Execution ───────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Quality & Execution</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Excellence In Every Detail
              </h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'rgba(26,26,26,0.72)' }}>
                Our redevelopment projects are driven by thoughtful planning, architectural precision, and uncompromising quality standards.
              </p>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(26,26,26,0.72)' }}>
                Every detail is carefully considered to ensure the final development reflects sophistication, functionality, and long-term durability.
              </p>
              <Link to="/contact" className="btn-gold transition-transform duration-300 hover:scale-105">Speak With Our Experts</Link>
            </motion.div>
            <motion.div {...fR(0.1)}>
              <div className="bg-white p-8" style={{ border: '1px solid rgba(157,134,104,0.16)', boxShadow: '0 8px 48px rgba(5,5,5,0.07)' }}>
                <div className="h-1 w-full -mt-8 mb-8" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                <p className="font-ui text-[0.62rem] tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>We Focus On</p>
                <div className="w-8 h-px mb-7" style={{ background: 'var(--gold)' }} />
                <ul className="space-y-0">
                  {QUALITY_POINTS.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.42, delay: 0.05 + i * 0.08 }}
                      className="flex items-center justify-between py-3.5 group"
                      style={{ borderBottom: i < QUALITY_POINTS.length - 1 ? '1px solid rgba(157,134,104,0.18)' : 'none' }}
                    >
                      <span className="font-body text-base font-medium" style={{ color: 'var(--luxury-dark)' }}>{point}</span>
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 ml-4"
                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                        <CheckCircle2 size={13} style={{ color: 'white' }} />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Editorial Quote ───────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--luxury-dark2)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={twilightImg} alt="" aria-hidden className="w-full h-full object-cover object-center opacity-[0.22]" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,32,24,0.93) 0%, rgba(44,32,24,0.78) 50%, rgba(44,32,24,0.93) 100%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.5),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 65%)' }} />
        {/* Large decorative quotes */}
        <div className="absolute top-4 left-8 font-display select-none" style={{ fontSize: '12rem', color: 'rgba(157,134,104,0.05)', lineHeight: 1 }}>"</div>
        <div className="absolute bottom-4 right-8 font-display select-none" style={{ fontSize: '12rem', color: 'rgba(157,134,104,0.05)', lineHeight: 1 }}>"</div>
        <div className="container-luxury relative text-center max-w-4xl mx-auto px-8">
          <motion.div {...fU()}>
            <p className="font-times italic leading-relaxed" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', color: 'rgba(243,239,232,0.82)' }}>
              "Redevelopment Is Not About Replacing The Past — It Is About Elevating The Future While Preserving Its Legacy."
            </p>
            <div className="w-16 h-px mx-auto mt-8" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-ui text-xs tracking-widest uppercase mt-4" style={{ color: 'rgba(157,134,104,0.45)' }}>— Majestique Landmarks</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA + Contact Form ────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        {/* Subtle background image */}
        <div className="absolute inset-0">
          <img src={contactBgImg} alt="" aria-hidden className="w-full h-full object-cover object-center opacity-[0.04]" />
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.88)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(157,134,104,0.05) 0%, transparent 60%)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — CTA content */}
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Get In Touch</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Let's Transform Your Society Together
              </h2>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(44,62,88,0.68)' }}>
                Partner with Majestique Landmarks to unlock the true potential of your property through premium redevelopment solutions designed for future generations. Connect with our redevelopment specialists to discuss your society's opportunities, feasibility, planning, and future vision.
              </p>

              {/* Trust badges */}
              <div className="space-y-3 mb-10">
                {[
                  'Free feasibility assessment — no obligation',
                  'MahaRERA registered & fully compliant',
                  'Zero cost to existing residents',
                  'Complete transparency at every step',
                ].map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                      <CheckCircle2 size={10} style={{ color: 'white' }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.75)' }}>{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-6" style={{ borderTop: '1px solid rgba(157,134,104,0.15)' }}>
                <a href="tel:+917448099000" className="flex items-center gap-3 font-body text-sm transition-colors duration-200 group"
                  style={{ color: 'rgba(44,62,88,0.7)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(44,62,88,0.7)' }}>
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)' }}>
                    <Phone size={13} style={{ color: 'var(--gold)' }} />
                  </div>
                  +91 74480 99000
                </a>
                <a href="mailto:info@majestiqueproperties.com" className="flex items-center gap-3 font-body text-sm transition-colors duration-200"
                  style={{ color: 'rgba(44,62,88,0.7)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(44,62,88,0.7)' }}>
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)' }}>
                    <Mail size={13} style={{ color: 'var(--gold)' }} />
                  </div>
                  info@majestiqueproperties.com
                </a>
              </div>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div {...fR(0.1)}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 text-center"
                    style={{ border: '1px solid rgba(157,134,104,0.22)', background: 'var(--cream)' }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                      <CheckCircle2 size={28} style={{ color: 'white' }} />
                    </motion.div>
                    <h3 className="font-times text-2xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Thank You!</h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.65)' }}>
                      Your redevelopment enquiry has been received. Our specialists will connect with you shortly to discuss your society's potential.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 lg:p-10"
                    style={{ border: '1px solid rgba(157,134,104,0.16)', boxShadow: '0 8px 48px rgba(5,5,5,0.07)' }}
                  >
                    <div className="h-1 w-full -mt-10 mb-8" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), var(--gold))' }} />
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center"
                        style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)' }}>
                        <MessageSquare size={16} style={{ color: 'var(--gold)' }} />
                      </div>
                      <h3 className="font-times text-xl" style={{ color: 'var(--luxury-dark)' }}>
                        Start Your Redevelopment Journey
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {[
                        { name: 'name',     label: 'Full Name',       type: 'text',  placeholder: 'Your full name',     required: true },
                        { name: 'phone',    label: 'Contact Number',  type: 'tel',   placeholder: '+91 XXXXX XXXXX',    required: true },
                        { name: 'email',    label: 'Email Address',   type: 'email', placeholder: 'your@email.com',     required: true },
                        { name: 'society',  label: 'Society Name',    type: 'text',  placeholder: 'Name of your society', required: true },
                        { name: 'location', label: 'Location',        type: 'text',  placeholder: 'Area / City',        required: false },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="font-ui text-[0.6rem] tracking-widest uppercase block mb-1.5"
                            style={{ color: 'var(--luxury-charcoal)' }}>
                            {field.label} {field.required && <span style={{ color: 'var(--gold)' }}>*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full font-body text-sm outline-none transition-all duration-200"
                            style={{
                              padding: '0.75rem 1rem',
                              border: '1px solid rgba(157,134,104,0.2)',
                              background: 'var(--cream)',
                              color: 'var(--luxury-dark)',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 1px rgba(157,134,104,0.15)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.2)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Message — full width */}
                    <div className="mb-6">
                      <label className="font-ui text-[0.6rem] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--luxury-charcoal)' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your society and redevelopment vision..."
                        className="w-full font-body text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          padding: '0.75rem 1rem',
                          border: '1px solid rgba(157,134,104,0.2)',
                          background: 'var(--cream)',
                          color: 'var(--luxury-dark)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 1px rgba(157,134,104,0.15)' }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.2)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={submitting ? {} : { scale: 1.02 }}
                      whileTap={submitting ? {} : { scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        'Submitting…'
                      ) : (
                        <><Send size={13} /> Start Your Redevelopment Journey</>
                      )}
                    </motion.button>
                    <p className="font-body text-xs text-center mt-3" style={{ color: 'rgba(44,62,88,0.38)' }}>
                      Free assessment · No obligation · Strictly confidential
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

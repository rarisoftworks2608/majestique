import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Heart, Wallet, Award, MapPin, ArrowRight, Star, Users, Target } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { careersApi } from '../services/api'
import Seo from '../components/ui/Seo'
import careersHeroImg from '../assets/carrers.jpg'
import careersIntroImg from '../assets/carrers1.jpg'
import carrerPageImage from '../assets/Contact-Us-Majestique.jpg'

const WHY_WORK = [
  {
    icon: TrendingUp,
    title: 'Career Growth',
    num: '01',
    desc: "We invest in developing our people — through mentorship, structured training, and a clear path to leadership within Pune's most prestigious real estate brand.",
    color: 'var(--gold)',
  },
  {
    icon: Heart,
    title: 'Inspiring Culture',
    num: '02',
    desc: "Work alongside passionate professionals who take pride in building Pune's finest homes. Collaboration, ownership, and excellence define our DNA.",
    color: '#d4845a',
  },
  {
    icon: Wallet,
    title: 'Competitive Package',
    num: '03',
    desc: 'Market-leading salaries, performance bonuses, and negotiable compensation for qualified applicants across all levels.',
    color: '#2d9d8f',
  },
  {
    icon: Award,
    title: 'Industry Impact',
    num: '04',
    desc: 'Be part of projects that shape skylines — from luxury residences to transformative redevelopment work that rebuilds entire communities.',
    color: '#6b5ea8',
  },
]

const CULTURE_PILLARS = [
  {
    icon: Star,
    title: 'Excellence First',
    desc: 'Every detail matters. We build with precision, pride, and a commitment to standards that go beyond industry expectations.',
  },
  {
    icon: Users,
    title: 'Team & Belonging',
    desc: "You are not just an employee — you are a valued member of the Majestique family, working toward a shared vision of excellence.",
  },
  {
    icon: Target,
    title: 'Purpose-Driven Work',
    desc: 'Every project we deliver creates homes for thousands of families. Your contribution directly shapes lives and communities.',
  },
]

const GROWTH_STEPS = [
  { step: '01', title: 'Apply Online',      desc: 'Browse current openings and submit your application or CV directly via email.' },
  { step: '02', title: 'Initial Screening', desc: 'Our HR team will review your profile and reach out for a preliminary conversation.' },
  { step: '03', title: 'Interviews',        desc: 'Multi-stage interview process with department heads to assess fit, expertise, and potential.' },
  { step: '04', title: 'Welcome Aboard',    desc: "Join a team building Pune's most iconic addresses and begin your Majestique journey." },
]

const TYPE_COLORS = {
  'Full-time':  { bg: 'rgba(157,134,104,0.12)', color: 'var(--gold-dark)',  border: 'rgba(157,134,104,0.3)' },
  'Part-time':  { bg: 'rgba(60,90,180,0.08)',   color: '#3c5ab4',           border: 'rgba(60,90,180,0.25)' },
  'Contract':   { bg: 'rgba(80,160,80,0.08)',    color: '#357a35',           border: 'rgba(80,160,80,0.25)' },
  'Internship': { bg: 'rgba(160,90,40,0.08)',    color: '#9e5a28',           border: 'rgba(160,90,40,0.2)' },
}

const STATIC_JOBS = [
  { id: 'sj-1', title: 'Sales Executive / Senior Manager (Sourcing & Closing)', department: 'Sales',     location: 'Pune', type: 'Full-time', experience: 'Min. 1 Year' },
  { id: 'sj-2', title: 'Pre-Sales Executive',                                   department: 'Sales',     location: 'Pune', type: 'Full-time', experience: 'Min. 1 Year' },
  { id: 'sj-3', title: 'CRM Executive / Manager',                               department: 'CRM',       location: 'Pune', type: 'Full-time', experience: 'Min. 3 Years' },
  { id: 'sj-4', title: 'Senior Marketing Manager / AGM',                        department: 'Marketing', location: 'Pune', type: 'Full-time', experience: 'Min. 9 Years' },
  { id: 'sj-5', title: 'Graphic Designer',                                      department: 'Marketing', location: 'Pune', type: 'Full-time', experience: 'Min. 4 Years' },
]

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

function JobRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(157,134,104,0.12)' }}>
      <div className="flex-1">
        <div className="skeleton h-5 w-48 mb-2 rounded" />
        <div className="skeleton h-3 w-32 rounded" />
      </div>
      <div className="skeleton h-6 w-20 rounded mx-8" />
      <div className="skeleton h-3 w-24 rounded mx-8" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  )
}

function TypeBadge({ type }) {
  const style = TYPE_COLORS[type] || TYPE_COLORS['Full-time']
  return (
    <span
      className="font-ui text-xs tracking-wider uppercase px-2.5 py-1 inline-block"
      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
    >
      {type}
    </span>
  )
}

function JobRow({ job, index, isLast }) {
  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-all duration-300"
      style={{ borderBottom: !isLast ? '1px solid rgba(157,134,104,0.1)' : 'none', borderLeft: '3px solid transparent' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(157,134,104,0.03)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.background = 'transparent' }}
    >
      <div className="flex-1">
        <h4 className="font-times text-lg mb-1" style={{ color: 'var(--luxury-dark)' }}>{job.title}</h4>
        <div className="flex items-center gap-4 font-body text-xs" style={{ color: 'rgba(26,26,26,0.82)' }}>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} style={{ color: 'var(--gold-dark)' }} />
            {job.location}
          </span>
          {job.experience && <span style={{ color: 'rgba(44,62,88,0.45)' }}>{job.experience} exp.</span>}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <TypeBadge type={job.type} />
        {job.id?.startsWith('sj-') ? (
          <a
            href={`mailto:hr@majestique.com?subject=Application: ${encodeURIComponent(job.title)}`}
            className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300 whitespace-nowrap"
            style={{ color: 'var(--gold-dark)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
          >
            Apply Now <ArrowRight size={12} />
          </a>
        ) : (
          <Link
            to={`/careers/${job.id}`}
            className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300 whitespace-nowrap"
            style={{ color: 'var(--gold-dark)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
          >
            View & Apply <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default function Careers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    careersApi.getAll()
      .then((res) => setJobs(res.data?.jobs || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [])

  const grouped = jobs.reduce((acc, job) => {
    const dept = job.department || 'General'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(job)
    return acc
  }, {})

  const staticGrouped = STATIC_JOBS.reduce((acc, job) => {
    if (!acc[job.department]) acc[job.department] = []
    acc[job.department].push(job)
    return acc
  }, {})

  const displayGrouped = Object.keys(grouped).length > 0 ? grouped : staticGrouped

  return (
    <>
      <Seo
        title="Careers"
        description="Soar high on your career graph — come join Team Majestique. Explore current openings and build your career with Pune's premier luxury real estate brand."
      />
      <PageHero
        title="Build Your Legacy With Us"
        subtitle="Come Join Team Majestique — Where ambition meets excellence and every career becomes a landmark story"
        breadcrumb={['Home', 'Careers']}
        bgImage={careersHeroImg}
      />

      {/* ── Culture Intro ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">Our People</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Where Talent<br />Builds Timeless Work
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(44,62,88,0.88)' }}>
                <p>At Majestique Landmarks, we believe the strength of our brand is the strength of our people. Every landmark we build is a result of passionate professionals who bring skill, dedication, and pride to their craft.</p>
                <p>We cultivate an environment where ambition is nurtured, innovation is celebrated, and every contribution shapes the skyline of one of India's most dynamic cities — Pune.</p>
                <p>When you join Team Majestique, you're not just taking a job — you're stepping into a legacy, and helping write the next chapter.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#openings" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Openings</a>
                <a href="mailto:hr@majestique.com" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Send Your CV</a>
              </div>
            </motion.div>

            <motion.div {...fR(0.12)} className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={careersIntroImg}
                  alt="Team Majestique"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Band — Amber Gold Gradient ──────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9d8668 0%, #c4a455 28%, #d4b465 55%, #b89050 80%, #9d8668 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(255,230,130,0.28) 0%, transparent 60%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.22)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'rgba(0,0,0,0.14)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { v: '500+',  l: 'Team Members' },
              { v: '30+',   l: 'Years of Trust' },
              { v: '16+',   l: 'Landmark Projects' },
              { v: '18K+',  l: 'Families Served' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-center py-8 px-4"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}
              >
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>{s.v}</p>
                <div className="w-6 h-px mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.68)' }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join Us ───────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display tracking-widest uppercase" style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', color: 'rgba(157,134,104,0.04)', lineHeight: 1, whiteSpace: 'nowrap' }}>GROW</span>
        </div>
        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Why Join Us"
              title="More Than a Job — A Career That Matters"
              subtitle="At Majestique, you'll work on projects that shape skylines, impact thousands of lives, and stand as a testament to your craft."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_WORK.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative overflow-hidden bg-white"
                style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 20px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 56px rgba(5,5,5,0.1)'; e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-6px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(5,5,5,0.05)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                <div className="p-8 relative">
                  <span className="absolute top-3 right-4 font-display select-none pointer-events-none" style={{ fontSize: '5.5rem', color: 'rgba(157,134,104,0.05)', lineHeight: 1 }}>{item.num}</span>
                  <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}09)`, border: `1px solid ${item.color}44` }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-times text-xl mb-2" style={{ color: 'var(--luxury-dark)' }}>{item.title}</h3>
                  <div className="w-8 h-px mb-3" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.84)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life at Majestique ────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.4),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(157,134,104,0.08) 0%, transparent 65%)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()} className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={carrerPageImage}
                  alt="Majestique Evolvus"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.45) 0%, transparent 55%)' }} />
              </div>
              <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            </motion.div>

            <motion.div {...fR(0.1)}>
              <span className="section-label block mb-3" style={{ color: 'rgba(157,134,104,0.7)' }}>Our Culture</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-6" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.75rem)', color: 'var(--beige)' }}>
                Life at<br />Majestique
              </h2>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(243,239,232,0.6)' }}>
                We don't just build homes — we build a culture of excellence, belonging, and purposeful work that resonates through every project we undertake.
              </p>
              <div className="space-y-5">
                {CULTURE_PILLARS.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex items-start gap-5 p-5 group transition-all duration-300"
                    style={{ border: '1px solid rgba(157,134,104,0.12)', background: 'rgba(157,134,104,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.38)'; e.currentTarget.style.background = 'rgba(157,134,104,0.09)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.12)'; e.currentTarget.style.background = 'rgba(157,134,104,0.04)' }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.2), rgba(157,134,104,0.06))', border: '1px solid rgba(157,134,104,0.28)' }}>
                      <pillar.icon size={20} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <h4 className="font-times text-base mb-1" style={{ color: 'var(--beige)' }}>{pillar.title}</h4>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(243,239,232,0.52)' }}>{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How to Join ───────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="How to Join"
              title="Your Journey Begins Here"
              subtitle="Our hiring process is straightforward, transparent, and designed to find the right fit — for you and for us."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,134,104,0.22), rgba(157,134,104,0.22), transparent)' }} />
            {GROWTH_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="text-center relative"
              >
                <div
                  className="w-24 h-24 flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: i % 2 === 0 ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'white',
                    border: '2px solid rgba(157,134,104,0.3)',
                    boxShadow: i % 2 === 0 ? '0 8px 32px rgba(157,134,104,0.28)' : '0 4px 16px rgba(5,5,5,0.06)',
                  }}
                >
                  <span className="font-display font-normal" style={{ fontSize: '2.2rem', lineHeight: 1, color: i % 2 === 0 ? 'var(--luxury-dark)' : 'var(--gold)' }}>{step.step}</span>
                </div>
                <h3 className="font-times text-lg mb-2" style={{ color: 'var(--luxury-dark)' }}>{step.title}</h3>
                <div className="w-8 h-px mx-auto mb-3" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.6)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Listings ──────────────────────────────────────────── */}
      <section id="openings" className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-14">
            <SectionHeader
              label="Open Positions"
              title="Current Opportunities"
              subtitle="Join a team of passionate professionals building some of Pune's most celebrated addresses. Real estate industry background preferred."
            />
          </div>

          {loading ? (
            <div>{Array.from({ length: 6 }).map((_, i) => <JobRowSkeleton key={i} />)}</div>
          ) : (
            <div className="space-y-12">
              {Object.entries(displayGrouped).map(([dept, deptJobs], gi) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gi * 0.08 }}
                >
                  <h3
                    className="font-ui text-xs tracking-widest uppercase mb-4 pb-3"
                    style={{ color: 'var(--gold)', borderBottom: '1px solid rgba(157,134,104,0.2)' }}
                  >
                    {dept}
                  </h3>
                  <div style={{ border: '1px solid rgba(157,134,104,0.15)', background: 'white', overflow: 'hidden' }}>
                    {deptJobs.map((job, ji) => (
                      <JobRow key={job.id} job={job} index={ji} isLast={ji === deptJobs.length - 1} />
                    ))}
                  </div>
                </motion.div>
              ))}
              <p className="font-body text-sm text-center mt-8" style={{ color: 'rgba(44,62,88,0.5)' }}>
                Don't see the right role?{' '}
                <a href="mailto:hr@majestique.com" style={{ color: 'var(--gold-dark)' }}>
                  Send your CV to hr@majestique.com
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Join Our Team</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Ready to Build Your<br />Landmark Career?
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Explore our open roles or send your CV directly. We are always looking for passionate, talented professionals to grow with Team Majestique.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#openings" className="btn-gold transition-transform duration-300 hover:scale-105">View Open Roles</a>
              <a href="mailto:hr@majestique.com" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Send Your CV</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

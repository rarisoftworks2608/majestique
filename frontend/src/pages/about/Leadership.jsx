import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import dwarkadasImg from '../../assets/dwarkadas-hastimal-maheshwari.jpeg'
import shyamkumarImg from '../../assets/shyamkumar-dwarkadas-maheshwari.jpg'
import manishImg from '../../assets/manish-maheshwari-majestique-landmarks.jpg'
import leadershipHeroImg from '../../assets/leadership business.jpg'
import coreTeamImg from '../../assets/core_team.jpeg'
import adityaImg from '../../assets/Management Team/Aditya Sir.jpg'
import amitImg from '../../assets/Management Team/Amit Sir.jpg'
import ankitImg from '../../assets/Management Team/Ankit Sir.jpg'
import dateImg from '../../assets/Management Team/Date Sir.jpg'
import ganeshImg from '../../assets/Management Team/Ganesh Sir.jpg'
import kailasImg from '../../assets/Management Team/Kailas Sir.jpg'
import mdMaishImg from '../../assets/Management Team/MD Maish Sir.jpg'
import nieshImg from '../../assets/Management Team/Niesh Sir.jpg'
import punitImg from '../../assets/Management Team/Punit Sir.jpg'
import rahulImg from '../../assets/Management Team/Rahul Sir.jpg'
import sanjayImg from '../../assets/Management Team/Sanjay Sir.jpg'
import sourabhImg from '../../assets/Management Team/Sourabh Sir.jpg'
import sunilImg from '../../assets/Management Team/Sunil Sir.jpg'

const LEADERS = [
  {
    initials: 'DHM',
    image: dwarkadasImg,
    name: 'Mr. Dwarkadas Hastimal Maheshwari',
    role: 'Founder',
    tag: 'The Visionary',
    tagline: 'Est. 1992',
    bio: [
      'From the traditional world of textiles and sarees to the dynamic landscape of real estate development, Dwarkadas Hastimal Maheshwari has built a remarkable journey defined by vision, perseverance, and transformation.',
      'Starting his career in the fabric and saree trade, he developed a deep understanding of people, relationships, and trust — values that later became the cornerstone of his real estate philosophy. With an entrepreneurial mindset and a passion for creating long-term impact, he expanded his vision into real estate, focusing on thoughtfully crafted developments that combine quality, elegance, and enduring value.',
      'Under his leadership, the brand continues to create premium spaces that reflect modern aspirations while remaining deeply rooted in trust, commitment, and human connection.',
    ],
    quote: 'From Threads of Trust to Landmarks of Legacy.',
    stats: [{ label: 'Year Founded', value: '1992' }, { label: 'Industry', value: 'Real Estate' }],
  },
  {
    initials: 'SDM',
    image: shyamkumarImg,
    name: 'Mr. Shyamkumar Dwarkadas Maheshwari',
    role: 'Board of Director',
    tag: 'The Strategist',
    tagline: 'Strategy & Growth',
    bio: [
      'With decades of entrepreneurial experience and strategic leadership, Mr. Shyamkumar Dwarkadas Maheshwari has played a vital role in expanding the group\'s business presence across multiple sectors.',
      'His forward-thinking approach, operational expertise, and strong understanding of market dynamics have contributed significantly to the company\'s growth and prominence within the real estate industry.',
      'Every major strategic decision at Majestique bears the hallmark of his disciplined thinking and long-term vision.',
    ],
    quote: 'Strategic clarity and operational discipline — together they shape the foundation of lasting growth.',
    stats: [{ label: 'Role', value: 'Director' }, { label: 'Focus', value: 'Strategy' }],
  },
  {
    initials: 'MDM',
    image: manishImg,
    name: 'Mr. Manish Dwarkadas Maheshwari',
    role: 'Managing Director',
    tag: 'The Innovator',
    tagline: 'Vision & Innovation',
    bio: [
      'As Managing Director, Mr. Manish Dwarkadas Maheshwari brings innovation, ambition, and a future-focused vision to the organization.',
      'With a strong passion for urban development and modern lifestyle experiences, he has been instrumental in expanding Majestique Landmarks into a premium real estate brand known for design excellence and contemporary living.',
      'His leadership continues to drive the company toward new milestones in luxury and urban development.',
    ],
    quote: 'Innovation is not disruption for its own sake — it is the relentless pursuit of a better way to serve our customers.',
    stats: [{ label: 'Focus', value: 'Innovation' }, { label: 'Role', value: 'Managing Director' }],
  },
]

const MANAGEMENT_TEAM = [
  { name: 'Aditya Sir',      image: adityaImg },
  { name: 'Amit Sir',        image: amitImg },
  { name: 'Ankit Sir',       image: ankitImg },
  { name: 'Date Sir',        image: dateImg },
  { name: 'Ganesh Sir',      image: ganeshImg },
  { name: 'Kailas Sir',      image: kailasImg },
  { name: 'MD Maish Sir',    image: mdMaishImg },
  { name: 'Niesh Sir',       image: nieshImg },
  { name: 'Punit Sir',       image: punitImg },
  { name: 'Rahul Sir',       image: rahulImg },
  { name: 'Sanjay Sir',      image: sanjayImg },
  { name: 'Sourabh Sir',     image: sourabhImg },
  { name: 'Sunil Sir',       image: sunilImg },
  { name: 'Vishwajeet Sir' },
]

function TeamCard({ member, index }) {
  const initials = member.name
    .replace(/\s*Sir$/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden"
      style={{ border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 4px 24px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 44px rgba(5,5,5,0.14)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(5,5,5,0.05)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4', background: 'var(--cream)' }}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(150deg, rgba(157,134,104,0.14), rgba(157,134,104,0.05))' }}>
            <span className="font-times" style={{ fontSize: '2.4rem', color: 'rgba(157,134,104,0.55)' }}>{initials}</span>
          </div>
        )}
      </div>
      <div className="py-3 text-center" style={{ background: 'white' }}>
        <p className="font-ui text-xs tracking-[0.14em] uppercase" style={{ color: 'var(--luxury-dark)' }}>{member.name}</p>
      </div>
      <div className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
    </motion.div>
  )
}

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

const SECTION_BGS = ['var(--cream)', 'white', 'var(--cream)']

export default function Leadership() {
  return (
    <>
      <Seo
        title="Leadership"
        description="Meet the visionary leaders behind Majestique Landmarks — the founding family whose integrity, ambition, and decades of entrepreneurial excellence have shaped Pune's most trusted real estate brand."
      />
      <PageHero
        title="Leadership That Inspires Growth"
        subtitle="Majestique Landmarks is guided by visionary leadership with decades of entrepreneurial expertise, strategic insight, and a deep understanding of evolving urban lifestyles."
        breadcrumb={['Home', 'About', 'Leadership']}
        bgImage={leadershipHeroImg}
      />

      {/* ── Intro strip ───────────────────────────────────────────── */}
      <section className="py-16 relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <motion.div {...fU()}>
            <span className="section-label block mb-4">Our People</span>
            <p className="font-times font-normal leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)', color: 'rgba(26,26,26,0.86)' }}>
              The management team continues to drive the organization with integrity, innovation, and a long-term vision for sustainable growth — guided by the same founding principles that built this enterprise from a single store in Mangalwar Peth.
            </p>
            <div className="w-12 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ── Leader sections ───────────────────────────────────────── */}
      {LEADERS.map((leader, i) => {
        const imageLeft = i % 2 === 0
        const fadeImg = imageLeft ? fL : fR
        const fadeText = imageLeft ? fR : fL

        return (
          <section
            key={leader.name}
            className="section-pad relative overflow-hidden"
            style={{ background: SECTION_BGS[i] }}
          >
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.15),transparent)' }} />

            <div className="container-luxury relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                {/* Portrait column */}
                <motion.div
                  {...fadeImg()}
                  className={`relative ${imageLeft ? 'order-1' : 'order-1 lg:order-2'}`}
                >
                  {/* Photo portrait panel */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: '3/4',
                      border: '1px solid rgba(157,134,104,0.22)',
                      boxShadow: '0 20px 72px rgba(44,32,24,0.13)',
                    }}
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Bottom gradient for name overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(26,18,9,0.82) 0%, rgba(26,18,9,0.3) 38%, transparent 60%)' }}
                    />

                    {/* Name / role overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="font-ui text-[0.6rem] tracking-[0.28em] uppercase mb-2" style={{ color: 'rgba(157,134,104,0.85)' }}>{leader.tagline}</p>
                      <p className="font-times text-2xl leading-snug mb-1" style={{ color: 'white' }}>{leader.name}</p>
                      <p className="font-ui text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(243,239,232,0.92)', fontWeight: 400 }}>{leader.role}</p>
                      <div className="w-10 h-px" style={{ background: 'var(--gold)' }} />
                    </div>

                    {/* Corner ornaments */}
                    <div className="absolute top-5 left-5 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.55)' }} />
                    <div className="absolute top-5 right-5 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.55)' }} />
                  </div>

                  {/* Stats row below */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {leader.stats.map(stat => (
                      <motion.div
                        key={stat.label}
                        {...fU(0.3)}
                        className="p-4 text-center bg-white"
                        style={{ border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 2px 12px rgba(5,5,5,0.05)' }}
                      >
                        <p className="font-times text-lg mb-0.5" style={{ color: 'var(--luxury-dark)' }}>{stat.value}</p>
                        <p className="font-ui text-[0.6rem] tracking-wider uppercase" style={{ color: 'rgba(44,62,88,0.42)' }}>{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Content column */}
                <motion.div
                  {...fadeText(0.1)}
                  className={imageLeft ? 'order-2' : 'order-2 lg:order-1'}
                >
                  <p className="font-ui text-xs tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--gold)' }}>{leader.role}</p>
                  <div className="w-8 h-px mb-5" style={{ background: 'var(--gold)' }} />
                  <h2
                    className="font-times font-normal leading-tight mb-8"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', color: 'var(--luxury-dark)' }}
                  >
                    {leader.name}
                  </h2>
                  <div className="space-y-4 font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(44,62,88,0.7)' }}>
                    {leader.bio.map((para, pi) => <p key={pi}>{para}</p>)}
                  </div>

                  {/* Quote block */}
                  <motion.div
                    {...fU(0.25)}
                    className="p-6 relative"
                    style={{ borderLeft: '3px solid var(--gold)', background: i === 1 ? 'var(--cream)' : 'white', boxShadow: '0 2px 16px rgba(5,5,5,0.05)' }}
                  >
                    <div className="font-display select-none mb-2" style={{ fontSize: '3rem', color: 'rgba(157,134,104,0.22)', lineHeight: 0.7 }}>"</div>
                    <p className="font-times text-base italic leading-relaxed" style={{ color: 'rgba(44,62,88,0.8)' }}>
                      {leader.quote}
                    </p>
                    <p className="font-ui text-xs tracking-widest uppercase mt-4" style={{ color: 'rgba(157,134,104,0.5)' }}>
                      — {leader.name.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-3 mt-6"
                  >
                    <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
                    <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.55)' }}>{leader.tag}</span>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </section>
        )
      })}

      {/* ── Core / Management Team ───────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />
        <div className="container-luxury">
          <div className="text-center mb-14">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Our People</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}>
                The Team Behind the Vision
              </h2>
              <p className="font-body text-base leading-relaxed max-w-2xl mx-auto mt-5" style={{ color: 'rgba(26,26,26,0.82)' }}>
                A dedicated team of professionals committed to delivering excellence at every stage — from design and construction to customer relationships and post-possession support.
              </p>
            </motion.div>
          </div>

          {/* Group photo */}
          <motion.div
            {...fU(0.15)}
            className="relative overflow-hidden mb-16"
            style={{ border: '1px solid rgba(157,134,104,0.2)', boxShadow: '0 20px 64px rgba(5,5,5,0.08)' }}
          >
            <img
              src={coreTeamImg}
              alt="Majestique Landmarks Core Team"
              className="w-full object-cover"
            />
            {/* Bottom gradient overlay with label */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(26,18,9,0.7) 0%, transparent 50%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <p className="font-ui text-[0.6rem] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(157,134,104,0.85)' }}>
                The Majestique Family
              </p>
              <p className="font-times text-2xl lg:text-3xl" style={{ color: 'white' }}>
                Majestique Landmarks Core Team
              </p>
              <div className="w-12 h-px mt-4" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
            </div>
            {/* Corner ornaments */}
            <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
            <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2" style={{ borderColor: 'rgba(157,134,104,0.45)' }} />
          </motion.div>

          {/* Individual portraits */}
          <div className="text-center mb-10">
            <motion.div {...fU()}>
              <p className="font-ui text-xs tracking-[0.22em] uppercase" style={{ color: 'var(--gold)' }}>Meet the Team</p>
              <div className="w-8 h-px mx-auto mt-3" style={{ background: 'var(--gold)' }} />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
            {MANAGEMENT_TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury relative text-center max-w-3xl mx-auto">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Our Legacy</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Building Tomorrow's<br />Landmarks Today
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Driven by legacy, powered by innovation, and committed to excellence — Majestique Landmarks continues to shape the future of modern urban living through thoughtfully designed developments that stand the test of time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
              <Link to="/about/milestones" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Our Journey</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

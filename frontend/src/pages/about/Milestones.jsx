import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Landmark, Home, Building2, CheckCircle2, Users, Maximize2,
  HardHat, Trophy, MapPin, Leaf, ArrowRight,
} from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import Seo from '../../components/ui/Seo'
import { AWARDS } from '../../data/awards'
import milestonesHeroImg from '../../assets/awards.jpg'

/* ── Achievement grid — a mix of quantified stats and qualitative
   milestones, sharing one consistent card shell ─────────────────── */
const ACHIEVEMENTS = [
  { icon: Landmark, title: 'Established Legacy', desc: 'A diversified business legacy built on decades of entrepreneurial excellence, trust, and customer relationships.' },
  { icon: Home, title: 'Entered Real Estate', desc: 'Successfully diversified into real estate with a vision to create thoughtfully planned communities that redefine urban living.' },
  { icon: Building2, title: 'Landmark Developments', desc: "Delivered residential communities across Pune's most sought-after locations, setting new benchmarks in design and quality." },
  { icon: CheckCircle2, stat: '30+', statLabel: 'Completed Projects', desc: 'Successfully delivered over 30 landmark residential developments that continue to enrich communities across Pune.' },
  { icon: Users, stat: '18,000+', statLabel: 'Happy Families', desc: 'Thousands of families have placed their trust in Majestique, making every project a thriving community.' },
  { icon: Maximize2, stat: '2 Cr+', statLabel: 'Sq. Ft. Delivered', desc: 'A significant footprint of completed developments reflecting our scale, expertise, and commitment to timely delivery.' },
  { icon: HardHat, stat: '2 Cr+', statLabel: 'Sq. Ft. Under Development', desc: "Continuing to shape Pune's future with premium residential destinations designed for modern lifestyles." },
  { icon: Trophy, title: 'Award-Winning Excellence', desc: 'Recognized by prestigious industry platforms for innovation, quality construction, and customer-centric developments.' },
  { icon: MapPin, title: 'Premium Locations Across Pune', desc: "Present in the city's most promising and well-connected neighbourhoods, delivering exceptional lifestyle experiences." },
  { icon: Leaf, title: 'Future-Ready Communities', desc: 'Developing sustainable, thoughtfully planned communities that combine architecture, wellness, and long-term value.' },
]

const RECOGNITION_TAGS = [
  'Most Promising Real Estate Brand',
  'Times Realty Icons Maharashtra',
  'Developer Excellence Awards',
  'Customer Choice Recognitions',
  'Industry Leadership Awards',
]

const AWARDS_WITH_IMAGES = AWARDS.filter(a => a.image)

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

function AchievementCard({ item, index }) {
  const Icon = item.icon
  const delay = Math.min(index * 0.07, 0.5)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden bg-white"
      style={{ border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 2px 20px rgba(26,26,26,0.05)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 56px rgba(26,26,26,0.11)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(26,26,26,0.05)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
      <div className="p-8 relative overflow-hidden">
        <span
          className="absolute top-2 right-4 font-display select-none pointer-events-none"
          style={{ fontSize: '4.5rem', color: 'rgba(212,175,55,0.05)', lineHeight: 1 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: delay + 0.15 }}
          className="w-16 h-16 flex items-center justify-center mb-5 relative"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.25)' }}
        >
          <Icon size={26} style={{ color: 'var(--gold)' }} />
        </motion.div>

        {item.stat ? (
          <>
            <p className="font-times font-normal leading-none mb-2 relative" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', color: 'var(--luxury-dark)' }}>
              {item.stat}
            </p>
            <p className="font-ui text-xs tracking-widest uppercase mb-3 relative" style={{ color: 'var(--gold-dark)' }}>
              {item.statLabel}
            </p>
          </>
        ) : (
          <h3 className="font-times text-xl leading-snug mb-3 relative" style={{ color: 'var(--luxury-dark)' }}>
            {item.title}
          </h3>
        )}
        <div className="w-8 h-px mb-3 relative" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        <p className="font-body text-sm leading-relaxed relative" style={{ color: 'rgba(26,26,26,0.82)' }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Milestones() {
  return (
    <>
      <Seo
        title="Milestones"
        description="Every milestone reflects Majestique Landmarks' commitment to excellence, innovation, and the trust of thousands of families who have chosen us. Explore the achievements that shape our journey."
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <PageHero
        title="Celebrating Every Achievement That Shapes Our Journey"
        subtitle="Every milestone reflects our commitment to excellence, innovation, and the trust of thousands of families who have chosen Majestique Landmarks."
        breadcrumb={['Home', 'About', 'Milestones']}
        bgImage={milestonesHeroImg}
      />

      {/* ── Introduction ──────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="Overview"
              title="Building Success Through Excellence"
              subtitle="Over the years, Majestique Landmarks has achieved remarkable milestones that reflect our dedication to creating exceptional living spaces. From expanding across Pune to delivering landmark communities and earning industry recognition, every achievement strengthens our promise of quality, trust, and innovation."
              align="center"
            />
          </div>
        </div>
      </section>

      {/* ── Achievement Grid ──────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(212,175,55,0.04)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            MILESTONES
          </span>
        </div>
        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Our Milestones"
              title="A Journey Defined by Achievement"
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((item, i) => (
              <AchievementCard key={item.title || item.statLabel} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Recognition carousel ─────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <SectionHeader
              label="Recognition"
              title="Awards & Recognition"
              subtitle="Our achievements have been recognised by leading industry bodies, reflecting our unwavering commitment to excellence, innovation, and customer satisfaction."
              align="center"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {RECOGNITION_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="font-ui text-[0.6rem] tracking-[0.16em] uppercase px-3.5 py-2"
                style={{ background: 'rgba(212,175,55,0.07)', color: 'var(--gold-dark)', border: '1px solid rgba(212,175,55,0.22)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div
          className="ms-marquee relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)' }}
        >
          <div className="ms-marquee-track flex items-stretch gap-5 w-max">
            {[...AWARDS_WITH_IMAGES, ...AWARDS_WITH_IMAGES].map((award, i) => (
              <Link
                key={`${award.id}-${i}`}
                to={`/media/awards/${award.slug}`}
                className="group flex-shrink-0 flex flex-col overflow-hidden"
                style={{ width: '280px', background: 'var(--cream)', border: '1px solid rgba(212,175,55,0.16)', boxShadow: '0 2px 16px rgba(26,26,26,0.05)', transition: 'box-shadow 0.35s ease, transform 0.35s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 48px rgba(26,26,26,0.14)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,26,26,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#f0ede4', flexShrink: 0 }}>
                  <img
                    src={award.image}
                    alt={award.award}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-ui text-[0.58rem] tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dark)' }}>{award.date}</p>
                  <p className="font-times text-base leading-snug mb-2 flex-1 transition-colors duration-300 group-hover:text-[var(--gold-dark)]" style={{ color: 'var(--luxury-dark)' }}>{award.award}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs" style={{ color: 'rgba(44,62,88,0.5)' }}>{award.platform}</p>
                    <span
                      className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'var(--gold)' }}
                    >
                      <ArrowRight size={11} color="white" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ───────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-22 transition-all duration-500 hover:opacity-50 hover:scale-110" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-22 transition-all duration-500 hover:opacity-50 hover:scale-110" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Looking Ahead</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--luxury-dark)' }}>
              Every Achievement Inspires the Next
            </h2>
            <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Our milestones are not just numbers. They represent the trust of our customers, the dedication of our team, and our continued pursuit of excellence. As we look ahead, we remain committed to creating landmark developments that elevate lifestyles and shape the future of urban living.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">View Ongoing Projects</Link>
              <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .ms-marquee-track { animation: msMarqueeScroll 70s linear infinite; }
        .ms-marquee:hover .ms-marquee-track { animation-play-state: paused; }
        @keyframes msMarqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-marquee-track { animation: none !important; }
        }
      `}</style>
    </>
  )
}

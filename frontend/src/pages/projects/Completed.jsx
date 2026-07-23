import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import CountUp from '../../components/ui/CountUp'
import Seo from '../../components/ui/Seo'
import completedHeroImg from '../../assets/completed project.jpg'
import { COMPLETED_PROJECTS } from '../../data/completedProjects'

const LEGACY_STATS = [
  { value: '22+',  label: 'Years in Real Estate' },
  { value: `${COMPLETED_PROJECTS.length}+`, label: 'Projects Delivered' },
  { value: 'Debt-Free', label: 'Operations' },
  { value: '100%', label: 'MahaRERA Registered' },
]

function CompletedCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.045, 0.6), ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/contact?project=${encodeURIComponent(project.title)}`}
        className="group relative flex flex-col h-full overflow-hidden bg-white"
        style={{
          border: '1px solid rgba(157,134,104,0.16)',
          boxShadow: '0 2px 16px rgba(5,5,5,0.05)',
          transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 56px rgba(5,5,5,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        {/* Gold top rule */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), transparent)' }} />

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-4">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: Math.min(index * 0.045, 0.6) + 0.2 }}
              className="inline-flex"
            >
              <CheckCircle2 size={11} style={{ color: 'var(--gold)' }} />
            </motion.span>
            <span className="font-ui text-[0.5rem] tracking-[0.24em] uppercase" style={{ color: 'var(--gold-dark)' }}>
              Completed
            </span>
          </div>

          <h3
            className="font-times font-normal leading-snug mb-2 flex-1 transition-colors duration-300"
            style={{ fontSize: '1.1rem', color: 'var(--luxury-dark)' }}
          >
            {project.title}
          </h3>

          <div className="flex items-start gap-1.5 mb-5">
            <MapPin size={12} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
            <span className="font-body text-xs leading-snug" style={{ color: 'rgba(26,26,26,0.6)' }}>
              {project.subtitle}
            </span>
          </div>

          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}
          >
            <span className="font-ui text-[0.44rem] tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.5)' }}>
              Enquire
            </span>
            <span
              className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'var(--gold)' }}
            >
              <ArrowRight size={10} color="white" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CompletedProjects() {
  return (
    <>
      <Seo
        title="Completed Projects"
        description={`Browse Majestique Landmarks' portfolio of ${COMPLETED_PROJECTS.length}+ delivered, MahaRERA-registered developments across Pune.`}
      />
      <PageHero
        title="Completed Projects"
        subtitle="A legacy carved in concrete and crafted with care — every delivered project a MahaRERA-registered testament to our promise"
        breadcrumb={['Home', 'Projects', 'Completed']}
        bgImage={completedHeroImg}
      />

      {/* ── Legacy Stats strip ──────────────────────────────────── */}
      <section style={{ background: 'var(--luxury-dark)', borderBottom: '1px solid rgba(157,134,104,0.15)' }}>
        <div className="container-luxury py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {LEGACY_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-4 px-6"
                style={{ borderRight: i < LEGACY_STATS.length - 1 ? '1px solid rgba(157,134,104,0.12)' : 'none' }}
              >
                <p className="font-times font-normal mb-1 leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', color: 'var(--gold)' }}>
                  {/\d/.test(stat.value) ? <CountUp value={stat.value} /> : stat.value}
                </p>
                <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(243,239,232,0.45)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio listing ──────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(157,134,104,0.04)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            DELIVERED
          </span>
        </div>

        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Our Portfolio"
              title={<>Delivered With <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Pride</em></>}
              subtitle={`${COMPLETED_PROJECTS.length} landmark addresses across Pune — each a MahaRERA-registered promise, delivered on time and debt-free.`}
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPLETED_PROJECTS.map((project, i) => (
              <CompletedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'var(--luxury-dark2)', borderTop: '1px solid rgba(157,134,104,0.15)' }}
      >
        <div className="absolute top-5 left-5 w-8 h-8 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2">New developments launching soon</p>
            <h3 className="font-times text-2xl font-normal" style={{ color: 'var(--beige)' }}>
              Explore what we are building next across Pune.
            </h3>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/projects/ongoing" className="btn-outline-gold transition-transform duration-300 hover:scale-105" style={{ fontSize: '0.75rem' }}>
              View Ongoing
            </Link>
            <Link to="/contact" className="btn-gold transition-transform duration-300 hover:scale-105">Enquire Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}

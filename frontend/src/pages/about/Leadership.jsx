import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import dwarkadasImg from '../../assets/dwarkadas-hastimal-maheshwari.jpeg'
import shyamkumarImg from '../../assets/shyamkumar-dwarkadas-maheshwari.jpg'
import manishImg from '../../assets/Management Team/MD Maish Sir.jpg'
import leadershipHeroImg from '../../assets/leadership business.jpg'
import coreTeamImg from '../../assets/core_team.jpeg'

const LEADERS = [
  {
    image: manishImg,
    name: 'Mr. Manish Dwarkadas Maheshwari',
    role: 'Managing Director',
    summary: 'Innovation-driven leadership shaping modern urban living.',
    quote: 'Building a better way forward.',
  },
  {
    image: shyamkumarImg,
    name: 'Mr. Shyamkumar Dwarkadas Maheshwari',
    role: 'Board of Director',
    summary: 'Strategic leadership focused on growth and lasting value.',
    quote: 'Clarity today. Growth for tomorrow.',
  },
  {
    image: dwarkadasImg,
    name: 'Mr. Dwarkadas Hastimal Maheshwari',
    role: 'Founder',
    summary: 'From textiles to landmarks, a legacy built on trust.',
    quote: 'From threads of trust to landmarks of legacy.',
  },
]

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

export default function Leadership() {
  return (
    <>
      <Seo
        title="Leadership"
        description="Meet the visionary leaders behind Majestique Landmarks, the founding family whose integrity, ambition, and decades of entrepreneurial excellence have shaped Pune's most trusted real estate brand."
      />
      <PageHero
        title="Leadership That Inspires Growth"
        subtitle="Majestique Landmarks is guided by visionary leadership with decades of entrepreneurial expertise, strategic insight, and a deep understanding of evolving urban lifestyles."
        breadcrumb={['Home', 'About', 'Leadership']}
        bgImage={leadershipHeroImg}
      />

      {/* ── Intro strip ───────────────────────────────────────────── */}
      <section className="py-12 relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <motion.div {...fU()}>
            <span className="section-label block mb-4">Our People</span>
            <p className="font-times font-normal leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)', color: 'rgba(26,26,26,0.86)' }}>
              The management team continues to drive the organization with integrity, innovation, and a long-term vision for sustainable growth, guided by the same founding principles that built this enterprise from a single store in Mangalwar Peth.
            </p>
            <div className="w-12 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ── Leadership cards ─────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)' }} />

        <div className="container-luxury relative">
          <div className="text-center mb-14 lg:mb-16">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Leadership</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}>
                The Legacy Behind Majestique
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {LEADERS.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden"
                style={{
                  background: 'white',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 8px 32px rgba(26,26,26,0.06)',
                  transition: 'box-shadow 0.4s, border-color 0.4s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 56px rgba(26,26,26,0.14)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.42)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.06)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)' }}
              >
                {/* Gold sweep line — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10"
                  style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))' }}
                />

                {/* Photo */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,9,0.78) 0%, rgba(26,18,9,0.1) 42%, transparent 60%)' }} />

                  {/* Role on image */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <p
                      className="font-ui font-bold text-[0.68rem] tracking-[0.24em] uppercase"
                      style={{ color: 'var(--beige)', textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}
                    >
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7 text-center">
                  <h3 className="font-times font-normal leading-snug mb-3" style={{ fontSize: '1.3rem', color: 'var(--luxury-dark)' }}>
                    {leader.name}
                  </h3>
                  <div
                    className="h-px mx-auto mb-4 w-8 group-hover:w-16 transition-all duration-500 ease-out"
                    style={{ background: 'var(--gold)' }}
                  />
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.72)' }}>
                    {leader.summary}
                  </p>

                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}>
                    <p className="font-times text-sm italic leading-relaxed" style={{ color: 'rgba(44,62,88,0.68)' }}>
                      "{leader.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core / Management Team ───────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />
        <div className="container-luxury">
          <div className="text-center mb-14">
            <motion.div {...fU()}>
              <span className="section-label block mb-3">Our People</span>
              <div className="gold-line-center" />
              <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: 'var(--luxury-dark)' }}>
                The Team Behind the Vision
              </h2>
              <p className="font-body text-base leading-relaxed max-w-2xl mx-auto mt-5" style={{ color: 'rgba(26,26,26,0.82)' }}>
                A dedicated team of professionals committed to delivering excellence at every stage, from design and construction to customer relationships and post-possession support.
              </p>
            </motion.div>
          </div>

          {/* Group photo */}
          <motion.div
            {...fU(0.15)}
            className="relative overflow-hidden mb-16"
            style={{ border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 20px 64px rgba(26,26,26,0.08)' }}
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
              <p
                className="font-ui font-bold text-[0.68rem] tracking-[0.3em] uppercase mb-2"
                style={{ color: 'var(--beige)', textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}
              >
                The Majestique Family
              </p>
              <p className="font-times text-2xl lg:text-3xl" style={{ color: 'white' }}>
                Majestique Landmarks Core Team
              </p>
              <div className="w-12 h-px mt-4" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
            </div>
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
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Our Legacy</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Building Tomorrow's<br />Landmarks Today
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Driven by legacy, powered by innovation, and committed to excellence, Majestique Landmarks continues to shape the future of modern urban living through thoughtfully designed developments that stand the test of time.
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

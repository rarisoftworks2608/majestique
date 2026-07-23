import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import CountUp from '../../components/ui/CountUp'
import Seo from '../../components/ui/Seo'
import imgHero from '../../assets/Testimonials.jpg'

/* ── Animation helpers ───────────────────────────────────────────── */
const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

/* ── Real testimonial videos, grouped by project — sourced from the
   official @MajestiqueLandmarks YouTube channel ─────────────────── */
const CHANNEL_PARTNER_VIDEOS = [
  { videoId: 'Q_VGOe78LhA', title: 'Great real estate partnerships are built on trust, consistency, and shared values.' },
  { videoId: '2VrpT3fRzvU', title: 'Every project tells a story of vision and growth.' },
  { videoId: 'h3MWBvF8Zes', title: 'Meet our channel partners — the backbone of every successful milestone.' },
  { videoId: 'kBT6c5J75Ks', title: 'Our CP insights say it all — thoughtful design, trusted brand & high appreciation potential.' },
  { videoId: 'NFuZ3RYirWw', title: "At Majestique, our sales team doesn't just close deals — they open doors to strong partnerships." },
]

const KRUTARTH_VIDEOS = [
  { videoId: 'hx6kFfyykqc', title: 'Each key we hand over unlocks not just a home, but a chapter of trust, comfort, and new beginnings.' },
  { videoId: 'mxp5tVnxnGQ', title: "Every home is more than a purchase, it's the beginning of a lifelong bond built on trust." },
  { videoId: 'Z5zUHWDHWaY', title: "Our customers don't just buy a home — they begin a new chapter filled with trust." },
]

const CROWN_VIDEOS = [
  { videoId: 'UJEne23sHxA', title: 'Voices of Trust | The Crown' },
]

const RHYTHM_COUNTY_VIDEOS = [
  { videoId: 'XJK8NtIHdOQ', title: 'Love Where You Live — Discover Majestique Rhythm County' },
  { videoId: '9tsIcXtkH-4', title: 'Find Your Rhythm, Live Your Dream!' },
  { videoId: 'KYUMsm9P594', title: 'Your Perfect Lifestyle Begins Here!' },
  { videoId: 'zginHPM3Ye0', title: 'Where Every Corner Feels Like Home!' },
]

/* ── YouTube Facade Component ────────────────────────────────────── */
function VideoFacade({ videoId, title, compact = false }) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className="relative overflow-hidden w-full" style={{ aspectRatio: '16/9', background: '#111' }}>
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play ${title || 'testimonial video'}`}
        >
          <img
            src={thumb}
            alt={title || 'Testimonial video'}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="testimonial-play-ring flex items-center justify-center"
              style={{
                width: compact ? '44px' : '60px',
                height: compact ? '44px' : '60px',
                background: 'rgba(157,134,104,0.92)',
                border: '2px solid rgba(255,255,255,0.35)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Play
                size={compact ? 16 : 22}
                fill="white"
                style={{ color: 'white', marginLeft: '3px' }}
              />
            </motion.div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title || 'Testimonial'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}

/* ── Video group section (reused for each project) ───────────────── */
function VideoGroupSection({ label, title, subtitle, videos, background = 'var(--cream)' }) {
  return (
    <section className="section-pad relative" style={{ background }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
      <div className="container-luxury">
        <div className="mb-12 text-center">
          <SectionHeader label={label} title={title} subtitle={subtitle} align="center" />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${videos.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 ${videos.length === 1 ? 'max-w-2xl mx-auto' : ''}`}>
          {videos.map((vid, i) => (
            <motion.div
              key={vid.videoId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-white overflow-hidden"
              style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 16px rgba(5,5,5,0.05)' }}
            >
              <VideoFacade videoId={vid.videoId} title={vid.title} />
              <div className="p-4">
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(26,26,26,0.8)' }}>
                  {vid.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials — Real Stories From Real Families"
        description="Watch genuine testimonials from Majestique Landmarks' channel partners and residents across Krutarth, The Crown, and Rhythm County."
      />

      <PageHero
        title="Stories From Real Families, Real Homes"
        subtitle="Over 18,000 families choose Majestique Landmarks — hear their genuine experiences told in their own words."
        breadcrumb={['Home', 'Media', 'Testimonials']}
        bgImage={imgHero}
      />

      {/* ── Stats Band ────────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9d8668 0%, #c4a455 28%, #d4b465 55%, #b89050 80%, #9d8668 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(255,230,130,0.25) 0%, transparent 60%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.22)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'rgba(0,0,0,0.12)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { v: '18K+', l: 'Happy Families' },
              { v: '13',   l: 'Video Testimonials' },
              { v: '4',    l: 'Projects Featured' },
              { v: '10+',  l: 'Landmark Developments' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-8 px-4"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.22)' : 'none' }}
              >
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white' }}><CountUp value={s.v} /></p>
                <div className="w-6 h-px mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull Quote ────────────────────────────────────────────── */}
      <section className="py-20 relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="container-luxury">
          <motion.div {...fU()} className="text-center max-w-3xl mx-auto">
            <div className="font-display select-none mb-3" style={{ fontSize: '6rem', color: 'rgba(157,134,104,0.15)', lineHeight: 0.7 }}>"</div>
            <p className="font-times font-normal leading-relaxed" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', color: 'var(--luxury-dark)' }}>
              The measure of a developer is not just in the homes they build, but in the lives they help their families build within them.
            </p>
            <div className="w-12 h-px mx-auto mt-6 mb-4" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.6)' }}>— Majestique Landmarks Philosophy</p>
          </motion.div>
        </div>
      </section>

      {/* ── Channel Partner Testimonials ──────────────────────────── */}
      <VideoGroupSection
        label="Channel Partners"
        title={<>Trusted By Our <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Partners</em></>}
        subtitle="Our channel partners share what makes Majestique Landmarks a brand worth building a business around."
        videos={CHANNEL_PARTNER_VIDEOS}
        background="var(--cream)"
      />

      {/* ── Krutarth Testimonials ─────────────────────────────────── */}
      <VideoGroupSection
        label="Krutarth Residents"
        title={<>Voices From <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Krutarth</em></>}
        subtitle="Homeowners at Krutarth share what it means to receive the keys to a home built on trust."
        videos={KRUTARTH_VIDEOS}
        background="white"
      />

      {/* ── The Crown Testimonial ─────────────────────────────────── */}
      <VideoGroupSection
        label="The Crown"
        title={<>Voices of <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Trust</em></>}
        subtitle="Residents of The Crown share their experience of elevated, sophisticated living."
        videos={CROWN_VIDEOS}
        background="var(--cream)"
      />

      {/* ── Rhythm County Testimonials ─────────────────────────────── */}
      <VideoGroupSection
        label="Rhythm County Residents"
        title={<>Love Where You <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Live</em></>}
        subtitle="Real homeowners from Majestique Rhythm County, Hadapsar share what life truly feels like inside a Majestique community."
        videos={RHYTHM_COUNTY_VIDEOS}
        background="white"
      />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Your Story Awaits</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Be Part Of The<br />Majestique Story
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Join over 18,000 families who trust Majestique Landmarks to deliver quality homes, timely possession, and communities they are proud to call home.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
              <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Schedule a Visit</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .testimonial-play-ring { animation: testimonialPlayPulse 2.6s ease-out infinite; }
        @keyframes testimonialPlayPulse {
          0%   { box-shadow: 0 0 0 0 rgba(157,134,104,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(157,134,104,0); }
          100% { box-shadow: 0 0 0 0 rgba(157,134,104,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-play-ring { animation: none !important; }
        }
      `}</style>
    </>
  )
}

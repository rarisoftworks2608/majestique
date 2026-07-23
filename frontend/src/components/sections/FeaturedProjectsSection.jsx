import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

/* ── Project spotlight images ── */
import imgTwilight    from '../../assets/project_spolights/twilight.webp'
import imgElements    from '../../assets/twilight-balewadi-pune-majestique_landmarks.avif'
import imgKrutarth    from '../../assets/project_spolights/Krutharth.jpg'
import imgNewFriends  from '../../assets/project_spolights/New_Friends_kothrud.webp'
import imgAravali     from '../../assets/project_spolights/Aravali.jpg'
import imgTheCrown    from '../../assets/project_spolights/Crown.jpg'
import imgEvolvus     from '../../assets/project_spolights/evolvus-by-majestique-landmarks.webp'
import imgSignature   from '../../assets/project_spolights/Signature-Towers-Pune.jpg'
import imgRhythm      from '../../assets/project_spolights/Rythem_county.webp'
import imgTowers      from '../../assets/project_spolights/Majestique-tower-kharadi.webp'
const PROJECTS = [
  {
    image:    imgNewFriends,
    name:     'New Friends by Majestique',
    location: 'Kothrud, Pune',
    tag:      'Ongoing',
    config:   '4, 3 & 2 Luxury Homes',
    link:     '/projects/new-friends-by-majestique',
  },
  {
    image:    imgTwilight,
    name:     'TWILIGHT by Majestique',
    location: 'Balewadi Highstreet, Pune',
    tag:      'Ongoing',
    config:   '4 & 3 BHK Luminous Residences',
    link:     '/projects/majestique-twilight',
  },
  {
    image:    imgElements,
    name:     'ELEMENTS by Majestique',
    location: 'Pan Card Road, Baner, Pune',
    tag:      'Ongoing',
    config:   '4 & 4.4 Luxe Grand Suites',
    link:     '/projects/majestique-elements',
  },
  {
    image:    imgKrutarth,
    name:     'Krutarth by Majestique',
    location: 'Marketyard, Satara Road, Pune',
    tag:      'Ongoing',
    config:   '4 & 3 BHK Royal Residences',
    link:     '/projects/majestique-krutarth',
  },
  {
    image:    imgAravali,
    name:     'Majestique Aravali',
    location: 'Kothrud NXT, Pune',
    tag:      'Ongoing',
    config:   '3 & 2 BHK Hillside Homes',
    link:     '/projects/majestique-aravali',
  },
  {
    image:    imgTheCrown,
    name:     'The Crown by Majestique',
    location: '7 Loves Chowk, Gultekadi, Pune',
    tag:      'Ongoing',
    config:   '4 & 3 BHK Royal Residences',
    link:     '/projects/the-crown-by-majestique',
  },
  {
    image:    imgEvolvus,
    name:     'Evolvus by Majestique',
    location: 'Central Kharadi, Pune',
    tag:      'Ongoing',
    config:   '4 & 3 BHK Luxury Residences',
    link:     '/projects/majestique-evolvus',
  },
  {
    image:    imgRhythm,
    name:     'Majestique Rhythm County',
    location: 'Hadapsar Handewadi, Pune',
    tag:      'Completed',
    config:   '2 & 3 BHK Residences',
    link:     '/projects/majestique-rhythm-county',
  },
  {
    image:    imgTowers,
    name:     'Majestique Towers',
    location: 'Near EON IT Park, Kharadi, Pune',
    tag:      'Completed',
    config:   '3 & 2 BHK Premium Residences',
    link:     '/projects/majestique-towers',
  },
  {
    image:    imgSignature,
    name:     'Majestique Signature Towers',
    location: 'Balewadi, Pune',
    tag:      'Completed',
    config:   '2 & 3 BHK Palatial Homes',
    link:     '/projects/signature-towers-by-majestique',
  },
]

const imgVariants = {
  enter:  (d) => ({ opacity: 0, scale: 1.06, x: d > 0 ? '3%' : '-3%' }),
  center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   (d) => ({ opacity: 0, scale: 1.03, x: d > 0 ? '-2%' : '2%', transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

export default function FeaturedProjectsSection() {
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)
  const timerRef                  = useRef(null)

  const goNext = useCallback(() => {
    setDirection(1)
    setActive(prev => (prev + 1) % PROJECTS.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActive(prev => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }, [])

  const goTo = useCallback((i) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
  }, [active])

  useEffect(() => {
    if (paused) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(goNext, 3500)
    return () => clearInterval(timerRef.current)
  }, [paused, goNext])

  const cur = PROJECTS[active]

  return (
    <section style={{ background: '#F9F5EF' }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(157,134,104,0.35), transparent)' }} />

      <div className="container-luxury" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">

          {/* ── LEFT — Static content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-ui text-[0.72rem] tracking-[0.30em] uppercase mb-3 font-bold" style={{ color: '#9D8668' }}>
              ✦ &nbsp; Discover Our Projects &nbsp; ✦
            </p>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg,#9D8668,#DDD2C2)', marginBottom: '1.4rem' }} />
            <h2
              className="font-display font-light leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: '#1A1A1A', letterSpacing: '0.01em' }}
            >
              Crafted for Modern Living.
              <br />
              <span style={{ whiteSpace: 'nowrap' }}>
                Designed for{' '}
                <em style={{ fontStyle: 'italic', color: '#9D8668' }}>Generations.</em>
              </span>
            </h2>
            <p
              className="font-body mb-4"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: '#1A1A1A', fontWeight: 400, maxWidth: '420px', lineHeight: 1.8 }}
            >
              Every Majestique development is a reflection of thoughtful planning, architectural excellence,
              and an uncompromising commitment to quality strategically located to offer seamless connectivity,
              elevated living experiences, and enduring value.
            </p>
            <p
              className="font-body mb-8"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: '#1A1A1A', fontWeight: 400, maxWidth: '420px', lineHeight: 1.8 }}
            >
              Designed to meet the evolving needs of modern families, each development combines contemporary
              architecture, intelligent space planning, and world-class amenities where communities thrive
              and aspirations flourish.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 font-ui text-[0.62rem] tracking-[0.22em] uppercase group transition-all duration-300"
                style={{ color: '#fff', background: '#9D8668', border: '1px solid #9D8668', padding: '0.85rem 2rem' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#736452'; e.currentTarget.style.borderColor = '#736452' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#9D8668'; e.currentTarget.style.borderColor = '#9D8668' }}
              >
                Explore All Projects
                <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* ── RIGHT — Carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Image area */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3.4', boxShadow: '0 24px 64px rgba(26,10,0,0.15)' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={active}
                  src={cur.image}
                  alt={cur.name}
                  custom={direction}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                {[{ fn: goPrev, label: 'Prev', icon: ChevronLeft }, { fn: goNext, label: 'Next', icon: ChevronRight }].map(({ fn, label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={fn}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.92)', color: '#1A1A1A', border: '1px solid rgba(157,134,104,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#9D8668'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = '#1A1A1A' }}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info bar */}
            <div
              className="grid grid-cols-3"
              style={{
                background: '#fff',
                border: '1px solid rgba(157,134,104,0.15)',
                borderTop: 'none',
              }}
            >
              {/* Project name */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-name'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center gap-1.5 px-5"
                  style={{ borderRight: '1px solid rgba(157,134,104,0.18)', paddingTop: '1.1rem', paddingBottom: '1.1rem' }}
                >
                  <span className="font-ui text-[0.62rem] tracking-[0.18em] uppercase" style={{ color: '#9D8668', fontWeight: 600 }}>
                    Project
                  </span>
                  <span className="font-body" style={{ fontSize: '0.95rem', color: '#1A1A1A', lineHeight: 1.35, fontWeight: 500 }}>
                    {cur.name}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Config */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-config'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center gap-1.5 px-5"
                  style={{ borderRight: '1px solid rgba(157,134,104,0.18)', paddingTop: '1.1rem', paddingBottom: '1.1rem' }}
                >
                  <span className="font-ui text-[0.62rem] tracking-[0.18em] uppercase" style={{ color: '#9D8668', fontWeight: 600 }}>
                    Configuration
                  </span>
                  <span className="font-body" style={{ fontSize: '0.95rem', color: '#1A1A1A', lineHeight: 1.35, fontWeight: 500 }}>
                    {cur.config}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Location */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-loc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center gap-1.5 px-5"
                  style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem' }}
                >
                  <span className="font-ui text-[0.62rem] tracking-[0.18em] uppercase flex items-center gap-1" style={{ color: '#9D8668', fontWeight: 600 }}>
                    <MapPin size={10} style={{ flexShrink: 0 }} />
                    Location
                  </span>
                  <span className="font-body" style={{ fontSize: '0.95rem', color: '#1A1A1A', lineHeight: 1.35, fontWeight: 500 }}>
                    {cur.location}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* View project link */}
            <div className="flex items-center justify-between mt-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-link'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    to={cur.link}
                    className="inline-flex items-center gap-2 font-ui text-[0.82rem] tracking-wider uppercase transition-colors duration-200"
                    style={{ color: '#1A1A1A' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#9D8668' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#1A1A1A' }}
                  >
                    View Project <ArrowRight size={11} />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {PROJECTS.map((_, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Project ${i + 1}`}
                      className="relative overflow-hidden transition-all duration-400"
                      style={{ height: '2px', width: isActive ? '28px' : '10px', background: 'rgba(157,134,104,0.25)' }}
                    >
                      {isActive && (
                        <motion.div
                          key={active}
                          className="absolute inset-0 origin-left"
                          style={{ background: '#9D8668' }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: paused ? 0 : 1 }}
                          transition={{ duration: 3.5, ease: 'linear' }}
                        />
                      )}
                      {i < active && <div className="absolute inset-0" style={{ background: 'rgba(157,134,104,0.6)' }} />}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(157,134,104,0.25), transparent)' }} />
    </section>
  )
}

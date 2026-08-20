import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, MapPin, ArrowUpRight, ArrowRight, SlidersHorizontal, ChevronDown } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import ongoingHeroImg from '../../assets/Ongoing_Project.jpg'
import SectionHeader from '../../components/ui/SectionHeader'
import Seo from '../../components/ui/Seo'
import { ONGOING_PROJECTS, CATEGORIES } from '../../data/ongoingProjects'

const PLACEHOLDER_IMAGE = '/images/project-placeholder.jpg'

/* ── Pune zone lookup — groups micro-market location names under a
   compass zone so the filter reads as a map, not a wall of pills ── */
const ZONE_ORDER = ['East', 'West', 'South', 'North', 'Central']
const ZONE_KEYWORDS = {
  East:    ['kharadi', 'hadapsar', 'handewadi', 'wagholi', 'kalyani nagar', 'viman nagar', 'mundhwa', 'magarpatta', 'amanora', 'eon it park'],
  West:    ['baner', 'balewadi', 'kothrud', 'pashan', 'aundh', 'bavdhan', 'warje', 'wakad', 'hinjewadi', 'pan card road'],
  South:   ['nibm', 'undri', 'dhayari', 'katraj', 'kondhwa', 'wanowrie', 'market yard', 'marketyard', 'satara road', 'gultekadi', 'bibwewadi', 'ambegaon'],
  North:   ['vishrantwadi', 'kalas', 'dhanori', 'yerwada', 'alandi', 'chakan', 'moshi', 'pimpri', 'chinchwad', 'nigdi'],
  Central: ['camp', 'deccan', 'shivajinagar', 'swargate', 'fc road', 'jm road'],
}
function getZone(locationName) {
  const name = (locationName || '').toLowerCase()
  for (const zone of ZONE_ORDER) {
    if (ZONE_KEYWORDS[zone].some((kw) => name.includes(kw))) return zone
  }
  return 'Other'
}

function ProjectSpotlightCard({ project, index }) {
  const hasMicrosite = Boolean(project.url)
  const enquiryHref = `/contact?project=${encodeURIComponent(project.title)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.42), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-luxury overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={project.image || PLACEHOLDER_IMAGE}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Shine sweep on hover */}
        <div className="ongoing-card-shine absolute inset-0 pointer-events-none" aria-hidden />

        {hasMicrosite ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: 'rgba(26,26,26,0.62)' }}
          >
            <span className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase px-6 py-3" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
              View Project <ArrowUpRight size={13} />
            </span>
          </a>
        ) : (
          <Link
            to={enquiryHref}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: 'rgba(26,26,26,0.62)' }}
          >
            <span className="font-ui text-xs tracking-widest uppercase px-6 py-3" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
              Enquire Now
            </span>
          </Link>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-times font-normal text-2xl mb-2 leading-snug transition-colors duration-300 group-hover:text-gold" style={{ color: 'var(--luxury-dark)' }}>
          {project.title}
        </h3>
        <div className="flex items-start gap-2 mb-2.5">
          <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
          <span className="font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(92,74,48,0.7)' }}>
            {project.location}
          </span>
        </div>
        {project.tagline && (
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,26,26,0.55)' }}>
            {project.tagline}
          </p>
        )}
        {project.config && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-ui text-xs tracking-wider uppercase px-2.5 py-1"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: 'var(--gold-dark)' }}>
              {project.config}
            </span>
          </div>
        )}
        {hasMicrosite ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-all duration-300"
            style={{ color: 'var(--gold-dark)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
          >
            Visit Project Website <ArrowUpRight size={13} />
          </a>
        ) : (
          <Link
            to={enquiryHref}
            className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-all duration-300"
            style={{ color: 'var(--gold-dark)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
          >
            Enquire About This Project <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default function OngoingProjects() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeZone, setActiveZone] = useState('All')
  const [zoneOpen, setZoneOpen] = useState(false)

  const categoryCounts = useMemo(() => {
    const counts = { All: ONGOING_PROJECTS.length }
    ONGOING_PROJECTS.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  const zonesAvailable = useMemo(() => {
    const present = new Set(ONGOING_PROJECTS.map((p) => getZone(p.location)))
    return [...ZONE_ORDER, 'Other'].filter((zone) => present.has(zone))
  }, [])

  const filtered = useMemo(() => {
    let result = [...ONGOING_PROJECTS]
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory)
    if (activeZone !== 'All') result = result.filter((p) => getZone(p.location) === activeZone)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, activeZone, search])

  const hasActiveFilters = activeCategory !== 'All' || activeZone !== 'All' || search.trim() !== ''

  const clearAll = () => {
    setActiveCategory('All')
    setActiveZone('All')
    setSearch('')
  }

  const gridKey = `${activeCategory}|${activeZone}|${search}`

  return (
    <>
      <Seo
        title="Ongoing Projects"
        description="Explore Majestique Landmarks' current luxury residential projects under construction across Pune: Kharadi, Balewadi, Baner, NIBM Annex, Kothrud and more."
      />
      <PageHero
        title="Ongoing Projects"
        subtitle="Witness the future taking shape with our current developments across Kharadi, Balewadi, Baner, NIBM Annex and Kothrud"
        breadcrumb={['Home', 'Projects', 'Ongoing']}
        bgImage={ongoingHeroImg}
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <SectionHeader
              label="Under Construction"
              title="Projects Currently in Progress"
              subtitle="Each project is a MahaRERA-registered promise, meticulously planned, debt-free, and delivered on time."
            />

            {/* Search */}
            <div
              className="relative flex-shrink-0 w-full lg:w-72"
              style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
            >
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(92,74,48,0.45)' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location…"
                className="w-full font-body text-sm pl-9 pr-4 py-2.5 outline-none transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,175,55,0.3)',
                  background: 'white',
                  color: 'var(--luxury-dark)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(212,175,55,0.3)' }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(92,74,48,0.45)' }}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* ── Filter bar ─────────────────────────────────────── */}
          <div
            className="p-5 mb-8"
            style={{ background: 'white', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mr-1 shrink-0"
                style={{ color: 'rgba(92,74,48,0.55)' }}
              >
                <SlidersHorizontal size={13} />
                Category
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative font-ui text-xs tracking-widest uppercase px-3.5 py-1.5 transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--luxury-dark)' : 'var(--luxury-charcoal)',
                      border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(92,74,48,0.25)'}`,
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {isActive && (
                      <motion.span layoutId="ongoingCategoryPill" className="absolute inset-0" style={{ background: 'var(--gold)', zIndex: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative" style={{ zIndex: 1 }}>
                      {cat}
                      {categoryCounts[cat] !== undefined && (
                        <span className="ml-1.5 text-[10px]" style={{ opacity: isActive ? 0.7 : 0.45 }}>
                          {categoryCounts[cat]}
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ── Location — single zone dropdown ──────────────── */}
            <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
              <span
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mr-1 shrink-0"
                style={{ color: 'rgba(92,74,48,0.55)' }}
              >
                <MapPin size={13} />
                Location
              </span>
              <div className="relative shrink-0">
                <button
                  onClick={() => setZoneOpen((v) => !v)}
                  className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase px-3.5 py-1.5 transition-all duration-200"
                  style={{ border: '1px solid rgba(92,74,48,0.25)', color: 'var(--luxury-charcoal)' }}
                >
                  {activeZone === 'All' ? 'All Zones' : `${activeZone} Pune`}
                  <ChevronDown size={12} style={{ transform: zoneOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <AnimatePresence>
                  {zoneOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-[calc(100%+4px)] z-20 min-w-[160px] py-1"
                      style={{ background: 'white', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 8px 32px rgba(26,26,26,0.12)' }}
                    >
                      <button
                        onClick={() => { setActiveZone('All'); setZoneOpen(false) }}
                        className="w-full text-left px-4 py-2.5 font-ui text-xs tracking-wider uppercase transition-all duration-150"
                        style={{
                          color: activeZone === 'All' ? 'var(--gold-dark)' : 'var(--luxury-charcoal)',
                          background: activeZone === 'All' ? 'rgba(212,175,55,0.06)' : 'transparent',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,175,55,0.06)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = activeZone === 'All' ? 'rgba(212,175,55,0.06)' : 'transparent' }}
                      >
                        All Zones
                      </button>
                      {zonesAvailable.map((zone) => (
                        <button
                          key={zone}
                          onClick={() => { setActiveZone(zone); setZoneOpen(false) }}
                          className="w-full text-left px-4 py-2.5 font-ui text-xs tracking-wider uppercase transition-all duration-150"
                          style={{
                            color: activeZone === zone ? 'var(--gold-dark)' : 'var(--luxury-charcoal)',
                            background: activeZone === zone ? 'rgba(212,175,55,0.06)' : 'transparent',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,175,55,0.06)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = activeZone === zone ? 'rgba(212,175,55,0.06)' : 'transparent' }}
                        >
                          {zone} Pune
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Active filter summary */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <p className="font-body text-sm" style={{ color: 'rgba(92,74,48,0.6)' }}>
              Showing <strong style={{ color: 'var(--luxury-dark)' }}>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` · ${activeCategory}`}
              {activeZone !== 'All' && ` · ${activeZone} Pune`}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
              >
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>

          {/* ── Content ──────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <Search size={36} style={{ color: 'rgba(212,175,55,0.3)', margin: '0 auto 1rem' }} />
              <p className="font-times text-2xl mb-2" style={{ color: 'var(--luxury-charcoal)' }}>
                No projects found
              </p>
              <p className="font-body text-sm mb-6" style={{ color: 'rgba(92,74,48,0.55)' }}>
                Try adjusting your search or filters.
              </p>
              <button onClick={clearAll} className="btn-gold" style={{ fontSize: '0.75rem' }}>
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={gridKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((project, i) => (
                  <ProjectSpotlightCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--luxury-dark)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2" style={{ color: 'rgba(212,175,55,0.75)' }}>Looking for your perfect home?</p>
            <h3 className="font-times text-2xl font-normal" style={{ color: 'var(--beige)' }}>
              Let our team help you find your ideal Majestique address.
            </h3>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/projects/completed" className="btn-outline-gold transition-transform duration-300 hover:scale-105" style={{ fontSize: '0.75rem' }}>
              View Completed
            </Link>
            <Link to="/contact" className="btn-gold transition-transform duration-300 hover:scale-105">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      <style>{`
        .ongoing-card-shine {
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .group:hover .ongoing-card-shine {
          animation: ongoingCardShineSweep 1s ease forwards;
        }
        @keyframes ongoingCardShineSweep {
          0%   { transform: translateX(-120%); opacity: 0.85; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ongoing-card-shine { animation: none !important; }
        }
      `}</style>
    </>
  )
}

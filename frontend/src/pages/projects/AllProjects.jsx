import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal, X, Search,
  Star, Building2,
} from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import ProjectCard from '../../components/ui/ProjectCard'
import { useProjects } from '../../hooks/useProjects'
import Seo from '../../components/ui/Seo'

const STATUS_TABS = [
  { value: 'ALL',       label: 'All Projects' },
  { value: 'ONGOING',   label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
]

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Mixed-Use', 'Villa']

function SkeletonCard() {
  return (
    <div className="card-luxury overflow-hidden" style={{ background: 'var(--cream)' }}>
      <div className="skeleton" style={{ aspectRatio: '4/3' }} />
      <div className="p-6 space-y-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-5 w-48 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  )
}

export default function AllProjects() {
  const [activeStatus,   setActiveStatus]   = useState('ALL')
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const { projects, loading, error } = useProjects({})

  const statusCounts = useMemo(() => {
    const counts = { ALL: projects.length, ONGOING: 0, COMPLETED: 0 }
    projects.forEach((p) => {
      if (p.status === 'ONGOING')   counts.ONGOING   += 1
      if (p.status === 'COMPLETED') counts.COMPLETED += 1
    })
    return counts
  }, [projects])

  const categoryCounts = useMemo(() => {
    const base = activeStatus === 'ALL' ? projects : projects.filter((p) => p.status === activeStatus)
    const counts = { All: base.length }
    base.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [projects, activeStatus])

  const filtered = useMemo(() => {
    let result = [...projects]
    if (activeStatus !== 'ALL')     result = result.filter((p) => p.status === activeStatus)
    if (activeCategory !== 'All')   result = result.filter((p) => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.location?.name || p.location)?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q)
      )
    }
    return result
  }, [projects, activeStatus, activeCategory, search])

  const featuredProjects = useMemo(() => filtered.filter((p) => p.featured), [filtered])
  const gridProjects     = useMemo(() => filtered.filter((p) => !p.featured), [filtered])

  const hasActiveFilters = activeCategory !== 'All' || search.trim() !== ''

  const clearAll = () => {
    setActiveCategory('All')
    setSearch('')
  }

  const handleStatusChange = (status) => {
    setActiveStatus(status)
    setActiveCategory('All')
  }

  const gridKey = `${activeStatus}|${activeCategory}|${search}`

  return (
    <>
      <Seo
        title="All Projects"
        description="Explore all Majestique Landmarks luxury residential and commercial developments across Pune: ongoing and completed projects in Kharadi, Balewadi, Baner, Kothrud and more."
      />
      <PageHero
        title="Our Projects"
        subtitle="Discover the complete portfolio of Majestique Landmarks, landmark developments that redefine luxury living across Pune"
        breadcrumb={['Home', 'Projects']}
        bgImage="https://majestiqueproperties.com/wp-content/uploads/2025/03/Evolvus-By-Majestique-Landmarks-Elevation-Image-01-scaled.webp"
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <SectionHeader
              label="Portfolio"
              title="Every Majestique Address"
              subtitle="MahaRERA-registered, debt-free developments delivered with precision. Explore our full portfolio of ongoing and completed projects."
            />

            {/* Search */}
            <div className="relative flex-shrink-0 w-full lg:w-72" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(92,74,48,0.45)' }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location…"
                className="w-full font-body text-sm pl-9 pr-4 py-2.5 outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'white', color: 'var(--luxury-dark)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(212,175,55,0.3)' }}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(92,74,48,0.45)' }} aria-label="Clear search">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* ── Status tabs ─────────────────────────────────────── */}
          <div className="flex items-center gap-1 mb-6">
            {STATUS_TABS.map((tab) => {
              const isActive = activeStatus === tab.value
              return (
                <button
                  key={tab.value}
                  onClick={() => handleStatusChange(tab.value)}
                  className="relative font-ui text-xs tracking-widest uppercase px-5 py-2.5 transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--gold)' : 'var(--luxury-charcoal)',
                    border: `1px solid ${isActive ? 'var(--luxury-dark)' : 'rgba(92,74,48,0.2)'}`,
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? undefined : 'white',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="statusTabBg"
                      className="absolute inset-0"
                      style={{ background: 'var(--luxury-dark)', zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative" style={{ zIndex: 1 }}>
                    {tab.label}
                    {!loading && statusCounts[tab.value] !== undefined && (
                      <span className="ml-1.5 text-[10px]" style={{ opacity: isActive ? 0.65 : 0.4 }}>
                        {statusCounts[tab.value]}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Filter bar ─────────────────────────────────────── */}
          <div className="p-5 mb-8"
            style={{ background: 'white', border: '1px solid rgba(212,175,55,0.15)' }}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase mr-1 shrink-0"
                style={{ color: 'rgba(92,74,48,0.55)' }}>
                <SlidersHorizontal size={13} /> Category
              </span>
              {CATEGORIES.filter((c) => c === 'All' || (categoryCounts[c] ?? 0) > 0 || !loading).map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="font-ui text-xs tracking-widest uppercase px-3.5 py-1.5 transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                    color:      activeCategory === cat ? 'var(--luxury-dark)' : 'var(--luxury-charcoal)',
                    border:     `1px solid ${activeCategory === cat ? 'var(--gold)' : 'rgba(92,74,48,0.25)'}`,
                    fontWeight: activeCategory === cat ? 700 : 400,
                  }}
                >
                  {cat}
                  {!loading && categoryCounts[cat] !== undefined && (
                    <span className="ml-1.5 text-[10px]" style={{ opacity: activeCategory === cat ? 0.7 : 0.45 }}>
                      {categoryCounts[cat]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter summary */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            {!loading && !error && (
              <p className="font-body text-sm" style={{ color: 'rgba(92,74,48,0.6)' }}>
                Showing <strong style={{ color: 'var(--luxury-dark)' }}>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && ` · ${activeCategory}`}
              </p>
            )}
            {hasActiveFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}>
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* ── Content ──────────────────────────────────────────── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <Building2 size={40} style={{ color: 'rgba(212,175,55,0.3)', margin: '0 auto 1rem' }} />
              <p className="font-times text-xl mb-2" style={{ color: 'var(--luxury-charcoal)' }}>Could not load projects</p>
              <p className="font-body text-sm" style={{ color: 'rgba(92,74,48,0.55)' }}>{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <Search size={36} style={{ color: 'rgba(212,175,55,0.3)', margin: '0 auto 1rem' }} />
              <p className="font-times text-2xl mb-2" style={{ color: 'var(--luxury-charcoal)' }}>No projects found</p>
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
              >
                {featuredProjects.length > 0 && (
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Star size={14} fill="currentColor" style={{ color: 'var(--gold)' }} />
                      <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>
                        Featured Projects
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.2)' }} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {featuredProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} featured />
                      ))}
                    </div>
                    {gridProjects.length > 0 && (
                      <div className="flex items-center gap-3 mt-10 mb-6">
                        <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(92,74,48,0.5)' }}>
                          All Projects
                        </span>
                        <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.15)' }} />
                      </div>
                    )}
                  </div>
                )}
                {gridProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: 'var(--luxury-dark)', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2">Ready to find your home?</p>
            <h3 className="font-times text-2xl font-normal" style={{ color: 'var(--beige)' }}>
              Our team is here to guide you to the right Majestique address.
            </h3>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/redevelopment" className="btn-outline-gold transition-transform duration-300 hover:scale-105" style={{ fontSize: '0.75rem' }}>
              Redevelopment
            </Link>
            <Link to="/contact" className="btn-gold transition-transform duration-300 hover:scale-105">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      <style>{`
        .proj-card-shine {
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .group:hover .proj-card-shine {
          animation: projCardShineSweep 1s ease forwards;
        }
        @keyframes projCardShineSweep {
          0%   { transform: translateX(-120%); opacity: 0.85; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .proj-card-shine { animation: none !important; }
        }
      `}</style>
    </>
  )
}

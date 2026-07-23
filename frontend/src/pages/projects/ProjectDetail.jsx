import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Maximize2, Home, Calendar, Shield, Phone, ChevronRight,
  CheckCircle2, LayoutTemplate, Star, ArrowLeft, Camera,
  Waves, Dumbbell, Users, Car, Flower2, Activity, Gamepad2,
  Zap, ArrowUpCircle, SunMedium, Wifi, Coffee, Droplets,
  TreePine, Film, BookOpen, Grid2x2, Eye,
} from 'lucide-react'
import { useProject } from '../../hooks/useProjects'
import Lightbox from '../../components/ui/Lightbox'
import EnquiryModal from '../../components/ui/EnquiryModal'
import { getImageUrl } from '../../utils/helpers'
import { SITE_PHONE } from '../../utils/constants'
import Seo from '../../components/ui/Seo'
import projectFallbackImg from '../../assets/Majestique-Towers-Elevation-01-2048x1152.webp'

const TABS = ['Overview', 'Gallery', 'Floor Plans', 'Amenities']

const ICON_RULES = [
  { test: /pool|swim/i,           Icon: Waves },
  { test: /gym|fitness|workout/i, Icon: Dumbbell },
  { test: /club|lounge|hall/i,    Icon: Users },
  { test: /security|guard|cctv|surveillance|gated|intercom/i, Icon: Shield },
  { test: /park/i,                Icon: Car },
  { test: /garden|landscape|lawn/i, Icon: Flower2 },
  { test: /kids|child|play/i,     Icon: Home },
  { test: /jog|track|walk/i,      Icon: Activity },
  { test: /game|indoor|billiard|table/i, Icon: Gamepad2 },
  { test: /power|backup|generator/i, Icon: Zap },
  { test: /elevator|lift/i,       Icon: ArrowUpCircle },
  { test: /solar|sun/i,           Icon: SunMedium },
  { test: /wifi|internet|broadband/i, Icon: Wifi },
  { test: /café|cafe|coffee/i,    Icon: Coffee },
  { test: /rainwater|harvest|water/i, Icon: Droplets },
  { test: /tree|green|eco|sustain|plant/i, Icon: TreePine },
  { test: /theater|cinema|screen/i, Icon: Film },
  { test: /library|reading|book/i, Icon: BookOpen },
]

function getAmenityIcon(name) {
  const rule = ICON_RULES.find((r) => r.test.test(name))
  return rule ? rule.Icon : CheckCircle2
}

const GROUP_RULES = [
  { label: 'Recreation', test: /pool|swim|jog|track|game|sport|tennis|cricket|badminton|theater|cinema|club|billiard/i },
  { label: 'Wellness',   test: /gym|fitness|yoga|spa|meditation|walk/i },
  { label: 'Security',   test: /security|cctv|guard|surveillance|intercom|gated/i },
  { label: 'Lifestyle',  test: /café|cafe|library|reading|salon|concierge/i },
  { label: 'Green',      test: /garden|landscape|solar|rainwater|tree|green|eco|sustain|plant|lawn/i },
  { label: 'Convenience',test: /parking|elevator|lift|power|backup|wifi|internet|kids|play|child/i },
]

function groupAmenities(list) {
  const used = new Set()
  const groups = []
  GROUP_RULES.forEach(({ label, test }) => {
    const items = list.filter((a) => test.test(a) && !used.has(a))
    items.forEach((a) => used.add(a))
    if (items.length) groups.push({ label, items })
  })
  const rest = list.filter((a) => !used.has(a))
  if (rest.length) groups.push({ label: 'Other', items: rest })
  return groups
}

const tabAnim = {
  initial:  { opacity: 0, y: 14 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.22 } },
}

const fU = (d = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

function DetailSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--luxury-dark)' }}>
      <div className="skeleton w-full" style={{ minHeight: '80vh' }} />
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { project, loading, error } = useProject(slug)

  const [activeTab,       setActiveTab]       = useState('Overview')
  const [galleryIndex,    setGalleryIndex]    = useState(null)
  const [planOpen,        setPlanOpen]        = useState(false)
  const [activePlan,      setActivePlan]      = useState(0)
  const [enquiryOpen,     setEnquiryOpen]     = useState(false)
  const [amenityLightbox, setAmenityLightbox] = useState(null)

  const allImages = project
    ? [
        ...(project.coverImage ? [{ url: getImageUrl(project.coverImage), caption: project.title }] : []),
        ...(project.images || []).map((img) => ({ ...img, url: getImageUrl(img.url) })),
      ]
    : []

  const handleBack = () => navigate(
    project ? `/projects/${project.status === 'ONGOING' ? 'ongoing' : 'completed'}` : '/projects/ongoing'
  )

  if (loading) return <DetailSkeleton />

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center px-6">
          <LayoutTemplate size={48} style={{ color: 'rgba(157,134,104,0.3)', margin: '0 auto 1.5rem' }} />
          <p className="font-times text-3xl mb-4" style={{ color: 'var(--luxury-dark)' }}>Project Not Found</p>
          <p className="font-body text-sm mb-8" style={{ color: 'rgba(26,26,26,0.82)' }}>
            The project you're looking for may have moved or is no longer available.
          </p>
          <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Browse All Projects</Link>
        </div>
      </div>
    )
  }

  const isOngoing     = project.status === 'ONGOING'
  const backPath      = `/projects/${isOngoing ? 'ongoing' : 'completed'}`
  const backLabel     = isOngoing ? 'Ongoing Projects' : 'Completed Projects'
  const amenityGroups  = groupAmenities(project.amenities || [])
  const planImages     = (project.floorPlans || []).map((p) => ({ url: getImageUrl(p.imageUrl), caption: p.label }))
  const amenityImages  = (project.images || []).filter((img) => img.type === 'AMENITY').map((img) => ({ ...img, url: getImageUrl(img.url) }))

  return (
    <>
      <Seo
        title={project.title}
        description={project.tagline || `${project.title} — luxury ${(project.category || '').toLowerCase()} in ${project.location?.name || project.location || 'Pune'}.`}
        image={project.coverImage || undefined}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO — full-bleed cinematic
      ══════════════════════════════════════════════════════════ */}
      <section className="relative flex items-end overflow-hidden -mt-20 lg:-mt-[118px]" style={{ minHeight: '88vh' }}>

        {/* Ken Burns cover — always shows an image */}
        <motion.img
          src={project.coverImage ? getImageUrl(project.coverImage) : projectFallbackImg}
          alt={project.title}
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layered gradient — dark at bottom for text, dark at top for UI clarity */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.65) 35%, rgba(5,5,5,0.3) 65%, rgba(5,5,5,0.12) 100%)' }} />
        {/* Extra top-down veil so back button & badges stay legible over bright image */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 38%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.35) 0%, transparent 55%)' }} />

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg,var(--gold-dark),var(--gold),var(--gold-dark))' }} />

        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-all duration-300"
          style={{ top: '7rem', left: '1.5rem', color: 'rgba(243,239,232,0.82)', zIndex: 10 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(243,239,232,0.82)' }}
        >
          <div
            className="w-7 h-7 flex items-center justify-center transition-all duration-300"
            style={{ border: '1px solid rgba(243,239,232,0.4)', background: 'rgba(5,5,5,0.3)', backdropFilter: 'blur(8px)' }}
          >
            <ArrowLeft size={13} />
          </div>
          <span className="hidden sm:inline">{backLabel}</span>
        </button>

        {/* Hero content */}
        <div className="container-luxury relative z-10 pb-14 pt-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="font-ui text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5"
                style={{
                  background: isOngoing ? 'var(--gold)' : 'rgba(157,134,104,0.28)',
                  color:      isOngoing ? 'var(--luxury-dark)' : 'var(--gold)',
                  border:     isOngoing ? 'none' : '1px solid rgba(157,134,104,0.75)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {isOngoing ? '● Ongoing' : '✓ Completed'}
              </span>
              {project.category && (
                <span className="font-ui text-[0.62rem] tracking-widest uppercase px-3 py-1.5"
                  style={{ background: 'rgba(5,5,5,0.35)', color: 'rgba(243,239,232,0.88)', border: '1px solid rgba(243,239,232,0.28)', backdropFilter: 'blur(8px)' }}>
                  {project.category}
                </span>
              )}
              {project.featured && (
                <span className="flex items-center gap-1.5 font-ui text-[0.62rem] tracking-widest uppercase px-3 py-1.5"
                  style={{ background: 'rgba(157,134,104,0.28)', color: 'var(--gold)', border: '1px solid rgba(157,134,104,0.7)', backdropFilter: 'blur(8px)' }}>
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
            </div>

            {/* Thin gold accent bar */}
            <div className="w-12 h-0.5 mb-5" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />

            {/* Title */}
            <h1 className="font-times font-normal leading-none mb-4"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', color: 'var(--beige)' }}>
              {project.title}
            </h1>

            {/* Tagline */}
            {project.tagline && (
              <p className="font-times italic mb-8"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'rgba(232,213,163,0.65)' }}>
                "{project.tagline}"
              </p>
            )}

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2"
              style={{ borderTop: '1px solid rgba(157,134,104,0.15)' }}>
              {[
                { icon: MapPin,    value: project.location?.name || project.location },
                { icon: Maximize2, value: project.area,                   hide: !project.area },
                { icon: Home,      value: project.units ? `${project.units} Units` : null, hide: !project.units },
                { icon: Calendar,  value: project.possession,             hide: !project.possession },
              ].filter((m) => !m.hide && m.value).map(({ icon: Icon, value }, i) => (
                <span key={i} className="flex items-center gap-2 font-body text-sm pt-3" style={{ color: 'rgba(243,239,232,0.58)' }}>
                  <Icon size={13} style={{ color: 'var(--gold)' }} />
                  {value}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute bottom-10 right-6 md:right-10 flex items-end gap-2"
            >
              {allImages.slice(1, 4).map((img, i) => (
                <button key={i} onClick={() => setGalleryIndex(i + 1)}
                  className="relative overflow-hidden flex-shrink-0 group"
                  style={{ width: 76, height: 54, border: '1px solid rgba(157,134,104,0.3)' }}>
                  <img src={img?.url || img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(157,134,104,0.3)' }} />
                </button>
              ))}
              <button
                onClick={() => setGalleryIndex(0)}
                className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0 transition-all duration-200"
                style={{ background: 'rgba(5,5,5,0.88)', color: 'var(--gold)', border: '1px solid rgba(157,134,104,0.4)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(157,134,104,0.18)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,5,0.88)' }}
              >
                <Camera size={13} />
                <span className="font-ui text-xs tracking-wider uppercase">{allImages.length} Photos</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STICKY TAB BAR
      ══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-40"
        style={{ background: 'var(--luxury-dark)', borderBottom: '1px solid rgba(157,134,104,0.22)', boxShadow: '0 6px 32px rgba(5,5,5,0.6)' }}>
        {/* Gold shimmer line at top of bar */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,134,104,0.5), transparent)' }} />
        <div className="container-luxury flex items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="relative px-5 py-4 font-ui text-xs tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-250"
                style={{
                  color: activeTab === tab ? 'var(--gold)' : 'rgba(243,239,232,0.32)',
                  fontWeight: activeTab === tab ? 500 : 300,
                }}>
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
                )}
              </button>
            ))}
          </div>
          {/* Enquire Now — accent gold button */}
          <button
            onClick={() => setEnquiryOpen(true)}
            className="hidden md:flex items-center gap-2 flex-shrink-0 font-ui tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              fontSize: '0.6rem',
              padding: '0.7rem 1.75rem',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              color: 'var(--luxury-dark)',
              border: 'none',
              fontWeight: 600,
              letterSpacing: '0.2em',
              boxShadow: '0 4px 20px rgba(157,134,104,0.35)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(157,134,104,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(157,134,104,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <Phone size={11} /> Enquire Now
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT + SIDEBAR
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream)' }}>
        <div className="container-luxury py-14 pb-28 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* ── Tab Content ─────────────────────────────────────── */}
            <div className="lg:col-span-2 min-w-0">
              <AnimatePresence mode="wait">

                {/* ── OVERVIEW ──────────────────────────────────── */}
                {activeTab === 'Overview' && (
                  <motion.div key="overview" {...tabAnim}>

                    {/* Key details — premium stat grid */}
                    <motion.div {...fU()} className="grid grid-cols-2 md:grid-cols-4 mb-12 overflow-hidden"
                      style={{ border: '1px solid rgba(157,134,104,0.2)', boxShadow: '0 4px 24px rgba(5,5,5,0.06)' }}>
                      {[
                        { icon: MapPin,    label: 'Location',    value: project.location?.name || project.location },
                        { icon: Maximize2, label: 'Area',        value: project.area || '—' },
                        { icon: Home,      label: 'Total Units', value: project.units ? `${project.units}` : '—' },
                        { icon: Calendar,  label: 'Possession',  value: project.possession || '—' },
                      ].map(({ icon: Icon, label, value }, i) => (
                        <div key={label}
                          className="flex flex-col items-center justify-center p-6 text-center"
                          style={{
                            borderRight:  i < 3 ? '1px solid rgba(157,134,104,0.15)' : 'none',
                            background: i % 2 === 0 ? 'white' : 'var(--pearl)',
                          }}>
                          <div className="w-11 h-11 flex items-center justify-center mb-3"
                            style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.12), rgba(157,134,104,0.04))', border: '1px solid rgba(157,134,104,0.22)' }}>
                            <Icon size={17} style={{ color: 'var(--gold)' }} />
                          </div>
                          <p className="font-ui text-[9px] tracking-[0.22em] uppercase mb-1" style={{ color: 'rgba(92,74,48,0.5)' }}>
                            {label}
                          </p>
                          <p className="font-times text-base" style={{ color: 'var(--luxury-dark)' }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </motion.div>

                    {/* RERA badge */}
                    {project.rera && (
                      <motion.div {...fU(0.05)}
                        className="flex items-center gap-4 p-5 mb-10"
                        style={{ background: 'rgba(157,134,104,0.06)', border: '1px solid rgba(157,134,104,0.22)' }}>
                        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(157,134,104,0.14)', border: '1px solid rgba(157,134,104,0.28)' }}>
                          <Shield size={17} style={{ color: 'var(--gold)' }} />
                        </div>
                        <div>
                          <p className="font-ui text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--gold-dark)' }}>
                            MahaRERA Registered
                          </p>
                          <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>
                            {project.rera}
                          </p>
                        </div>
                        <CheckCircle2 size={18} className="ml-auto flex-shrink-0" style={{ color: 'var(--gold)' }} />
                      </motion.div>
                    )}

                    {/* Description */}
                    {project.description && (
                      <motion.div {...fU(0.1)} className="mb-12">
                        <span className="section-label block mb-3">About This Project</span>
                        <div className="gold-line" />
                        <h3 className="font-times text-2xl font-normal mb-6" style={{ color: 'var(--luxury-dark)' }}>
                          {project.title}
                        </h3>
                        <div className="space-y-4">
                          {(project.description || '').split(/\n\n+/).filter(Boolean).map((para, i) => (
                            <p key={i} className="font-body text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.86)' }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Highlights */}
                    {project.highlights?.length > 0 && (
                      <motion.div {...fU(0.15)} className="mb-12">
                        <span className="section-label block mb-3">Project Highlights</span>
                        <div className="gold-line" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.highlights.map((h, i) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, x: -12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.38, delay: i * 0.06 }}
                              className="flex items-start gap-3 p-4 bg-white group transition-all duration-250"
                              style={{ border: '1px solid rgba(157,134,104,0.14)', borderLeft: '3px solid var(--gold)' }}
                              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(5,5,5,0.08)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.4)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)' }}
                            >
                              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                                <CheckCircle2 size={11} style={{ color: 'white' }} />
                              </div>
                              <span className="font-body text-sm leading-snug" style={{ color: 'var(--luxury-charcoal)' }}>{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Gallery preview */}
                    {allImages.length > 0 && (
                      <motion.div {...fU(0.2)}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="section-label block mb-2">Photo Gallery</span>
                            <div className="gold-line" style={{ marginBottom: 0 }} />
                          </div>
                          <button
                            onClick={() => setActiveTab('Gallery')}
                            className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                            style={{ color: 'var(--gold-dark)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                          >
                            View All <ChevronRight size={12} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {allImages.slice(0, 3).map((img, i) => (
                            <button key={i} onClick={() => setGalleryIndex(i)}
                              className="relative overflow-hidden group aspect-[4/3]"
                              style={{ border: '1px solid rgba(157,134,104,0.15)' }}>
                              <img src={img?.url || img} alt={img?.caption || `Photo ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                style={{ background: 'rgba(5,5,5,0.42)' }}>
                                <Eye size={20} style={{ color: 'var(--gold)' }} />
                              </div>
                              {i === 2 && allImages.length > 3 && (
                                <div className="absolute inset-0 flex items-center justify-center"
                                  style={{ background: 'rgba(5,5,5,0.62)' }}>
                                  <p className="text-center">
                                    <span className="font-times text-2xl block" style={{ color: 'var(--gold)' }}>+{allImages.length - 3}</span>
                                    <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(243,239,232,0.6)' }}>More</span>
                                  </p>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── GALLERY ──────────────────────────────────── */}
                {activeTab === 'Gallery' && (
                  <motion.div key="gallery" {...tabAnim}>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <span className="section-label block mb-2">Photo Gallery</span>
                        <div className="gold-line" style={{ marginBottom: 0 }} />
                      </div>
                      <span className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase"
                        style={{ color: 'rgba(92,74,48,0.5)' }}>
                        <Camera size={13} /> {allImages.length} Photos
                      </span>
                    </div>

                    {allImages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-24"
                        style={{ border: '1px dashed rgba(157,134,104,0.25)', background: 'white' }}>
                        <Grid2x2 size={36} style={{ color: 'rgba(157,134,104,0.3)', marginBottom: '1rem' }} />
                        <p className="font-times text-xl mb-1" style={{ color: 'var(--luxury-charcoal)' }}>Gallery Coming Soon</p>
                        <p className="font-body text-sm" style={{ color: 'rgba(92,74,48,0.45)' }}>Photos will be added shortly.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {/* Hero image */}
                        <button
                          className="relative w-full overflow-hidden group cursor-zoom-in"
                          style={{ aspectRatio: '16/9' }}
                          onClick={() => setGalleryIndex(0)}
                        >
                          <img src={allImages[0]?.url || allImages[0]} alt="Main"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'rgba(5,5,5,0.38)' }}>
                            <span className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase px-5 py-2.5"
                              style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
                              <Eye size={13} /> View Full Screen
                            </span>
                          </div>
                        </button>

                        {allImages.length > 1 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {allImages.slice(1, 5).map((img, i) => {
                              const isLast = i === 3 && allImages.length > 5
                              return (
                                <button key={i}
                                  className="relative overflow-hidden group cursor-zoom-in aspect-square"
                                  onClick={() => setGalleryIndex(i + 1)}>
                                  <img src={img?.url || img} alt={img?.caption || `Photo ${i + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                  {isLast ? (
                                    <div className="absolute inset-0 flex items-center justify-center"
                                      style={{ background: 'rgba(5,5,5,0.65)' }}>
                                      <p className="text-center">
                                        <span className="font-times text-2xl block" style={{ color: 'var(--gold)' }}>+{allImages.length - 5}</span>
                                        <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(243,239,232,0.6)' }}>More</span>
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      style={{ background: 'rgba(157,134,104,0.22)' }} />
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        )}

                        {allImages.length > 5 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                            {allImages.slice(5).map((img, i) => (
                              <button key={i}
                                className="relative overflow-hidden group cursor-zoom-in aspect-[4/3]"
                                onClick={() => setGalleryIndex(i + 5)}>
                                <img src={img?.url || img} alt={img?.caption || `Photo ${i + 6}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{ background: 'rgba(157,134,104,0.2)' }} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── FLOOR PLANS ──────────────────────────────── */}
                {activeTab === 'Floor Plans' && (
                  <motion.div key="plans" {...tabAnim}>
                    <span className="section-label block mb-2">Floor Plans</span>
                    <div className="gold-line" />

                    {!project.floorPlans?.length ? (
                      <div className="flex flex-col items-center justify-center py-24"
                        style={{ border: '1px dashed rgba(157,134,104,0.25)', background: 'white' }}>
                        <LayoutTemplate size={36} style={{ color: 'rgba(157,134,104,0.3)', marginBottom: '1rem' }} />
                        <p className="font-times text-xl mb-1" style={{ color: 'var(--luxury-charcoal)' }}>Plans Coming Soon</p>
                        <p className="font-body text-sm" style={{ color: 'rgba(92,74,48,0.45)' }}>Floor plans will be added shortly.</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.floorPlans.map((plan, i) => (
                            <button key={plan.id} onClick={() => setActivePlan(i)}
                              className="font-ui text-xs tracking-widest uppercase px-4 py-2.5 transition-all duration-200"
                              style={{
                                background: activePlan === i ? 'var(--luxury-dark)' : 'white',
                                color:      activePlan === i ? 'var(--gold)' : 'var(--luxury-charcoal)',
                                border:     `1px solid ${activePlan === i ? 'var(--luxury-dark)' : 'rgba(92,74,48,0.2)'}`,
                                boxShadow:  activePlan === i ? '0 4px 16px rgba(5,5,5,0.2)' : 'none',
                              }}>
                              {plan.label}
                            </button>
                          ))}
                        </div>

                        {project.floorPlans[activePlan] && (
                          <AnimatePresence mode="wait">
                            <motion.div key={activePlan}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.28 }}
                              className="grid md:grid-cols-2 gap-8 items-start">
                              <button
                                className="relative overflow-hidden group cursor-zoom-in w-full bg-white"
                                onClick={() => setPlanOpen(true)}
                                style={{ border: '1px solid rgba(157,134,104,0.2)' }}>
                                <img
                                  src={project.floorPlans[activePlan].imageUrl}
                                  alt={project.floorPlans[activePlan].label}
                                  className="w-full object-contain max-h-[400px] p-4 transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{ background: 'rgba(5,5,5,0.32)' }}>
                                  <span className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase px-4 py-2"
                                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
                                    <Eye size={12} /> Zoom In
                                  </span>
                                </div>
                              </button>

                              <div className="space-y-5 py-2">
                                <div>
                                  <span className="section-label mb-1 block">Configuration</span>
                                  <p className="font-times" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--luxury-dark)', lineHeight: 1.1 }}>
                                    {project.floorPlans[activePlan].label}
                                  </p>
                                </div>
                                <div className="h-px" style={{ background: 'rgba(157,134,104,0.2)' }} />
                                {project.floorPlans[activePlan].area && (
                                  <div>
                                    <p className="font-ui text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(92,74,48,0.5)' }}>Carpet Area</p>
                                    <p className="font-times text-2xl" style={{ color: 'var(--luxury-charcoal)' }}>
                                      {project.floorPlans[activePlan].area}
                                    </p>
                                  </div>
                                )}
                                {project.floorPlans[activePlan].price && (
                                  <div>
                                    <p className="font-ui text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(92,74,48,0.5)' }}>Starting Price</p>
                                    <p className="font-times text-2xl" style={{ color: 'var(--gold-dark)' }}>
                                      {project.floorPlans[activePlan].price}
                                    </p>
                                  </div>
                                )}
                                <div className="h-px" style={{ background: 'rgba(157,134,104,0.2)' }} />
                                <button onClick={() => setEnquiryOpen(true)} className="btn-gold w-full justify-center">
                                  Enquire About This Unit
                                </button>
                                <p className="font-body text-xs text-center" style={{ color: 'rgba(92,74,48,0.42)' }}>
                                  No commitment required · Free consultation
                                </p>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

                {/* ── AMENITIES ────────────────────────────────── */}
                {activeTab === 'Amenities' && (
                  <motion.div key="amenities" {...tabAnim}>
                    <span className="section-label block mb-2">Amenities</span>
                    <div className="gold-line" />
                    <h3 className="font-times text-2xl font-normal mb-8" style={{ color: 'var(--luxury-dark)' }}>
                      World-Class Living Experiences
                    </h3>

                    {!project.amenities?.length && !amenityImages.length ? (
                      <div className="flex flex-col items-center justify-center py-24"
                        style={{ border: '1px dashed rgba(157,134,104,0.25)', background: 'white' }}>
                        <CheckCircle2 size={36} style={{ color: 'rgba(157,134,104,0.3)', marginBottom: '1rem' }} />
                        <p className="font-times text-xl mb-1" style={{ color: 'var(--luxury-charcoal)' }}>Details Coming Soon</p>
                      </div>
                    ) : (
                      <>
                        {amenityGroups.length > 0 && (
                          <div className="space-y-10">
                            {amenityGroups.map(({ label, items }, gi) => (
                              <div key={label}>
                                <div className="flex items-center gap-4 mb-5">
                                  <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>{label}</p>
                                  <div className="flex-1 h-px" style={{ background: 'rgba(157,134,104,0.18)' }} />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {items.map((amenity, i) => {
                                    const Icon = getAmenityIcon(amenity)
                                    return (
                                      <motion.div key={amenity}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: (gi * 0.04) + i * 0.05 }}
                                        className="flex items-center gap-3 p-4 bg-white transition-all duration-200 group"
                                        style={{ border: '1px solid rgba(157,134,104,0.14)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.4)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,5,5,0.07)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.14)'; e.currentTarget.style.boxShadow = 'none' }}>
                                        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                                          style={{ background: 'linear-gradient(135deg, rgba(157,134,104,0.12), rgba(157,134,104,0.04))', border: '1px solid rgba(157,134,104,0.2)' }}>
                                          <Icon size={15} style={{ color: 'var(--gold)' }} />
                                        </div>
                                        <span className="font-body text-sm leading-tight" style={{ color: 'var(--luxury-charcoal)' }}>
                                          {amenity}
                                        </span>
                                      </motion.div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {amenityImages.length > 0 && (
                          <div className={amenityGroups.length > 0 ? 'mt-10' : ''}>
                            <div className="flex items-center gap-4 mb-5">
                              <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>Amenity Gallery</p>
                              <div className="flex-1 h-px" style={{ background: 'rgba(157,134,104,0.18)' }} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {amenityImages.map((img, i) => (
                                <motion.button
                                  key={img.id || i}
                                  initial={{ opacity: 0, y: 12 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.3, delay: i * 0.06 }}
                                  className="relative overflow-hidden group cursor-zoom-in"
                                  style={{ aspectRatio: '4/3', border: '1px solid rgba(157,134,104,0.15)' }}
                                  onClick={() => setAmenityLightbox(i)}
                                >
                                  <img src={img.url} alt={img.altText || img.caption || 'Amenity'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                    style={{ background: 'rgba(5,5,5,0.42)' }}>
                                    <Eye size={20} style={{ color: 'var(--gold)' }} />
                                  </div>
                                  {img.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2"
                                      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.7), transparent)' }}>
                                      <p className="font-body text-xs text-left" style={{ color: 'rgba(255,255,255,0.9)' }}>{img.caption}</p>
                                    </div>
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Sidebar ─────────────────────────────────────────── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Enquiry card — bright light premium */}
                <motion.div {...fU(0.1)}
                  className="relative overflow-hidden bg-white"
                  style={{ border: '1px solid rgba(157,134,104,0.2)', boxShadow: '0 8px 48px rgba(5,5,5,0.1)' }}>
                  {/* Gold top accent bar */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), var(--gold))' }} />
                  {/* Subtle warm glow */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(157,134,104,0.05) 0%, transparent 65%)' }} />
                  <div className="p-6 relative">
                    <p className="section-label mb-1">Interested in this project?</p>
                    <h3 className="font-times text-2xl font-normal mb-1" style={{ color: 'var(--luxury-dark)' }}>
                      Request a Callback
                    </h3>
                    <div className="w-8 h-px mb-6" style={{ background: 'var(--gold)' }} />

                    {/* Project spec rows */}
                    <div className="mb-6 rounded-none overflow-hidden"
                      style={{ border: '1px solid rgba(157,134,104,0.14)', background: 'var(--cream)' }}>
                      {[
                        { label: 'Project',    value: project.title },
                        { label: 'Location',   value: project.location?.name || project.location },
                        { label: 'Status',     value: isOngoing ? 'Ongoing' : 'Completed' },
                        ...(project.possession ? [{ label: 'Possession', value: project.possession }] : []),
                        ...(project.rera ? [{ label: 'RERA', value: project.rera }] : []),
                      ].map(({ label, value }, idx, arr) => (
                        <div key={label}
                          className="flex items-start justify-between gap-3 px-4 py-3"
                          style={{ borderBottom: idx < arr.length - 1 ? '1px solid rgba(157,134,104,0.12)' : 'none' }}>
                          <span className="font-ui text-[0.58rem] tracking-[0.18em] uppercase flex-shrink-0 mt-0.5"
                            style={{ color: 'rgba(92,74,48,0.5)' }}>
                            {label}
                          </span>
                          <span className="font-body text-sm text-right font-medium" style={{ color: 'var(--luxury-dark)' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Enquire button — premium gold gradient */}
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full flex items-center justify-center gap-2 font-ui uppercase tracking-[0.2em] mb-3 transition-all duration-300"
                      style={{
                        fontSize: '0.62rem',
                        padding: '0.95rem',
                        background: 'linear-gradient(135deg, var(--luxury-dark) 0%, #2C2018 100%)',
                        color: 'var(--gold)',
                        border: '1px solid rgba(157,134,104,0.25)',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #2C2018 0%, var(--luxury-dark) 100%)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,5,5,0.3)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--luxury-dark) 0%, #2C2018 100%)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.25)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      Enquire Now
                    </button>

                    {/* Phone */}
                    <a
                      href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
                      className="flex items-center justify-center gap-2 font-ui text-xs tracking-widest uppercase py-3 w-full transition-all duration-200"
                      style={{ color: 'var(--gold-dark)', border: '1px solid rgba(157,134,104,0.25)', background: 'rgba(157,134,104,0.04)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(157,134,104,0.1)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--luxury-dark)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(157,134,104,0.04)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.25)'; e.currentTarget.style.color = 'var(--gold-dark)' }}>
                      <Phone size={13} /> {SITE_PHONE}
                    </a>
                  </div>
                </motion.div>

                {/* Why Majestique — light premium card */}
                <motion.div {...fU(0.2)} className="bg-white"
                  style={{ border: '1px solid rgba(157,134,104,0.18)', boxShadow: '0 4px 24px rgba(5,5,5,0.06)' }}>
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />
                  <div className="p-6">
                    <p className="font-ui text-[0.62rem] tracking-widest uppercase mb-1" style={{ color: 'var(--gold-dark)' }}>Why Majestique?</p>
                    <div className="w-6 h-px mb-5" style={{ background: 'var(--gold)' }} />
                    <ul className="space-y-3">
                      {[
                        'MahaRERA Registered & Legally Compliant',
                        'Consistent On-Time Delivery Record',
                        'Debt-Free Developer — Zero Financial Risk',
                        'Litigation-Free Properties, Every Project',
                        '30+ Years of Trust, Since 1992',
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                            <CheckCircle2 size={9} style={{ color: 'white' }} />
                          </div>
                          <span className="font-body text-sm leading-snug" style={{ color: 'rgba(26,26,26,0.86)' }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Back link */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-200 px-1"
                  style={{ color: 'var(--gold-dark)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold-dark)')}
                >
                  <ArrowLeft size={13} />
                  View All {isOngoing ? 'Ongoing' : 'Completed'} Projects
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.35),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.2),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 65%)' }} />
        <div className="container-luxury relative text-center max-w-2xl mx-auto">
          <motion.div {...fU()}>
            <p className="font-ui text-[0.62rem] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(157,134,104,0.6)' }}>
              Ready to Move Forward?
            </p>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--beige)' }}>
              Your Majestique Home Awaits
            </h2>
            <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 leading-relaxed" style={{ color: 'rgba(243,239,232,0.45)' }}>
              Connect with our team for a personalized walkthrough, pricing details, and exclusive pre-launch offers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setEnquiryOpen(true)} className="btn-gold transition-transform duration-300 hover:scale-105">
                Schedule a Site Visit
              </button>
              <Link to={backPath} className="btn-outline-gold transition-transform duration-300 hover:scale-105">
                {isOngoing ? 'View All Ongoing' : 'View All Completed'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightboxes */}
      {galleryIndex !== null && (
        <Lightbox
          images={allImages}
          activeIndex={galleryIndex}
          onClose={() => setGalleryIndex(null)}
          onNext={() => setGalleryIndex((i) => (i + 1) % allImages.length)}
          onPrev={() => setGalleryIndex((i) => (i - 1 + allImages.length) % allImages.length)}
        />
      )}

      {planOpen && planImages.length > 0 && (
        <Lightbox
          images={planImages}
          activeIndex={activePlan < planImages.length ? activePlan : 0}
          onClose={() => setPlanOpen(false)}
          onNext={() => setActivePlan((i) => (i + 1) % planImages.length)}
          onPrev={() => setActivePlan((i) => (i - 1 + planImages.length) % planImages.length)}
        />
      )}

      {amenityLightbox !== null && amenityImages.length > 0 && (
        <Lightbox
          images={amenityImages.map((img) => ({ url: img.url, caption: img.caption || img.altText || 'Amenity' }))}
          activeIndex={amenityLightbox}
          onClose={() => setAmenityLightbox(null)}
          onNext={() => setAmenityLightbox((i) => (i + 1) % amenityImages.length)}
          onPrev={() => setAmenityLightbox((i) => (i - 1 + amenityImages.length) % amenityImages.length)}
        />
      )}

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        projectTitle={project.title}
      />

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 p-4 md:hidden"
        style={{ background: 'var(--luxury-dark)', borderTop: '1px solid rgba(157,134,104,0.2)', boxShadow: '0 -8px 32px rgba(5,5,5,0.55)' }}>
        <button onClick={() => setEnquiryOpen(true)} className="btn-gold flex-1 justify-center" style={{ fontSize: '0.62rem', padding: '0.875rem' }}>
          Enquire Now
        </button>
        <a
          href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
          className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ border: '1px solid rgba(157,134,104,0.4)', color: 'var(--gold)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--luxury-dark)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
          aria-label="Call us"
        >
          <Phone size={16} />
        </a>
      </div>
    </>
  )
}

import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CalendarDays, MapPin, ArrowRight, Clock,
  Building2, Eye, Sparkles, Award, Key, Bell,
  Leaf, PartyPopper, Trophy, Users,
} from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import { eventsApi } from '../../services/api'
import { truncate, getImageUrl } from '../../utils/helpers'
import Seo from '../../components/ui/Seo'
import eventsHeroImg from '../../assets/real estate events.jpeg'
import { PAST_EVENTS } from '../../data/pastEvents'

/* ── Animation helpers ───────────────────────────────────────────── */
const fU = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ── Event type meta ─────────────────────────────────────────────── */
const TYPE_META = {
  'Open Day':             { color: '#9d8668', icon: Building2 },
  'Site Preview':         { color: '#2d9d8f', icon: Eye },
  'Grand Launch':         { color: '#6b5ea8', icon: Sparkles },
  'Award Ceremony':       { color: '#c4962a', icon: Award },
  'Handover':             { color: '#2d7a4a', icon: Key },
  'CSR Initiative':       { color: '#2d9d6b', icon: Leaf },
  'Festive Celebration':  { color: '#d0703c', icon: PartyPopper },
  'Team Culture':         { color: '#3d6baa', icon: Trophy },
  'Channel Partner Meet': { color: '#7a3fa0', icon: Users },
  'Event':                { color: '#9d8668', icon: CalendarDays },
}

/* ── Date badge helper ───────────────────────────────────────────── */
function DateBadge({ dateStr, large = false }) {
  const d = new Date(dateStr)
  const day = d.getDate()
  const month = d.toLocaleString('en-IN', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        background: 'white',
        border: '2px solid var(--gold)',
        width: large ? '80px' : '62px',
        padding: large ? '10px 8px' : '6px 8px',
        boxShadow: '0 4px 16px rgba(157,134,104,0.18)',
      }}
    >
      <span
        className="font-times leading-none"
        style={{ fontSize: large ? '2.4rem' : '1.7rem', color: 'var(--luxury-dark)', lineHeight: 1 }}
      >
        {day}
      </span>
      <span
        className="font-ui tracking-widest uppercase block"
        style={{ fontSize: '0.48rem', color: 'var(--gold)', marginTop: '2px' }}
      >
        {month}
      </span>
      <span
        className="font-ui block"
        style={{ fontSize: '0.44rem', color: 'rgba(44,62,88,0.45)', marginTop: '1px' }}
      >
        {year}
      </span>
    </div>
  )
}

/* ── Featured Event Card (horizontal, large) ─────────────────────── */
function FeaturedEventCard({ event }) {
  const meta = TYPE_META[event.type] || TYPE_META['Event']
  const TypeIcon = meta.icon
  const imgSrc = getImageUrl(event.coverImage, event.gallery?.[0])

  return (
    <motion.article
      {...fU()}
      className="group overflow-hidden"
      style={{
        background: 'white',
        border: '1px solid rgba(157,134,104,0.18)',
        boxShadow: '0 8px 48px rgba(5,5,5,0.09)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 24px 72px rgba(5,5,5,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 48px rgba(5,5,5,0.09)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Gold top rule */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--gold), var(--gold-dark), transparent)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image */}
        <div className="lg:col-span-2 relative overflow-hidden" style={{ minHeight: '320px', background: '#f0ede8' }}>
          <img
            src={imgSrc}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,5,0.32) 0%, transparent 60%)' }} />
          {/* Date badge bottom-left */}
          <div className="absolute bottom-5 left-5">
            <DateBadge dateStr={event.startDate} large />
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
          {/* Type + Featured label */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="flex items-center gap-1.5 font-ui text-[0.48rem] tracking-[0.24em] uppercase px-2.5 py-1"
              style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}30` }}
            >
              <TypeIcon size={9} /> {event.type}
            </span>
            <span className="font-ui text-[0.46rem] tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.5)' }}>
              Featured
            </span>
          </div>

          <h2
            className="font-times font-normal leading-snug mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--luxury-dark)', letterSpacing: '0.005em' }}
          >
            {event.title}
          </h2>

          <div className="flex flex-col gap-2 mb-5">
            <span className="flex items-center gap-2 font-body text-sm" style={{ color: 'rgba(26,26,26,0.84)' }}>
              <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              {event.location}
            </span>
            {event.time && (
              <span className="flex items-center gap-2 font-body text-sm" style={{ color: 'rgba(26,26,26,0.84)' }}>
                <Clock size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                {event.time}
              </span>
            )}
          </div>

          <p className="font-body text-sm leading-relaxed mb-7" style={{ color: 'rgba(26,26,26,0.84)', lineHeight: 1.8, maxWidth: '520px' }}>
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {event.slug ? (
              <Link
                to={`/media/events/${event.slug}`}
                className="inline-flex items-center gap-2 font-ui text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                style={{ padding: '0.85rem 2rem', background: 'var(--luxury-dark)', color: '#fff', border: '1px solid var(--luxury-dark)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--luxury-dark)'; e.currentTarget.style.borderColor = 'var(--luxury-dark)' }}
              >
                View Details <ArrowRight size={13} />
              </Link>
            ) : (
              <span className="font-ui text-[0.46rem] tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.5)' }}>
                {event.type}
              </span>
            )}
            {event.capacity && (
              <span className="flex items-center gap-2 font-ui text-[0.48rem] tracking-widest uppercase px-3" style={{ color: 'rgba(44,62,88,0.4)', border: '1px solid rgba(157,134,104,0.2)' }}>
                {event.capacity}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Standard Event Card ─────────────────────────────────────────── */
function EventCard({ event, index }) {
  const meta = TYPE_META[event.type] || TYPE_META['Event']
  const TypeIcon = meta.icon
  const imgSrc = getImageUrl(event.coverImage, event.gallery?.[0])
  const hasDetail = Boolean(event.slug)

  const inner = (
    <>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#f0ede8', flexShrink: 0 }}>
        <img
          src={imgSrc}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.22) 100%)' }} />
        {/* Date badge */}
        <div className="absolute top-3 left-3">
          <DateBadge dateStr={event.startDate} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Type + location row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="flex items-center gap-1 font-ui text-[0.46rem] tracking-[0.2em] uppercase px-2 py-0.5"
            style={{ background: `${meta.color}14`, color: meta.color, border: `1px solid ${meta.color}28` }}
          >
            <TypeIcon size={8} /> {event.type}
          </span>
          {event.location && (
            <span className="flex items-center gap-1 font-ui text-[0.44rem] tracking-widest" style={{ color: 'rgba(44,62,88,0.42)' }}>
              <MapPin size={8} style={{ color: 'var(--gold)' }} /> {event.location}
            </span>
          )}
        </div>

        <h3
          className="font-times font-normal leading-snug mb-2 flex-1"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.12rem)', color: 'var(--luxury-dark)', letterSpacing: '0.005em' }}
        >
          {event.title}
        </h3>

        {event.time && (
          <span className="flex items-center gap-1.5 font-body text-xs mb-3" style={{ color: 'rgba(44,62,88,0.5)' }}>
            <Clock size={10} style={{ color: 'var(--gold)' }} /> {event.time}
          </span>
        )}

        {event.description && (
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,26,26,0.84)', fontSize: '0.82rem', lineHeight: 1.72 }}>
            {truncate(event.description, 110)}
          </p>
        )}

        <div className="pt-3 mt-auto flex items-center justify-between" style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}>
          <span className="font-ui text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--luxury-dark)' }}>
            {hasDetail ? 'View Details' : event.type}
          </span>
          {hasDetail && (
            <span
              className="w-7 h-7 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--gold)]"
              style={{ background: 'var(--luxury-dark)' }}
            >
              <ArrowRight size={12} color="white" />
            </span>
          )}
        </div>
      </div>
    </>
  )

  const wrapperProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
    className: 'group flex flex-col overflow-hidden bg-white',
    style: {
      border: '1px solid rgba(157,134,104,0.14)',
      boxShadow: '0 2px 16px rgba(5,5,5,0.05)',
      transition: 'box-shadow 0.35s ease, transform 0.35s ease',
    },
    onMouseEnter: e => { e.currentTarget.style.boxShadow = '0 18px 56px rgba(5,5,5,0.11)'; e.currentTarget.style.transform = 'translateY(-5px)' },
    onMouseLeave: e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' },
  }

  if (hasDetail) {
    return (
      <motion.article {...wrapperProps}>
        <Link to={`/media/events/${event.slug}`} className="contents">{inner}</Link>
      </motion.article>
    )
  }

  return <motion.article {...wrapperProps}>{inner}</motion.article>
}

/* ── Skeleton ────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="overflow-hidden bg-white" style={{ border: '1px solid rgba(157,134,104,0.1)' }}>
      <div className="skeleton w-full" style={{ aspectRatio: '16/9' }} />
      <div className="p-5">
        <div className="skeleton h-3 w-28 mb-3 rounded" />
        <div className="skeleton h-5 w-full mb-2 rounded" />
        <div className="skeleton h-4 w-3/4 mb-4 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  )
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function Events() {
  const [adminEvents, setAdminEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState('all')

  useEffect(() => {
    eventsApi
      .getAll({ limit: 50 })
      .then(res => setAdminEvents(res.data?.events || []))
      .catch(() => setAdminEvents([]))
      .finally(() => setLoading(false))
  }, [])

  // Admin-added events first, then the historical archive — whole feed sorted newest-first by date
  const allEvents = useMemo(() => {
    return [...adminEvents, ...PAST_EVENTS].sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )
  }, [adminEvents])

  const years = useMemo(() => {
    const ys = [...new Set(allEvents.map(e => new Date(e.startDate).getFullYear()))]
    return ys.sort((a, b) => b - a)
  }, [allEvents])

  const filteredEvents = useMemo(() => {
    if (selectedYear === 'all') return allEvents
    return allEvents.filter(e => new Date(e.startDate).getFullYear() === Number(selectedYear))
  }, [allEvents, selectedYear])

  const featuredEvent = filteredEvents[0]
  const gridEvents = filteredEvents.slice(1)

  return (
    <>
      <Seo
        title="Events — Launches, Ceremonies & Celebrations | Majestique Landmarks"
        description="Explore Majestique Landmarks' project launches, ceremonies, CSR initiatives, and community celebrations across Pune."
      />

      <PageHero
        label="Media"
        title="Events"
        subtitle="Open days, grand launches, handover ceremonies, and community celebrations — experience Majestique Landmarks up close."
        breadcrumbs={[{ label: 'Media', href: '/media/events' }, { label: 'Events' }]}
        bgImage={eventsHeroImg}
      />

      {/* ── Stats Band ───────────────────────────────────────────── */}
      <section className="py-11 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9d8668 0%, #c4a455 28%, #d4b465 55%, #b89050 80%, #9d8668 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(255,230,130,0.2) 0%, transparent 55%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/20">
            {[
              { v: '50+',    l: 'Events Hosted' },
              { v: '18K+',   l: 'Families Attended' },
              { v: '30+',    l: 'Project Launches' },
              { v: '5+',     l: 'Award Ceremonies' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.09 }}
                className="text-center py-8 px-4"
              >
                <p className="font-times font-normal leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff' }}>{s.v}</p>
                <div className="w-6 h-px mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.35)' }} />
                <p className="font-ui text-[0.48rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events Section ────────────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="container-luxury">

          {/* Section header */}
          <div className="mb-10 text-center">
            <SectionHeader
              label="Our Events"
              title={<>All <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Events</em></>}
              subtitle="Launches, ceremonies, CSR initiatives, and celebrations — every moment that brings the Majestique family together."
              align="center"
            />
          </div>

          {/* ── Year filter dropdown ── */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="font-ui text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Filter by Year
            </span>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="font-ui text-xs tracking-[0.12em] uppercase appearance-none pr-9 pl-4 py-3 cursor-pointer outline-none transition-all duration-300"
                style={{
                  background: 'white',
                  color: 'var(--ink)',
                  border: '1px solid rgba(157,134,104,0.40)',
                  minWidth: '130px',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(157,134,104,0.40)')}
              >
                <option value="all">All Years</option>
                {years.map(yr => (
                  <option key={yr} value={String(yr)}>{yr}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {selectedYear !== 'all' && (
              <span className="font-ui text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(157,134,104,0.6)' }}>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <CalendarDays size={44} className="mx-auto mb-5" style={{ color: 'rgba(157,134,104,0.25)' }} />
              <p className="font-times text-2xl mb-2" style={{ color: 'rgba(44,62,88,0.45)' }}>
                {selectedYear === 'all' ? 'No events to display yet.' : `No events found for ${selectedYear}.`}
              </p>
            </div>
          ) : (
            <>
              {featuredEvent && (
                <div className="mb-10">
                  <FeaturedEventCard event={featuredEvent} />
                </div>
              )}

              {gridEvents.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {gridEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Event Types Strip ─────────────────────────────────────── */}
      <section className="py-14 relative" style={{ background: 'white' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.18),transparent)' }} />
        <div className="container-luxury">
          <motion.p {...fU()} className="font-ui font-black text-[0.875rem] tracking-[0.35em] uppercase text-center mb-10" style={{ color: 'rgba(157,134,104,0.6)' }}>
            Types of Majestique Events
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(TYPE_META).filter(([name]) => name !== 'Event').map(([name, { color, icon: Icon }], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-5 text-center"
                style={{ border: '1px solid rgba(157,134,104,0.13)', background: 'var(--cream)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ background: `${color}14`, border: `1px solid ${color}28` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(26,26,26,0.84)' }}>{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.06) 0%, transparent 70%)' }} />
        {/* Corner brackets */}
        {[['top-6 left-6','border-l border-t'],['top-6 right-6','border-r border-t'],['bottom-6 left-6','border-l border-b'],['bottom-6 right-6','border-r border-b']].map(([pos,bdr]) => (
          <div key={pos} className={`absolute ${pos} w-10 h-10 ${bdr} opacity-20`} style={{ borderColor: 'var(--gold)' }} />
        ))}
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(157,134,104,0.1)', border: '1px solid rgba(157,134,104,0.25)' }}>
              <Bell size={20} style={{ color: 'var(--gold)' }} />
            </div>
            <span className="section-label block mb-3">Stay In The Loop</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: 'var(--luxury-dark)' }}>
              Never Miss a Majestique Event
            </h2>
            <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Register your interest and be the first to hear about our latest launches,
              celebrations, and milestones at Majestique Landmarks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-gold">Register Your Interest</Link>
              <Link to="/projects/ongoing" className="btn-outline-dark">Explore Projects</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

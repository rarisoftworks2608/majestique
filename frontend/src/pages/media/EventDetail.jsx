import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, MapPin, Clock, ExternalLink, Images, ZoomIn } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import Lightbox from '../../components/ui/Lightbox'
import { eventsApi } from '../../services/api'
import { formatDate, getImageUrl } from '../../utils/helpers'
import Seo from '../../components/ui/Seo'
import { PAST_EVENTS } from '../../data/pastEvents'

function EventDetailSkeleton() {
  return (
    <div className="container-luxury py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="skeleton w-full mb-8 rounded" style={{ height: '360px' }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-4 w-full mb-3 rounded" style={{ width: i % 3 === 2 ? '65%' : '100%' }} />
          ))}
        </div>
        <div>
          <div className="skeleton h-64 rounded mb-4" />
          <div className="skeleton h-12 rounded" />
        </div>
      </div>
    </div>
  )
}

export default function EventDetail() {
  const { slug } = useParams()
  const localEvent = useMemo(() => PAST_EVENTS.find(e => e.slug === slug), [slug])

  const [apiEvent, setApiEvent] = useState(null)
  const [loading, setLoading] = useState(!localEvent)
  const [notFound, setNotFound] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const event = localEvent || apiEvent

  useEffect(() => {
    if (localEvent) return // already resolved synchronously from local data
    setLoading(true)
    setNotFound(false)
    eventsApi.getBySlug(slug)
      .then((res) => {
        const data = res.data?.event
        if (!data) { setNotFound(true); return }
        setApiEvent(data)
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [slug, localEvent])

  if (loading) return (
    <div style={{ background: 'var(--cream)' }}>
      <div className="min-h-[340px]" style={{ background: 'var(--luxury-dark2)' }} />
      <EventDetailSkeleton />
    </div>
  )

  if (notFound || !event) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="text-center">
        <CalendarDays size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
        <h1 className="font-times text-3xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Event not found</h1>
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.82)' }}>This event doesn't exist or is no longer available.</p>
        <Link to="/media/events" className="btn-outline-gold">← View All Events</Link>
      </div>
    </div>
  )

  const gallery = event.gallery && event.gallery.length > 0 ? event.gallery : null
  const heroImage = gallery ? gallery[0] : (event.coverImage ? getImageUrl(event.coverImage) : undefined)

  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : null
  const isUpcoming = startDate > new Date()

  return (
    <>
      <Seo
        title={event.title}
        description={event.description ? event.description.replace(/<[^>]+>/g, '').slice(0, 160) : `${event.title} — Majestique Landmarks event in ${event.location || 'Pune'}.`}
        image={heroImage}
      />
      <PageHero
        title={event.title}
        subtitle={event.location}
        breadcrumb={['Home', 'Media', 'Events', event.title]}
        bgImage={heroImage}
      />

      <div style={{ background: 'var(--cream)' }}>
        <div className="container-luxury py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {heroImage && (
                <motion.div
                  className="w-full overflow-hidden mb-6"
                  style={{ aspectRatio: '16/7' }}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={heroImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* Photo gallery grid */}
              {gallery && gallery.length > 1 && (
                <div className="mb-8">
                  <p className="flex items-center gap-2 font-ui text-[0.55rem] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(157,134,104,0.6)' }}>
                    <Images size={12} /> {gallery.length} Photos
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {gallery.map((img, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="relative overflow-hidden group"
                        style={{ aspectRatio: '4/3', background: '#f0ede8' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.5) }}
                      >
                        <img
                          src={img}
                          alt={`${event.title} — photo ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'rgba(5,5,5,0.35)' }}
                        >
                          <ZoomIn size={18} color="white" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <div className="gold-line mb-6" />

              {event.description && (
                <div
                  className="font-body text-base leading-relaxed event-content"
                  style={{ color: 'rgba(30,22,14,0.8)' }}
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              )}

              <div
                className="flex items-start sm:items-center mt-12 pt-8"
                style={{ borderTop: '1px solid rgba(157,134,104,0.2)' }}
              >
                <Link
                  to="/media/events"
                  className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: 'var(--gold-dark)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                >
                  <ArrowLeft size={14} /> All Events
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div
                className="p-6 mb-6"
                style={{
                  background: 'var(--luxury-dark)',
                  border: '1px solid rgba(157,134,104,0.2)',
                }}
              >
                <h3 className="font-ui text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--gold)' }}>
                  Event Details
                </h3>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <CalendarDays size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p className="font-ui text-xs tracking-wider uppercase mb-0.5" style={{ color: 'rgba(243,239,232,0.45)' }}>Date</p>
                      <p className="font-body text-sm" style={{ color: 'var(--beige)' }}>{formatDate(event.startDate)}</p>
                    </div>
                  </motion.div>

                  {endDate && (
                    <motion.div
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.32 }}
                    >
                      <Clock size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p className="font-ui text-xs tracking-wider uppercase mb-0.5" style={{ color: 'rgba(243,239,232,0.45)' }}>Ends</p>
                        <p className="font-body text-sm" style={{ color: 'var(--beige)' }}>{formatDate(event.endDate)}</p>
                      </div>
                    </motion.div>
                  )}

                  {event.location && (
                    <motion.div
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.39 }}
                    >
                      <MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p className="font-ui text-xs tracking-wider uppercase mb-0.5" style={{ color: 'rgba(243,239,232,0.45)' }}>Location</p>
                        <p className="font-body text-sm" style={{ color: 'var(--beige)' }}>{event.location}</p>
                      </div>
                    </motion.div>
                  )}

                  {isUpcoming && (
                    <div className="pt-1">
                      <span
                        className="evd-upcoming-pulse inline-block font-ui text-xs font-bold tracking-widest uppercase px-3 py-1.5"
                        style={{ background: 'var(--gold)', color: 'var(--luxury-dark)' }}
                      >
                        Upcoming Event
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {isUpcoming && (
                <Link to="/contact" className="btn-gold w-full justify-center">
                  <ExternalLink size={14} />
                  RSVP / Enquire
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {gallery && lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex(i => (i + 1) % gallery.length)}
          onPrev={() => setLightboxIndex(i => (i - 1 + gallery.length) % gallery.length)}
        />
      )}

      <style>{`
        .event-content p { margin-bottom: 1.25rem; }
        .event-content h2, .event-content h3 {
          font-family: var(--font-heading);
          font-weight: normal;
          color: var(--luxury-dark);
          margin: 1.5rem 0 0.75rem;
        }
        .event-content ul, .event-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .event-content li { margin-bottom: 0.4rem; }
        .event-content strong { font-weight: 600; }
        .evd-upcoming-pulse { animation: evdPulse 2.4s ease-out infinite; }
        @keyframes evdPulse {
          0%   { box-shadow: 0 0 0 0 rgba(157,134,104,0.45); }
          70%  { box-shadow: 0 0 0 9px rgba(157,134,104,0); }
          100% { box-shadow: 0 0 0 0 rgba(157,134,104,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .evd-upcoming-pulse { animation: none !important; }
        }
      `}</style>
    </>
  )
}

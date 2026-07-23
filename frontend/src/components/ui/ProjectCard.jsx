import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Maximize2, Users, CalendarDays, Star } from 'lucide-react'
import { getImageUrl } from '../../utils/helpers'

export default function ProjectCard({ project, index = 0, featured = false }) {
  const { slug, title, tagline, status, coverImage, category, area, units, possession } = project
  const location = project.location?.name || project.location

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.09, 0.45), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-luxury overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: featured ? '16/9' : '4/3' }}>
        <img
          src={getImageUrl(coverImage, '/images/project-placeholder.jpg')}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Shine sweep on hover */}
        <div className="proj-card-shine absolute inset-0 pointer-events-none" aria-hidden />

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className={`${status === 'ONGOING' ? 'proj-status-pulse' : ''} font-ui text-xs font-bold tracking-widest uppercase px-3 py-1.5`}
            style={{
              background: status === 'ONGOING' ? 'var(--gold)' : 'var(--luxury-dark)',
              color: status === 'ONGOING' ? 'var(--luxury-dark)' : 'var(--gold-light)',
              border: status === 'COMPLETED' ? '1px solid rgba(157,134,104,0.4)' : 'none',
            }}
          >
            {status === 'ONGOING' ? 'Ongoing' : 'Completed'}
          </span>

          {project.featured && (
            <span
              className="flex items-center gap-1 font-ui text-xs font-bold tracking-widest uppercase px-2.5 py-1.5"
              style={{ background: 'var(--luxury-dark)', color: 'var(--gold)', border: '1px solid rgba(157,134,104,0.4)' }}
            >
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        {/* Category */}
        {category && (
          <div className="absolute top-4 right-4">
            <span
              className="font-ui text-xs tracking-widest uppercase px-3 py-1.5"
              style={{
                background: 'rgba(26,18,9,0.8)',
                color: 'rgba(243,239,232,0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <Link
          to={`/projects/${slug}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'rgba(26,18,9,0.62)' }}
        >
          <span
            className="font-ui text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--luxury-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
          >
            View Project
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-2 mb-1">
          <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
          <span className="font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(92,74,48,0.7)' }}>
            {location}
          </span>
        </div>

        <h3
          className="font-times font-normal text-xl mb-2 leading-snug transition-colors duration-300 group-hover:text-gold"
          style={{ color: 'var(--luxury-dark)' }}
        >
          {title}
        </h3>

        {tagline && (
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'rgba(10,10,10,0.72)' }}>
            {tagline}
          </p>
        )}

        {/* Metadata chips */}
        {(area || units || possession) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {area && (
              <span className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase px-2.5 py-1"
                style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)', color: 'var(--gold-dark)' }}>
                <Maximize2 size={10} /> {area}
              </span>
            )}
            {units && (
              <span className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase px-2.5 py-1"
                style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)', color: 'var(--gold-dark)' }}>
                <Users size={10} /> {units} Units
              </span>
            )}
            {possession && (
              <span className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase px-2.5 py-1"
                style={{ background: 'rgba(157,134,104,0.08)', border: '1px solid rgba(157,134,104,0.2)', color: 'var(--gold-dark)' }}>
                <CalendarDays size={10} /> {possession}
              </span>
            )}
          </div>
        )}

        <Link
          to={`/projects/${slug}`}
          className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-all duration-300"
          style={{ color: 'var(--gold-dark)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--gold)'
            e.currentTarget.querySelector('svg').style.transform = 'translateX(4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--gold-dark)'
            e.currentTarget.querySelector('svg').style.transform = 'translateX(0)'
          }}
        >
          Explore Project
          <ArrowRight size={13} style={{ transition: 'transform 0.2s' }} />
        </Link>
      </div>
    </motion.div>
  )
}

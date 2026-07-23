import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Navigation } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { SITE_NAME, SITE_PHONE, SITE_ADDRESS, SOCIAL_LINKS } from '../../utils/constants'
import { ONGOING_PROJECTS } from '../../data/ongoingProjects'
import { COMPLETED_PROJECTS } from '../../data/completedProjects'
import logoImg from '../../assets/logos/Majestique_logo.png'
import GoogleReviewsBadge from '../ui/GoogleReviewsBadge'

const SOCIAL_ICONS = {
  facebook:  FaFacebookF,
  instagram: FaInstagram,
  linkedin:  FaLinkedinIn,
  youtube:   FaYoutube,
  twitter:   FaXTwitter,
}

/* ── Ongoing projects link straight to their live microsite subdomain
   (same rule used on the Ongoing Projects page); no microsite → contact form ── */
const ONGOING_PROJECT_LINKS = ONGOING_PROJECTS.map((project) => ({
  label: project.title,
  path: project.url || `/contact?project=${encodeURIComponent(project.title)}`,
  external: Boolean(project.url),
}))

/* ── Completed projects have no live microsite — route to the enquiry form ── */
const COMPLETED_PROJECT_LINKS = [...new Map(COMPLETED_PROJECTS.map((p) => [p.title, p])).values()].map((project) => ({
  label: project.title,
  path: `/contact?project=${encodeURIComponent(project.title)}`,
  external: false,
}))

const MEDIA_LINKS = [
  { label: 'Press Coverage', path: '/media/press-coverage' },
  { label: 'Announcements', path: '/media/announcements' },
  { label: 'Events', path: '/media/events' },
  { label: 'Blogs', path: '/media/blogs' },
  { label: 'Awards', path: '/media/awards' },
  { label: 'Testimonials', path: '/media/testimonials' },
]

const ABOUT_LINKS = [
  { label: 'Our Legacy', path: '/about/legacy' },
  { label: 'Leadership', path: '/about/leadership' },
  { label: 'Milestones', path: '/about/milestones' },
  { label: 'Vision & Mission', path: '/about/vision-mission' },
]

const QUICK_LINKS = [
  { label: 'Contact Us', path: '/contact' },
  { label: 'Channel Partner', path: '/contact?tab=partner' },
  { label: 'Careers', path: '/careers' },
  { label: 'Newsletter', path: '/media/newsletter' },
]

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_ADDRESS)}`

function ColHeading({ children }) {
  return (
    <h4 className="font-ui text-[10px] tracking-[0.2em] uppercase font-bold mb-4" style={{ color: 'var(--gold)' }}>
      {children}
      <div className="mt-2.5" style={{ width: '24px', height: '1px', background: 'var(--gold-dark)' }} />
    </h4>
  )
}

function FooterLinkList({ links }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => {
        const className = "font-body text-xs flex items-center gap-2 transition-all duration-200"
        const style = { color: 'rgba(243,239,232,0.72)' }
        const onMouseEnter = (e) => { e.currentTarget.style.color = 'var(--gold-light)'; e.currentTarget.style.paddingLeft = '6px' }
        const onMouseLeave = (e) => { e.currentTarget.style.color = 'rgba(243,239,232,0.72)'; e.currentTarget.style.paddingLeft = '0' }
        const content = (
          <>
            <span style={{ color: 'rgba(157,134,104,0.4)', fontSize: '0.45rem' }}>◆</span>
            {link.label}
          </>
        )
        return (
          <li key={link.path}>
            {link.external ? (
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {content}
              </a>
            ) : (
              <Link
                to={link.path}
                className={className}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {content}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--luxury-dark)' }}>

      {/* Top gold accent */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(157,134,104,0.6) 30%, rgba(157,134,104,0.9) 50%, rgba(157,134,104,0.6) 70%, transparent 100%)' }} />

      {/* Centered wordmark */}
      <div className="container-luxury pt-12 pb-8 flex flex-col items-center text-center">
        <Link to="/" className="inline-block mb-3 group">
          <img
            src={logoImg}
            alt={SITE_NAME}
            className="h-11 w-auto transition-opacity duration-300 group-hover:opacity-70"
            style={{ mixBlendMode: 'screen' }}
            loading="lazy"
          />
        </Link>
        <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(243,239,232,0.6)', maxWidth: '480px' }}>
          Three decades of crafting landmark residences across Pune — delivered on time, every time.
        </p>
      </div>

      {/* Sitemap grid */}
      <div style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}>
        <div className="container-luxury py-11 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:items-start">

            <div className="lg:col-span-3">
              <ColHeading>Ongoing Projects</ColHeading>
              <FooterLinkList links={ONGOING_PROJECT_LINKS} />
            </div>

            <div className="lg:col-span-3">
              <ColHeading>Completed Projects</ColHeading>
              <FooterLinkList links={COMPLETED_PROJECT_LINKS} />
            </div>

            <div className="lg:col-span-2">
              <ColHeading>Media Center</ColHeading>
              <FooterLinkList links={MEDIA_LINKS} />
            </div>

            <div className="lg:col-span-2">
              <ColHeading>About Us</ColHeading>
              <FooterLinkList links={ABOUT_LINKS} />
            </div>

            <div className="lg:col-span-2">
              <ColHeading>Quick Links</ColHeading>
              <FooterLinkList links={QUICK_LINKS} />
              <GoogleReviewsBadge className="mt-6" />
            </div>

          </div>
        </div>
      </div>

      {/* Get in touch strip */}
      <div style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}>
        <div className="container-luxury py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="flex items-center gap-2">
            <MapPin size={13} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
            <span className="font-body text-xs" style={{ color: 'rgba(243,239,232,0.72)' }}>{SITE_ADDRESS}</span>
          </span>
          <a
            href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
            className="flex items-center gap-2 font-body text-xs transition-colors duration-200"
            style={{ color: 'rgba(243,239,232,0.72)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,232,0.72)')}
          >
            <Phone size={13} style={{ color: 'var(--gold)' }} /> {SITE_PHONE}
          </a>
          <a
            href="mailto:sales@majestiqueproperties.com"
            className="flex items-center gap-2 font-body text-xs transition-colors duration-200"
            style={{ color: 'rgba(243,239,232,0.72)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,232,0.72)')}
          >
            <Mail size={13} style={{ color: 'var(--gold)' }} /> sales@majestiqueproperties.com
          </a>
          <span className="flex items-center gap-2">
            <Clock size={13} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
            <span className="font-body text-xs" style={{ color: 'rgba(243,239,232,0.72)' }}>Mon – Sat, 10:00 AM – 7:00 PM</span>
          </span>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-xs transition-colors duration-200"
            style={{ color: 'rgba(243,239,232,0.72)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,232,0.72)')}
          >
            <Navigation size={12} style={{ color: 'var(--gold)' }} /> Get Directions
          </a>
        </div>
      </div>

      {/* RERA disclaimer */}
      <div style={{ borderTop: '1px solid rgba(157,134,104,0.12)' }}>
        <div className="container-luxury py-3">
          <p className="font-body text-[10px] text-center leading-relaxed" style={{ color: 'rgba(243,239,232,0.32)' }}>
            RERA registration numbers and approvals for each project are available on the respective project page. Renderings and images are indicative and subject to change during construction.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(157,134,104,0.12)', background: 'rgba(5,5,5,0.3)' }}>
        <div className="container-luxury py-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const Icon = SOCIAL_ICONS[platform]
              if (!Icon) return null
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid rgba(243,239,232,0.25)', color: 'rgba(243,239,232,0.85)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(243,239,232,0.85)'; e.currentTarget.style.borderColor = 'rgba(243,239,232,0.25)' }}
                  aria-label={platform}
                >
                  <Icon size={12} />
                </a>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            <p className="font-body text-xs" style={{ color: 'rgba(243,239,232,0.3)' }}>
              © {new Date().getFullYear()} {SITE_NAME} Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms & Conditions', path: '/terms' },
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="font-body text-xs transition-colors duration-200"
                  style={{ color: 'rgba(243,239,232,0.3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,232,0.3)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

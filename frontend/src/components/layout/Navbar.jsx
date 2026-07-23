import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Menu, X, ChevronDown, Phone, Search,
  Building2, CheckCircle2, Hammer, Newspaper,
  CalendarDays, Bell, BookOpen, Mail, Target,
  Award, Users, MessageSquareQuote, ArrowRight,
  MapPin, TrendingUp,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { SITE_NAME, SITE_PHONE, SOCIAL_LINKS } from '../../utils/constants'
import GlobalSearch from '../ui/GlobalSearch'
import GoogleTranslate, { MobileLanguageSelector } from '../ui/GoogleTranslate'
import logoImg from '../../assets/logos/Majestique_logo.png'

/* ── Local preview images for nav hover panels ── */
import imgNavLegacy        from '../../assets/legacy.jpg'
import imgNavLeadership    from '../../assets/business leadership_vertical.jpg'
import imgNavMilestones    from '../../assets/awards.jpg'
import imgNavVision        from '../../assets/Mission_vision.jpg'
import imgNavOngoing       from '../../assets/ongoing_project_vertical.jpg'
import imgNavCompleted     from '../../assets/completed project vertical.jpg'
import imgNavPress         from '../../assets/real-estate-press-relese.jpg'
import imgNavAnnouncements from '../../assets/Announcement_vertical.jpg'
import imgNavEvents        from '../../assets/real estate events vertical.jpg'
import imgNavBlogs         from '../../assets/blogs_vertical.jpg'
import imgNavAwards        from '../../assets/awards & trophy.jpeg'
import imgNavTestimonials  from '../../assets/Testimonials.jpg'
import imgNavNewsletter    from '../../assets/newsletter.jpg'
import imgNavCareers       from '../../assets/Job_Seek.jpg'
import imgNavContact       from '../../assets/Contact-Us-Majestique.jpg'
import imgNavAboutFeatured from '../../assets/legacy in business.jpg'
import imgNavMediaFeatured from '../../assets/awards & trophy.jpeg'

/* ─────────────────────────────────────────────────────────────────────────
   AUMANA Palette — 9-color luxury system
──────────────────────────────────────────────────────────────────────────── */
const P = {
  ivory:   '#F3EFE8',   // Luxury Ivory — primary light
  linen:   '#DDD2C2',   // Soft Warm Beige
  gold:    '#9D8668',   // Gold-Taupe Accent
  smoke:   '#8B7B68',   // Warm Gray Border
  taupe:   '#736452',   // Muted Taupe
  mocha:   '#5C4D3D',   // Deep Mocha
  dark:    '#1A1A1A',   // Charcoal
  black:   '#050505',   // Luxury Black
  // rgba helpers
  ivoryA:  (a) => `rgba(243,239,232,${a})`,
  linenA:  (a) => `rgba(221,210,194,${a})`,
  goldA:   (a) => `rgba(157,134,104,${a})`,
  smokeA:  (a) => `rgba(139,123,104,${a})`,
  taupeA:  (a) => `rgba(115,100,82,${a})`,
  mochaA:  (a) => `rgba(92,77,61,${a})`,
  darkA:   (a) => `rgba(26,26,26,${a})`,
  blackA:  (a) => `rgba(5,5,5,${a})`,
}

/* ─────────────────────────────────────────────────────────────────────────
   NAV CONFIG
──────────────────────────────────────────────────────────────────────────── */
const NAV_CONFIG = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    panel: 'about',
    featured: {
      title: 'Our Heritage',
      subtitle: 'Est. 2002',
      description: 'Two decades of crafting Pune\'s most celebrated addresses — MahaRERA-registered, debt-free, litigation-free.',
      image: imgNavAboutFeatured,
      stats: [
        { value: '22+', label: 'Years' },
        { value: '16+', label: 'Projects' },
        { value: '10K+', label: 'Families' },
      ],
    },
    children: [
      { label: 'Legacy',           path: '/about/legacy',         icon: Building2, desc: 'Our founding story since Est. 2002',          previewImage: imgNavLegacy        },
      { label: 'Leadership',      path: '/about/leadership',     icon: Users,     desc: 'The visionaries behind Majestique',             previewImage: imgNavLeadership    },
      { label: 'Milestones',      path: '/about/milestones',     icon: Award,     desc: 'Awards & achievements across 22 years',        previewImage: imgNavMilestones    },
      { label: 'Vision & Mission', path: '/about/vision-mission', icon: Target,  desc: 'The principles guiding every build we make',    previewImage: imgNavVision        },
    ],
  },
  {
    label: 'Projects',
    path: '/projects',
    panel: 'projects',
    featured: {
      title: 'Evolvus',
      subtitle: 'Featured — Ongoing',
      description: 'A new benchmark in high-rise luxury — premium 2 & 3 BHK residences at Kharadi, Pune.',
      image: imgNavOngoing,
      badge: 'Now Open',
    },
    children: [
      {
        label: 'Ongoing Projects',
        path: '/projects/ongoing',
        icon: Hammer,
        desc: 'Active luxury developments across Pune',
        image: imgNavOngoing,
      },
      {
        label: 'Completed Projects',
        path: '/projects/completed',
        icon: CheckCircle2,
        desc: 'Delivered landmarks — on time, every time',
        image: imgNavCompleted,
      },
    ],
  },
  {
    label: 'Media',
    path: '/media',
    panel: 'media',
    featured: {
      title: 'ET Best Developer',
      subtitle: 'Award · 2024',
      description: 'Recognised by The Economic Times as Pune\'s most trusted real estate developer for the third consecutive year.',
      image: imgNavMediaFeatured,
      badge: 'ET Award 2024',
    },
    children: [
      { label: 'Press Coverage', path: '/media/press-coverage', icon: Newspaper,         desc: 'Media features & editorial interviews',  previewImage: imgNavPress         },
      { label: 'Announcements', path: '/media/announcements', icon: Bell,               desc: 'Official updates & project news',          previewImage: imgNavAnnouncements },
      { label: 'Events',        path: '/media/events',        icon: CalendarDays,       desc: 'Launches, site visits & showcases',        previewImage: imgNavEvents        },
      { label: 'Blogs',         path: '/media/blogs',         icon: BookOpen,           desc: 'Insights on luxury living in Pune',        previewImage: imgNavBlogs         },
      { label: 'Awards',        path: '/media/awards',        icon: Award,              desc: 'Industry honors & recognition awards',     previewImage: imgNavAwards        },
      { label: 'Testimonials',  path: '/media/testimonials',  icon: MessageSquareQuote, desc: 'Stories from our happy residents',         previewImage: imgNavTestimonials  },
      { label: 'Newsletter',    path: '/media/newsletter',    icon: Mail,               desc: 'Subscribe for exclusive updates',          previewImage: imgNavNewsletter    },
    ],
  },
  {
    label: 'Careers',
    path: '/careers',
    mini: {
      title: 'Join Our Team',
      desc: 'Be part of Pune\'s fastest growing luxury real estate brand — rewarding careers await.',
      image: imgNavCareers,
      stat: '500+ Team Members',
    },
  },
  {
    label: 'Contact',
    path: '/contact',
    mini: {
      title: 'Get in Touch',
      desc: 'Our sales team is available 7 days a week to help you find your perfect Majestique home.',
      image: imgNavContact,
      stat: SITE_PHONE,
    },
  },
]

const SOCIAL_ICONS = [
  { key: 'facebook', Icon: FaFacebookF },
  { key: 'instagram', Icon: FaInstagram },
  { key: 'linkedin', Icon: FaLinkedinIn },
  { key: 'youtube', Icon: FaYoutube },
]


const stagger = {
  animate: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/* ─────────────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
──────────────────────────────────────────────────────────────────────────── */
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        height: '2px',
        background: `linear-gradient(90deg, ${P.gold}, ${P.smoke}, ${P.ivory})`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MINI TOOLTIP
──────────────────────────────────────────────────────────────────────────── */
function MiniTooltip({ item, onMouseEnter, onMouseLeave }) {
  const { mini } = item
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-full left-1/2 z-50 mt-1"
      style={{ transform: 'translateX(-50%)', width: '260px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Arrow */}
      <div
        className="mx-auto mb-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: '7px solid rgba(243,239,232,0.99)',
          filter: `drop-shadow(0 -1px 1px ${P.blackA(0.08)})`,
        }}
      />
      <div
        style={{
          background: 'rgba(243,239,232,0.99)',
          border: `1px solid ${P.goldA(0.15)}`,
          boxShadow: `0 24px 56px ${P.blackA(0.18)}, 0 4px 16px ${P.blackA(0.10)}`,
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '110px' }}>
          <img
            src={mini.image}
            alt={mini.title}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ transform: 'scale(1.05)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${P.mochaA(0.68)} 0%, ${P.mochaA(0.08)} 100%)` }}
          />
          <div className="absolute bottom-3 left-3">
            <span
              className="font-ui text-[0.55rem] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: P.gold, color: P.ivory }}
            >
              {mini.stat}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-4">
          <p className="font-display text-[0.9rem] leading-snug mb-1.5" style={{ color: P.mocha }}>
            {mini.title}
          </p>
          <p className="font-body text-[0.7rem] leading-relaxed mb-3" style={{ color: P.smoke }}>
            {mini.desc}
          </p>
          <div className="flex items-center gap-1 font-ui text-[0.6rem] tracking-wider uppercase" style={{ color: P.gold }}>
            Learn More <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MEGA PANEL
──────────────────────────────────────────────────────────────────────────── */
function MegaPanel({ item, onMouseEnter, onMouseLeave, onClose }) {
  const panelVariants = {
    initial: { opacity: 0, y: -10, scaleY: 0.97 },
    animate: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, y: -6, scaleY: 0.97, transition: { duration: 0.18 } },
  }

  return (
    <motion.div
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transformOrigin: 'top center' }}
      className="absolute top-full left-0 right-0 z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Top accent line */}
      <div style={{ height: '1.5px', background: `linear-gradient(90deg, transparent, ${P.gold}, ${P.smoke}, transparent)` }} />

      <div
        style={{
          background: 'rgba(243,239,232,0.99)',
          borderBottom: `1px solid ${P.goldA(0.12)}`,
          boxShadow: `0 40px 80px ${P.blackA(0.18)}, 0 8px 24px ${P.blackA(0.08)}`,
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        }}
      >
        <div className="container-luxury">
          {item.panel === 'about'    && <AboutPanel    item={item} onClose={onClose} />}
          {item.panel === 'projects' && <ProjectsPanel item={item} onClose={onClose} />}
          {item.panel === 'media'    && <MediaPanel    item={item} onClose={onClose} />}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Shared: Dynamic Preview Pane ────────────────────────────────────── */
function PreviewPane({ image, tag, title, desc, extra }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={image}
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: `linear-gradient(170deg, ${P.blackA(0.18)} 0%, ${P.blackA(0.82)} 100%)` }} />

      {/* Corner bracket */}
      <div className="absolute top-5 left-5 w-8 h-8 border-l border-t" style={{ borderColor: P.goldA(0.5) }} />

      <div className="absolute inset-0 flex flex-col justify-end p-7 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {tag && (
              <span className="inline-block font-ui text-[0.52rem] tracking-[0.22em] uppercase px-2.5 py-1 mb-3"
                style={{ background: P.gold, color: P.ivory }}>
                {tag}
              </span>
            )}
            <p className="font-display font-light text-[1.3rem] leading-snug mb-1.5" style={{ color: P.ivoryA(0.96) }}>
              {title}
            </p>
            <p className="font-body text-[0.68rem] leading-relaxed" style={{ color: P.ivoryA(0.48) }}>
              {desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {extra && (
          <AnimatePresence>
            <motion.div
              key="extra"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-4"
            >
              {extra}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

/* ── About Panel ──────────────────────────────────────────────────────── */
function AboutPanel({ item, onClose }) {
  const { featured, children } = item
  const [active, setActive] = useState(null)

  const preview = active
    ? { image: active.previewImage, tag: 'Explore', title: active.label, desc: active.desc }
    : { image: featured.image, tag: featured.subtitle, title: featured.title, desc: featured.description }

  const statsStrip = !active && (
    <div className="grid grid-cols-3 gap-px" style={{ background: P.smokeA(0.25) }}>
      {featured.stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center py-2.5" style={{ background: P.blackA(0.75) }}>
          <span className="font-display text-[1.05rem] leading-none" style={{ color: P.ivory }}>{s.value}</span>
          <span className="font-ui text-[0.5rem] tracking-widest uppercase mt-0.5" style={{ color: P.smokeA(0.55) }}>{s.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex" style={{ minHeight: '360px' }}>
      {/* LEFT: dynamic preview */}
      <div className="shrink-0 relative" style={{ width: '300px' }}>
        <PreviewPane {...preview} extra={statsStrip} />
      </div>

      {/* Thin separator */}
      <div className="self-stretch mx-0 shrink-0" style={{ width: '1px', background: P.goldA(0.10) }} />

      {/* RIGHT: nav list */}
      <div className="flex-1 flex flex-col py-7">
        <p className="font-ui text-[0.55rem] tracking-[0.28em] uppercase px-8 mb-5" style={{ color: P.gold }}>
          Explore About
        </p>

        <div className="flex-1">
          {children.map((child) => {
            const Icon = child.icon
            const isActive = active?.path === child.path
            return (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={onClose}
                onMouseEnter={() => setActive(child)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center gap-4 px-8 py-4 transition-all duration-200"
                style={{ borderBottom: `1px solid ${P.goldA(0.07)}`, background: isActive ? P.goldA(0.04) : 'transparent' }}
              >
                {/* Gold indicator bar */}
                <div style={{ width: '2px', height: '36px', background: isActive ? P.gold : 'transparent', transition: 'background 0.2s', flexShrink: 0 }} />

                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{ border: `1px solid ${isActive ? P.goldA(0.45) : P.goldA(0.18)}`, background: isActive ? P.goldA(0.09) : P.goldA(0.04) }}>
                  <Icon size={13} style={{ color: P.gold }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-[0.82rem] tracking-[0.14em] uppercase mb-1 font-bold transition-colors duration-200"
                    style={{ color: isActive ? P.gold : P.dark }}>
                    {child.label}
                  </p>
                  <p className="font-body text-[0.76rem] truncate" style={{ color: P.smokeA(0.9) }}>
                    {child.desc}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight size={12} style={{ color: P.gold, opacity: isActive ? 1 : 0, transition: 'opacity 0.2s', flexShrink: 0 }} />
              </NavLink>
            )
          })}
        </div>

        <div className="px-8 pt-5 mt-2" style={{ borderTop: `1px solid ${P.goldA(0.08)}` }}>
          <Link to="/about/legacy" onClick={onClose}
            className="inline-flex items-center gap-2 font-ui text-[0.68rem] tracking-[0.2em] uppercase font-semibold transition-colors duration-200"
            style={{ color: P.gold }}
            onMouseEnter={(e) => (e.currentTarget.style.color = P.mocha)}
            onMouseLeave={(e) => (e.currentTarget.style.color = P.gold)}>
            Discover Our Story <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Projects Panel ───────────────────────────────────────────────────── */
function ProjectsPanel({ item, onClose }) {
  const { featured, children } = item
  const [active, setActive] = useState(null)

  const preview = active
    ? { image: active.image, title: active.label, desc: active.desc }
    : { image: featured.image, tag: featured.badge, title: featured.title, desc: featured.description }

  return (
    <div className="flex" style={{ minHeight: '320px' }}>
      {/* LEFT: preview */}
      <div className="shrink-0 relative" style={{ width: '320px' }}>
        <PreviewPane {...preview} />
      </div>

      <div className="self-stretch shrink-0" style={{ width: '1px', background: P.goldA(0.10) }} />

      {/* RIGHT: project types */}
      <div className="flex-1 flex flex-col py-7">
        <p className="font-ui text-[0.55rem] tracking-[0.28em] uppercase px-8 mb-5" style={{ color: P.gold }}>
          Browse Projects
        </p>

        <div className="flex-1 px-8 space-y-3">
          {children.map((child) => {
            const Icon = child.icon
            const isActive = active?.path === child.path
            return (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={onClose}
                onMouseEnter={() => setActive(child)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center overflow-hidden transition-all duration-250"
                style={{ border: `1px solid ${isActive ? P.goldA(0.35) : P.goldA(0.12)}`, background: isActive ? P.goldA(0.04) : 'transparent' }}
              >
                {/* Thumbnail */}
                <div className="relative shrink-0 overflow-hidden" style={{ width: '96px', height: '72px' }}>
                  <img src={child.image} alt={child.label} className="w-full h-full object-cover"
                    style={{ transform: isActive ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s ease' }}
                    loading="lazy" />
                  <div className="absolute inset-0" style={{ background: P.blackA(0.28) }} />
                </div>

                <div className="flex-1 flex items-center px-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={11} style={{ color: P.gold }} />
                      <p className="font-ui text-[0.82rem] tracking-[0.14em] uppercase font-bold" style={{ color: isActive ? P.gold : P.dark }}>
                        {child.label}
                      </p>
                    </div>
                    <p className="font-body text-[0.76rem]" style={{ color: P.smokeA(0.9) }}>{child.desc}</p>
                  </div>
                </div>
              </NavLink>
            )
          })}
        </div>

        <div className="px-8 pt-5 mt-3" style={{ borderTop: `1px solid ${P.goldA(0.08)}` }}>
          <div className="flex items-center gap-5">
            {[{ icon: MapPin, label: '10+ Locations' }, { icon: TrendingUp, label: 'MahaRERA Registered' }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={11} style={{ color: P.gold }} />
                <span className="font-ui text-[0.56rem] tracking-wider uppercase" style={{ color: P.smoke }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Media Panel ──────────────────────────────────────────────────────── */
function MediaPanel({ item, onClose }) {
  const { featured, children } = item
  const [active, setActive] = useState(null)

  const preview = active
    ? { image: active.previewImage, tag: 'Media', title: active.label, desc: active.desc }
    : { image: featured.image, tag: featured.badge, title: featured.title, desc: featured.description }

  return (
    <div className="flex" style={{ minHeight: '340px' }}>
      {/* LEFT: preview */}
      <div className="shrink-0 relative" style={{ width: '280px' }}>
        <PreviewPane {...preview} />
      </div>

      <div className="self-stretch shrink-0" style={{ width: '1px', background: P.goldA(0.10) }} />

      {/* RIGHT: 2-col grid */}
      <div className="flex-1 py-7">
        <p className="font-ui text-[0.55rem] tracking-[0.28em] uppercase px-8 mb-5" style={{ color: P.gold }}>
          Media Centre
        </p>

        <div className="grid grid-cols-2 px-8 gap-0">
          {children.map((child) => {
            const Icon = child.icon
            const isActive = active?.path === child.path
            return (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={onClose}
                onMouseEnter={() => setActive(child)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center gap-3.5 px-4 py-3.5 transition-all duration-200"
                style={{ borderBottom: `1px solid ${P.goldA(0.07)}`, background: isActive ? P.goldA(0.04) : 'transparent' }}
              >
                <div style={{ width: '2px', height: '28px', background: isActive ? P.gold : 'transparent', transition: 'background 0.2s', flexShrink: 0 }} />
                <div className="w-7 h-7 flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{ border: `1px solid ${isActive ? P.goldA(0.4) : P.goldA(0.15)}`, background: isActive ? P.goldA(0.08) : P.goldA(0.03) }}>
                  <Icon size={11} style={{ color: P.gold }} />
                </div>
                <div className="min-w-0">
                  <p className="font-ui text-[0.78rem] tracking-[0.14em] uppercase leading-none mb-1 font-bold transition-colors duration-200"
                    style={{ color: isActive ? P.gold : P.dark }}>
                    {child.label}
                  </p>
                  <p className="font-body text-[0.72rem] truncate" style={{ color: P.smokeA(0.88) }}>{child.desc}</p>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN NAVBAR
──────────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(null)
  const location = useLocation()
  const navRef = useRef(null)
  const dropdownTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close menus/dropdowns on navigation — adjusting state in response to a
     prop change, so it runs during render rather than in an effect
     (see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes) */
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileExpanded(null)
    setScrolled(window.scrollY > 60)
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openDropdown = (label) => {
    clearTimeout(dropdownTimer.current)
    setActiveDropdown(label)
  }
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const isHomePage = location.pathname === '/'
  const transparent = !scrolled && !mobileOpen

  /* Always on dark bg — links full ivory, active stays ivory */
  const navLinkColor = P.ivory

  const activeItem = NAV_CONFIG.find((n) => n.label === activeDropdown)
  const hasMegaPanel = activeItem && (activeItem.panel)

  return (
    <>
      {/* ── Fixed outer wrapper ─────────────────────────────────────── */}
      <div ref={navRef} className="fixed top-0 left-0 right-0 z-50">
        <ProgressBar />

        {/* ── Main nav — solid black always ───────────────────────── */}
        <nav
          style={{
            background: transparent ? P.blackA(0.55) : P.black,
            backdropFilter: transparent ? 'blur(0px)' : 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: transparent ? 'blur(0px)' : 'blur(28px) saturate(180%)',
            borderBottom: `1px solid ${P.smokeA(0.12)}`,
            boxShadow: scrolled ? `0 4px 40px ${P.blackA(0.40)}` : 'none',
            transition: 'background 0.45s ease, box-shadow 0.45s ease',
          }}
        >
          <div className="container-luxury flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src={logoImg}
                alt={SITE_NAME}
                className="h-11 lg:h-13 w-auto transition-opacity duration-300 group-hover:opacity-70"
                style={{ mixBlendMode: 'screen' }}
              />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {NAV_CONFIG.map((link) => {
                const hasDropdown = link.children || link.mini
                const isActive = activeDropdown === link.label
                return (
                  <li
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => hasDropdown && openDropdown(link.label)}
                    onMouseLeave={() => hasDropdown && closeDropdown()}
                  >
                    {link.children ? (
                      <button
                        className="relative flex items-center gap-1.5 px-3 xl:px-4 py-2.5 font-ui text-[0.78rem] font-bold tracking-[0.18em] uppercase"
                        style={{
                          color: navLinkColor,
                          transition: 'color 0.25s',
                          letterSpacing: '0.18em',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = P.gold }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = navLinkColor }}
                      >
                        {link.label}
                        <ChevronDown
                          size={10}
                          style={{
                            transition: 'transform 0.25s ease',
                            transform: isActive ? 'rotate(180deg)' : 'rotate(0)',
                            color: P.goldA(0.85),
                          }}
                        />
                        <span
                          className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4"
                          style={{
                            height: '1.5px',
                            background: `linear-gradient(90deg, ${P.gold}, ${P.linen})`,
                            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </button>
                    ) : link.mini ? (
                      <button
                        className="relative flex items-center gap-1.5 px-3 xl:px-4 py-2.5 font-ui text-[0.78rem] font-bold tracking-[0.18em] uppercase"
                        style={{
                          color: navLinkColor,
                          transition: 'color 0.25s',
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = P.gold }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = navLinkColor }}
                        onClick={() => window.location.href = link.path}
                      >
                        {link.label}
                        <span
                          className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4"
                          style={{
                            height: '1.5px',
                            background: `linear-gradient(90deg, ${P.gold}, ${P.linen})`,
                            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={link.path}
                        className="relative block px-3 xl:px-4 py-2.5 font-ui text-[0.78rem] font-bold tracking-[0.18em] uppercase transition-colors duration-250"
                        style={({ isActive: active }) => ({
                          color: active ? P.gold : navLinkColor,
                        })}
                        onMouseEnter={(e) => { e.currentTarget.style.color = P.gold }}
                        onMouseLeave={(e) => {
                          const active = location.pathname === link.path
                          e.currentTarget.style.color = active ? P.gold : navLinkColor
                        }}
                      >
                        {({ isActive: active }) => (
                          <>
                            {link.label}
                            <span
                              className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4"
                              style={{
                                height: '1.5px',
                                background: `linear-gradient(90deg, ${P.gold}, ${P.linen})`,
                                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left',
                                transition: 'transform 0.3s ease',
                              }}
                            />
                          </>
                        )}
                      </NavLink>
                    )}

                    {/* Mini tooltip for single items */}
                    <AnimatePresence>
                      {isActive && link.mini && (
                        <MiniTooltip
                          key={link.label}
                          item={link}
                          onMouseEnter={() => openDropdown(link.label)}
                          onMouseLeave={closeDropdown}
                        />
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-2 xl:gap-3">
              <GoogleTranslate />

              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex w-9 h-9 items-center justify-center transition-all duration-300 border"
                style={{
                  borderColor: P.smokeA(0.35),
                  color: P.ivoryA(0.85),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = P.gold
                  e.currentTarget.style.color = P.gold
                  e.currentTarget.style.background = P.goldA(0.12)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = P.smokeA(0.35)
                  e.currentTarget.style.color = P.ivoryA(0.85)
                  e.currentTarget.style.background = 'transparent'
                }}
                aria-label="Open search"
              >
                <Search size={15} />
              </button>

              <Link
                to="/contact"
                className="hidden lg:flex btn-gold shrink-0 font-bold tracking-[0.22em]"
                style={{ fontSize: '0.60rem', padding: '0.55rem 1.2rem', letterSpacing: '0.18em', background: '#9D8668', borderColor: '#9D8668', color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#736452'; e.currentTarget.style.borderColor = '#736452' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#9D8668'; e.currentTarget.style.borderColor = '#9D8668' }}
              >
                Enquire Now
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 transition-colors duration-300"
                style={{ color: P.smokeA(0.72) }}
                aria-label="Open search"
              >
                <Search size={18} />
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 transition-colors duration-300"
                style={{ color: P.ivory }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.16 }}>
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.16 }}>
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mega panel ──────────────────────────────────────────── */}
        <AnimatePresence>
          {hasMegaPanel && (
            <MegaPanel
              key={activeDropdown}
              item={activeItem}
              onMouseEnter={() => openDropdown(activeDropdown)}
              onMouseLeave={closeDropdown}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile slide menu — black ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: P.blackA(0.72), backdropFilter: 'blur(6px)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
              style={{
                width: 'min(340px, 90vw)',
                background: P.black,
                backdropFilter: 'blur(24px)',
                borderLeft: `1px solid ${P.smokeA(0.15)}`,
                boxShadow: `-32px 0 80px ${P.blackA(0.45)}`,
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-6 h-20 shrink-0"
                style={{ borderBottom: `1px solid ${P.smokeA(0.12)}` }}
              >
                <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                  <img src={logoImg} alt={SITE_NAME} className="h-9 w-auto"
                    style={{ mixBlendMode: 'screen' }} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center border transition-all duration-200"
                  style={{ borderColor: P.smokeA(0.22), color: P.smoke }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = P.ivory
                    e.currentTarget.style.color = P.ivory
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = P.smokeA(0.22)
                    e.currentTarget.style.color = P.smoke
                  }}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav items */}
              <motion.nav
                variants={stagger}
                initial="initial"
                animate="animate"
                className="flex-1 overflow-y-auto px-4 py-4"
              >
                <motion.a
                  variants={fadeUp}
                  href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 py-4 mb-2 font-ui text-[0.64rem] tracking-widest uppercase"
                  style={{ color: P.smoke, borderBottom: `1px solid ${P.smokeA(0.12)}` }}
                >
                  <Phone size={12} />
                  {SITE_PHONE}
                </motion.a>

                {NAV_CONFIG.map((link) => (
                  <motion.div key={link.path} variants={fadeUp}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpanded((v) => v === link.label ? null : link.label)
                          }
                          className="flex items-center justify-between w-full py-4 font-ui text-[0.64rem] tracking-widest uppercase"
                          style={{ color: P.ivoryA(0.78) }}
                        >
                          {link.label}
                          <ChevronDown
                            size={12}
                            style={{
                              transform: mobileExpanded === link.label ? 'rotate(180deg)' : 'rotate(0)',
                              transition: 'transform 0.22s',
                              color: P.smoke,
                            }}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.24 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-3 space-y-0.5">
                                {link.children.map((child) => {
                                  const Icon = child.icon
                                  return (
                                    <NavLink
                                      key={child.path}
                                      to={child.path}
                                      className="flex items-center gap-3 py-2.5 px-3 font-ui text-[0.61rem] tracking-widest uppercase transition-all duration-200"
                                      style={({ isActive }) => ({
                                        color: isActive ? P.ivory : P.smoke,
                                        background: isActive ? P.goldA(0.15) : 'transparent',
                                      })}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {Icon && <Icon size={11} style={{ color: P.gold, opacity: 0.8 }} />}
                                      {child.label}
                                    </NavLink>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={link.path}
                        className="block py-4 font-ui text-[0.64rem] tracking-widest uppercase transition-colors duration-200"
                        style={({ isActive }) => ({
                          color: isActive ? P.ivory : P.ivoryA(0.72),
                        })}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                    <div className="w-full h-px" style={{ background: P.smokeA(0.10) }} />
                  </motion.div>
                ))}

                <motion.div variants={fadeUp} className="pt-6 pb-2">
                  <Link
                    to="/contact"
                    className="btn-gold w-full justify-center"
                    style={{ fontSize: '0.64rem' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Enquire Now
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <MobileLanguageSelector onAfterSelect={() => setMobileOpen(false)} />
                </motion.div>
              </motion.nav>

              {/* Social links */}
              <div
                className="px-6 py-5 shrink-0"
                style={{ borderTop: `1px solid ${P.smokeA(0.12)}` }}
              >
                <p className="font-ui text-[0.56rem] tracking-widest uppercase mb-3" style={{ color: P.smokeA(0.55) }}>
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {SOCIAL_ICONS.map(({ key, Icon }) => (
                    <a
                      key={key}
                      href={SOCIAL_LINKS[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
                      style={{ borderColor: P.smokeA(0.22), color: P.smoke }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = P.gold
                        e.currentTarget.style.color = P.ivory
                        e.currentTarget.style.borderColor = P.gold
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = P.smoke
                        e.currentTarget.style.borderColor = P.smokeA(0.22)
                      }}
                      aria-label={key}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Page spacer ──────────────────────────────────────────────── */}
      {!isHomePage && <div className="h-20 lg:h-[118px]" aria-hidden="true" />}

      {/* ── Global Search ────────────────────────────────────────────── */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

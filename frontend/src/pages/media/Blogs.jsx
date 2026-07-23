import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, Wallet, Home, Building2, Gem, RefreshCw, ArrowRight, Clock } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import Seo from '../../components/ui/Seo'
import { BLOGS, CATEGORIES } from '../../data/blogs'
import imgHero from '../../assets/blogs.jpg'

const ICON_MAP = { TrendingUp, Wallet, Home, Building2, Gem, RefreshCw }

const EXPLORE_TOPICS = [
  'Pune real estate market insights',
  'Infrastructure & urban growth updates',
  'Investment opportunities',
  'Home-buying guidance',
  'Redevelopment trends',
  'Luxury lifestyle inspiration',
  'Interior & design ideas',
  'RERA & legal awareness',
  'Smart real estate decision-making',
]

const fU = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fL = (d = 0) => ({ initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
const fR = (d = 0) => ({ initial: { opacity: 0, x: 36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.72, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

const [featured, ...rest] = BLOGS

function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-white overflow-hidden flex flex-col"
      style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 2px 20px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s, transform 0.35s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(5,5,5,0.1)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <Link to={`/media/blogs/${blog.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.38) 100%)' }} />
        <span
          className="absolute top-4 left-4 font-ui text-[0.55rem] tracking-widest uppercase px-2.5 py-1"
          style={{ background: blog.categoryColor, color: 'white' }}
        >
          {blog.category}
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 font-body text-xs" style={{ color: 'rgba(44,62,88,0.5)' }}>
          <span className="flex items-center gap-1"><Clock size={11} style={{ color: 'var(--gold)' }} />{blog.readTime}</span>
          <span style={{ color: 'rgba(157,134,104,0.3)' }}>·</span>
          <span>{blog.date}</span>
        </div>
        <h3 className="font-times text-lg leading-snug mb-3 flex-1" style={{ color: 'var(--luxury-dark)' }}>
          <Link to={`/media/blogs/${blog.slug}`} className="hover:opacity-75 transition-opacity">{blog.title}</Link>
        </h3>
        <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'rgba(44,62,88,0.6)' }}>{blog.excerpt}</p>
        <Link
          to={`/media/blogs/${blog.slug}`}
          className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300 mt-auto"
          style={{ color: 'var(--gold-dark)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-dark)' }}
        >
          Read Article <ArrowRight size={12} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function Blogs() {
  return (
    <>
      <Seo
        title="Insights Journal — Real Estate & Living"
        description="Explore Majestique Landmarks' editorial journal — real estate market trends, investment insights, homebuyer guides, infrastructure updates, and luxury lifestyle perspectives for Pune's modern property market."
      />

      <PageHero
        title="Insights That Shape Smarter Real Estate Decisions"
        subtitle="Real Estate Trends, Investment Insights & Urban Living Perspectives from the Majestique Landmarks Journal"
        breadcrumb={['Home', 'Media', 'Blogs']}
        bgImage={imgHero}
      />

      {/* ── Journal Intro ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fL()}>
              <span className="section-label block mb-3">The Journal</span>
              <div className="gold-line" />
              <h2 className="font-times font-normal leading-tight mb-5" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: 'var(--luxury-dark)' }}>
                Knowledge-Driven<br />Real Estate Conversations
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(26,26,26,0.85)' }}>
                <p>Welcome to the Majestique Landmarks Journal — a destination for thoughtfully curated insights on real estate, urban development, lifestyle trends, investment opportunities, and the future of modern living.</p>
                <p>At Majestique Landmarks, we believe informed decisions create better investments and better lifestyles. Our blog platform brings together industry expertise, market trends, and modern living inspiration to help readers navigate the ever-evolving real estate landscape.</p>
              </div>
            </motion.div>

            <motion.div {...fR(0.1)}>
              <div className="p-8" style={{ background: 'var(--cream)', border: '1px solid rgba(157,134,104,0.18)' }}>
                <p className="font-ui text-[0.65rem] tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Explore Topics</p>
                <ul className="space-y-2.5">
                  {EXPLORE_TOPICS.map((topic, i) => (
                    <motion.li
                      key={topic}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                      <span className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.86)' }}>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Insights ─────────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.22),transparent)' }} />
        <div className="container-luxury">
          <div className="mb-14">
            <SectionHeader
              label="Featured Insights"
              title="Perspectives From Our Editorial Team"
              subtitle="Thoughtfully written articles designed to help homeowners, investors, and urban families navigate the real estate landscape with confidence."
            />
          </div>

          {/* Featured hero blog */}
          <motion.article
            {...fU()}
            className="group mb-10 overflow-hidden bg-white"
            style={{ border: '1px solid rgba(157,134,104,0.14)', boxShadow: '0 4px 32px rgba(5,5,5,0.07)', transition: 'box-shadow 0.35s, transform 0.35s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(5,5,5,0.11)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 32px rgba(5,5,5,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <Link to={`/media/blogs/${featured.slug}`} className="lg:col-span-3 relative overflow-hidden block" style={{ minHeight: '320px' }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.1), rgba(5,5,5,0.35))' }} />
                <span
                  className="absolute top-5 left-5 font-ui text-[0.55rem] tracking-widest uppercase px-3 py-1.5"
                  style={{ background: featured.categoryColor, color: 'white' }}
                >
                  {featured.category}
                </span>
                <span
                  className="absolute top-5 right-5 font-ui text-[0.55rem] tracking-widest uppercase px-3 py-1.5"
                  style={{ background: 'rgba(157,134,104,0.85)', color: 'white' }}
                >
                  Featured
                </span>
              </Link>
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 font-body text-xs" style={{ color: 'rgba(44,62,88,0.5)' }}>
                  <span className="flex items-center gap-1"><Clock size={11} style={{ color: 'var(--gold)' }} />{featured.readTime}</span>
                  <span style={{ color: 'rgba(157,134,104,0.3)' }}>·</span>
                  <span>{featured.date}</span>
                </div>
                <h2 className="font-times font-normal leading-snug mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--luxury-dark)' }}>
                  <Link to={`/media/blogs/${featured.slug}`} className="hover:opacity-75 transition-opacity">{featured.title}</Link>
                </h2>
                <p className="font-body text-xs italic mb-4 leading-relaxed" style={{ color: 'rgba(44,62,88,0.5)' }}>{featured.subtitle}</p>
                <div className="w-10 h-px mb-4" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(44,62,88,0.7)' }}>{featured.excerpt}</p>
                <Link
                  to={`/media/blogs/${featured.slug}`}
                  className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300 self-start"
                  style={{ color: 'var(--gold-dark)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                >
                  Read Full Article <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.article>

          {/* Grid of remaining blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore By Topics ─────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'white' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display tracking-widest uppercase" style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', color: 'rgba(157,134,104,0.03)', lineHeight: 1, whiteSpace: 'nowrap' }}>EXPLORE</span>
        </div>
        <div className="container-luxury relative">
          <div className="mb-14 text-center">
            <SectionHeader
              label="Browse Topics"
              title="Explore By Category"
              subtitle="Discover insights curated across the key dimensions of real estate — from market intelligence to luxury lifestyle and investment strategy."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon]
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group p-7 relative overflow-hidden bg-white"
                  style={{ border: '1px solid rgba(157,134,104,0.13)', boxShadow: '0 2px 16px rgba(5,5,5,0.04)', transition: 'box-shadow 0.35s, border-color 0.35s, transform 0.35s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 48px rgba(5,5,5,0.1)'; e.currentTarget.style.borderColor = cat.color + '88'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.04)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.13)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div className="h-0.5 w-full absolute top-0 inset-x-0" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16, delay: i * 0.08 + 0.15 }}
                    className="flex items-center justify-center mb-5"
                    style={{ width: '52px', height: '52px', background: `${cat.color}18`, border: `1px solid ${cat.color}44` }}
                  >
                    {Icon && <Icon size={22} style={{ color: cat.color }} />}
                  </motion.div>
                  <h3 className="font-times text-lg mb-2" style={{ color: 'var(--luxury-dark)' }}>{cat.title}</h3>
                  <div className="w-8 h-px mb-3" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.6)' }}>{cat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.32),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(157,134,104,0.07) 0%, transparent 68%)' }} />
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury text-center relative">
          <motion.div {...fU()}>
            <span className="section-label block mb-3">Stay Informed</span>
            <h2 className="font-times font-normal mb-4" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--luxury-dark)' }}>
              Explore Perspectives That<br />Go Beyond Property
            </h2>
            <div className="w-14 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="font-body text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
              Stay informed with expert-driven articles, market intelligence, and urban living insights designed for modern homeowners, investors, and future-focused communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">Explore Our Projects</Link>
              <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

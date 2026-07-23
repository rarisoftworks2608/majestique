import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import { newsApi } from '../../services/api'
import { formatDate, truncate } from '../../utils/helpers'
import imgHero from '../../assets/Announcement.jpg'

export default function Announcements() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    newsApi.getAll({ page: 1, limit: 12 })
      .then((res) => setArticles(res.data?.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Seo
        title="Announcements — Majestique Landmarks"
        description="Official announcements, project updates, and company news from Majestique Landmarks — Pune's premier luxury real estate developer."
      />
      <PageHero
        label="Media"
        title="Announcements"
        subtitle="Official updates, project milestones, and important news directly from Majestique Landmarks."
        breadcrumbs={[{ label: 'Media', href: '/media/announcements' }, { label: 'Announcements' }]}
        bgImage={imgHero}
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6" style={{ background: 'white', border: '1px solid rgba(157,134,104,0.1)' }}>
                  <div className="skeleton h-3 w-28 mb-3 rounded" />
                  <div className="skeleton h-6 w-3/4 mb-2 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <Bell size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
              <p className="font-display text-2xl mb-3" style={{ color: 'var(--luxury-dark)' }}>
                Announcements coming soon
              </p>
              <p className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.5)' }}>
                Official updates will be published here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group"
                >
                  <Link
                    to={`/media/news/${article.slug}`}
                    className="flex items-start gap-5 p-6 transition-all duration-250"
                    style={{ border: '1px solid rgba(157,134,104,0.1)', background: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(157,134,104,0.35)'
                      e.currentTarget.style.paddingLeft = '1.75rem'
                      e.currentTarget.style.boxShadow = '0 14px 40px rgba(5,5,5,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(157,134,104,0.1)'
                      e.currentTarget.style.paddingLeft = '1.5rem'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      className={`${i === 0 ? 'ann-bell-ring' : ''} w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      style={{ border: '1px solid rgba(157,134,104,0.2)', background: 'rgba(157,134,104,0.04)' }}
                    >
                      <Bell size={14} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="font-ui text-[0.63rem] tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>
                          {formatDate(article.publishedAt)}
                        </p>
                        {i === 0 && (
                          <span className="font-ui text-[0.5rem] font-bold tracking-widest uppercase px-2 py-0.5" style={{ background: 'var(--gold)', color: '#fff' }}>
                            Latest
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg leading-snug mb-1" style={{ color: 'var(--luxury-dark)' }}>
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.82)' }}>
                          {truncate(article.excerpt, 110)}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      style={{ color: 'var(--gold)' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .ann-bell-ring { animation: annBellPulse 2.6s ease-out infinite; }
        @keyframes annBellPulse {
          0%   { box-shadow: 0 0 0 0 rgba(157,134,104,0.35); }
          70%  { box-shadow: 0 0 0 10px rgba(157,134,104,0); }
          100% { box-shadow: 0 0 0 0 rgba(157,134,104,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ann-bell-ring { animation: none !important; }
        }
      `}</style>
    </>
  )
}

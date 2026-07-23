import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import { newsApi } from '../../services/api'
import { formatDate, getImageUrl } from '../../utils/helpers'
import Seo from '../../components/ui/Seo'

function ArticleSkeleton() {
  return (
    <div className="container-luxury py-16">
      <div className="max-w-3xl mx-auto">
        <div className="skeleton h-4 w-32 mb-6 rounded" />
        <div className="skeleton h-10 w-full mb-3 rounded" />
        <div className="skeleton h-10 w-4/5 mb-8 rounded" />
        <div className="skeleton w-full mb-8 rounded" style={{ height: '320px' }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-4 w-full mb-3 rounded" style={{ width: i % 3 === 2 ? '70%' : '100%' }} />
        ))}
      </div>
    </div>
  )
}

export default function NewsDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    newsApi.getBySlug(slug)
      .then((res) => {
        const data = res.data?.article
        if (!data) { setNotFound(true); return }
        setArticle(data)
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ background: 'var(--cream)' }}>
      <div className="min-h-[340px] relative" style={{ background: 'var(--luxury-dark2)' }}>
        <div className="skeleton absolute inset-0 opacity-30" />
      </div>
      <ArticleSkeleton />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="text-center">
        <Newspaper size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
        <h1 className="font-times text-3xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Article not found</h1>
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.82)' }}>The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/media/news" className="btn-outline-gold">← Back to News</Link>
      </div>
    </div>
  )

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt || `${article.title} — Read the latest news from Majestique Landmarks, Pune's premier luxury real estate developer.`}
        image={article.coverImage ? getImageUrl(article.coverImage) : undefined}
      />
      <PageHero
        title={article.title}
        breadcrumb={['Home', 'Media', 'News', article.title]}
        bgImage={getImageUrl(article.coverImage)}
      />

      <div style={{ background: 'var(--cream)' }}>
        <div className="container-luxury py-16">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">News</span>
              <span style={{ color: 'rgba(157,134,104,0.4)' }}>·</span>
              <span className="flex items-center gap-1.5 font-body text-sm" style={{ color: 'rgba(26,26,26,0.82)' }}>
                <Calendar size={13} style={{ color: 'var(--gold-dark)' }} />
                {formatDate(article.publishedAt)}
              </span>
            </motion.div>

            {/* Cover image */}
            {article.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden mb-10"
                style={{ aspectRatio: '16/7' }}
              >
                <img
                  src={getImageUrl(article.coverImage)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Gold divider */}
            <div className="gold-line mb-8" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-body text-base leading-relaxed news-content"
              style={{ color: 'rgba(30,22,14,0.8)' }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Bottom nav */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(157,134,104,0.2)' }}
            >
              <Link
                to="/media/news"
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
              >
                <ArrowLeft size={14} /> Back to News
              </Link>
              <Link
                to="/projects/ongoing"
                className="btn-gold transition-transform duration-300 hover:scale-105"
                style={{ fontSize: '0.75rem', padding: '0.625rem 1.5rem' }}
              >
                Explore Our Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .news-content h1, .news-content h2, .news-content h3 {
          font-family: var(--font-heading);
          font-weight: normal;
          color: var(--luxury-dark);
          margin: 1.5rem 0 0.75rem;
          line-height: 1.3;
        }
        .news-content h2 { font-size: 1.625rem; }
        .news-content h3 { font-size: 1.25rem; }
        .news-content p { margin-bottom: 1.25rem; }
        .news-content ul, .news-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .news-content li { margin-bottom: 0.4rem; }
        .news-content a { color: var(--gold-dark); text-decoration: underline; }
        .news-content strong { font-weight: 600; color: var(--luxury-dark); }
        .news-content blockquote {
          border-left: 3px solid var(--gold);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(44,62,88,0.7);
        }
      `}</style>
    </>
  )
}

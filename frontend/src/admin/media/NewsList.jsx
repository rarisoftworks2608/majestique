import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { newsApi } from '../../services/api'
import { formatDate } from '../../utils/helpers'

export default function NewsList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    newsApi.getAll({ limit: 100 })
      .then((res) => setArticles(res.data?.articles || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    setDeletingId(id)
    try {
      await newsApi.delete(id)
      setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch {
      alert('Failed to delete article.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>News Articles</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>{articles.length} articles</p>
        </div>
        <Link to="/admin/news/new" className="btn-gold flex items-center gap-2" style={{ fontSize: '0.75rem', padding: '0.625rem 1.25rem' }}>
          <Plus size={14} /> Add Article
        </Link>
      </div>

      <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              <div className="flex-1"><div className="skeleton h-4 w-56 mb-1 rounded" /><div className="skeleton h-3 w-24 rounded" /></div>
              <div className="skeleton h-5 w-16 rounded" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
          ))
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-sm" style={{ color: 'rgba(60,48,40,0.45)' }}>No articles yet. <Link to="/admin/news/new" style={{ color: 'var(--gold-dark)' }}>Write one</Link>.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: '#fdf9f4' }}>
                {['Title', 'Status', 'Published Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(60,48,40,0.45)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={article.id} style={{ borderBottom: i < articles.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>{article.title}</p>
                    <p className="font-body text-xs truncate max-w-xs" style={{ color: 'rgba(60,48,40,0.45)' }}>{article.excerpt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase"
                      style={{ color: article.published ? '#16a34a' : 'rgba(60,48,40,0.5)' }}>
                      {article.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm" style={{ color: 'rgba(60,48,40,0.65)' }}>
                    {formatDate(article.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/news/${article.id}/edit`}
                        className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase px-3 py-1.5 transition-all duration-200"
                        style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(60,48,40,0.6)', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)' }}>
                        <Pencil size={11} /> Edit
                      </Link>
                      <button onClick={() => handleDelete(article.id, article.title)} disabled={deletingId === article.id}
                        className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase px-3 py-1.5 disabled:opacity-50"
                        style={{ border: '1px solid rgba(220,53,69,0.25)', color: '#dc3545', background: 'transparent', cursor: 'pointer' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,53,69,0.06)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

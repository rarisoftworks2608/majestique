import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { newsApi } from '../../services/api'

const INITIAL = {
  title: '', slug: '', excerpt: '', content: '', coverImage: '',
  published: false, publishedAt: new Date().toISOString().slice(0, 16),
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

const inputCls = {
  width: '100%', padding: '0.75rem 1rem',
  border: '1px solid rgba(201,168,76,0.3)', outline: 'none',
  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  color: 'var(--luxury-dark)', background: 'white', transition: 'border-color 0.3s',
}

const Label = ({ children }) => (
  <label className="font-ui text-xs tracking-wider uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>
    {children}
  </label>
)

const focus = (e) => { e.target.style.borderColor = 'var(--gold)' }
const blur  = (e) => { e.target.style.borderColor = 'rgba(201,168,76,0.3)' }

export default function NewsForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    newsApi.getById(id)
      .then((res) => {
        const a = res.data?.article || res.data
        if (!a) { navigate('/admin/news'); return }
        setForm({
          title: a.title || '',
          slug: a.slug || '',
          excerpt: a.excerpt || '',
          content: a.content || '',
          coverImage: a.coverImage || '',
          published: a.published || false,
          publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString().slice(0, 16) : INITIAL.publishedAt,
        })
      })
      .catch(() => navigate('/admin/news'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const set = (field, value) => {
    setForm((p) => {
      const next = { ...p, [field]: value }
      if (field === 'title' && !isEdit) next.slug = slugify(value)
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.excerpt || !form.content) {
      setError('Title, excerpt, and content are required.')
      return
    }
    setError('')
    setSaving(true)
    try {
      const payload = { ...form, publishedAt: new Date(form.publishedAt).toISOString() }
      if (isEdit) {
        await newsApi.update(id, payload)
      } else {
        await newsApi.create(payload)
      }
      navigate('/admin/news')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save article.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/news" className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.5)' }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>
          {isEdit ? 'Edit Article' : 'Add News Article'}
        </h1>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 font-body text-sm" style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.2)', color: '#dc3545' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 p-6" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Title *</Label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Slug</Label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div>
            <Label>Excerpt *</Label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)}
              style={{ ...inputCls, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <Label>Content *</Label>
            <textarea rows={12} value={form.content} onChange={(e) => set('content', e.target.value)}
              style={{ ...inputCls, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <Label>Cover Image URL</Label>
            <input value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)}
              placeholder="https://..." style={inputCls} onFocus={focus} onBlur={blur} />
            {form.coverImage && (
              <img src={form.coverImage} alt="Preview" className="mt-2 h-24 object-cover rounded"
                onError={(e) => { e.target.style.display = 'none' }} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
            <div>
              <Label>Publish Date</Label>
              <input type="datetime-local" value={form.publishedAt}
                onChange={(e) => set('publishedAt', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div className="flex items-center gap-3 pb-1">
              <input type="checkbox" id="published" checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--gold)' }} />
              <label htmlFor="published" className="font-ui text-xs tracking-wider uppercase cursor-pointer" style={{ color: 'rgba(60,48,40,0.7)' }}>
                Published
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <button type="submit" disabled={saving} className="btn-gold flex items-center gap-2 disabled:opacity-60">
            {saving ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : <Save size={15} />}
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Article'}
          </button>
          <Link to="/admin/news" className="btn-outline-gold" style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem', color: 'var(--luxury-dark)', borderColor: 'rgba(157,134,104,0.45)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

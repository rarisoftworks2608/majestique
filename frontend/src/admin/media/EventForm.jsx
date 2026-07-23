import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { eventsApi } from '../../services/api'

const now = new Date().toISOString().slice(0, 16)

const INITIAL = {
  title: '', slug: '', description: '', coverImage: '',
  location: '', startDate: now, endDate: '', published: false,
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

export default function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    eventsApi.getById(id)
      .then((res) => {
        const ev = res.data?.event || res.data
        if (!ev) { navigate('/admin/events'); return }
        setForm({
          title: ev.title || '',
          slug: ev.slug || '',
          description: ev.description || '',
          coverImage: ev.coverImage || '',
          location: ev.location || '',
          startDate: ev.startDate ? new Date(ev.startDate).toISOString().slice(0, 16) : now,
          endDate: ev.endDate ? new Date(ev.endDate).toISOString().slice(0, 16) : '',
          published: ev.published || false,
        })
      })
      .catch(() => navigate('/admin/events'))
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
    if (!form.title || !form.description || !form.startDate) {
      setError('Title, description, and start date are required.')
      return
    }
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      }
      if (isEdit) {
        await eventsApi.update(id, payload)
      } else {
        await eventsApi.create(payload)
      }
      navigate('/admin/events')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save event.')
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
        <Link to="/admin/events" className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.5)' }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>
          {isEdit ? 'Edit Event' : 'Add New Event'}
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
            <Label>Description *</Label>
            <textarea rows={8} value={form.description} onChange={(e) => set('description', e.target.value)}
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

          <div>
            <Label>Location</Label>
            <input value={form.location} onChange={(e) => set('location', e.target.value)}
              placeholder="Venue name, city" style={inputCls} onFocus={focus} onBlur={blur} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Start Date &amp; Time *</Label>
              <input type="datetime-local" value={form.startDate}
                onChange={(e) => set('startDate', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>End Date &amp; Time</Label>
              <input type="datetime-local" value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="published" checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--gold)' }} />
            <label htmlFor="published" className="font-ui text-xs tracking-wider uppercase cursor-pointer" style={{ color: 'rgba(60,48,40,0.7)' }}>
              Published
            </label>
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
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Event'}
          </button>
          <Link to="/admin/events" className="btn-outline-gold" style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem', color: 'var(--luxury-dark)', borderColor: 'rgba(157,134,104,0.45)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

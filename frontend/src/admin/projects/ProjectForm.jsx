import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Globe, MapPin } from 'lucide-react'
import { projectsApi, locationsApi } from '../../services/api'

const INITIAL = {
  title: '', slug: '', tagline: '', description: '',
  status: 'ONGOING', category: 'Residential',
  locationId: '', address: '',
  area: '', units: '', possession: '', rera: '',
  priceMin: '', priceMax: '',
  configurations: '',
  coverImage: '', youtubeUrl: '',
  amenities: '', highlights: '',
  featured: false, published: false,
  order: '0',
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

const focus = (e) => { e.target.style.borderColor = 'var(--gold)' }
const blur  = (e) => { e.target.style.borderColor = 'rgba(201,168,76,0.3)' }

const Label = ({ children, required }) => (
  <label className="font-ui text-xs tracking-wider uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>
    {children}{required && <span style={{ color: '#dc3545' }}> *</span>}
  </label>
)

const SectionHeader = ({ children }) => (
  <div className="pt-2 pb-1 mb-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
    <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(60,48,40,0.4)' }}>{children}</p>
  </div>
)

const ChipList = ({ value, placeholder }) => {
  const items = value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []
  if (!items.length) return null
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((a) => (
        <span key={a} className="font-ui text-xs px-2 py-0.5"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold-dark)' }}>
          {a}
        </span>
      ))}
    </div>
  )
}

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm]           = useState(INITIAL)
  const [locations, setLocations] = useState([])
  const [loading, setLoading]     = useState(isEdit)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')

  // Fetch locations for dropdown
  useEffect(() => {
    locationsApi.getAll()
      .then((res) => setLocations(res.data?.locations || []))
      .catch(() => {})
  }, [])

  // Load project in edit mode
  useEffect(() => {
    if (!isEdit) return
    projectsApi.getById(id)
      .then((res) => {
        const p = res.data?.project
        if (!p) { navigate('/admin/projects'); return }
        setForm({
          title:          p.title          || '',
          slug:           p.slug           || '',
          tagline:        p.tagline        || '',
          description:    p.description    || '',
          status:         p.status         || 'ONGOING',
          category:       p.category       || 'Residential',
          locationId:     p.locationId     || '',
          address:        p.address        || '',
          area:           p.area           || '',
          units:          p.units != null ? String(p.units) : '',
          possession:     p.possession     || '',
          rera:           p.rera           || '',
          priceMin:       p.priceMin != null ? String(p.priceMin) : '',
          priceMax:       p.priceMax != null ? String(p.priceMax) : '',
          configurations: (p.configurations || []).join(', '),
          coverImage:     p.coverImage     || '',
          youtubeUrl:     p.youtubeUrl     || '',
          amenities:      (p.amenities  || []).join(', '),
          highlights:     (p.highlights || []).join(', '),
          featured:       p.featured       || false,
          published:      p.published      || false,
          order:          p.order != null ? String(p.order) : '0',
        })
      })
      .catch(() => navigate('/admin/projects'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const set = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && !isEdit) next.slug = slugify(value)
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.')
      return
    }
    setError('')
    setSaving(true)

    const payload = {
      ...form,
      units:          form.units     ? parseInt(form.units,  10) : null,
      order:          parseInt(form.order, 10) || 0,
      priceMin:       form.priceMin  ? parseFloat(form.priceMin)  : null,
      priceMax:       form.priceMax  ? parseFloat(form.priceMax)  : null,
      locationId:     form.locationId || null,
      amenities:      form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      highlights:     form.highlights.split(',').map((s) => s.trim()).filter(Boolean),
      configurations: form.configurations.split(',').map((s) => s.trim()).filter(Boolean),
    }

    try {
      if (isEdit) {
        await projectsApi.update(id, payload)
      } else {
        await projectsApi.create(payload)
      }
      navigate('/admin/projects')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/projects"
          className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase"
          style={{ color: 'rgba(60,48,40,0.5)' }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </h1>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 font-body text-sm"
          style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.2)', color: '#dc3545' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6 p-6" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>

          {/* ── Core Info ─────────────────────────────────────── */}
          <SectionHeader>Core Info</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label required>Title</Label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)}
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Slug</Label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)}
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div>
            <Label>Tagline</Label>
            <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)}
              placeholder="One-line description for listings"
              style={inputCls} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <Label required>Description</Label>
            <textarea rows={5} value={form.description} onChange={(e) => set('description', e.target.value)}
              style={{ ...inputCls, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </div>

          {/* ── Classification ────────────────────────────────── */}
          <SectionHeader>Classification</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Status</Label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}
                style={{ ...inputCls, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="UPCOMING">Upcoming</option>
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}
                style={{ ...inputCls, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Mixed-Use</option>
                <option>Villa</option>
              </select>
            </div>
            <div>
              <Label>Display Order</Label>
              <input type="number" value={form.order} onChange={(e) => set('order', e.target.value)}
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* ── Location ──────────────────────────────────────── */}
          <SectionHeader>Location</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Area / Micromarket</Label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--gold)' }} />
                <select value={form.locationId} onChange={(e) => set('locationId', e.target.value)}
                  style={{ ...inputCls, paddingLeft: '2rem', cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                  <option value="">— None —</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>{loc.name}, {loc.city}</option>
                  ))}
                </select>
              </div>
              {locations.length === 0 && (
                <p className="font-body text-xs mt-1" style={{ color: 'rgba(60,48,40,0.4)' }}>
                  No locations yet — add via <code className="text-xs bg-gray-100 px-1">POST /api/locations</code>
                </p>
              )}
            </div>
            <div>
              <Label>Full Address</Label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)}
                placeholder="Street / Sector / Landmark"
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* ── Property Details ──────────────────────────────── */}
          <SectionHeader>Property Details</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Area Range</Label>
              <input value={form.area} onChange={(e) => set('area', e.target.value)}
                placeholder="e.g. 1200–2400 sq ft"
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Total Units</Label>
              <input type="number" value={form.units} onChange={(e) => set('units', e.target.value)}
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Possession</Label>
              <input value={form.possession} onChange={(e) => set('possession', e.target.value)}
                placeholder="e.g. Dec 2026"
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Price Min (₹)</Label>
              <input type="number" value={form.priceMin} onChange={(e) => set('priceMin', e.target.value)}
                placeholder="e.g. 5000000"
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Price Max (₹)</Label>
              <input type="number" value={form.priceMax} onChange={(e) => set('priceMax', e.target.value)}
                placeholder="e.g. 15000000"
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>RERA Number</Label>
              <input value={form.rera} onChange={(e) => set('rera', e.target.value)}
                style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Configurations</Label>
              <input value={form.configurations} onChange={(e) => set('configurations', e.target.value)}
                placeholder="2 BHK, 3 BHK, 4 BHK"
                style={inputCls} onFocus={focus} onBlur={blur} />
              <ChipList value={form.configurations} />
            </div>
          </div>

          {/* ── Media ─────────────────────────────────────────── */}
          <SectionHeader>Media</SectionHeader>

          <div>
            <Label>Cover Image URL</Label>
            <input value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)}
              placeholder="https://…"
              style={inputCls} onFocus={focus} onBlur={blur} />
            {form.coverImage && (
              <img src={form.coverImage} alt="Preview" className="mt-2 h-24 object-cover"
                onError={(e) => { e.target.style.display = 'none' }} />
            )}
          </div>

          <div>
            <Label>YouTube Video URL</Label>
            <div className="relative">
              <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--gold)' }} />
              <input value={form.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=…"
                style={{ ...inputCls, paddingLeft: '2rem' }} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* ── Highlights & Amenities ───────────────────────── */}
          <SectionHeader>Highlights & Amenities</SectionHeader>

          <div>
            <Label>Amenities</Label>
            <input value={form.amenities} onChange={(e) => set('amenities', e.target.value)}
              placeholder="Swimming Pool, Gym, Clubhouse, Garden"
              style={inputCls} onFocus={focus} onBlur={blur} />
            <ChipList value={form.amenities} />
          </div>

          <div>
            <Label>Highlights</Label>
            <input value={form.highlights} onChange={(e) => set('highlights', e.target.value)}
              placeholder="Vastu Compliant, IGBC Green Certified, Smart Home Ready"
              style={inputCls} onFocus={focus} onBlur={blur} />
            <ChipList value={form.highlights} />
          </div>

          {/* ── Visibility ────────────────────────────────────── */}
          <SectionHeader>Visibility</SectionHeader>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="w-4 h-4" style={{ accentColor: 'var(--gold)' }} />
              <span className="font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.7)' }}>
                Feature on Homepage
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4" style={{ accentColor: 'var(--gold)' }} />
              <div>
                <span className="font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.7)' }}>
                  Published
                </span>
                <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(60,48,40,0.4)' }}>
                  {form.published ? 'Visible to the public' : 'Saved as draft — hidden from public'}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-5">
          <button type="submit" disabled={saving}
            className="btn-gold flex items-center gap-2 disabled:opacity-60">
            {saving ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : <Save size={15} />}
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
          <Link to="/admin/projects"
            className="font-ui text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
            style={{ border: '1px solid rgba(60,48,40,0.3)', color: 'var(--luxury-dark)', background: 'transparent', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(60,48,40,0.6)'; e.currentTarget.style.background = 'rgba(60,48,40,0.04)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(60,48,40,0.3)'; e.currentTarget.style.background = 'transparent' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

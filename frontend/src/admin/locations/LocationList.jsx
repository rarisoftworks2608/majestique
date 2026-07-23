import { useState, useEffect } from 'react'
import { MapPin, Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { locationsApi } from '../../services/api'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const BLANK = { name: '', slug: '', city: 'Pune', state: 'Maharashtra', description: '' }

export default function LocationList() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [editingId, setEditingId] = useState(null)   // null = list, 'new' = create, <id> = edit
  const [form, setForm]           = useState(BLANK)
  const [errors, setErrors]       = useState({})

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    setLoading(true)
    locationsApi.getAll()
      .then((res) => setLocations(res.data?.locations || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const openNew = () => { setForm(BLANK); setErrors({}); setEditingId('new') }
  const openEdit = (loc) => {
    setForm({
      name: loc.name || '',
      slug: loc.slug || '',
      city: loc.city || 'Pune',
      state: loc.state || 'Maharashtra',
      description: loc.description || '',
    })
    setErrors({})
    setEditingId(loc.id)
  }
  const cancelEdit = () => { setEditingId(null); setErrors({}) }

  const set = (k, v) => {
    setForm((p) => {
      const updated = { ...p, [k]: v }
      if (k === 'name' && editingId === 'new') updated.slug = slugify(v)
      return updated
    })
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.slug.trim()) e.slug = 'Slug is required'
    return e
  }

  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      if (editingId === 'new') {
        const res = await locationsApi.create(form)
        setLocations((prev) => [...prev, res.data?.location || res.data])
      } else {
        await locationsApi.update(editingId, form)
        setLocations((prev) => prev.map((l) => l.id === editingId ? { ...l, ...form } : l))
      }
      setEditingId(null)
    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'Failed to save location.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete location "${name}"? Projects using it may be affected.`)) return
    setDeletingId(id)
    try {
      await locationsApi.delete(id)
      setLocations((prev) => prev.filter((l) => l.id !== id))
    } catch {
      alert('Failed to delete location. It may be linked to projects.')
    } finally {
      setDeletingId(null)
    }
  }

  const inp = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    background: 'white',
    border: '1px solid rgba(201,168,76,0.25)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--luxury-dark)',
    transition: 'border-color 0.2s',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>Locations</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>
            {locations.length} location{locations.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        {editingId === null && (
          <button
            onClick={openNew}
            className="btn-gold flex items-center gap-2"
            style={{ fontSize: '0.72rem', padding: '0.5rem 1.1rem' }}
          >
            <Plus size={13} /> Add Location
          </button>
        )}
      </div>

      {/* Inline form — New or Edit */}
      {editingId !== null && (
        <div className="mb-6 p-6" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 2px 12px rgba(13,11,8,0.06)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-times text-lg" style={{ color: 'var(--luxury-dark)' }}>
              {editingId === 'new' ? 'Add New Location' : 'Edit Location'}
            </h2>
            <button onClick={cancelEdit} style={{ color: 'rgba(60,48,40,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {errors.form && (
            <div className="mb-4 px-4 py-3 font-body text-sm" style={{ background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', color: '#c0392b' }}>
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Name */}
            <div>
              <label className="font-ui text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>
                Location Name <span style={{ color: '#c0392b' }}>*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Kharadi, Pune"
                style={{ ...inp, borderColor: errors.name ? '#c0392b' : 'rgba(201,168,76,0.25)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = errors.name ? '#c0392b' : 'rgba(201,168,76,0.25)' }}
              />
              {errors.name && <p className="font-body text-xs mt-1" style={{ color: '#c0392b' }}>{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="font-ui text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>
                Slug <span style={{ color: '#c0392b' }}>*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set('slug', slugify(e.target.value))}
                placeholder="e.g. kharadi-pune"
                style={{ ...inp, borderColor: errors.slug ? '#c0392b' : 'rgba(201,168,76,0.25)', fontFamily: 'monospace' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = errors.slug ? '#c0392b' : 'rgba(201,168,76,0.25)' }}
              />
              {errors.slug && <p className="font-body text-xs mt-1" style={{ color: '#c0392b' }}>{errors.slug}</p>}
            </div>

            {/* City */}
            <div>
              <label className="font-ui text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="Pune"
                style={inp}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
              />
            </div>

            {/* State */}
            <div>
              <label className="font-ui text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => set('state', e.target.value)}
                placeholder="Maharashtra"
                style={inp}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="font-ui text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: 'rgba(60,48,40,0.55)' }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              placeholder="Brief description of this location area…"
              style={{ ...inp, resize: 'vertical' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
              onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-gold flex items-center gap-2 disabled:opacity-60"
              style={{ fontSize: '0.72rem', padding: '0.5rem 1.25rem' }}
            >
              {saving ? (
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <Check size={13} />}
              {saving ? 'Saving…' : editingId === 'new' ? 'Create Location' : 'Save Changes'}
            </button>
            <button
              onClick={cancelEdit}
              className="font-ui text-xs tracking-wider uppercase px-4 py-2 transition-all duration-200"
              style={{ border: '1px solid rgba(60,48,40,0.3)', color: 'var(--luxury-dark)', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(60,48,40,0.6)'; e.currentTarget.style.background = 'rgba(60,48,40,0.04)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(60,48,40,0.3)'; e.currentTarget.style.background = 'transparent' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              <div className="skeleton w-8 h-8 rounded flex-shrink-0" />
              <div className="flex-1"><div className="skeleton h-4 w-40 mb-1.5 rounded" /><div className="skeleton h-3 w-28 rounded" /></div>
              <div className="skeleton h-8 w-24 rounded" />
            </div>
          ))
        ) : locations.length === 0 ? (
          <div className="text-center py-16">
            <MapPin size={36} className="mx-auto mb-3 opacity-15" style={{ color: 'var(--gold)' }} />
            <p className="font-body text-sm mb-3" style={{ color: 'rgba(60,48,40,0.45)' }}>No locations yet.</p>
            <button onClick={openNew} className="btn-gold" style={{ fontSize: '0.72rem', padding: '0.5rem 1.1rem' }}>
              <Plus size={13} className="inline mr-1" /> Add First Location
            </button>
          </div>
        ) : (
          locations.map((loc, i) => (
            <div
              key={loc.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors duration-150"
              style={{
                borderBottom: i < locations.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                background: editingId === loc.id ? '#fdf9f4' : 'white',
              }}
              onMouseEnter={(e) => { if (editingId !== loc.id) e.currentTarget.style.background = '#fdf9f4' }}
              onMouseLeave={(e) => { if (editingId !== loc.id) e.currentTarget.style.background = 'white' }}
            >
              {/* Icon */}
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <MapPin size={15} style={{ color: 'var(--gold)' }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>{loc.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <code className="font-body text-[10px]" style={{ color: 'rgba(60,48,40,0.45)' }}>{loc.slug}</code>
                  <span style={{ color: 'rgba(60,48,40,0.25)' }}>·</span>
                  <span className="font-body text-[11px]" style={{ color: 'rgba(60,48,40,0.45)' }}>
                    {loc.city}{loc.state ? `, ${loc.state}` : ''}
                  </span>
                  {loc._count?.projects !== undefined && (
                    <>
                      <span style={{ color: 'rgba(60,48,40,0.25)' }}>·</span>
                      <span className="font-body text-[11px]" style={{ color: 'rgba(60,48,40,0.45)' }}>
                        {loc._count.projects} project{loc._count.projects !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(loc)}
                  className="flex items-center gap-1 font-ui text-[10px] tracking-wider uppercase px-2.5 py-1.5 transition-all duration-200"
                  style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(60,48,40,0.6)', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)' }}
                >
                  <Pencil size={10} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(loc.id, loc.name)}
                  disabled={deletingId === loc.id}
                  className="flex items-center gap-1 font-ui text-[10px] tracking-wider uppercase px-2.5 py-1.5 transition-all duration-200 disabled:opacity-50"
                  style={{ border: '1px solid rgba(220,53,69,0.22)', color: '#dc3545', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,53,69,0.06)'; e.currentTarget.style.borderColor = 'rgba(220,53,69,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(220,53,69,0.22)' }}
                >
                  <Trash2 size={10} /> {deletingId === loc.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

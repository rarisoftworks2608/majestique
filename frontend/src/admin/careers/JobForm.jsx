import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { careersApi } from '../../services/api'

const INITIAL = {
  title: '', department: '', location: 'Pune', type: 'Full-Time',
  description: '', requirements: '', active: true,
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

export default function JobForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    careersApi.getById(id)
      .then((res) => {
        const job = res.data?.job || res.data
        if (!job) { navigate('/admin/careers'); return }
        setForm({
          title: job.title || '',
          department: job.department || '',
          location: job.location || 'Pune',
          type: job.type || 'Full-Time',
          description: job.description || '',
          requirements: job.requirements || '',
          active: job.active !== false,
        })
      })
      .catch(() => navigate('/admin/careers'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.department || !form.description || !form.requirements) {
      setError('Title, department, description, and requirements are required.')
      return
    }
    setError('')
    setSaving(true)
    try {
      if (isEdit) {
        await careersApi.update(id, form)
      } else {
        await careersApi.create(form)
      }
      navigate('/admin/careers')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save job listing.')
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
        <Link to="/admin/careers" className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.5)' }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>
          {isEdit ? 'Edit Job Listing' : 'Add Job Listing'}
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
              <Label>Job Title *</Label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Department *</Label>
              <input value={form.department} onChange={(e) => set('department', e.target.value)}
                placeholder="e.g. Sales, Engineering, Design" style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Location</Label>
              <input value={form.location} onChange={(e) => set('location', e.target.value)} style={inputCls} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label>Employment Type</Label>
              <select value={form.type} onChange={(e) => set('type', e.target.value)}
                style={{ ...inputCls, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Job Description *</Label>
            <textarea rows={8} value={form.description} onChange={(e) => set('description', e.target.value)}
              placeholder="Role overview, responsibilities, day-to-day activities…"
              style={{ ...inputCls, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <Label>Requirements *</Label>
            <textarea rows={6} value={form.requirements} onChange={(e) => set('requirements', e.target.value)}
              placeholder="Qualifications, skills, experience required…"
              style={{ ...inputCls, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" checked={form.active}
              onChange={(e) => set('active', e.target.checked)}
              className="w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--gold)' }} />
            <label htmlFor="active" className="font-ui text-xs tracking-wider uppercase cursor-pointer" style={{ color: 'rgba(60,48,40,0.7)' }}>
              Active (visible on careers page)
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
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Post Listing'}
          </button>
          <Link to="/admin/careers" className="btn-outline-gold" style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem', color: 'var(--luxury-dark)', borderColor: 'rgba(157,134,104,0.45)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

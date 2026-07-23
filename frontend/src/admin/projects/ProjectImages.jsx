import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { projectsApi } from '../../services/api'

const inputCls = {
  width: '100%', padding: '0.625rem 0.875rem',
  border: '1px solid rgba(201,168,76,0.3)', outline: 'none',
  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
  color: 'var(--luxury-dark)', background: 'white',
}

const IMG_TYPES  = ['GALLERY', 'BANNER', 'INTERIOR', 'EXTERIOR', 'AMENITY']
const PLAN_TYPES = ['FLOOR_PLAN', 'SITE_PLAN', 'MASTER_PLAN', 'TYPICAL_FLOOR']

const planTypeLabel = (t) => ({
  FLOOR_PLAN:    'Floor Plan',
  SITE_PLAN:     'Site Plan',
  MASTER_PLAN:   'Master Plan',
  TYPICAL_FLOOR: 'Typical Floor',
}[t] || t)

const EMPTY_IMG  = { url: '', caption: '', altText: '', type: 'GALLERY', order: '0' }
const EMPTY_PLAN = { label: '', imageUrl: '', type: 'FLOOR_PLAN', area: '', bedrooms: '', bathrooms: '', price: '', order: '0' }

export default function ProjectImages() {
  const { id } = useParams()
  const [project, setProject]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [imgForm, setImgForm]     = useState(EMPTY_IMG)
  const [imgSaving, setImgSaving] = useState(false)
  const [planForm, setPlanForm]   = useState(EMPTY_PLAN)
  const [planSaving, setPlanSaving] = useState(false)

  useEffect(() => {
    projectsApi.getById(id)
      .then((res) => setProject(res.data?.project || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  // ── Image handlers ──────────────────────────────────────────────────

  const addImage = async (e) => {
    e.preventDefault()
    if (!imgForm.url.trim()) return
    setImgSaving(true)
    try {
      const res = await projectsApi.addImage(id, {
        url:     imgForm.url.trim(),
        caption: imgForm.caption || undefined,
        altText: imgForm.altText || undefined,
        type:    imgForm.type,
        order:   parseInt(imgForm.order, 10) || 0,
      })
      setProject((prev) => ({ ...prev, images: [...(prev.images || []), res.data.image] }))
      setImgForm(EMPTY_IMG)
    } catch {
      alert('Failed to add image.')
    } finally {
      setImgSaving(false)
    }
  }

  const deleteImage = async (imgId) => {
    if (!window.confirm('Delete this image?')) return
    try {
      await projectsApi.deleteImage(id, imgId)
      setProject((prev) => ({ ...prev, images: prev.images.filter((i) => i.id !== imgId) }))
    } catch {
      alert('Failed to delete image.')
    }
  }

  // ── Plan handlers ───────────────────────────────────────────────────

  const addPlan = async (e) => {
    e.preventDefault()
    if (!planForm.label.trim() || !planForm.imageUrl.trim()) return
    setPlanSaving(true)
    try {
      const res = await projectsApi.addPlan(id, {
        label:     planForm.label.trim(),
        imageUrl:  planForm.imageUrl.trim(),
        type:      planForm.type,
        area:      planForm.area      || undefined,
        bedrooms:  planForm.bedrooms  ? parseInt(planForm.bedrooms,  10) : undefined,
        bathrooms: planForm.bathrooms ? parseInt(planForm.bathrooms, 10) : undefined,
        price:     planForm.price     || undefined,
        order:     parseInt(planForm.order, 10) || 0,
      })
      setProject((prev) => ({ ...prev, plans: [...(prev.plans || []), res.data.plan] }))
      setPlanForm(EMPTY_PLAN)
    } catch {
      alert('Failed to add plan.')
    } finally {
      setPlanSaving(false)
    }
  }

  const deletePlan = async (planId) => {
    if (!window.confirm('Delete this plan?')) return
    try {
      await projectsApi.deletePlan(id, planId)
      setProject((prev) => ({ ...prev, plans: prev.plans.filter((p) => p.id !== planId) }))
    } catch {
      alert('Failed to delete plan.')
    }
  }

  // ── Render ──────────────────────────────────────────────────────────

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
    </div>
  )

  if (!project) return (
    <div className="text-center py-16">
      <p className="font-body text-sm" style={{ color: 'rgba(60,48,40,0.5)' }}>Project not found.</p>
      <Link to="/admin/projects" className="btn-outline-gold mt-4 inline-block"
        style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem', color: 'var(--luxury-dark)', borderColor: 'rgba(157,134,104,0.45)' }}>← Back</Link>
    </div>
  )

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/projects"
          className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase"
          style={{ color: 'rgba(60,48,40,0.5)' }}>
          <ArrowLeft size={14} /> Projects
        </Link>
        <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>
          {project.title} — Media
        </h1>
      </div>

      {/* ── Gallery Images ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-times text-xl mb-4" style={{ color: 'var(--luxury-dark)' }}>
          Gallery Images
          {project.images?.length > 0 && (
            <span className="ml-2 font-ui text-sm" style={{ color: 'rgba(60,48,40,0.4)' }}>
              ({project.images.length})
            </span>
          )}
        </h2>

        {(project.images || []).length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.images.map((img) => (
              <div key={img.id} className="relative group overflow-hidden"
                style={{ aspectRatio: '4/3', background: 'var(--luxury-dark2)' }}>
                <img src={img.url} alt={img.altText || img.caption || ''}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none' }} />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200" />
                {/* Type badge */}
                <span className="absolute top-2 left-2 font-ui text-xs px-1.5 py-0.5"
                  style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem' }}>
                  {img.type}
                </span>
                <button onClick={() => deleteImage(img.id)}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: '#dc3545', border: 'none', cursor: 'pointer', color: 'white' }}>
                  <Trash2 size={12} />
                </button>
                {img.caption && (
                  <p className="absolute bottom-0 left-0 right-0 px-2 py-1 font-body text-xs"
                    style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={addImage} className="p-5"
          style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>
          <p className="font-ui text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(60,48,40,0.5)' }}>
            Add Image
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input className="sm:col-span-2" value={imgForm.url}
              onChange={(e) => setImgForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="Image URL *" style={inputCls} />
            <select value={imgForm.type}
              onChange={(e) => setImgForm((p) => ({ ...p, type: e.target.value }))}
              style={{ ...inputCls, cursor: 'pointer' }}>
              {IMG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input value={imgForm.caption}
              onChange={(e) => setImgForm((p) => ({ ...p, caption: e.target.value }))}
              placeholder="Caption" style={inputCls} />
            <input value={imgForm.altText}
              onChange={(e) => setImgForm((p) => ({ ...p, altText: e.target.value }))}
              placeholder="Alt text (SEO)" style={inputCls} />
            <input type="number" value={imgForm.order}
              onChange={(e) => setImgForm((p) => ({ ...p, order: e.target.value }))}
              placeholder="Order" style={inputCls} />
          </div>
          <button type="submit" disabled={imgSaving || !imgForm.url.trim()}
            className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase px-4 py-2 disabled:opacity-50"
            style={{ background: 'var(--gold)', color: 'var(--luxury-dark)', border: 'none', cursor: 'pointer' }}>
            <Plus size={13} /> {imgSaving ? 'Adding…' : 'Add Image'}
          </button>
        </form>
      </section>

      {/* ── Project Plans ──────────────────────────────────────────── */}
      <section>
        <h2 className="font-times text-xl mb-4" style={{ color: 'var(--luxury-dark)' }}>
          Project Plans
          {project.plans?.length > 0 && (
            <span className="ml-2 font-ui text-sm" style={{ color: 'rgba(60,48,40,0.4)' }}>
              ({project.plans.length})
            </span>
          )}
        </h2>

        {(project.plans || []).length > 0 && (
          <div className="space-y-2 mb-5">
            {project.plans.map((plan) => (
              <div key={plan.id} className="flex items-center gap-4 px-4 py-3"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>
                {plan.imageUrl && (
                  <div className="w-14 h-10 overflow-hidden flex-shrink-0">
                    <img src={plan.imageUrl} alt={plan.label}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>
                      {plan.label}
                    </p>
                    <span className="font-ui text-xs px-1.5 py-0.5"
                      style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold-dark)', fontSize: '0.65rem' }}>
                      {planTypeLabel(plan.type)}
                    </span>
                  </div>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>
                    {[
                      plan.bedrooms  && `${plan.bedrooms} bed`,
                      plan.bathrooms && `${plan.bathrooms} bath`,
                      plan.area,
                      plan.price,
                    ].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <button onClick={() => deletePlan(plan.id)}
                  className="flex items-center gap-1 font-ui text-xs px-2 py-1"
                  style={{ border: '1px solid rgba(220,53,69,0.25)', color: '#dc3545', background: 'transparent', cursor: 'pointer' }}>
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={addPlan} className="p-5"
          style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>
          <p className="font-ui text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(60,48,40,0.5)' }}>
            Add Plan
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input value={planForm.label}
              onChange={(e) => setPlanForm((p) => ({ ...p, label: e.target.value }))}
              placeholder="Label (e.g. 3 BHK) *" style={inputCls} />
            <select value={planForm.type}
              onChange={(e) => setPlanForm((p) => ({ ...p, type: e.target.value }))}
              style={{ ...inputCls, cursor: 'pointer' }}>
              {PLAN_TYPES.map((t) => <option key={t} value={t}>{planTypeLabel(t)}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <input value={planForm.imageUrl}
              onChange={(e) => setPlanForm((p) => ({ ...p, imageUrl: e.target.value }))}
              placeholder="Plan Image URL *" style={inputCls} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <input type="number" value={planForm.bedrooms}
              onChange={(e) => setPlanForm((p) => ({ ...p, bedrooms: e.target.value }))}
              placeholder="Beds" style={inputCls} />
            <input type="number" value={planForm.bathrooms}
              onChange={(e) => setPlanForm((p) => ({ ...p, bathrooms: e.target.value }))}
              placeholder="Baths" style={inputCls} />
            <input value={planForm.area}
              onChange={(e) => setPlanForm((p) => ({ ...p, area: e.target.value }))}
              placeholder="Area" style={inputCls} />
            <input value={planForm.price}
              onChange={(e) => setPlanForm((p) => ({ ...p, price: e.target.value }))}
              placeholder="Price" style={inputCls} />
          </div>
          <button type="submit"
            disabled={planSaving || !planForm.label.trim() || !planForm.imageUrl.trim()}
            className="flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase px-4 py-2 disabled:opacity-50"
            style={{ background: 'var(--gold)', color: 'var(--luxury-dark)', border: 'none', cursor: 'pointer' }}>
            <Plus size={13} /> {planSaving ? 'Saving…' : 'Add Plan'}
          </button>
        </form>
      </section>
    </div>
  )
}

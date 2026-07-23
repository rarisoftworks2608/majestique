import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Image, Trash2, Star, Eye, EyeOff, Search, X } from 'lucide-react'
import { projectsApi } from '../../services/api'
import { getImageUrl } from '../../utils/helpers'

const STATUS_STYLES = {
  ONGOING:   { bg: 'rgba(201,168,76,0.14)', color: '#7a5c00'  },
  COMPLETED: { bg: 'rgba(30,22,14,0.08)',   color: '#4b5563'  },
  UPCOMING:  { bg: 'rgba(37,99,235,0.1)',   color: '#1d4ed8'  },
}
const STATUS_LABEL = { ONGOING: 'Ongoing', COMPLETED: 'Completed', UPCOMING: 'Upcoming' }

const FILTERS = ['All', 'ONGOING', 'COMPLETED', 'UPCOMING']

export default function ProjectList() {
  const [projects, setProjects]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [filter, setFilter]         = useState('All')
  const [search, setSearch]         = useState('')

  useEffect(() => {
    projectsApi.getAll()
      .then((res) => setProjects(res.data?.projects || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await projectsApi.delete(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Failed to delete project.')
    } finally {
      setDeletingId(null)
    }
  }

  const counts = useMemo(() => {
    const c = { All: projects.length }
    FILTERS.slice(1).forEach((s) => { c[s] = projects.filter((p) => p.status === s).length })
    return c
  }, [projects])

  const visible = useMemo(() => {
    let list = [...projects]
    if (filter !== 'All') list = list.filter((p) => p.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.name?.toLowerCase().includes(q) ||
          p.address?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      )
    }
    return list
  }, [projects, filter, search])

  const ActionBtn = ({ to, icon, label, danger = false }) => (
    <Link
      to={to}
      className="flex items-center gap-1 font-ui text-[10px] tracking-wider uppercase px-2.5 py-1.5 transition-all duration-200"
      style={{
        border: danger ? '1px solid rgba(220,53,69,0.22)' : '1px solid rgba(201,168,76,0.2)',
        color: danger ? '#dc3545' : 'rgba(60,48,40,0.6)',
        background: 'transparent',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = danger ? 'rgba(220,53,69,0.5)' : 'rgba(201,168,76,0.5)'
        e.currentTarget.style.background = danger ? 'rgba(220,53,69,0.04)' : 'transparent'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = danger ? 'rgba(220,53,69,0.22)' : 'rgba(201,168,76,0.2)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {icon}{label}
    </Link>
  )

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>Projects</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>
            {projects.length} total · {projects.filter((p) => p.published).length} published
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(60,48,40,0.4)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="font-body text-sm pl-8 pr-7 py-2 w-48 outline-none"
              style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'white', color: 'var(--luxury-dark)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
              onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(60,48,40,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={11} />
              </button>
            )}
          </div>
          <Link to="/admin/projects/new" className="btn-gold flex items-center gap-2"
            style={{ fontSize: '0.72rem', padding: '0.5rem 1.1rem', textDecoration: 'none' }}>
            <Plus size={13} /> Add Project
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 mb-4" style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        {FILTERS.map((f) => {
          const active = filter === f
          const st = f !== 'All' ? STATUS_STYLES[f] : null
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex items-center gap-1.5 px-4 py-2.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
              style={{
                color: active ? (st?.color || 'var(--gold-dark)') : 'rgba(60,48,40,0.48)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderBottom: active ? `2px solid ${st?.color || 'var(--gold)'}` : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {f === 'All' ? 'All' : STATUS_LABEL[f]}
              <span className="font-ui text-[9px] px-1.5 py-0.5 rounded-full"
                style={{ background: active ? (st?.bg || 'rgba(201,168,76,0.12)') : 'rgba(60,48,40,0.06)', color: active ? (st?.color || 'var(--gold-dark)') : 'rgba(60,48,40,0.45)' }}>
                {counts[f] ?? 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              <div className="skeleton w-14 h-10 rounded flex-shrink-0" />
              <div className="flex-1"><div className="skeleton h-4 w-48 mb-1.5 rounded" /><div className="skeleton h-3 w-24 rounded" /></div>
              <div className="skeleton h-5 w-20 rounded" />
              <div className="skeleton h-3 w-32 rounded" />
            </div>
          ))
        ) : visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-sm" style={{ color: 'rgba(60,48,40,0.45)' }}>
              {search || filter !== 'All' ? 'No projects match your filters.' : (
                <>No projects yet. <Link to="/admin/projects/new" style={{ color: 'var(--gold-dark)' }}>Add one</Link>.</>
              )}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: '#fdf9f4' }}>
                {['Image', 'Title', 'Status', 'Location', 'Visibility', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-ui text-[10px] tracking-widest uppercase"
                    style={{ color: 'rgba(60,48,40,0.42)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((project, i) => (
                <tr
                  key={project.id}
                  style={{ borderBottom: i < visible.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fdf9f4' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    <div className="w-14 h-10 overflow-hidden flex-shrink-0" style={{ background: '#e8e0d4' }}>
                      {project.coverImage && (
                        <img src={getImageUrl(project.coverImage)} alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }} />
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>
                      {project.title}
                    </p>
                    {project.category && (
                      <p className="font-body text-[11px]" style={{ color: 'rgba(60,48,40,0.45)' }}>
                        {project.category}
                      </p>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="font-ui text-[10px] tracking-wider uppercase px-2 py-0.5"
                      style={STATUS_STYLES[project.status] || STATUS_STYLES.COMPLETED}>
                      {STATUS_LABEL[project.status] || project.status}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 font-body text-sm" style={{ color: 'rgba(60,48,40,0.6)' }}>
                    {project.location?.name || project.address || '—'}
                  </td>

                  {/* Visibility */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {project.published ? (
                        <span className="flex items-center gap-1 font-ui text-[10px] tracking-wider" style={{ color: '#16a34a' }}>
                          <Eye size={11} /> Live
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-ui text-[10px] tracking-wider" style={{ color: 'rgba(60,48,40,0.38)' }}>
                          <EyeOff size={11} /> Draft
                        </span>
                      )}
                      {project.featured && <Star size={12} style={{ color: 'var(--gold)' }} fill="var(--gold)" />}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <ActionBtn to={`/admin/projects/${project.id}/edit`}   icon={<Pencil size={10} />} label="Edit" />
                      <ActionBtn to={`/admin/projects/${project.id}/images`} icon={<Image  size={10} />} label="Media" />
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deletingId === project.id}
                        className="flex items-center gap-1 font-ui text-[10px] tracking-wider uppercase px-2.5 py-1.5 transition-all duration-200 disabled:opacity-50"
                        style={{ border: '1px solid rgba(220,53,69,0.22)', color: '#dc3545', background: 'transparent', cursor: 'pointer' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,53,69,0.06)'; e.currentTarget.style.borderColor = 'rgba(220,53,69,0.5)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(220,53,69,0.22)' }}
                      >
                        <Trash2 size={10} /> {deletingId === project.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {visible.length > 0 && !loading && filter !== 'All' && (
        <p className="font-body text-xs mt-3" style={{ color: 'rgba(60,48,40,0.38)' }}>
          Showing {visible.length} of {projects.length} projects
        </p>
      )}
    </div>
  )
}

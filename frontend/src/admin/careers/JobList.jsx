import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { careersApi } from '../../services/api'
import { formatDate } from '../../utils/helpers'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    careersApi.getAll()
      .then((res) => setJobs(res.data?.jobs || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    setDeletingId(id)
    try {
      await careersApi.delete(id)
      setJobs((prev) => prev.filter((j) => j.id !== id))
    } catch {
      alert('Failed to delete job listing.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>Job Listings</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>{jobs.length} listings</p>
        </div>
        <Link to="/admin/careers/new" className="btn-gold flex items-center gap-2" style={{ fontSize: '0.75rem', padding: '0.625rem 1.25rem' }}>
          <Plus size={14} /> Add Listing
        </Link>
      </div>

      <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              <div className="flex-1"><div className="skeleton h-4 w-56 mb-1 rounded" /><div className="skeleton h-3 w-24 rounded" /></div>
              <div className="skeleton h-5 w-16 rounded" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
          ))
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-sm" style={{ color: 'rgba(60,48,40,0.45)' }}>
              No job listings yet. <Link to="/admin/careers/new" style={{ color: 'var(--gold-dark)' }}>Add one</Link>.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', background: '#fdf9f4' }}>
                {['Position', 'Department', 'Status', 'Posted', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(60,48,40,0.45)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <tr key={job.id} style={{ borderBottom: i < jobs.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--luxury-dark)' }}>{job.title}</p>
                    <p className="font-body text-xs" style={{ color: 'rgba(60,48,40,0.45)' }}>{job.type} · {job.location}</p>
                  </td>
                  <td className="px-4 py-3 font-body text-sm" style={{ color: 'rgba(60,48,40,0.65)' }}>
                    {job.department}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase"
                      style={{ color: job.active ? '#16a34a' : 'rgba(60,48,40,0.5)' }}>
                      {job.active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {job.active ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm" style={{ color: 'rgba(60,48,40,0.65)' }}>
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/careers/${job.id}/edit`}
                        className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase px-3 py-1.5 transition-all duration-200"
                        style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(60,48,40,0.6)', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)' }}>
                        <Pencil size={11} /> Edit
                      </Link>
                      <button onClick={() => handleDelete(job.id, job.title)} disabled={deletingId === job.id}
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

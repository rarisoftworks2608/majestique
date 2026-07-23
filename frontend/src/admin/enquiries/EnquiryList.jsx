import { useState, useEffect, useMemo } from 'react'
import { Mail, Phone, ChevronDown, Search, X, Building2 } from 'lucide-react'
import { enquiriesApi } from '../../services/api'
import { formatDate } from '../../utils/helpers'

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED']

const STATUS_META = {
  NEW:       { color: '#1d4ed8', bg: 'rgba(37,99,235,0.09)',   border: 'rgba(37,99,235,0.22)',  label: 'New'       },
  CONTACTED: { color: '#b45309', bg: 'rgba(217,119,6,0.09)',   border: 'rgba(217,119,6,0.22)',  label: 'Contacted' },
  QUALIFIED: { color: '#6d28d9', bg: 'rgba(124,58,237,0.09)', border: 'rgba(124,58,237,0.22)', label: 'Qualified' },
  CLOSED:    { color: '#15803d', bg: 'rgba(22,163,74,0.09)',   border: 'rgba(22,163,74,0.22)',  label: 'Closed'    },
}

const FILTERS = ['All', 'NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED']

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.NEW
  return (
    <span className="font-ui text-[10px] tracking-wider uppercase px-2 py-0.5 flex-shrink-0"
      style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
      {m.label}
    </span>
  )
}

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading]     = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [expanded, setExpanded]   = useState(null)
  const [filter, setFilter]       = useState('All')
  const [search, setSearch]       = useState('')

  useEffect(() => {
    enquiriesApi.getAll({ limit: 500 })
      .then((res) => setEnquiries(res.data?.enquiries || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await enquiriesApi.updateStatus(id, status)
      setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e))
    } catch {
      alert('Failed to update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const counts = useMemo(() => {
    const c = { All: enquiries.length }
    STATUS_OPTIONS.forEach((s) => { c[s] = enquiries.filter((e) => e.status === s).length })
    return c
  }, [enquiries])

  const visible = useMemo(() => {
    let list = enquiries
    if (filter !== 'All') list = list.filter((e) => e.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.email?.toLowerCase().includes(q) ||
          e.phone?.toLowerCase().includes(q) ||
          e.subject?.toLowerCase().includes(q) ||
          e.message?.toLowerCase().includes(q)
      )
    }
    return list
  }, [enquiries, filter, search])

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>Enquiries</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(60,48,40,0.5)' }}>
            {enquiries.length} total · {counts.NEW ?? 0} new
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(60,48,40,0.4)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries…"
            className="w-full font-body text-sm pl-8 pr-8 py-2 outline-none"
            style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'white', color: 'var(--luxury-dark)' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e)  => { e.target.style.borderColor = 'rgba(201,168,76,0.25)' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(60,48,40,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 mb-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', paddingBottom: '0' }}>
        {FILTERS.map((f) => {
          const active = filter === f
          const meta = f !== 'All' ? STATUS_META[f] : null
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative flex items-center gap-1.5 px-4 py-2.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
              style={{
                color: active ? (meta?.color || 'var(--gold-dark)') : 'rgba(60,48,40,0.48)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderBottom: active ? `2px solid ${meta?.color || 'var(--gold)'}` : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {f === 'All' ? 'All' : STATUS_META[f]?.label}
              <span
                className="font-ui text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: active ? (meta?.bg || 'rgba(201,168,76,0.12)') : 'rgba(60,48,40,0.06)',
                  color: active ? (meta?.color || 'var(--gold-dark)') : 'rgba(60,48,40,0.45)',
                }}
              >
                {counts[f] ?? 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        {loading ? (
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              <div className="flex-1"><div className="skeleton h-4 w-40 mb-1.5 rounded" /><div className="skeleton h-3 w-28 rounded" /></div>
              <div className="skeleton h-6 w-20 rounded" />
              <div className="skeleton h-3 w-20 rounded" />
            </div>
          ))
        ) : visible.length === 0 ? (
          <div className="text-center py-16">
            <Mail size={32} className="mx-auto mb-3 opacity-15" style={{ color: 'var(--gold)' }} />
            <p className="font-body text-sm" style={{ color: 'rgba(60,48,40,0.4)' }}>
              {search || filter !== 'All' ? 'No enquiries match your filters.' : 'No enquiries yet.'}
            </p>
          </div>
        ) : (
          visible.map((enq, i) => (
            <div key={enq.id} style={{ borderBottom: i < visible.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
              {/* Row */}
              <div className="flex items-center gap-3 px-5 py-4 transition-colors duration-150"
                style={{ background: expanded === enq.id ? '#fdf9f4' : 'white' }}>

                {/* Indicator dot */}
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: STATUS_META[enq.status]?.color || STATUS_META.NEW.color }} />

                {/* Name / contact */}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium truncate" style={{ color: 'var(--luxury-dark)' }}>{enq.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    {enq.email && (
                      <a href={`mailto:${enq.email}`} className="flex items-center gap-1 font-body text-xs hover:underline"
                        style={{ color: 'rgba(60,48,40,0.5)' }}>
                        <Mail size={10} /> {enq.email}
                      </a>
                    )}
                    {enq.phone && (
                      <a href={`tel:${enq.phone}`} className="flex items-center gap-1 font-body text-xs hover:underline"
                        style={{ color: 'rgba(60,48,40,0.5)' }}>
                        <Phone size={10} /> {enq.phone}
                      </a>
                    )}
                  </div>
                </div>

                {/* Subject */}
                {enq.subject && (
                  <p className="hidden md:block font-body text-xs truncate max-w-[160px]" style={{ color: 'rgba(60,48,40,0.45)' }}>
                    {enq.subject}
                  </p>
                )}

                {/* Project badge */}
                {enq.project?.title && (
                  <span className="hidden lg:flex items-center gap-1 font-ui text-[10px] tracking-wider uppercase px-2 py-0.5"
                    style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold-dark)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <Building2 size={9} /> {enq.project.title}
                  </span>
                )}

                {/* Status selector */}
                <div className="relative shrink-0">
                  <select
                    value={enq.status || 'NEW'}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                    disabled={updatingId === enq.id}
                    className="font-ui text-[10px] tracking-wider uppercase pr-5 pl-2 py-1 appearance-none disabled:opacity-50"
                    style={{
                      background: STATUS_META[enq.status]?.bg || STATUS_META.NEW.bg,
                      color: STATUS_META[enq.status]?.color || STATUS_META.NEW.color,
                      border: `1px solid ${STATUS_META[enq.status]?.border || STATUS_META.NEW.border}`,
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{STATUS_META[s]?.label || s}</option>
                    ))}
                  </select>
                  <ChevronDown size={9} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: STATUS_META[enq.status]?.color || STATUS_META.NEW.color }} />
                </div>

                {/* Date */}
                <span className="hidden sm:block font-body text-[10px] shrink-0" style={{ color: 'rgba(60,48,40,0.38)' }}>
                  {formatDate(enq.createdAt)}
                </span>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded((v) => v === enq.id ? null : enq.id)}
                  className="shrink-0 p-1 transition-colors duration-200"
                  style={{ color: 'rgba(60,48,40,0.38)', background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Toggle message"
                >
                  <ChevronDown
                    size={15}
                    style={{
                      transform: expanded === enq.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              </div>

              {/* Expanded message */}
              {expanded === enq.id && (
                <div className="px-5 pb-5 pt-1" style={{ background: '#fdf9f4' }}>
                  <div className="p-4" style={{ border: '1px solid rgba(201,168,76,0.14)', background: 'white' }}>
                    {enq.subject && (
                      <p className="font-ui text-[10px] tracking-widest uppercase mb-2 pb-2"
                        style={{ color: 'rgba(60,48,40,0.45)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                        Subject: {enq.subject}
                      </p>
                    )}
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--luxury-dark)' }}>
                      {enq.message || '(No message)'}
                    </p>
                    {enq.project?.title && (
                      <p className="font-ui text-[10px] tracking-wider uppercase mt-3 pt-3"
                        style={{ color: 'rgba(60,48,40,0.4)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                        Project: {enq.project.title}
                      </p>
                    )}
                    {/* Quick reply link */}
                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject || 'Your Enquiry')}`}
                        className="inline-flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase mt-3 transition-colors duration-200"
                        style={{ color: 'var(--gold-dark)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                      >
                        <Mail size={11} /> Reply via Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {visible.length > 0 && !loading && (
        <p className="font-body text-xs mt-3 text-right" style={{ color: 'rgba(60,48,40,0.38)' }}>
          Showing {visible.length} of {enquiries.length} enquiries
        </p>
      )}
    </div>
  )
}

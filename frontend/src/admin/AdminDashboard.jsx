import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2, TrendingUp, CheckCircle, Newspaper, Calendar,
  Briefcase, Mail, Plus, MapPin, Clock, ArrowRight,
} from 'lucide-react'
import { dashboardApi, careersApi, locationsApi } from '../services/api'
import { formatDate } from '../utils/helpers'

const STATUS_COLORS = {
  NEW:        { bg: 'rgba(37,99,235,0.1)',   color: '#1d4ed8',  label: 'New'       },
  CONTACTED:  { bg: 'rgba(217,119,6,0.1)',   color: '#b45309',  label: 'Contacted' },
  QUALIFIED:  { bg: 'rgba(124,58,237,0.1)',  color: '#6d28d9',  label: 'Qualified' },
  CLOSED:     { bg: 'rgba(22,163,74,0.1)',   color: '#15803d',  label: 'Closed'    },
}

const STATUS_BADGE = {
  ONGOING:   { bg: 'rgba(201,168,76,0.14)', color: '#7a5c00' },
  COMPLETED: { bg: 'rgba(30,22,14,0.07)',   color: '#4b5563' },
  UPCOMING:  { bg: 'rgba(37,99,235,0.1)',   color: '#1d4ed8' },
}

function StatCard({ icon: Icon, label, value, sub, color, to }) {
  const inner = (
    <div
      className="p-5 flex items-start gap-4 transition-all duration-200"
      style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 1px 6px rgba(13,11,8,0.05)' }}
      onMouseEnter={to ? (e) => { e.currentTarget.style.borderColor = color || 'var(--gold)' } : undefined}
      onMouseLeave={to ? (e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)' } : undefined}
    >
      <div className="w-11 h-11 flex items-center justify-center flex-shrink-0"
        style={{ background: `${color || 'var(--gold)'}18`, border: `1px solid ${color || 'var(--gold)'}35` }}>
        <Icon size={18} style={{ color: color || 'var(--gold)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-times text-3xl leading-none mb-1" style={{ color: 'var(--luxury-dark)' }}>
          {value ?? '—'}
        </p>
        <p className="font-ui text-[10px] tracking-wider uppercase" style={{ color: 'rgba(60,48,40,0.5)' }}>{label}</p>
        {sub && <p className="font-body text-[11px] mt-0.5" style={{ color: 'rgba(60,48,40,0.38)' }}>{sub}</p>}
      </div>
    </div>
  )
  return to ? <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link> : inner
}

function SkeletonCard() {
  return (
    <div className="p-5 flex items-start gap-4" style={{ background: 'white', border: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="skeleton w-11 h-11 flex-shrink-0" />
      <div className="flex-1">
        <div className="skeleton h-7 w-14 mb-2 rounded" />
        <div className="skeleton h-3 w-24 rounded" />
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [jobCount, setJobCount] = useState(null)
  const [locCount, setLocCount] = useState(null)

  useEffect(() => {
    dashboardApi.getStats()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))

    Promise.allSettled([careersApi.getAll(), locationsApi.getAll()]).then(([jr, lr]) => {
      if (jr.status === 'fulfilled') setJobCount(jr.value.data?.jobs?.length ?? null)
      if (lr.status === 'fulfilled') setLocCount(lr.value.data?.locations?.length ?? null)
    })
  }, [])

  const stats          = data?.stats
  const recentEnquiries = data?.recentEnquiries || []
  const recentProjects  = data?.recentProjects  || []

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-times text-2xl" style={{ color: 'var(--luxury-dark)' }}>Dashboard</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={11} style={{ color: 'rgba(60,48,40,0.38)' }} />
            <p className="font-body text-xs" style={{ color: 'rgba(60,48,40,0.45)' }}>{dateStr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/admin/enquiries"
            className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase px-4 py-2 transition-all duration-200"
            style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'rgba(60,48,40,0.65)', background: 'white' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.color = 'rgba(60,48,40,0.65)' }}
          >
            <Mail size={13} /> Enquiries
          </Link>
          <Link to="/admin/projects/new"
            className="btn-gold flex items-center gap-2"
            style={{ fontSize: '0.72rem', padding: '0.5rem 1.1rem' }}>
            <Plus size={13} /> New Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard to="/admin/projects" icon={Building2} label="Total Projects"   value={stats?.projects.total}   sub={`${stats?.projects.ongoing ?? 0} ongoing`} />
            <StatCard to="/admin/projects" icon={TrendingUp} label="Ongoing"         value={stats?.projects.ongoing}  color="#2563eb" />
            <StatCard to="/admin/projects" icon={CheckCircle} label="Completed"      value={stats?.projects.completed} color="#16a34a" />
            <StatCard to="/admin/enquiries" icon={Mail}      label="New Enquiries"   value={stats?.enquiries?.new}    sub={`${stats?.enquiries?.total ?? 0} total`} color="#dc2626" />
          </>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard to="/admin/news"     icon={Newspaper}  label="News Articles"   value={stats?.news}     color="#7c3aed" />
            <StatCard to="/admin/events"   icon={Calendar}   label="Events"          value={stats?.events}   color="#0891b2" />
            <StatCard to="/admin/careers"  icon={Briefcase}  label="Active Jobs"     value={jobCount}        color="#c2410c" />
            <StatCard to="/admin/locations" icon={MapPin}    label="Locations"       value={locCount}        color="#0f766e" />
          </>
        )}
      </div>

      {/* Recent content — two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Recent Enquiries */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-times text-lg" style={{ color: 'var(--luxury-dark)' }}>Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="flex items-center gap-1 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>
              All <ArrowRight size={11} />
            </Link>
          </div>
          <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
                  <div className="flex-1"><div className="skeleton h-3.5 w-32 mb-1 rounded" /><div className="skeleton h-2.5 w-24 rounded" /></div>
                  <div className="skeleton h-5 w-16 rounded" />
                </div>
              ))
            ) : recentEnquiries.length === 0 ? (
              <div className="text-center py-10 font-body text-sm" style={{ color: 'rgba(60,48,40,0.4)' }}>No enquiries yet</div>
            ) : (
              recentEnquiries.map((enq, i) => {
                const sc = STATUS_COLORS[enq.status] || STATUS_COLORS.NEW
                return (
                  <div
                    key={enq.id}
                    className="flex items-center gap-4 px-4 py-3.5"
                    style={{ borderBottom: i < recentEnquiries.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium truncate" style={{ color: 'var(--luxury-dark)' }}>{enq.name}</p>
                      <p className="font-body text-xs truncate" style={{ color: 'rgba(60,48,40,0.45)' }}>{enq.subject || enq.email}</p>
                    </div>
                    <span className="font-ui text-[10px] tracking-wider uppercase px-2 py-0.5 flex-shrink-0"
                      style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30` }}>
                      {sc.label}
                    </span>
                    <span className="font-body text-[10px] shrink-0" style={{ color: 'rgba(60,48,40,0.38)' }}>
                      {formatDate(enq.createdAt)}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-times text-lg" style={{ color: 'var(--luxury-dark)' }}>Recent Projects</h2>
            <Link to="/admin/projects" className="flex items-center gap-1 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--gold-dark)' }}>
              All <ArrowRight size={11} />
            </Link>
          </div>
          <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
                  <div className="flex-1"><div className="skeleton h-3.5 w-40 mb-1 rounded" /><div className="skeleton h-2.5 w-24 rounded" /></div>
                  <div className="skeleton h-5 w-20 rounded" />
                </div>
              ))
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-10 font-body text-sm" style={{ color: 'rgba(60,48,40,0.4)' }}>No projects yet</div>
            ) : (
              recentProjects.map((proj, i) => {
                const sb = STATUS_BADGE[proj.status] || STATUS_BADGE.COMPLETED
                return (
                  <Link
                    key={proj.id}
                    to={`/admin/projects/${proj.id}/edit`}
                    className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 block"
                    style={{
                      borderBottom: i < recentProjects.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fdf9f4' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium truncate" style={{ color: 'var(--luxury-dark)' }}>{proj.title}</p>
                      <p className="font-body text-xs" style={{ color: 'rgba(60,48,40,0.45)' }}>
                        {proj.location?.name || proj.address || '—'}
                      </p>
                    </div>
                    <span className="font-ui text-[10px] tracking-wider uppercase px-2 py-0.5 flex-shrink-0"
                      style={{ background: sb.bg, color: sb.color }}>
                      {proj.status}
                    </span>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Add bar */}
      <div className="p-5 flex flex-wrap gap-3 items-center"
        style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)' }}>
        <span className="font-ui text-[10px] tracking-widest uppercase self-center" style={{ color: 'rgba(60,48,40,0.4)' }}>
          Quick Add
        </span>
        {[
          { to: '/admin/projects/new', icon: Building2, label: 'Project'     },
          { to: '/admin/news/new',     icon: Newspaper, label: 'News'        },
          { to: '/admin/events/new',   icon: Calendar,  label: 'Event'       },
          { to: '/admin/careers/new',  icon: Briefcase, label: 'Job Listing' },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase px-4 py-2 transition-all duration-200"
            style={{ border: '1px solid rgba(201,168,76,0.22)', color: 'rgba(60,48,40,0.6)', background: 'transparent', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'; e.currentTarget.style.color = 'rgba(60,48,40,0.6)' }}
          >
            <Icon size={13} /> + {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

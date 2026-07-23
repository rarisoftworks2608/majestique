import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Newspaper, Calendar,
  Briefcase, Mail, LogOut, Menu, X, MapPin, ExternalLink,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/admin',            icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { to: '/admin/projects',   icon: Building2,       label: 'Projects'              },
  { to: '/admin/news',       icon: Newspaper,       label: 'News'                  },
  { to: '/admin/events',     icon: Calendar,        label: 'Events'                },
  { to: '/admin/locations',  icon: MapPin,          label: 'Locations'             },
  { to: '/admin/careers',    icon: Briefcase,       label: 'Careers'               },
  { to: '/admin/enquiries',  icon: Mail,            label: 'Enquiries'             },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-5 flex-shrink-0 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div>
          <p className="font-display text-xl leading-none" style={{ color: 'var(--gold)' }}>MAJESTIQUE</p>
          <p className="font-ui text-[10px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(201,168,76,0.5)' }}>Admin Panel</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View live site"
          className="flex items-center justify-center w-7 h-7 transition-all duration-200"
          style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.45)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'; e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = 'rgba(201,168,76,0.45)' }}
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            onClick={() => setSidebarOpen(false)}
          >
            {({ isActive }) => (
              <div
                className="flex items-center gap-3 px-4 py-2.5 mb-0.5 font-ui text-xs tracking-wider uppercase transition-all duration-200"
                style={{
                  color: isActive ? 'var(--gold)' : 'rgba(245,237,214,0.52)',
                  background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <Icon size={15} />
                <span className="flex-1">{label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + Logout */}
      <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        {admin && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 font-display text-sm font-bold"
              style={{
                background: '#1a1209',
                border: '1px solid rgba(196,164,85,0.4)',
                color: '#d4a830',
                textShadow: '0 0 8px rgba(212,168,48,0.9), 0 0 20px rgba(212,168,48,0.5)',
              }}>
              {(admin.name || admin.email).charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-body text-xs font-medium truncate" style={{ color: 'rgba(245,237,214,0.8)' }}>
                {admin.name || 'Admin'}
              </p>
              <p className="font-body text-[10px] truncate" style={{ color: 'rgba(201,168,76,0.45)' }}>
                {admin.role || 'Administrator'}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 font-ui text-xs tracking-wider uppercase transition-all duration-200"
          style={{ color: 'rgba(245,237,214,0.45)', background: 'transparent', border: '1px solid rgba(201,168,76,0.18)', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'; e.currentTarget.style.color = 'rgba(245,237,214,0.45)' }}
        >
          <LogOut size={13} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen" style={{ background: '#f5f0eb' }}>
      {/* Sidebar — desktop */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{
          width: '236px',
          background: 'var(--luxury-dark)',
          borderRight: '1px solid rgba(201,168,76,0.12)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(13,11,8,0.65)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 flex flex-col"
            style={{ width: '236px', background: 'var(--luxury-dark)', zIndex: 50 }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4"
              style={{ color: 'rgba(201,168,76,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-6 py-3.5"
          style={{
            background: 'white',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            boxShadow: '0 1px 4px rgba(13,11,8,0.04)',
          }}
        >
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setSidebarOpen(true)}
            style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--luxury-dark)', background: 'none', cursor: 'pointer' }}
          >
            <Menu size={16} />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="font-display text-sm" style={{ color: 'var(--luxury-dark)' }}>MAJESTIQUE</span>
            <span className="font-ui text-xs" style={{ color: 'rgba(60,48,40,0.3)' }}>/</span>
            <span className="font-ui text-xs tracking-widest uppercase" style={{ color: 'rgba(60,48,40,0.45)' }}>
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
              style={{ color: 'rgba(60,48,40,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(60,48,40,0.4)' }}
            >
              <ExternalLink size={11} /> Live Site
            </a>
            {admin && (
              <div className="w-7 h-7 flex items-center justify-center font-display text-sm font-bold"
                style={{
                  background: '#1a1209',
                  border: '1px solid rgba(196,164,85,0.4)',
                  color: '#d4a830',
                  textShadow: '0 0 8px rgba(212,168,48,0.9), 0 0 20px rgba(212,168,48,0.5)',
                }}>
                {(admin.name || admin.email).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

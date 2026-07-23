import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { isAuthenticated, loading: authLoading, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate('/admin', { replace: true })
  }, [isAuthenticated, authLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please enter your email and password.'); return }
    setError('')
    setSubmitting(true)
    try {
      await login(form)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1.25rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(201,168,76,0.3)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    color: 'var(--beige)',
    transition: 'border-color 0.3s',
  }

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--luxury-dark)' }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--luxury-dark)' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 opacity-40" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 opacity-40" style={{ borderColor: 'var(--gold)' }} />

        <div
          className="relative px-8 py-10"
          style={{
            background: 'rgba(44,31,14,0.5)',
            border: '1px solid rgba(201,168,76,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <p className="font-display text-3xl" style={{ color: 'var(--gold)' }}>MAJESTIQUE</p>
            <p className="font-ui text-xs tracking-[0.3em] uppercase mt-1" style={{ color: 'var(--gold-dark)' }}>Admin Portal</p>
            <div
              className="mx-auto mt-4"
              style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
            />
          </div>

          {error && (
            <div
              className="mb-5 px-4 py-3 font-body text-sm text-center"
              style={{ background: 'rgba(220,53,69,0.12)', border: '1px solid rgba(220,53,69,0.25)', color: '#f87171' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-ui text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(245,237,214,0.5)' }}>
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="admin@majestiqueproperties.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.3)' }}
              />
            </div>

            <div>
              <label className="font-ui text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(245,237,214,0.5)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  style={{ ...inputStyle, paddingRight: '3rem' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.3)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(201,168,76,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full justify-center flex items-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ marginTop: '1.25rem' }}
            >
              {submitting ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <LogIn size={15} />
              )}
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center font-body text-xs mt-6" style={{ color: 'rgba(245,237,214,0.25)' }}>
            Majestique Landmarks Admin v1.0
          </p>
        </div>
      </div>
    </div>
  )
}

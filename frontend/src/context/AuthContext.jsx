import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) { setLoading(false); return }
    try {
      const { data } = await authApi.me()
      setAdmin(data.admin)
    } catch {
      localStorage.removeItem('admin_token')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMe() }, [fetchMe])

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials)
    localStorage.setItem('admin_token', data.token)
    setAdmin(data.admin)
    return data
  }

  const logout = async () => {
    try { await authApi.logout() } catch { /* noop */ }
    localStorage.removeItem('admin_token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

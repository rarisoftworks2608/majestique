'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { PageLoader } from '@/components/ui/LoadingSpinner'

/* Replaces the router-level ProtectedRoute wrapper. Auth state lives in
   localStorage, so the check can only run after hydration — redirect in an
   effect rather than during render to avoid a setState-during-render
   warning and a hydration mismatch. */
export default function AdminGuard({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace('/admin/login')
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <PageLoader />
  return children
}

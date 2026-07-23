import { useState, useEffect } from 'react'
import { projectsApi } from '../services/api'

export function useProjects(params = {}) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    projectsApi.getAll(params)
      .then(({ data }) => { if (!cancelled) setProjects(data.projects) })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.error || 'Failed to load projects') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.status, params.featured, params.limit])

  return { projects, loading, error }
}

export function useProject(slug) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    projectsApi.getBySlug(slug)
      .then(({ data }) => {
        if (!cancelled) {
          const p = data.project
          setProject({ ...p, floorPlans: p.plans || [] })
        }
      })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.error || 'Project not found') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  return { project, loading, error }
}

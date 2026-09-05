import 'server-only'
import { API_BASE_URL } from '@/services/api'

/* Server-side data access for generateMetadata / generateStaticParams.
   Uses native fetch (not axios) so Next's data cache and revalidation
   apply, and returns null instead of throwing — a metadata failure must
   never take a page down, it should just fall back to defaults. */
async function getJSON(path, { revalidate = 300 } = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export const getProject = (slug) => getJSON(`/projects/${encodeURIComponent(slug)}`)
export const getNewsItem = (slug) => getJSON(`/news/${encodeURIComponent(slug)}`)
export const getEvent = (slug) => getJSON(`/events/${encodeURIComponent(slug)}`)
export const getJob = (id) => getJSON(`/careers/${encodeURIComponent(id)}`)

/* Listing endpoints — used by sitemap.js to enumerate dynamic URLs. */
export const listProjects = () => getJSON('/projects?limit=200', { revalidate: 3600 })
export const listNews = () => getJSON('/news?limit=200', { revalidate: 3600 })
export const listEvents = () => getJSON('/events?limit=200', { revalidate: 3600 })
export const listJobs = () => getJSON('/careers?limit=200', { revalidate: 3600 })

/* The API returns either a bare array or an envelope such as
   { projects: [...] } / { data: [...] } depending on the controller. */
export function unwrapList(payload, key) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (key && Array.isArray(payload[key])) return payload[key]
  for (const v of Object.values(payload)) if (Array.isArray(v)) return v
  return []
}

export function unwrapOne(payload, key) {
  if (!payload) return null
  if (key && payload[key]) return payload[key]
  if (payload.data) return payload.data
  return payload
}

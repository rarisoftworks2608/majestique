import { absoluteUrl } from '@/lib/site'
import { BLOGS } from '@/data/blogs'
import { AWARDS } from '@/data/awards'
import { CLIPPINGS } from '@/data/pressCoverage'
import { ARTICLES } from '@/data/articles'
import { ONGOING_PROJECTS } from '@/data/ongoingProjects'
import { COMPLETED_PROJECTS } from '@/data/completedProjects'
import { listNews, listEvents, listJobs, unwrapList } from '@/lib/api-server'

export const revalidate = 3600

/* priority/changeFrequency are advisory only, but they cost nothing and
   still inform some crawlers' scheduling. */
const STATIC_ROUTES = [
  ['/', 1.0, 'weekly'],
  ['/projects', 0.9, 'weekly'],
  ['/projects/ongoing', 0.9, 'weekly'],
  ['/projects/completed', 0.8, 'monthly'],
  ['/about/legacy', 0.7, 'yearly'],
  ['/about/leadership', 0.7, 'yearly'],
  ['/about/milestones', 0.6, 'yearly'],
  ['/about/vision-mission', 0.6, 'yearly'],
  ['/about/people-culture', 0.6, 'yearly'],
  ['/about/employee-engagement', 0.5, 'monthly'],
  ['/about/company-profile', 0.6, 'yearly'],
  ['/media/press-coverage', 0.7, 'monthly'],
  ['/media/articles', 0.7, 'monthly'],
  ['/media/announcements', 0.6, 'weekly'],
  ['/media/events', 0.6, 'weekly'],
  ['/media/blogs', 0.8, 'weekly'],
  ['/media/awards', 0.7, 'monthly'],
  ['/media/csr', 0.7, 'monthly'],
  ['/media/testimonials', 0.6, 'monthly'],
  ['/media/newsletter', 0.4, 'yearly'],
  ['/media/news', 0.6, 'weekly'],
  ['/careers', 0.7, 'weekly'],
  ['/contact', 0.8, 'monthly'],
  ['/privacy-policy', 0.2, 'yearly'],
  ['/terms', 0.2, 'yearly'],
  ['/disclaimer', 0.2, 'yearly'],
  ['/ec-certificates', 0.3, 'monthly'],
  ['/ecc', 0.3, 'monthly'],
]

export default async function sitemap() {
  const now = new Date()

  const entries = STATIC_ROUTES.map(([path, priority, changeFrequency]) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const push = (items, toUrl, opts = {}) => {
    for (const item of items) {
      const url = toUrl(item)
      if (url) entries.push({ url, lastModified: opts.date?.(item) || now, changeFrequency: opts.freq || 'monthly', priority: opts.priority ?? 0.6 })
    }
  }

  // Static-data collections — always available at build time.
  push(BLOGS, (b) => absoluteUrl(`/media/blogs/${b.slug}`), { date: (b) => (b.dateISO ? new Date(b.dateISO) : now), priority: 0.7 })
  push(AWARDS, (a) => absoluteUrl(`/media/awards/${a.slug}`), { priority: 0.6 })
  push(CLIPPINGS, (c) => absoluteUrl(`/media/press-coverage/${c.slug}`), { date: (c) => (c.dateISO ? new Date(c.dateISO) : now), priority: 0.6 })
  push(ARTICLES, (a) => absoluteUrl(`/media/articles/${a.slug}`), { date: (a) => (a.dateISO ? new Date(a.dateISO) : now), priority: 0.6 })

  // Project microsites are external links, so only in-app project detail
  // routes with a slug are emitted.
  const localProjects = [...ONGOING_PROJECTS, ...COMPLETED_PROJECTS].filter((p) => p.slug)
  push(localProjects, (p) => absoluteUrl(`/projects/${p.slug}`), { priority: 0.8, freq: 'weekly' })

  // API-backed collections. If the API is unreachable at build time the
  // sitemap still generates with everything else rather than failing.
  const [news, events, jobs] = await Promise.all([listNews(), listEvents(), listJobs()])
  push(unwrapList(news, 'news'), (n) => (n.slug ? absoluteUrl(`/media/news/${n.slug}`) : null), { priority: 0.6 })
  push(unwrapList(events, 'events'), (e) => (e.slug ? absoluteUrl(`/media/events/${e.slug}`) : null), { priority: 0.6 })
  push(unwrapList(jobs, 'jobs'), (j) => (j.id ? absoluteUrl(`/careers/${j.id}`) : null), { priority: 0.5, freq: 'weekly' })

  // De-dupe defensively — a slug colliding across sources would otherwise
  // emit the same URL twice.
  const seen = new Set()
  return entries.filter((e) => (seen.has(e.url) ? false : seen.add(e.url)))
}

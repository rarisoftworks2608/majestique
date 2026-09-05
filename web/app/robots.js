import { SITE_URL } from '@/lib/site'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
      /* Answer-engine crawlers are allowed explicitly (GEO/AEO): being
         cited by them depends on being crawlable by them. */
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/admin'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/admin'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

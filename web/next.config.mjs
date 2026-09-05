/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* AVIF first, WebP fallback — typically 30-50% smaller than the source
       JPEG/PNG for these architectural renders. */
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      /* Project/news imagery served by the Express API and the legacy
         WordPress origin used by the editorial content. */
      { protocol: 'https', hostname: 'real-estate-project-production-da1c.up.railway.app' },
      { protocol: 'https', hostname: 'majestiqueproperties.com' },
      { protocol: 'https', hostname: 'www.majestiqueproperties.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  compiler: {
    /* Strip console.* from production bundles, keeping error/warn for
       real diagnostics. */
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        /* Immutable, content-hashed build output. */
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/documents/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },

  /* No redirects: /media/news and /about/company-profile are deliberately
     kept as live pages alongside their newer equivalents, so redirecting
     them would remove working routes. */
}

export default nextConfig

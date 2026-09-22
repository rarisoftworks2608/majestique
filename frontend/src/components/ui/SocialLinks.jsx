import { SOCIAL_LINKS } from '../../utils/constants'

/* Official brand marks, drawn inline so the whole row shares one optical
   weight — the mixed icon packs we used before did not. Keyed to match
   SOCIAL_LINKS, which also feeds the Organization schema's sameAs. */
const MARKS = {
  instagram: {
    label: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  },
  facebook: {
    label: 'Facebook',
    path: 'M13.5 22v-8.2h2.79l.42-3.24H13.5V8.49c0-.94.26-1.58 1.6-1.58h1.72V4.02c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.29v2.38H7.29v3.24h2.85V22h3.36z',
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3.2 9.5h3.56V21H3.2V9.5zm5.81 0h3.41v1.57h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44V21h-3.55v-5.42c0-1.29-.02-2.96-1.8-2.96-1.8 0-2.08 1.41-2.08 2.86V21H9.01V9.5z',
  },
  youtube: {
    label: 'YouTube',
    path: 'M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.51C0 8.4 0 12 0 12s0 3.6.5 5.49a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.6 24 12 24 12s0-3.6-.5-5.49zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
  twitter: {
    label: 'X',
    path: 'M18.9 2.3h3.3l-7.2 8.24L23.5 21.7h-6.65l-5.2-6.81-5.96 6.81H2.38l7.7-8.8L1.3 2.3h6.82l4.7 6.22L18.9 2.3zm-1.16 17.42h1.83L6.44 4.18H4.48l13.26 15.54z',
  },
  pinterest: {
    label: 'Pinterest',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.19-.11-.95-.2-2.41.04-3.45l1.4-5.94s-.36-.71-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.02-.65 2.56-.99 3.98-.28 1.19.6 2.17 1.77 2.17 2.13 0 3.76-2.24 3.76-5.48 0-2.86-2.06-4.87-5-4.87-3.41 0-5.4 2.55-5.4 5.19 0 1.03.39 2.13.89 2.73.1.12.11.22.08.34l-.33 1.35c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.74-7.24 7.9-7.24 4.15 0 7.37 2.96 7.37 6.91 0 4.12-2.6 7.44-6.2 7.44-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15 1.12.35 2.31.53 3.55.53 6.63 0 12-5.37 12-12S18.63 0 12 0z',
  },
}

export default function SocialLinks({ size = 38, iconSize = 15, className = '' }) {
  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
        const mark = MARKS[platform]
        if (!mark) return null
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mark.label}
            title={mark.label}
            className="flex items-center justify-center rounded-full"
            style={{
              width: size,
              height: size,
              border: '1px solid rgba(212,175,55,0.32)',
              color: 'rgba(243,239,232,0.82)',
              transition: 'color 0.45s ease, background 0.45s ease, border-color 0.45s ease, transform 0.45s ease, box-shadow 0.45s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.color = 'var(--luxury-dark)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(212,175,55,0.32)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.32)'
              e.currentTarget.style.color = 'rgba(243,239,232,0.82)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={mark.path} />
            </svg>
          </a>
        )
      })}
    </div>
  )
}

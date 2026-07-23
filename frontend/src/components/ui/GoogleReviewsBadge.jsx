import { Star } from 'lucide-react'
import { SITE_NAME } from '../../utils/constants'

const GOOGLE_RATING = 4.5

function GoogleWordmark() {
  return (
    <div className="inline-flex items-center gap-2">
      <svg viewBox="0 0 48 48" style={{ width: '18px', height: '18px' }} aria-hidden="true">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
      </svg>
      <span className="leading-none" style={{ fontFamily: '"Product Sans", Arial, sans-serif', fontSize: '1rem', letterSpacing: '-0.01em' }}>
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
      </span>
      <span className="font-ui leading-none" style={{ fontSize: '0.8rem', color: 'rgba(10,10,10,0.55)', fontWeight: 500 }}>
        Reviews
      </span>
    </div>
  )
}

function StarRating({ value }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.25 && value - full < 0.75
  const totalFull = value - full >= 0.75 ? full + 1 : full

  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < totalFull) {
          return <Star key={i} size={15} fill="#F5B400" color="#F5B400" />
        }
        if (i === totalFull && hasHalf) {
          return (
            <span key={i} className="relative inline-flex" style={{ width: 15, height: 15 }}>
              <Star size={15} color="rgba(157,134,104,0.3)" style={{ position: 'absolute', inset: 0 }} />
              <span style={{ position: 'absolute', inset: 0, width: '50%', overflow: 'hidden' }}>
                <Star size={15} fill="#F5B400" color="#F5B400" />
              </span>
            </span>
          )
        }
        return <Star key={i} size={15} color="rgba(157,134,104,0.3)" />
      })}
    </div>
  )
}

export default function GoogleReviewsBadge({ className = '' }) {
  return (
    <div
      className={`relative inline-flex flex-col items-start gap-1.5 ${className}`}
      style={{ background: '#FAF8F5', border: '1px solid rgba(157,134,104,0.22)', boxShadow: '0 14px 36px rgba(0,0,0,0.3)', padding: '0.9rem 1.4rem' }}
    >
      <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: 'var(--gold)' }} />
      <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: 'var(--gold)' }} />

      <GoogleWordmark />
      <p className="font-body text-xs" style={{ color: 'rgba(10,10,10,0.55)' }}>{SITE_NAME}</p>
      <div className="flex items-center gap-2">
        <span className="font-display font-semibold" style={{ fontSize: '1rem', color: 'var(--luxury-dark)', lineHeight: 1 }}>
          {GOOGLE_RATING} / 5
        </span>
        <StarRating value={GOOGLE_RATING} />
      </div>
    </div>
  )
}

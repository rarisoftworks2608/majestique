import logoImg from '../../assets/logos/emblem.png'

export default function LoadingSpinner({ size = 'md', light = false }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} rounded-full border-2 animate-spin`}
        style={{
          borderColor: light
            ? 'rgba(243,239,232,0.2)'
            : 'rgba(157,134,104,0.2)',
          borderTopColor: light ? 'var(--beige)' : 'var(--gold)',
        }}
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{ background: 'var(--luxury-dark)' }}
    >
      <img
        src={logoImg}
        alt="Majestique Landmarks"
        style={{
          height: 'clamp(100px, 16vh, 160px)',
          width: 'auto',
          mixBlendMode: 'screen',
          animation: 'loader-pulse 1.6s ease-in-out infinite',
        }}
      />
      <div
        className="w-8 h-8 rounded-full border-2 animate-spin"
        style={{
          borderColor: 'rgba(157,134,104,0.18)',
          borderTopColor: 'var(--gold)',
        }}
      />
      <style>{`
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

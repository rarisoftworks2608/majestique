import { motion } from 'framer-motion'

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${isCenter ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <span className="section-label block mb-3">{label}</span>
      )}

      <span
        className={`${isCenter ? 'gold-line-center' : 'gold-line'}`}
      />

      <h2
        className="font-times font-normal leading-tight mb-4"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
          color: light ? 'var(--beige)' : 'var(--luxury-dark)',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="font-body text-lg leading-relaxed max-w-2xl"
          style={{
            color: light
              ? 'rgba(243,239,232,0.92)'
              : 'rgba(10,10,10,0.86)',
            fontWeight: 400,
            marginLeft: isCenter ? 'auto' : undefined,
            marginRight: isCenter ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

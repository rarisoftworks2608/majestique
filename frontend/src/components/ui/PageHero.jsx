import { motion } from 'framer-motion'

export default function PageHero({
  title,
  subtitle,
  label,
  bgImage,
}) {
  return (
    <section
      className="relative flex items-end overflow-hidden -mt-20 lg:-mt-[118px]"
      style={{
        minHeight: 'clamp(320px, 40vh, 460px)',
        background: bgImage ? undefined : 'var(--luxury-dark2)',
      }}
    >
      {/* Background image — slow Ken Burns drift */}
      {bgImage && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 9, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Background image overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.9) 100%)',
        }}
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, var(--gold), var(--gold-dark), transparent)',
        }}
      />

      {/* Subtle warm corner glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 20%, rgba(212,175,55,0.07) 0%, transparent 55%)',
        }}
      />

      <div className="container-luxury relative z-10 pb-14 pt-24 lg:pt-28">
        {/* Overline label */}
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="overline-label mb-4"
          >
            {label}
          </motion.p>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-normal leading-[1.12]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: 'var(--beige)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body text-base max-w-xl mt-4 leading-[1.8]"
            style={{ color: 'rgba(243,239,232,0.92)', fontWeight: 400 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Bottom gold accent */}
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '52px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block mt-6"
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          }}
        />
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const fU = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, delay: d, ease },
})

export default function LiveMajestiqueSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#FAF6EF' }}>
      {/* Top / bottom hairlines — matches every other homepage section */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />

      <div className="container-luxury relative text-center" style={{ paddingTop: 'clamp(3.25rem, 6vw, 4.5rem)', paddingBottom: 'clamp(3.25rem, 6vw, 4.5rem)' }}>
        <div style={{ maxWidth: '820px', marginInline: 'auto' }}>

          {/* Label */}
          <motion.span
            {...fU()}
            className="font-ui text-[0.78rem] tracking-[0.28em] uppercase font-bold block mb-4"
            style={{ color: 'var(--gold)' }}
          >
            ✦ &nbsp; Live Majestique &nbsp; ✦
          </motion.span>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="mx-auto"
            style={{ width: '44px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', marginBottom: '1.5rem' }}
          />

          {/* Heading — full opening statement, verbatim, dominant size */}
          <motion.h2
            {...fU(0.14)}
            className="font-display font-light"
            style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)', lineHeight: 1.35, color: 'var(--ink)', letterSpacing: '0.005em' }}
          >
            To Live Majestique is to choose a life where every day is defined by{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>purpose</em>, every moment holds{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>meaning</em>, and every experience feels truly{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>fulfilling</em>.
          </motion.h2>

          {/* Body — remaining content flows as one paragraph, no separate quote treatment */}
          <motion.p
            {...fU(0.26)}
            className="font-body mt-7"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(26,26,26,0.65)', fontWeight: 400, lineHeight: 1.9 }}
          >
            It is the belief that a home should be more than just an address. It should reflect your ambition,
            evolve with your aspirations, and grow alongside every milestone of your journey. It is where dreams
            take shape, relationships flourish, and everyday moments become lasting memories. Because true luxury
            is not defined by what surrounds you, but by the life you create within it.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

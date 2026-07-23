import { motion } from 'framer-motion'
import missionImg from '../../assets/Mission_vision.jpg'

const VISION = 'To be recognized as one of India\'s most trusted and admired real estate brands, creating exceptional developments that redefine lifestyles, inspire communities, and deliver lasting value for generations.'

const MISSION = [
  'Create thoughtfully designed, high-quality developments that combine innovation and sustainability',
  'Maintain the highest standards of integrity, transparency, and execution across every project',
  'Enrich lives through exceptional spaces and foster long-term relationships with our customers',
  'Contribute positively to the communities we serve through responsible development practices',
]

export default function InvestmentSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ background: '#FDFAF6' }}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >

      <div className="grid grid-cols-1 lg:grid-cols-[52%_48%]"
        style={{ minHeight: 'clamp(420px, 75vh, 700px)' }}>

        {/* ── LEFT — Vision & Mission content ── */}
        <motion.div
          className="flex flex-col justify-center px-10 lg:px-16 py-14"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Vision block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mb-9"
          >
            <span className="font-ui text-[0.78rem] tracking-[0.28em] uppercase font-bold block mb-4"
              style={{ color: 'var(--gold)' }}>
              ✦ &nbsp; Our Vision &nbsp; ✦
            </span>
            <div className="mb-4" style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />

            <p className="font-body"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(10,10,10,0.85)', fontWeight: 400, lineHeight: 1.8, maxWidth: '520px' }}>
              {VISION}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="mb-7"
            style={{ height: '1px', background: 'linear-gradient(90deg, rgba(157,134,104,0.4), transparent)', transformOrigin: 'left' }}
          />

          {/* Mission block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.45 }}
          >
            <span className="font-ui text-[0.78rem] tracking-[0.28em] uppercase font-bold block mb-4"
              style={{ color: 'var(--gold)' }}>
              ✦ &nbsp; Our Mission &nbsp; ✦
            </span>
            <div className="mb-5" style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />

            <div className="space-y-0">
              {MISSION.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-4 py-3.5 group"
                  style={{}}
                >
                  <span className="font-display font-semibold flex-shrink-0 mt-0.5 select-none"
                    style={{ fontSize: '0.95rem', color: 'var(--gold-dark)', letterSpacing: '0.06em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-shrink-0 mt-3"
                    style={{ width: '14px', height: '2px', background: 'var(--gold)' }} />
                  <p className="font-body"
                    style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(10,10,10,0.85)', fontWeight: 400, lineHeight: 1.8 }}>
                    {m}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — image with reveal ── */}
        <div className="relative overflow-hidden" style={{ minHeight: '360px' }}>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
          >
            <img
              src={missionImg}
              alt="Our Vision & Mission"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Left blend */}
            <div className="absolute inset-y-0 left-0 hidden lg:block"
              style={{ width: '70px', background: 'linear-gradient(to right, #FDFAF6, transparent)' }} />
          </motion.div>

          {/* Overlay quote mark decoration */}
          <div className="absolute top-8 right-8 pointer-events-none select-none z-10 font-display font-light"
            style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', color: 'rgba(255,255,255,0.12)', lineHeight: 0.7 }}
            aria-hidden="true">
            "
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-5 right-5 w-8 h-8 border-r-2 border-t-2 z-10"
            style={{ borderColor: 'rgba(157,134,104,0.55)' }} />
          <div className="absolute bottom-5 right-5 w-8 h-8 border-r-2 border-b-2 z-10"
            style={{ borderColor: 'rgba(157,134,104,0.35)' }} />

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.9 }}
            className="absolute bottom-7 left-7 z-10 px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(157,134,104,0.22)', backdropFilter: 'blur(14px)', boxShadow: '0 6px 24px rgba(10,10,10,0.06)' }}
          >
            <div className="h-px mb-1.5" style={{ width: '16px', background: 'var(--gold)' }} />
            <p className="font-ui text-[0.44rem] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(10,10,10,0.5)' }}>
              Est. 2002 · Majestique Landmarks
            </p>
          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}

import { motion } from 'framer-motion'

const AMENITIES = [
  {
    n: '01',
    title: 'Grand Clubhouse & Social Spaces',
    desc: 'A sprawling members-only clubhouse with banquet halls, lounge areas, and curated social spaces designed for elevated community living.',
  },
  {
    n: '02',
    title: 'Infinity Pool & Wellness Spa',
    desc: 'Resort-inspired infinity pools paired with a world-class spa — delivering a daily retreat from the pace of urban life, steps from your door.',
  },
  {
    n: '03',
    title: 'Landscaped Gardens & Green Retreats',
    desc: 'Meticulously curated green spaces, walking promenades, and meditation gardens that bring nature into the heart of the community.',
  },
  {
    n: '04',
    title: 'State-of-the-Art Fitness Centre',
    desc: 'Premium gym equipment, yoga and meditation studios, and personal training facilities — all within the community, at your convenience.',
  },
  {
    n: '05',
    title: 'Sports & Recreation Zones',
    desc: 'From tennis courts and basketball arenas to cricket pitches and jogging tracks — a complete sporting ecosystem for every age.',
  },
  {
    n: '06',
    title: "Children's Play & Learning Areas",
    desc: 'Age-appropriate play zones and interactive learning gardens that nurture young minds in a safe, engaging, and inspiring environment.',
  },
  {
    n: '07',
    title: 'Smart Home Technology',
    desc: 'Integrated home automation, high-speed fibre connectivity, and intelligent building management systems for a seamlessly future-ready lifestyle.',
  },
  {
    n: '08',
    title: '24/7 Security & Concierge',
    desc: 'Multi-layered security with CCTV surveillance, biometric access control, and a dedicated concierge team ensuring complete peace of mind.',
  },
]

export default function AmenitiesSection() {
  return (
    <section style={{ background: 'var(--pearl)' }}>
      <div className="container-luxury" style={{ paddingTop: '6rem' }}>
        {/* Header — left aligned */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-ui text-[0.82rem] tracking-[0.28em] uppercase font-bold block mb-6"
            style={{ color: 'var(--gold)' }}
          >
            ✦ &nbsp; Curated Lifestyle &nbsp; ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: 'var(--ink)', letterSpacing: '0.01em', maxWidth: '700px' }}
          >
            Crafted For<br />
            <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Elevated Living</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body mt-6"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'rgba(10,10,10,0.86)', fontWeight: 400, maxWidth: '560px', lineHeight: 1.85 }}
          >
            At Majestique, every development is a complete lifestyle ecosystem —
            where world-class amenities, wellness spaces, and recreational experiences
            converge to create a life of effortless luxury.
          </motion.p>
        </div>
      </div>

      {/* 4×2 amenity grid — full bleed */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: '1px solid rgba(10,10,10,0.07)' }}
      >
        {AMENITIES.map((a, i) => (
          <motion.div
            key={a.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 lg:p-10 group transition-colors duration-300 hover:bg-[rgba(157,134,104,0.07)]"
            style={{
              borderBottom: '1px solid rgba(10,10,10,0.07)',
              borderRight: (i + 1) % 4 !== 0 ? '1px solid rgba(10,10,10,0.07)' : 'none',
            }}
          >
            <span
              className="font-display font-light block mb-5 transition-colors duration-300"
              style={{ fontSize: '1.1rem', color: 'rgba(10,10,10,0.12)', letterSpacing: '0.06em' }}
            >
              {a.n}
            </span>
            <div
              className="mb-5 transition-colors duration-300 group-hover:bg-[var(--gold)]"
              style={{ width: '24px', height: '1px', background: 'var(--gold)' }}
            />
            <h3
              className="font-display font-light mb-3 transition-colors duration-300"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', color: 'var(--ink)', letterSpacing: '0.02em', lineHeight: 1.35 }}
            >
              {a.title}
            </h3>
            <p
              className="font-body leading-relaxed transition-colors duration-300"
              style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', color: 'rgba(10,10,10,0.84)', fontWeight: 400 }}
            >
              {a.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-ui py-8"
        style={{ fontSize: '0.45rem', letterSpacing: '0.28em', color: 'rgba(10,10,10,0.25)', textTransform: 'uppercase', borderTop: '1px solid rgba(10,10,10,0.07)' }}
      >
        ✦ &nbsp; Amenities vary by project · Subject to availability &nbsp; ✦
      </motion.p>
    </section>
  )
}

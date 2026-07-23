import { motion } from 'framer-motion'

const STATS = [
  { raw: '20M+',  label: 'Sq. Ft. Developed'       },
  { raw: '18K+',  label: 'Happy Families'           },
  { raw: '30+',   label: 'Landmark Developments'    },
  { raw: '18+',   label: 'Ongoing Projects'         },
  { raw: '10M+',  label: 'Sq. Ft. Delivered'        },
  { raw: '15+',   label: 'Prime Locations'          },
  { raw: '100%',  label: 'On-Time Delivery'         },
  { raw: 'RERA',  label: 'Compliant Developments'   },
]

export default function StatsSection() {
  const track = [...STATS, ...STATS]

  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ background: '#fff' }}
      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.97 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.3),transparent)' }} />

      {/* Top micro label */}
      <div className="flex items-center justify-center gap-3 py-3"
        style={{ borderBottom: '1px solid rgba(157,134,104,0.1)' }}>
        <div style={{ height: '1px', width: '18px', background: 'rgba(157,134,104,0.35)' }} />
        <span className="font-ui text-[0.46rem] tracking-[0.34em] uppercase"
          style={{ color: 'rgba(157,134,104,0.6)' }}>
          Trusted By Thousands · Built For Generations
        </span>
        <div style={{ height: '1px', width: '18px', background: 'rgba(157,134,104,0.35)' }} />
      </div>

      {/* ── Moving stats strip ── */}
      <div className="overflow-hidden" style={{ padding: '18px 0' }}>
        <div className="stats-ticker">
          {track.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-0 flex-shrink-0"
            >
              {/* Stat block */}
              <div className="flex items-baseline gap-2 px-10">
                <span
                  className="font-display font-light tabular-nums leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', color: 'var(--ink)', letterSpacing: '-0.03em' }}
                >
                  {stat.raw}
                </span>
                <span
                  className="font-ui tracking-[0.16em] uppercase leading-none"
                  style={{ fontSize: 'clamp(0.46rem, 0.65vw, 0.58rem)', color: 'rgba(10,10,10,0.4)' }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Diamond separator */}
              <span
                className="flex-shrink-0 select-none"
                style={{ fontSize: '0.5rem', color: 'rgba(157,134,104,0.55)', margin: '0 2px' }}
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-ticker {
          display: flex;
          align-items: center;
          width: max-content;
          animation: statsTicker 40s linear infinite;
          will-change: transform;
        }
        .stats-ticker:hover {
          animation-play-state: paused;
        }
        @keyframes statsTicker {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
      `}</style>
    </motion.section>
  )
}

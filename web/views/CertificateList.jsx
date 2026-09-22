'use client'

import { motion } from 'framer-motion'
import { FileText, ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'

export default function CertificateList({ title, subtitle, breadcrumbLabel, items }) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={['Home', breadcrumbLabel]}
        bgImage="https://majestiqueproperties.com/wp-content/uploads/2025/03/Aravali-01-scaled.webp"
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <motion.li
                  key={item.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.4) }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5 h-full p-5 transition-all duration-300"
                    style={{ background: 'white', border: '1px solid rgba(212,175,55,0.18)' }}
                  >
                    <span
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                      style={{ border: '1px solid rgba(212,175,55,0.28)', background: 'rgba(212,175,55,0.07)' }}
                    >
                      <FileText size={15} style={{ color: 'var(--gold)' }} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className="font-body text-sm leading-snug block transition-colors duration-200 group-hover:text-[var(--gold-dark)]"
                        style={{ color: 'var(--luxury-dark)' }}
                      >
                        {item.title}
                      </span>
                      {item.note && (
                        <span className="font-body text-xs block mt-1" style={{ color: 'rgba(26,26,26,0.6)' }}>
                          {item.note}
                        </span>
                      )}
                      <span className="font-ui text-[0.6rem] tracking-widest uppercase inline-flex items-center gap-1 mt-2" style={{ color: 'var(--gold-dark)' }}>
                        View PDF <ArrowUpRight size={11} />
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

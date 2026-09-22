import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe2, ShieldCheck, Wallet, Headset, ArrowRight, Clock } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Seo from '../components/ui/Seo'
import { SITE_PHONE, MARKETING_EMAIL } from '../utils/constants'
import heroImg from '../assets/Majestique-Towers-Elevation-01-2048x1152.webp'

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Trusted & Transparent',
    desc: 'MahaRERA-registered, debt-free projects with clear titles, built for confident long-distance investment.',
  },
  {
    icon: Wallet,
    title: 'End-to-End Assistance',
    desc: 'Guidance on funding, repatriation, and documentation tailored for Non-Resident Indian investors.',
  },
  {
    icon: Headset,
    title: 'Dedicated NRI Desk',
    desc: 'A single point of contact to manage your purchase, from enquiry to handover, across time zones.',
  },
]

export default function NRI() {
  return (
    <>
      <Seo
        title="NRI Corner"
        description="A dedicated space for Non-Resident Indians investing in Majestique Landmarks' luxury residences and commercial spaces in Pune. Details coming soon."
      />

      <PageHero
        label="For Our Global Family"
        title="NRI Corner"
        subtitle="A dedicated space for Non-Resident Indians investing in Pune real estate, guidance, support, and trusted addresses from wherever you are in the world."
        bgImage={heroImg}
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8"
                style={{ border: '1px solid rgba(212,175,55,0.14)', background: 'white' }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ border: '1px solid rgba(212,175,55,0.22)', background: 'rgba(212,175,55,0.04)' }}
                >
                  <h.icon size={18} style={{ color: 'var(--gold)' }} />
                </div>
                <p className="font-display text-lg mb-2" style={{ color: 'var(--luxury-dark)' }}>
                  {h.title}
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.62)' }}>
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Coming soon notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center p-12"
            style={{ border: '1px solid rgba(212,175,55,0.18)', background: 'white' }}
          >
            <div
              className="w-14 h-14 mx-auto flex items-center justify-center mb-6"
              style={{ border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.05)' }}
            >
              <Globe2 size={24} style={{ color: 'var(--gold)' }} />
            </div>

            <span className="overline-label mb-3 inline-flex items-center gap-2 justify-center">
              <Clock size={11} /> Coming Soon
            </span>

            <h2
              className="font-display text-[1.8rem] lg:text-[2.2rem] leading-[1.15] mb-4"
              style={{ color: 'var(--luxury-dark)' }}
            >
              We're Building Something Special for You
            </h2>

            <p className="font-body text-[0.95rem] leading-[1.8] mb-8" style={{ color: 'rgba(44,62,88,0.65)' }}>
              Detailed investment guides, FAQs, and services for our NRI patrons are on the way. Until then, our team is ready to assist you directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-gold" style={{ fontSize: '0.68rem' }}>
                Get in Touch <ArrowRight size={14} />
              </Link>
              <a
                href={`mailto:${MARKETING_EMAIL}`}
                className="font-ui text-[0.7rem] tracking-widest uppercase"
                style={{ color: 'var(--luxury-charcoal)' }}
              >
                {MARKETING_EMAIL}
              </a>
            </div>

            <p className="font-body text-[0.8rem] mt-6" style={{ color: 'rgba(44,62,88,0.5)' }}>
              Or call us at{' '}
              <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} style={{ color: 'var(--gold-dark)' }}>
                {SITE_PHONE}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

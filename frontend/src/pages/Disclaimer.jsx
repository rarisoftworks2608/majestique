import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import Seo from '../components/ui/Seo'
import { SITE_EMAIL, MARKETING_EMAIL, SITE_ADDRESS } from '../utils/constants'

const fU = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* Wording carried over verbatim from majestiqueproperties.com/disclaimer */
const PARAGRAPHS = [
  'The information contained on the mentions details of the Projects/developments undertaken by the Company including depicting banners/posters of the Project. The contents are being modified in terms of the stipulations / recommendations under the Real Estate Regulation Act, 2016 and Rules made there under (“RERA”) and accordingly may not be fully in line thereof as of date. You are therefore required to verify all the details, including area, amenities, services, terms of sales and payments and other relevant terms independently.',
  'Majestique Landmarks does not guarantee the accuracy, completeness, or reliability of the information and shall not be held responsible for any action taken based on the information contained herein. You are advised to conduct an independent verification before entering into any transaction.',
]

const EMAILS = [MARKETING_EMAIL, SITE_EMAIL, 'customersupport@majestique.co.in']

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Disclaimer"
        description="Disclaimer for the Majestique Landmarks website. Project information is being updated in line with RERA 2016; please verify all details independently."
      />

      <PageHero
        title="Disclaimer"
        subtitle="Please read this disclaimer carefully before relying on any information published on this website"
        breadcrumb={['Home', 'Disclaimer']}
        bgImage="https://majestiqueproperties.com/wp-content/uploads/2025/03/Aravali-01-scaled.webp"
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">

            {PARAGRAPHS.map((text, i) => (
              <motion.div key={i} {...fU(i * 0.06)} className="relative pl-6 mb-10">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 + 0.15 }}
                  className="absolute left-0 top-1"
                  style={{ width: '2px', height: 'calc(100% - 0.5rem)', background: 'linear-gradient(180deg, var(--gold), transparent)', transformOrigin: 'top' }}
                />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.86)' }}>
                  {text}
                </p>
              </motion.div>
            ))}

            <motion.div
              {...fU(0.16)}
              className="p-8"
              style={{ background: 'white', border: '1px solid rgba(212,175,55,0.2)' }}
            >
              <h2 className="font-times font-normal text-2xl mb-5" style={{ color: 'var(--luxury-dark)' }}>
                For any further information
              </h2>
              <ul className="space-y-2 mb-6">
                {EMAILS.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="font-body text-sm break-all transition-colors duration-200"
                      style={{ color: 'var(--gold-dark)' }}
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm mb-1" style={{ color: 'rgba(26,26,26,0.86)' }}>
                <a href="tel:02024262740" style={{ color: 'var(--gold-dark)' }}>020 24 26 27 40/50/60</a>
              </p>
              <p className="font-body text-sm leading-relaxed mt-5 pt-5" style={{ color: 'rgba(26,26,26,0.7)', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
                {SITE_ADDRESS}
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

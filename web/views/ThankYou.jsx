'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Phone, Mail } from 'lucide-react'
import { SITE_PHONE, ENQUIRY_EMAIL } from '../utils/constants'

/* Each form redirects here with ?type=… so the confirmation can say something
   specific about what happens next, rather than one generic message. */
const CONTENT = {
  enquiry: {
    label: 'Enquiry Received',
    title: 'Thank You for Reaching Out',
    lead: 'Your enquiry is with our sales team. A relationship manager will be in touch to understand exactly what you are looking for.',
    steps: [
      { n: '01', h: 'We review your requirement', p: 'Your preferred configuration, budget and location go to the right specialist.' },
      { n: '02', h: 'A relationship manager calls', p: 'Expect a call within 24 business hours, at a time that works for you.' },
      { n: '03', h: 'We arrange your site visit', p: 'Walk the actual floors, sample flat and amenities before you decide.' },
    ],
  },
  partner: {
    label: 'Application Received',
    title: 'Thank You for Your Interest in Partnering',
    lead: 'Your channel partner application has reached our team. We review every application individually before onboarding.',
    steps: [
      { n: '01', h: 'We review your application', p: 'Our channel partner desk checks your details and operating markets.' },
      { n: '02', h: 'We verify your credentials', p: 'Including your RERA registration and recent transaction history.' },
      { n: '03', h: 'You receive your onboarding kit', p: 'Commission structure, inventory access and marketing collateral.' },
    ],
  },
  newsletter: {
    label: 'Subscription Confirmed',
    title: 'You Are on the List',
    lead: 'Thank you for subscribing. You will now receive project launches, event invitations and market insight from Majestique Landmarks.',
    steps: [
      { n: '01', h: 'New launch previews', p: 'Hear about new addresses before they are publicly announced.' },
      { n: '02', h: 'Invitations to events', p: 'Site previews, launch evenings and customer milestones.' },
      { n: '03', h: 'Pune market insight', p: 'Considered commentary on the neighbourhoods we build in.' },
    ],
  },
}

export default function ThankYou() {
  const params = useSearchParams()
  const type = params.get('type')
  const content = CONTENT[type] || CONTENT.enquiry

  /* The section is pulled up under the fixed navbar so the cream runs behind
     it; this page has no PageHero to fill that band. */
  return (
    <section
      className="relative overflow-hidden -mt-20 lg:-mt-[118px] pt-44 lg:pt-60 pb-24"
      style={{ background: 'var(--cream)' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)' }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(212,175,55,0.045)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          THANK YOU
        </span>
      </div>

      <div className="container-luxury relative">
        <div className="text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 17, delay: 0.05 }}
            className="mx-auto mb-8 flex items-center justify-center rounded-full"
            style={{ width: 76, height: 76, border: '1px solid rgba(212,175,55,0.45)', background: 'rgba(212,175,55,0.07)' }}
          >
            <Check size={30} strokeWidth={1.6} style={{ color: 'var(--gold-dark)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-ui text-[11px] tracking-[0.28em] uppercase mb-4"
            style={{ color: 'var(--gold-dark)' }}
          >
            {content.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
            className="font-times font-normal leading-tight mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--luxury-dark)' }}
          >
            {content.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-px mx-auto mb-7"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.36 }}
            className="font-body leading-relaxed"
            style={{ fontSize: '0.95rem', color: 'rgba(26,26,26,0.62)' }}
          >
            {content.lead}
          </motion.p>
        </div>

        {/* What happens next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(212,175,55,0.18)', maxWidth: '940px', margin: '3.5rem auto 0' }}>
          {content.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
              className="p-7 text-center"
              style={{ background: '#fff' }}
            >
              <p className="font-display font-light mb-3" style={{ fontSize: '1.5rem', color: 'rgba(212,175,55,0.55)', lineHeight: 1 }}>{step.n}</p>
              <h2 className="font-times font-normal mb-2" style={{ fontSize: '1.05rem', color: 'var(--luxury-dark)' }}>{step.h}</h2>
              <p className="font-body leading-relaxed" style={{ fontSize: '0.8rem', color: 'rgba(26,26,26,0.55)' }}>{step.p}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link href="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105">
            Explore Our Projects
          </Link>
          <Link href="/" className="btn-outline-dark transition-transform duration-300 hover:scale-105">
            Back to Home
          </Link>
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8"
          style={{ borderTop: '1px solid rgba(212,175,55,0.15)', maxWidth: '640px', margin: '3rem auto 0' }}
        >
          <p className="font-body w-full text-center mb-1" style={{ fontSize: '0.8rem', color: 'rgba(26,26,26,0.5)' }}>
            Need to speak to someone sooner?
          </p>
          <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 font-body" style={{ fontSize: '0.85rem', color: 'var(--luxury-dark)' }}>
            <Phone size={14} style={{ color: 'var(--gold)' }} /> {SITE_PHONE}
          </a>
          <a href={`mailto:${ENQUIRY_EMAIL}`} className="flex items-center gap-2 font-body" style={{ fontSize: '0.85rem', color: 'var(--luxury-dark)' }}>
            <Mail size={14} style={{ color: 'var(--gold)' }} /> {ENQUIRY_EMAIL}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

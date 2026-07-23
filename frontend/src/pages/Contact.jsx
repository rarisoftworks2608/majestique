import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle2, ChevronDown, Briefcase, Users, Building2 } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { enquiriesApi } from '../services/api'
import Seo from '../components/ui/Seo'
import contactHeroImg from '../assets/contact-us-customer.jpg'
import contactOfficeImg from '../assets/Contact-Us-Majestique.jpg'

/* ─── Constants ────────────────────────────────────────────── */

const PROJECTS = [
  'Majestique Evolvus',
  'The Ornate',
  '27 Grand Residences',
  'Majestique Rhythm County',
  'Majestique Ephelia',
  'Majestique Aravali',
  'Majestique Towers',
]

const PROPERTY_TYPES = [
  '1 BHK Apartment',
  '2 BHK Apartment',
  '3 BHK Apartment',
  '4 BHK Apartment',
  'Penthouse',
  'Villa',
  'Plot',
  'Commercial Space',
]

const UNIT_TYPES = ['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Duplex']

const CONTACT_INFO = [
  { icon: MapPin, label: 'Our Office', value: '9th Floor, Jawaharlal Nehru Rd, opp. Apsara Theatre, Guru Nanak Nagar, Pune – 411037' },
  { icon: Phone,  label: 'Phone',         value: '+91 74480 99000',                     href: 'tel:+917448099000' },
  { icon: Mail,   label: 'Sales Enquiry', value: 'sales@majestiqueproperties.com',      href: 'mailto:sales@majestiqueproperties.com' },
  { icon: Mail,   label: 'Support',       value: 'info@majestiqueproperties.com',       href: 'mailto:info@majestiqueproperties.com' },
  { icon: Clock,  label: 'Office Hours',  value: 'Mon–Sat: 10 AM – 7 PM' },
]

const SOCIAL = [
  { icon: FaFacebookF,  href: 'https://www.facebook.com/MajestiquePune',                   label: 'Facebook' },
  { icon: FaInstagram,  href: 'https://www.instagram.com/MajestiquePune',                  label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/majestique-landmarks',     label: 'LinkedIn' },
  { icon: FaYoutube,    href: 'https://www.youtube.com/@MajestiquePune',                   label: 'YouTube' },
  { icon: FaWhatsapp,   href: 'https://wa.me/917448099000',                                label: 'WhatsApp' },
]

const MAP_CID = '13336261504592725948'
const MAP_EMBED_SRC = `https://www.google.com/maps?cid=${MAP_CID}&output=embed`

const TABS = [
  { id: 'buy',     label: 'Buy Property',    icon: Building2 },
  { id: 'job',     label: 'Seek Job',        icon: Briefcase },
  { id: 'partner', label: 'Channel Partner', icon: Users },
]

/* ─── Shared input style ────────────────────────────────────── */
const inp = {
  width: '100%',
  padding: '0.82rem 1.1rem',
  background: '#fff',
  border: '1px solid rgba(157,134,104,0.28)',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'var(--luxury-dark)',
  transition: 'border-color 0.25s',
  borderRadius: 0,
  appearance: 'none',
}

/* ─── Sub-components ────────────────────────────────────────── */

function Field({ error, children }) {
  return (
    <div>
      {children}
      {error && <p className="font-body text-[11px] mt-1" style={{ color: '#c0392b' }}>{error}</p>}
    </div>
  )
}

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(157,134,104,0.6)' }} />
    </div>
  )
}

/* ─── BUY PROPERTY FORM ─────────────────────────────────────── */
function BuyPropertyForm() {
  const [form, setForm] = useState({
    contactMode: 'callback',
    firstName: '',
    lastName: '',
    countryCode: '+91',
    phone: '',
    email: '',
    propertyType: '',
    project: '',
    unitType: '',
    privacy: false,
    newsletter: false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required'
    if (!form.phone.trim())     e.phone     = 'Phone number is required'
    if (!form.email.trim())     e.email     = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.propertyType)     e.propertyType = 'Please select a property type'
    if (!form.privacy)          e.privacy   = 'You must agree to the privacy policy'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      await enquiriesApi.submit({
        name: `${form.firstName} ${form.lastName}`,
        phone: `${form.countryCode} ${form.phone}`,
        email: form.email,
        subject: 'Buy Property Enquiry',
        message: `Property Type: ${form.propertyType} | Project: ${form.project || 'Not specified'} | Unit: ${form.unitType || 'Not specified'} | Preferred contact: ${form.contactMode === 'callback' ? 'Call Back' : 'Video Call'}`,
      })
      setSuccess(true)
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-8"
        style={{ border: '1px solid rgba(157,134,104,0.25)', background: '#fff' }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
        >
          <CheckCircle2 size={52} className="mx-auto mb-5" style={{ color: 'var(--gold)' }} />
        </motion.div>
        <h3 className="font-display text-2xl font-light mb-3" style={{ color: 'var(--luxury-dark)' }}>
          Enquiry Received!
        </h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.55)', maxWidth: '360px', margin: '0 auto' }}>
          Thank you for your interest. Our team will contact you within 24 business hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <p className="font-body text-sm p-3 mb-5" style={{ background: 'rgba(192,57,43,0.06)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.18)' }}>
          {errors.form}
        </p>
      )}

      {/* Preferred Mode */}
      <div className="mb-6">
        <p className="font-ui text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(26,26,26,0.55)' }}>
          Preferred Mode of Contact <span style={{ color: '#c0392b' }}>*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'callback', label: 'Request a call back' },
            { val: 'video',    label: 'Schedule a video call' },
          ].map(({ val, label }) => (
            <label
              key={val}
              className="flex items-center gap-3 cursor-pointer px-4 py-3.5 transition-all duration-200"
              style={{
                border: `1px solid ${form.contactMode === val ? 'var(--gold)' : 'rgba(157,134,104,0.28)'}`,
                background: form.contactMode === val ? 'rgba(157,134,104,0.05)' : '#fff',
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{ borderColor: form.contactMode === val ? 'var(--gold)' : 'rgba(157,134,104,0.4)' }}
              >
                {form.contactMode === val && (
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                )}
              </div>
              <span className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.75)' }}>{label}</span>
              <input type="radio" className="sr-only" checked={form.contactMode === val} onChange={() => set('contactMode', val)} />
            </label>
          ))}
        </div>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field error={errors.firstName}>
          <input
            type="text"
            placeholder="First Name *"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            style={{ ...inp, borderColor: errors.firstName ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.target.style.borderColor = errors.firstName ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
          />
        </Field>
        <Field error={errors.lastName}>
          <input
            type="text"
            placeholder="Last Name *"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            style={{ ...inp, borderColor: errors.lastName ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.target.style.borderColor = errors.lastName ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
          />
        </Field>
      </div>

      {/* Phone row */}
      <Field error={errors.phone}>
        <div className="flex mb-4" style={{ border: `1px solid ${errors.phone ? '#c0392b' : 'rgba(157,134,104,0.28)'}`, background: '#fff' }}>
          <div className="relative">
            <select
              value={form.countryCode}
              onChange={(e) => set('countryCode', e.target.value)}
              style={{ ...inp, width: 'auto', paddingRight: '2rem', border: 'none', borderRight: '1px solid rgba(157,134,104,0.2)', minWidth: '80px', fontSize: '0.85rem' }}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+61">🇦🇺 +61</option>
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(157,134,104,0.5)' }} />
          </div>
          <input
            type="tel"
            placeholder="XX XXX XXXX *"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            style={{ ...inp, flex: 1, border: 'none', paddingLeft: '0.9rem' }}
            onFocus={(e) => { e.currentTarget.parentElement.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.currentTarget.parentElement.style.borderColor = errors.phone ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
          />
        </div>
      </Field>

      {/* Email */}
      <Field error={errors.email}>
        <input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          style={{ ...inp, marginBottom: '1rem', borderColor: errors.email ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
          onBlur={(e) => { e.target.style.borderColor = errors.email ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
        />
      </Field>

      {/* Property Type */}
      <Field error={errors.propertyType}>
        <SelectWrapper>
          <select
            value={form.propertyType}
            onChange={(e) => set('propertyType', e.target.value)}
            style={{ ...inp, marginBottom: '1rem', cursor: 'pointer', borderColor: errors.propertyType ? '#c0392b' : 'rgba(157,134,104,0.28)', paddingRight: '2.5rem' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.target.style.borderColor = errors.propertyType ? '#c0392b' : 'rgba(157,134,104,0.28)' }}
          >
            <option value="">Property Type</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </SelectWrapper>
      </Field>

      {/* Project + Unit */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SelectWrapper>
          <select
            value={form.project}
            onChange={(e) => set('project', e.target.value)}
            style={{ ...inp, cursor: 'pointer', paddingRight: '2.5rem' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.28)' }}
          >
            <option value="">Project</option>
            {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <select
            value={form.unitType}
            onChange={(e) => set('unitType', e.target.value)}
            style={{ ...inp, cursor: 'pointer', paddingRight: '2.5rem' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.28)' }}
          >
            <option value="">Unit Type</option>
            {UNIT_TYPES.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </SelectWrapper>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 mb-7">
        <Field error={errors.privacy}>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className="w-4 h-4 border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
              style={{ borderColor: errors.privacy ? '#c0392b' : form.privacy ? 'var(--gold)' : 'rgba(157,134,104,0.4)', background: form.privacy ? 'var(--gold)' : 'transparent' }}
              onClick={() => set('privacy', !form.privacy)}
            >
              {form.privacy && <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>✓</span>}
            </div>
            <input type="checkbox" className="sr-only" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} />
            <span className="font-body text-sm leading-snug" style={{ color: 'rgba(26,26,26,0.65)' }}>
              I&apos;ve read and agree to the{' '}
              <Link to="/privacy-policy" className="underline" style={{ color: 'var(--gold)' }}>
                privacy policy.
              </Link>{' '}
              <span style={{ color: '#c0392b' }}>*</span>
            </span>
          </label>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer">
          <div
            className="w-4 h-4 border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
            style={{ borderColor: form.newsletter ? 'var(--gold)' : 'rgba(157,134,104,0.4)', background: form.newsletter ? 'var(--gold)' : 'transparent' }}
            onClick={() => set('newsletter', !form.newsletter)}
          >
            {form.newsletter && <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>✓</span>}
          </div>
          <input type="checkbox" className="sr-only" checked={form.newsletter} onChange={(e) => set('newsletter', e.target.checked)} />
          <span className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.65)' }}>
            I&apos;d like to hear about news and offers.
          </span>
        </label>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={submitting ? {} : { scale: 1.02 }}
        whileTap={submitting ? {} : { scale: 0.98 }}
        className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : 'SUBMIT'}
      </motion.button>

      <p className="font-body text-[10px] text-center mt-4" style={{ color: 'rgba(26,26,26,0.35)' }}>
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </form>
  )
}

/* ─── SEEK JOB PANEL ────────────────────────────────────────── */
function SeekJobPanel() {
  return (
    <motion.div
      key="job"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      {/* Image banner */}
      <div className="relative overflow-hidden mb-8" style={{ height: '240px' }}>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80"
          alt="Careers at Majestique"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.65) 100%)' }} />
        <div className="absolute bottom-0 inset-x-0 p-7">
          <p className="font-ui text-[10px] tracking-[0.28em] uppercase mb-1.5" style={{ color: 'rgba(157,134,104,0.8)' }}>✦ Join Our Team</p>
          <h3 className="font-display font-light text-2xl" style={{ color: 'var(--ivory)' }}>
            Build More Than Homes
          </h3>
        </div>
      </div>

      <div
        className="p-8"
        style={{ border: '1px solid rgba(157,134,104,0.2)', background: '#fff' }}
      >
        <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'rgba(26,26,26,0.68)' }}>
          Thank you for visiting our site. Want to be a part of Majestique Landmarks&apos; talent squad?
          We&apos;re always looking for passionate, driven professionals to join our growing team across
          real estate, design, engineering, and marketing.
        </p>

        <div className="space-y-3 mb-8">
          {[
            'Competitive compensation & career growth',
            'Work on award-winning landmark projects',
            'Collaborative, design-first culture',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-1 h-1 shrink-0" style={{ background: 'var(--gold)', borderRadius: '50%' }} />
              <span className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.65)' }}>{item}</span>
            </div>
          ))}
        </div>

        <Link to="/careers" className="btn-gold inline-flex">
          Visit our Careers page
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── CHANNEL PARTNER PANEL ─────────────────────────────────── */
function ChannelPartnerPanel() {
  return (
    <motion.div
      key="partner"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      {/* Image banner */}
      <div className="relative overflow-hidden mb-8" style={{ height: '240px' }}>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80"
          alt="Channel Partners"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.65) 100%)' }} />
        <div className="absolute bottom-0 inset-x-0 p-7">
          <p className="font-ui text-[10px] tracking-[0.28em] uppercase mb-1.5" style={{ color: 'rgba(157,134,104,0.8)' }}>✦ Partner with Us</p>
          <h3 className="font-display font-light text-2xl" style={{ color: 'var(--ivory)' }}>
            Grow Together
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* New partner */}
        <div className="p-7" style={{ border: '1px solid rgba(157,134,104,0.2)', background: '#fff' }}>
          <p className="font-ui text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color: 'rgba(26,26,26,0.4)' }}>New Partner</p>
          <h4 className="font-display font-light text-xl mb-3" style={{ color: 'var(--luxury-dark)' }}>
            I am a new channel partner
          </h4>
          <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'rgba(26,26,26,0.55)' }}>
            Join our network of trusted channel partners and earn attractive commissions on every successful referral.
          </p>
          <a
            href="mailto:channelpartner@majestiqueproperties.com?subject=New Channel Partner Registration"
            className="font-ui text-sm tracking-widest uppercase transition-colors duration-200 flex items-center gap-2"
            style={{ color: 'var(--gold)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          >
            Register as Channel Partner
            <span style={{ fontSize: '0.8rem' }}>→</span>
          </a>
        </div>

        {/* Existing partner */}
        <div className="p-7" style={{ border: '1px solid rgba(157,134,104,0.2)', background: '#fff' }}>
          <p className="font-ui text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color: 'rgba(26,26,26,0.4)' }}>Existing Partner</p>
          <h4 className="font-display font-light text-xl mb-3" style={{ color: 'var(--luxury-dark)' }}>
            I am an existing channel partner
          </h4>
          <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'rgba(26,26,26,0.55)' }}>
            Access your account, view project updates, and connect with our dedicated partner support team.
          </p>
          <a
            href="tel:+917448099000"
            className="font-ui text-sm tracking-widest uppercase transition-colors duration-200 flex items-center gap-2"
            style={{ color: 'var(--gold)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          >
            Visit our Channel Partner page
            <span style={{ fontSize: '0.8rem' }}>→</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
const TAB_IDS = TABS.map((tab) => tab.id)

export default function Contact() {
  const [searchParams] = useSearchParams()
  const requestedTab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(TAB_IDS.includes(requestedTab) ? requestedTab : 'buy')

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Majestique Landmarks. Buy property, seek a job, or register as a channel partner."
      />
      <PageHero
        title="Get in Touch"
        subtitle="We're here to help you find, build or reimagine your perfect home"
        breadcrumb={['Home', 'Contact']}
        bgImage={contactHeroImg}
      />

      {/* Main Section */}
      <section className="section-pad" style={{ background: 'var(--pearl)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">

            {/* Left: Tabbed panel */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Tab bar */}
                <div
                  className="flex mb-8"
                  style={{ borderBottom: '2px solid rgba(157,134,104,0.18)' }}
                >
                  {TABS.map((tab) => {
                    const active = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center gap-2 pb-3 pt-1 px-1 mr-7 transition-all duration-200 focus:outline-none"
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      >
                        <tab.icon
                          size={13}
                          style={{ color: active ? 'var(--gold)' : 'rgba(26,26,26,0.35)', transition: 'color 0.2s' }}
                        />
                        <span
                          className="font-ui text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
                          style={{ color: active ? 'var(--luxury-dark)' : 'rgba(26,26,26,0.42)', fontWeight: active ? 600 : 400, transition: 'color 0.2s' }}
                        >
                          {tab.label}
                        </span>
                        {/* Active underline */}
                        {active && (
                          <motion.div
                            layoutId="tab-underline"
                            className="absolute bottom-0 left-0 right-0"
                            style={{ height: '2px', background: 'var(--gold)', marginBottom: '-2px' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'buy' && (
                    <motion.div
                      key="buy"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BuyPropertyForm />
                    </motion.div>
                  )}
                  {activeTab === 'job' && <SeekJobPanel key="job" />}
                  {activeTab === 'partner' && <ChannelPartnerPanel key="partner" />}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right: Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                style={{
                  background: 'var(--luxury-dark)',
                  border: '1px solid rgba(157,134,104,0.2)',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                {/* Top image */}
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <img
                    src={contactOfficeImg}
                    alt="Majestique Office"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.55 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(5,5,5,0.85) 100%)' }} />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p className="font-display font-light text-lg" style={{ color: 'var(--ivory)' }}>Contact Information</p>
                    <p className="font-ui text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(157,134,104,0.65)' }}>Majestique Landmarks, Pune</p>
                  </div>
                </div>

                <div className="p-7">
                  <div className="space-y-5 mb-7">
                    {CONTACT_INFO.map((info, i) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-3.5"
                      >
                        <div
                          className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ border: '1px solid rgba(157,134,104,0.25)', background: 'rgba(157,134,104,0.06)' }}
                        >
                          <info.icon size={13} style={{ color: 'var(--gold)' }} />
                        </div>
                        <div>
                          <p className="font-ui text-[10px] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(243,239,232,0.38)' }}>
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="font-body text-sm transition-colors duration-200"
                              style={{ color: 'rgba(243,239,232,0.72)', textDecoration: 'none' }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(243,239,232,0.72)' }}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-body text-sm" style={{ color: 'rgba(243,239,232,0.72)' }}>{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mb-6" style={{ height: '1px', background: 'rgba(157,134,104,0.15)' }} />

                  {/* Social */}
                  <p className="font-ui text-[10px] tracking-widest uppercase mb-4" style={{ color: 'rgba(243,239,232,0.38)' }}>Follow Us</p>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {SOCIAL.map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.12, rotate: -6 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
                        style={{ border: '1px solid rgba(157,134,104,0.28)', color: 'var(--gold)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--luxury-dark)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.28)' }}
                      >
                        <Icon size={13} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Visit Our Office / Map ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: '#FDFAF6' }}>
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-display font-light"
            style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', color: 'rgba(157,134,104,0.04)', lineHeight: 1, whiteSpace: 'nowrap', letterSpacing: '-0.04em' }}
          >
            LOCATION
          </span>
        </div>

        <div className="container-luxury relative">
          <div className="mb-12">
            <SectionHeader
              label="Find Us"
              title={<>Visit Our<br /><em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Corporate Office</em></>}
              subtitle="Located in the heart of Pune — step into our office to explore our landmark developments in person."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ border: '1px solid rgba(157,134,104,0.25)', boxShadow: '0 30px 90px rgba(5,5,5,0.14)' }}
          >
            {/* Gold top rule */}
            <div
              className="absolute top-0 inset-x-0 z-10 pointer-events-none"
              style={{ height: '3px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), transparent)' }}
            />

            {/* Corner brackets */}
            {[
              ['top-4 left-4', 'border-l-2 border-t-2'],
              ['top-4 right-4', 'border-r-2 border-t-2'],
              ['bottom-4 left-4', 'border-l-2 border-b-2'],
              ['bottom-4 right-4', 'border-r-2 border-b-2'],
            ].map(([pos, border]) => (
              <div
                key={pos}
                className={`absolute ${pos} w-9 h-9 ${border} z-10 pointer-events-none`}
                style={{ borderColor: 'rgba(255,255,255,0.55)' }}
              />
            ))}

            {/* Map iframe */}
            <div style={{ height: 'clamp(420px, 48vw, 560px)' }}>
              <iframe
                src={MAP_EMBED_SRC}
                title="Majestique Landmarks — Corporate Office Location"
                className="w-full h-full"
                style={{ border: 0, filter: 'grayscale(6%) contrast(1.05) saturate(0.92)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

          </motion.div>
        </div>
      </section>

      {/* Quick Contact Strip */}
      <section className="py-14" style={{ background: 'var(--luxury-dark)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Phone,       label: 'Call Us',       value: '+91 74480 99000',                  href: 'tel:+917448099000',          cta: 'Call Now' },
              { icon: Mail,        label: 'Email Sales',   value: 'sales@majestiqueproperties.com',   href: 'mailto:sales@majestiqueproperties.com', cta: 'Send Email' },
              { icon: FaWhatsapp,  label: 'WhatsApp',      value: '+91 74480 99000',                  href: 'https://wa.me/917448099000', cta: 'Chat Now' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === 'WhatsApp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 transition-all duration-300"
                style={{ border: '1px solid rgba(157,134,104,0.18)', background: 'rgba(157,134,104,0.04)', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.45)'; e.currentTarget.style.background = 'rgba(157,134,104,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(157,134,104,0.18)'; e.currentTarget.style.background = 'rgba(157,134,104,0.04)' }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid rgba(157,134,104,0.3)', background: 'rgba(157,134,104,0.08)' }}
                >
                  <item.icon size={17} style={{ color: 'var(--gold)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-[10px] tracking-widest uppercase mb-0.5" style={{ color: 'rgba(243,239,232,0.42)' }}>{item.label}</p>
                  <p className="font-body text-sm truncate" style={{ color: 'rgba(243,239,232,0.7)' }}>{item.value}</p>
                </div>
                <span className="font-ui text-[10px] tracking-widest uppercase whitespace-nowrap" style={{ color: 'var(--gold-dark)' }}>
                  {item.cta}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

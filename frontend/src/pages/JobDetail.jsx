import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Briefcase, Building2, Clock, CheckCircle2, Send } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { careersApi, enquiriesApi } from '../services/api'
import { formatDate } from '../utils/helpers'
import Seo from '../components/ui/Seo'
import jobHeroImg from '../assets/Job_Seek.jpg'

function JobSkeleton() {
  return (
    <div className="container-luxury py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-4 w-full mb-3 rounded" style={{ width: i % 4 === 3 ? '60%' : '100%' }} />
          ))}
        </div>
        <div className="skeleton rounded" style={{ height: '480px' }} />
      </div>
    </div>
  )
}

const TYPE_LABEL = { 'Full-time': 'Full-time', 'Part-time': 'Part-time', 'Contract': 'Contract', 'Internship': 'Internship' }

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setLoading(true)
    careersApi.getById(id)
      .then((res) => {
        const data = res.data?.job
        if (!data) { setNotFound(true); return }
        setJob(data)
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [id])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    return e
  }

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const handleApply = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      await enquiriesApi.submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Job Application: ${job.title}`,
        message: form.coverLetter || `Application for ${job.title} — ${job.department}`,
      })
      setSubmitted(true)
    } catch {
      setErrors({ form: 'Submission failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'white',
    border: '1px solid rgba(157,134,104,0.3)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--luxury-dark)',
    transition: 'border-color 0.3s',
  }

  if (loading) return (
    <div style={{ background: 'var(--cream)' }}>
      <div className="min-h-[340px]" style={{ background: 'var(--luxury-dark2)' }} />
      <JobSkeleton />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="text-center">
        <Briefcase size={48} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--gold)' }} />
        <h1 className="font-times text-3xl mb-3" style={{ color: 'var(--luxury-dark)' }}>Job not found</h1>
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.82)' }}>This position may have been filled or removed.</p>
        <Link to="/careers" className="btn-outline-gold">← View All Openings</Link>
      </div>
    </div>
  )

  return (
    <>
      <Seo
        title={`${job.title} — Careers`}
        description={`${job.title} (${job.type || 'Full-time'}) at Majestique Landmarks, Pune. Join Pune's most prestigious luxury real estate team.`}
      />
      <PageHero
        title={job.title}
        subtitle={`${job.department} · ${job.location}`}
        breadcrumb={['Home', 'Careers', job.title]}
        bgImage={jobHeroImg}
      />

      <div style={{ background: 'var(--cream)' }}>
        <div className="container-luxury py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="gold-line mb-8" />

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-times text-2xl mb-5" style={{ color: 'var(--luxury-dark)' }}>About the Role</h2>
                <div
                  className="font-body text-base leading-relaxed job-content"
                  style={{ color: 'rgba(30,22,14,0.8)' }}
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div>
                  <h2 className="font-times text-2xl mb-5" style={{ color: 'var(--luxury-dark)' }}>Requirements</h2>
                  <div
                    className="font-body text-base leading-relaxed job-content"
                    style={{ color: 'rgba(30,22,14,0.8)' }}
                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                  />
                </div>
              )}

              <div
                className="flex items-center justify-between mt-12 pt-8"
                style={{ borderTop: '1px solid rgba(157,134,104,0.2)' }}
              >
                <Link
                  to="/careers"
                  className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: 'var(--gold-dark)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                >
                  <ArrowLeft size={14} /> All Openings
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* Job details card */}
              <div
                className="p-6 mb-6"
                style={{ border: '1px solid rgba(157,134,104,0.2)', background: 'white', boxShadow: '0 2px 16px rgba(5,5,5,0.06)' }}
              >
                <h3 className="font-times text-xl mb-5" style={{ color: 'var(--luxury-dark)' }}>Job Details</h3>
                <div className="space-y-4">
                  {[
                    { icon: Briefcase, label: 'Type', value: TYPE_LABEL[job.type] || job.type },
                    { icon: Building2, label: 'Department', value: job.department },
                    { icon: MapPin, label: 'Location', value: job.location },
                    { icon: Clock, label: 'Posted', value: formatDate(job.createdAt) },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <motion.div
                      key={label}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    >
                      <Icon size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                      <div className="flex items-center gap-2">
                        <span className="font-ui text-xs tracking-wider uppercase" style={{ color: 'rgba(44,62,88,0.45)' }}>{label}:</span>
                        <span className="font-body text-sm" style={{ color: 'var(--luxury-charcoal)' }}>{value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Apply Form */}
              <div
                className="p-6"
                style={{ border: '1px solid rgba(157,134,104,0.2)', background: 'white', boxShadow: '0 2px 16px rgba(5,5,5,0.06)' }}
              >
                <h3 className="font-times text-xl mb-5" style={{ color: 'var(--luxury-dark)' }}>Apply for this Role</h3>

                {submitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    >
                      <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                    </motion.div>
                    <p className="font-times text-lg mb-2" style={{ color: 'var(--luxury-dark)' }}>Application Submitted!</p>
                    <p className="font-body text-sm" style={{ color: 'rgba(44,62,88,0.6)' }}>We'll review your application and be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    {errors.form && (
                      <p className="font-body text-xs p-2" style={{ background: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>
                        {errors.form}
                      </p>
                    )}
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.name ? '#dc3545' : 'rgba(157,134,104,0.3)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                        onBlur={(e) => { e.target.style.borderColor = errors.name ? '#dc3545' : 'rgba(157,134,104,0.3)' }}
                      />
                      {errors.name && <p className="font-body text-xs mt-1" style={{ color: '#dc3545' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.email ? '#dc3545' : 'rgba(157,134,104,0.3)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                        onBlur={(e) => { e.target.style.borderColor = errors.email ? '#dc3545' : 'rgba(157,134,104,0.3)' }}
                      />
                      {errors.email && <p className="font-body text-xs mt-1" style={{ color: '#dc3545' }}>{errors.email}</p>}
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.3)' }}
                    />
                    <textarea
                      rows={4}
                      placeholder="Cover Letter (optional)"
                      value={form.coverLetter}
                      onChange={(e) => handleChange('coverLetter', e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(157,134,104,0.3)' }}
                    />
                    <div>
                      <label className="font-ui text-xs tracking-wider uppercase block mb-2" style={{ color: 'rgba(26,26,26,0.82)' }}>
                        Upload CV (PDF/DOC)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="font-body text-sm w-full"
                        style={{ color: 'rgba(44,62,88,0.7)' }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={submitting ? {} : { scale: 1.02 }}
                      whileTap={submitting ? {} : { scale: 0.98 }}
                      className="btn-gold w-full justify-center flex items-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <><Send size={14} /> Submit Application</>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .job-content p { margin-bottom: 1rem; }
        .job-content ul, .job-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .job-content li { margin-bottom: 0.35rem; }
        .job-content strong { font-weight: 600; color: var(--luxury-dark); }
        .job-content h3 { font-family: var(--font-heading); font-size: 1.125rem; margin: 1rem 0 0.5rem; }
      `}</style>
    </>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import imgHero from '../../assets/newsletter.jpg'

const TOPICS = [
  { id: 'launches', label: 'New Launches' },
  { id: 'events', label: 'Events & Site Visits' },
  { id: 'blogs', label: 'Blogs & Insights' },
  { id: 'offers', label: 'Exclusive Offers' },
  { id: 'news', label: 'Company News' },
]

const BENEFITS = [
  { title: 'First Access', desc: 'Be the first to know about new project launches and pre-launch pricing.' },
  { title: 'Exclusive Insights', desc: 'Expert analysis on Pune\'s real estate market and investment trends.' },
  { title: 'Event Invitations', desc: 'Priority invitations to site visits, open houses, and brand events.' },
  { title: 'No Spam', desc: 'We respect your inbox. Curated content only, delivered monthly.' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [selectedTopics, setSelectedTopics] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Newsletter — Majestique Landmarks"
        description="Subscribe to the Majestique Landmarks newsletter for exclusive updates on new projects, events, luxury living insights, and pre-launch invitations."
      />

      <PageHero
        label="Media"
        title="Newsletter"
        subtitle="Stay connected with Majestique — exclusive updates on new projects, events, and insights on luxury living in Pune."
        breadcrumbs={[{ label: 'Media', href: '/media/newsletter' }, { label: 'Newsletter' }]}
        bgImage={imgHero}
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="overline-label mb-4 block">Why Subscribe</span>
              <h2
                className="font-display text-[2.4rem] lg:text-[3rem] leading-[1.1] tracking-tight mb-6"
                style={{ color: 'var(--luxury-dark)' }}
              >
                The Majestique Insider
              </h2>
              <div className="w-12 h-px mb-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
              <p className="font-body text-[1rem] leading-[1.9] mb-10" style={{ color: 'var(--luxury-charcoal)' }}>
                Our newsletter connects you directly to the world of Majestique Landmarks — new projects before they go public, invitations to exclusive events, and thoughtful insights on luxury living and real estate investment in Pune.
              </p>

              <div className="space-y-5">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ border: '1px solid rgba(157,134,104,0.25)', background: 'rgba(157,134,104,0.04)' }}
                    >
                      <CheckCircle2 size={14} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="font-ui text-[0.7rem] tracking-wider uppercase mb-1" style={{ color: 'var(--luxury-dark)' }}>
                        {b.title}
                      </p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.6)' }}>
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-10 text-center"
                  style={{ border: '1px solid rgba(157,134,104,0.25)', background: 'rgba(157,134,104,0.03)' }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  >
                    <CheckCircle2 size={48} className="mx-auto mb-5" style={{ color: 'var(--gold)' }} />
                  </motion.div>
                  <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--luxury-dark)' }}>
                    Welcome to the Insider List
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(44,62,88,0.6)' }}>
                    You have been successfully subscribed. Your first edition of the Majestique Insider will arrive in your inbox shortly. Thank you for joining our community.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 lg:p-10"
                  style={{ border: '1px solid rgba(157,134,104,0.14)', background: 'white' }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ border: '1px solid rgba(157,134,104,0.22)', background: 'rgba(157,134,104,0.04)' }}
                    >
                      <Mail size={17} style={{ color: 'var(--gold)' }} />
                    </div>
                    <h3 className="font-display text-xl" style={{ color: 'var(--luxury-dark)' }}>
                      Subscribe Now
                    </h3>
                  </div>

                  {/* Email input */}
                  <div className="mb-5">
                    <label className="font-ui text-[0.63rem] tracking-widest uppercase block mb-2" style={{ color: 'var(--luxury-charcoal)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="input-luxury"
                      style={{ background: 'var(--cream)' }}
                    />
                  </div>

                  {/* Topic preferences */}
                  <div className="mb-8">
                    <label className="font-ui text-[0.63rem] tracking-widest uppercase block mb-3" style={{ color: 'var(--luxury-charcoal)' }}>
                      Topics (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic) => (
                        <motion.button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          whileTap={{ scale: 0.94 }}
                          animate={{ scale: selectedTopics.includes(topic.id) ? 1.04 : 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="font-ui text-[0.6rem] tracking-widest uppercase px-3 py-2 transition-colors duration-200"
                          style={{
                            border: '1px solid',
                            borderColor: selectedTopics.includes(topic.id) ? 'var(--gold)' : 'rgba(157,134,104,0.2)',
                            background: selectedTopics.includes(topic.id) ? 'var(--gold)' : 'transparent',
                            color: selectedTopics.includes(topic.id) ? 'var(--luxury-dark)' : 'rgba(26,26,26,0.82)',
                          }}
                        >
                          {topic.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting || !email}
                    whileHover={submitting || !email ? {} : { scale: 1.02 }}
                    whileTap={submitting || !email ? {} : { scale: 0.98 }}
                    className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Subscribing…' : (
                      <>
                        Subscribe to Newsletter <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>

                  <p className="font-body text-[0.68rem] text-center mt-4" style={{ color: 'rgba(44,62,88,0.4)' }}>
                    No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

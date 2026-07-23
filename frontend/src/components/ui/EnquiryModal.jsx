import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { enquiriesApi } from '../../services/api'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  message: z.string().optional(),
})

export default function EnquiryModal({ isOpen, onClose, projectTitle }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const onSubmit = async (data) => {
    await enquiriesApi.submit({ ...data, subject: projectTitle ? `Enquiry: ${projectTitle}` : 'General Enquiry' })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md relative"
            style={{
              background: 'var(--luxury-dark)',
              border: '1px solid rgba(157,134,104,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 pb-4"
              style={{ borderBottom: '1px solid rgba(157,134,104,0.15)' }}
            >
              <div>
                <span className="section-label block mb-1">Get In Touch</span>
                <h3
                  className="font-times text-xl font-normal"
                  style={{ color: 'var(--beige)' }}
                >
                  {projectTitle ? `Enquire About ${projectTitle}` : 'Send Us a Message'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                style={{ color: 'rgba(157,134,104,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(157,134,104,0.5)')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {isSubmitSuccessful ? (
                <div className="text-center py-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(157,134,104,0.15)', border: '1px solid var(--gold)' }}
                  >
                    <span style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>✓</span>
                  </div>
                  <h4
                    className="font-times text-lg mb-2"
                    style={{ color: 'var(--beige)' }}
                  >
                    Enquiry Sent!
                  </h4>
                  <p className="font-body text-sm" style={{ color: 'rgba(243,239,232,0.6)' }}>
                    Our team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label
                        className="font-ui text-xs tracking-widest uppercase block mb-2"
                        style={{ color: 'var(--gold-light)' }}
                      >
                        {label}
                      </label>
                      <input
                        {...register(name)}
                        type={type}
                        placeholder={placeholder}
                        className="input-luxury"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--beige)' }}
                      />
                      {errors[name] && (
                        <p className="font-body text-xs mt-1" style={{ color: '#e88' }}>
                          {errors[name].message}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label
                      className="font-ui text-xs tracking-widest uppercase block mb-2"
                      style={{ color: 'var(--gold-light)' }}
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Any specific requirements..."
                      className="input-luxury resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--beige)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full justify-center mt-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

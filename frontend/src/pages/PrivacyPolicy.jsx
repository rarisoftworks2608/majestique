import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import Seo from '../components/ui/Seo'

const fU = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
})

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We may collect personal information from you when you visit our website, use our services, or interact with us. The types of personal information we collect may include:
    <ul>
      <li>Contact information (e.g., name, address, email address, phone number).</li>
      <li>Financial information (e.g., payment details, credit card information).</li>
      <li>Information you provide in connection with inquiries, requests, or feedback.</li>
      <li>Information collected through the use of cookies and similar technologies.</li>
      <li>Any other information you voluntarily provide to us.</li>
    </ul>`,
  },
  {
    title: '2. Use of Information',
    content: `We use the collected personal information for the following purposes:
    <ul>
      <li>Providing and improving our services, including processing your inquiries and requests.</li>
      <li>Communicating with you, such as responding to your questions or providing updates about our projects and services.</li>
      <li>Managing and processing payments.</li>
      <li>Customizing and personalizing your experience with our website and services.</li>
      <li>Conducting market research, analysis, and promotions.</li>
      <li>Complying with applicable legal and regulatory requirements.</li>
      <li>Protecting our rights and interests.</li>
    </ul>`,
  },
  {
    title: '3. Information Sharing',
    content: `We may share your personal information with third parties in the following circumstances:
    <ul>
      <li><strong>Service Providers:</strong> We may engage trusted third-party service providers to assist us in delivering our services and managing our operations. These providers are bound by confidentiality obligations and are authorized to use your personal information solely for the purpose of providing services to us.</li>
      <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the acquiring entity or third party involved.</li>
      <li><strong>Legal Requirements:</strong> We may disclose your personal information if required to do so by law or in response to a valid legal request, such as a court order or government investigation.</li>
    </ul>`,
  },
  {
    title: '4. Security',
    content: `<p>We employ appropriate technical and organizational measures to protect the security and confidentiality of your personal information. However, please be aware that no data transmission over the internet or storage system can guarantee 100% security.</p>`,
  },
  {
    title: '5. Your Choices',
    content: `You have certain rights and choices regarding your personal information:
    <ul>
      <li><strong>Access and Update:</strong> You may access and update your personal information by contacting us using the information provided in Section 8.</li>
      <li><strong>Marketing Communications:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions in the email or by contacting us directly.</li>
      <li><strong>Cookies:</strong> You can manage your cookie preferences by adjusting your browser settings or using the cookie consent tool provided on our website.</li>
    </ul>`,
  },
  {
    title: '6. Third-Party Links',
    content: `<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of those third parties before providing any personal information.</p>`,
  },
  {
    title: "7. Children's Privacy",
    content: `<p>Our services are not directed toward individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to remove such information.</p>`,
  },
  {
    title: '8. Contact Us',
    content: `<p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us:</p>
    <ul>
      <li><strong>Sales Enquiry:</strong> <a href="mailto:sales@majestiqueproperties.com">sales@majestiqueproperties.com</a></li>
      <li><strong>Support:</strong> <a href="mailto:info@majestiqueproperties.com">info@majestiqueproperties.com</a></li>
      <li><strong>Phone:</strong> <a href="tel:+917448099000">+91 74480 99000</a></li>
      <li><strong>Address:</strong> 9th Floor, Jawaharlal Nehru Rd, opp. Apsara Theatre, Guru Nanak Nagar, Pune – 411037</li>
    </ul>
    <p>When you voluntarily send us an email or fill out a form on our site, we keep a record of that information so that we can respond to you. We only collect information from you when you register on our site or fill out a form — when doing so, you may be asked to enter your name, email address, or phone number. You may, however, visit our site anonymously.</p>
    <p>By voluntarily submitting your personal information and contact details, you consent to being contacted by us via call, SMS, email, or WhatsApp regarding our products and offers, even if your number is registered under DND (Do Not Disturb).</p>`,
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy" description="Privacy Policy for Majestique Landmarks Private Limited — how we collect, use, disclose, and protect your personal information." noindex />
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use and protect your personal information"
        breadcrumb={['Home', 'Privacy Policy']}
        bgImage="https://majestiqueproperties.com/wp-content/uploads/2025/03/Aravali-01-scaled.webp"
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <motion.p {...fU()} className="font-body text-sm mb-10 pb-6" style={{ color: 'rgba(26,26,26,0.82)', borderBottom: '1px solid rgba(157,134,104,0.2)' }}>
              <strong>Last Updated:</strong> January 2025 &nbsp;·&nbsp; Majestique Landmarks Private Limited
            </motion.p>

            <motion.p {...fU(0.08)} className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(26,26,26,0.86)' }}>
              At Majestique Landmarks Private Limited, we are committed to protecting the privacy of our customers and visitors to our website. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information. By accessing our website or using our services, you consent to the terms and practices described in this policy.
            </motion.p>

            <div className="space-y-10">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3), ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative pl-5"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) + 0.15 }}
                    className="absolute left-0 top-1"
                    style={{ width: '2px', height: 'calc(100% - 2.5rem)', background: 'linear-gradient(180deg, var(--gold), transparent)', transformOrigin: 'top' }}
                  />
                  <h2
                    className="font-times font-normal text-2xl mb-4"
                    style={{ color: 'var(--luxury-dark)' }}
                  >
                    {section.title}
                  </h2>
                  <div
                    className="font-body text-sm leading-relaxed legal-content"
                    style={{ color: 'rgba(26,26,26,0.86)' }}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  <div
                    className="mt-8"
                    style={{ height: '1px', background: 'rgba(157,134,104,0.15)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .legal-content ul { padding-left: 1.5rem; margin: 0.75rem 0 1rem; }
        .legal-content li { margin-bottom: 0.5rem; }
        .legal-content p { margin-bottom: 0.75rem; }
        .legal-content strong { font-weight: 600; color: var(--luxury-dark); }
        .legal-content a { color: var(--gold-dark); }
      `}</style>
    </>
  )
}

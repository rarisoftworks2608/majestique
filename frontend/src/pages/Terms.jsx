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
    title: '1. Acceptance of Terms',
    content: `<p>By accessing or using the Majestique Landmarks website ("Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our Site.</p>
    <p>We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.</p>`,
  },
  {
    title: '2. Use of Our Services',
    content: `<p>The content and services on this Site are intended for individuals seeking information about Majestique Landmarks' properties, projects, and services. You agree to use this Site only for lawful purposes and in a manner consistent with these Terms.</p>
    <p>You must not:</p>
    <ul>
      <li>Use the Site in any way that violates applicable local, national, or international laws or regulations.</li>
      <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
      <li>Attempt to gain unauthorised access to any part of the Site or its related systems.</li>
      <li>Reproduce, duplicate, copy, or resell any part of our Site without prior written permission.</li>
    </ul>`,
  },
  {
    title: '3. Intellectual Property',
    content: `<p>All content on this Site — including but not limited to text, graphics, logos, images, project renderings, floor plans, and software — is the property of Majestique Landmarks Pvt. Ltd. and is protected by applicable intellectual property laws.</p>
    <p>You may access and view content for personal, non-commercial purposes only. You may not reproduce, distribute, modify, or create derivative works without our express written consent.</p>`,
  },
  {
    title: '4. Property Information & Accuracy',
    content: `<p>All property information, specifications, prices, floor plans, and project details on this Site are provided for general informational purposes only. While we strive for accuracy:</p>
    <ul>
      <li>Project specifications, amenities, and unit configurations may change without prior notice.</li>
      <li>Prices are indicative and subject to change. Final pricing is as per executed Sale Agreement.</li>
      <li>Rendered images and 3D visuals are artistic representations and may not depict the final product exactly.</li>
      <li>RERA registration details supersede any other representation on this Site.</li>
    </ul>
    <p>Please contact our sales team for the most up-to-date information before making any purchase decisions.</p>`,
  },
  {
    title: '5. Enquiries & Communications',
    content: `<p>By submitting an enquiry form on this Site, you consent to being contacted by Majestique Landmarks and its authorised representatives via phone, SMS, email, or WhatsApp in connection with your enquiry. You may opt out of marketing communications at any time by contacting us at <a href="mailto:info@majestiqueproperties.com">info@majestiqueproperties.com</a>.</p>`,
  },
  {
    title: '6. Disclaimers & Limitation of Liability',
    content: `<p>This Site and its content are provided "as is" without warranties of any kind, express or implied. Majestique Landmarks does not warrant that the Site will be error-free, uninterrupted, or free of viruses.</p>
    <p>To the fullest extent permitted by law, Majestique Landmarks shall not be liable for:</p>
    <ul>
      <li>Any loss or damage arising from your use or inability to use the Site.</li>
      <li>Any inaccuracy or incompleteness in information provided on the Site.</li>
      <li>Any third-party links or services accessed through our Site.</li>
    </ul>`,
  },
  {
    title: '7. Third-Party Links',
    content: `<p>Our Site may contain links to third-party websites for your convenience. These links do not imply our endorsement of, or association with, those sites. We are not responsible for the content, privacy practices, or services of any linked third-party sites. We encourage you to review the terms and privacy policies of any external sites you visit.</p>`,
  },
  {
    title: '8. Governing Law & Disputes',
    content: `<p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.</p>
    <p>For any questions or concerns about these Terms, please contact us at:</p>
    <ul>
      <li><strong>Email:</strong> legal@majestiqueproperties.com</li>
      <li><strong>Address:</strong> Majestique House, Baner Road, Pune – 411045, Maharashtra, India</li>
    </ul>`,
  },
]

export default function Terms() {
  return (
    <>
      <Seo title="Terms of Service" description="Read Majestique Landmarks' terms of service governing use of our website." noindex />
      <PageHero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our website"
        breadcrumb={['Home', 'Terms of Service']}
        bgImage="https://majestiqueproperties.com/wp-content/uploads/2025/03/Aravali-01-scaled.webp"
      />

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <motion.p {...fU()} className="font-body text-sm mb-10 pb-6" style={{ color: 'rgba(26,26,26,0.82)', borderBottom: '1px solid rgba(157,134,104,0.2)' }}>
              <strong>Last Updated:</strong> January 2025 &nbsp;·&nbsp; Majestique Landmarks Pvt. Ltd.
            </motion.p>

            <motion.p {...fU(0.08)} className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(26,26,26,0.86)' }}>
              Welcome to Majestique Landmarks. These Terms of Service govern your use of our website and services. By accessing our Site, you agree to these Terms in full. If you disagree with any part, please do not use our Site.
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

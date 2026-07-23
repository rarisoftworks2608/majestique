import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import { BLOGS } from '../../data/blogs'

const fU = (d = 0) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })

/* ── Shared Article Typography Helpers ───────────────────────────── */
function ArticleIntro({ children }) {
  return (
    <p className="font-times text-xl leading-relaxed mb-8" style={{ color: 'rgba(30,22,14,0.82)', borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
      {children}
    </p>
  )
}

function ArticleH2({ children }) {
  return (
    <h2 className="font-times font-normal mt-10 mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--luxury-dark)' }}>
      {children}
    </h2>
  )
}

function ArticleH3({ children }) {
  return (
    <h3 className="font-times font-normal mt-7 mb-2" style={{ fontSize: '1.2rem', color: 'var(--luxury-dark)' }}>
      {children}
    </h3>
  )
}

function ArticleP({ children }) {
  return (
    <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'rgba(30,22,14,0.75)' }}>
      {children}
    </p>
  )
}

function ArticleList({ items }) {
  return (
    <ul className="mb-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
            <ArrowRight size={9} style={{ color: 'var(--luxury-dark)' }} />
          </div>
          <span className="font-body text-sm leading-relaxed" style={{ color: 'rgba(30,22,14,0.75)' }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ArticleQuote({ children, attribution }) {
  return (
    <blockquote className="my-8 p-6 relative" style={{ background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
      <div className="font-display select-none mb-1" style={{ fontSize: '3rem', color: 'rgba(157,134,104,0.18)', lineHeight: 0.7 }}>"</div>
      <p className="font-times text-lg italic leading-relaxed" style={{ color: 'rgba(44,62,88,0.85)' }}>{children}</p>
      {attribution && (
        <p className="font-ui text-xs tracking-widest uppercase mt-4" style={{ color: 'rgba(157,134,104,0.55)' }}>— {attribution}</p>
      )}
    </blockquote>
  )
}

function ArticleDivider() {
  return <div className="my-8 h-px w-full" style={{ background: 'linear-gradient(90deg, var(--gold), rgba(157,134,104,0.12), transparent)' }} />
}

function AdvantageBox({ title, items, color = 'var(--gold)' }) {
  return (
    <div className="my-6 p-6" style={{ background: `${color}0d`, border: `1px solid ${color}33` }}>
      <p className="font-ui text-xs tracking-widest uppercase mb-4" style={{ color }}>
        {title}
      </p>
      <ArticleList items={items} />
    </div>
  )
}

/* ── Per-Blog Content Components ─────────────────────────────────── */

function Blog1Content() {
  return (
    <>
      <ArticleIntro>
        Choosing between a ready-to-move-in residence and an under-construction property is one of the most important decisions for modern homebuyers and investors. While one offers immediate possession and certainty, the other presents long-term appreciation opportunities and flexible investment advantages.
      </ArticleIntro>
      <ArticleP>
        At Majestique Landmarks, we believe every buyer deserves a home that aligns with their lifestyle goals, financial vision, and future aspirations. This guide breaks down both options to help you make an informed, confident decision.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Ready-to-Move Homes</ArticleH2>
      <ArticleH3>Immediate Comfort & Complete Clarity</ArticleH3>
      <ArticleP>
        Ready-to-move residences offer immediate possession and complete transparency. Buyers can physically experience the actual property, surroundings, amenities, and construction quality before making a decision — eliminating uncertainty and offering peace of mind from day one.
      </ArticleP>

      <AdvantageBox
        title="Key Advantages"
        color="#2d9d8f"
        items={[
          'Immediate possession with zero waiting period',
          'No GST applicability on ready-to-move units',
          'Complete visibility into actual construction quality',
          'Lower uncertainty and minimal project-related risks',
          'Faster relocation and rental income opportunities',
        ]}
      />

      <AdvantageBox
        title="Considerations"
        color="#d4845a"
        items={[
          'Premium pricing compared to under-construction inventory',
          'Limited inventory choices and configurations',
          'Reduced customization flexibility',
        ]}
      />

      <ArticleDivider />

      <ArticleH2>Under-Construction Homes</ArticleH2>
      <ArticleH3>Future Appreciation & Greater Flexibility</ArticleH3>
      <ArticleP>
        Under-construction developments are ideal for buyers seeking long-term investment growth, flexible payment structures, and modern future-ready communities. These properties allow buyers to enter at an earlier stage with attractive introductory pricing.
      </ArticleP>

      <AdvantageBox
        title="Key Advantages"
        color="#2d9d8f"
        items={[
          'Attractive introductory pricing',
          'Flexible stage-wise payment plans',
          'Higher appreciation potential before possession',
          'Wider choice of units, views, and floor configurations',
          'Possibility of personalized finishes in select projects',
        ]}
      />

      <AdvantageBox
        title="Considerations"
        color="#d4845a"
        items={[
          'Possession timelines may vary based on construction progress',
          'GST applicability on under-construction units',
          'Importance of selecting a trusted, MahaRERA-registered developer',
        ]}
      />

      <ArticleDivider />

      <ArticleH2>Which Option Is Best For You?</ArticleH2>
      <ArticleP>
        The right choice ultimately depends on your financial goals, lifestyle needs, and investment timeline.
      </ArticleP>
      <ArticleList items={[
        'If your priority is immediate occupancy, convenience, and lower risk — ready-to-move residences offer the ideal solution.',
        'If you are seeking future appreciation, investment growth, and value-driven pricing — under-construction properties can provide significant long-term advantages.',
      ]} />

      <ArticleQuote attribution="Majestique Landmarks — Homebuyer Philosophy">
        The best property is not the most expensive — it is the one that perfectly aligns with your life goals, your financial timeline, and your vision of home.
      </ArticleQuote>

      <ArticleDivider />

      <ArticleH2>Explore Future-Ready Living With Majestique Landmarks</ArticleH2>
      <ArticleP>
        Majestique Landmarks offers both ready-to-move and under-construction developments across Pune's most sought-after residential destinations, including Kharadi, Hadapsar, Baner, Kothrud, and Wagholi.
      </ArticleP>
      <ArticleP>
        Every development is designed with a focus on quality, transparency, lifestyle excellence, and long-term value creation — guided by over three decades of trusted real estate expertise.
      </ArticleP>
    </>
  )
}

function Blog2Content() {
  return (
    <>
      <ArticleIntro>
        Market Yard is entering a transformative new phase driven by infrastructure growth, enhanced connectivity, and increasing demand for premium residential developments. Once known primarily as a commercial and wholesale hub, the area is now evolving into a vibrant urban lifestyle destination.
      </ArticleIntro>
      <ArticleP>
        Strategically connected to Swargate, Satara Road, Kondhwa, Bibwewadi, and Katraj, Market Yard offers residents the perfect balance of accessibility, convenience, and city connectivity — making it one of Pune's most promising emerging residential addresses.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Why Market Yard Is Emerging As A Residential Hotspot</ArticleH2>

      <ArticleH3>Seamless Connectivity</ArticleH3>
      <ArticleP>
        Market Yard benefits from excellent access to major city corridors, transit routes, and upcoming infrastructure developments. Its central location ensures that residents enjoy easy commuting to IT hubs, commercial centers, educational institutions, and medical facilities.
      </ArticleP>

      <ArticleH3>Urban Convenience</ArticleH3>
      <ArticleP>
        The neighborhood offers proximity to established educational institutions, healthcare centers, retail destinations, and commercial hubs — providing residents with all the conveniences of urban living without compromising on community character.
      </ArticleP>

      <ArticleH3>Growing Real Estate Demand</ArticleH3>
      <ArticleP>
        Rapid infrastructure development and rising lifestyle aspirations are driving strong residential demand across the region. Investors and homebuyers are increasingly recognizing Market Yard's potential as an emerging micro-market with strong appreciation prospects.
      </ArticleP>

      <ArticleH3>Balanced Urban Living</ArticleH3>
      <ArticleP>
        A neighborhood that combines city energy with established community living and cultural familiarity — Market Yard offers a distinctive character that blends the familiar with the aspirational.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Continuing The Legacy Of Excellence</ArticleH2>
      <ArticleP>
        Majestique Landmarks has consistently shaped premium residential communities that combine thoughtful planning, architectural refinement, and elevated lifestyle experiences. Our upcoming Market Yard development reflects this commitment to excellence.
      </ArticleP>

      <AdvantageBox
        title="What to Expect"
        color="#9d8668"
        items={[
          'Intelligent space planning for modern families',
          'Premium amenities and curated community spaces',
          'Lifestyle-centric community design',
          'Contemporary architecture aligned with global standards',
          'Long-term value appreciation in a growing micro-market',
        ]}
      />

      <ArticleQuote attribution="Majestique Landmarks Vision">
        Every landmark we build is a response to an evolving city — our Market Yard development continues the tradition of creating spaces where Pune's families thrive for generations.
      </ArticleQuote>

      <ArticleH2>A New Chapter Is Taking Shape</ArticleH2>
      <ArticleP>
        While detailed project information will be officially released following RERA registration, the vision is clear — to create a future-ready residential destination that redefines comfort, connectivity, and lifestyle living in Market Yard.
      </ArticleP>
      <ArticleP>
        Stay connected with Majestique Landmarks for official project announcements, RERA registration details, and launch information.
      </ArticleP>
    </>
  )
}

function Blog3Content() {
  return (
    <>
      <ArticleIntro>
        Maharashtra's newly introduced housing policy marks one of the state's most significant urban development initiatives in decades, focused on affordability, redevelopment, sustainability, and inclusive urban planning.
      </ArticleIntro>
      <ArticleP>
        With ambitious goals centered around affordable housing delivery, infrastructure modernization, and redevelopment support, the policy creates substantial opportunities for both homeowners and developers — shaping the future of urban Maharashtra in a profound way.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Key Highlights Of The Policy</ArticleH2>

      <ArticleH3>Affordable Housing Expansion</ArticleH3>
      <ArticleP>
        A large-scale vision to increase access to quality housing for economically weaker and middle-income segments. The policy prioritizes inclusive growth and aims to bridge the housing gap through structured incentives for affordable residential development across Maharashtra.
      </ArticleP>

      <ArticleH3>Self-Redevelopment Support</ArticleH3>
      <ArticleP>
        Financial and technical support mechanisms designed to empower cooperative housing societies undertaking redevelopment initiatives. This enables aging housing stock to be upgraded with modern standards while benefiting existing residents.
      </ArticleP>

      <ArticleH3>Urban Infrastructure Modernization</ArticleH3>
      <ArticleP>
        Improved planning frameworks, integrated infrastructure, and cluster redevelopment strategies focused on enhancing urban living standards. The policy emphasizes smart city principles, sustainable building practices, and efficient urban land use.
      </ArticleP>

      <ArticleH3>Digital Transparency</ArticleH3>
      <ArticleP>
        Technology-driven monitoring systems designed to improve accountability, transparency, and project execution efficiency — building on the foundations established by MahaRERA to create a more trustworthy, transparent real estate environment.
      </ArticleP>

      <ArticleDivider />

      <AdvantageBox
        title="Policy Impact Areas"
        color="#3d5a8a"
        items={[
          'Increased supply of quality affordable housing',
          'Accelerated redevelopment of aging residential stock',
          'Enhanced infrastructure across urban and peri-urban areas',
          'Greater transparency and accountability in housing delivery',
          'Support for cooperative housing society self-redevelopment',
          'Stronger alignment with smart city and sustainability goals',
        ]}
      />

      <ArticleH2>The Future Of Urban Maharashtra</ArticleH2>
      <ArticleP>
        This policy reflects Maharashtra's commitment to creating future-ready cities built around accessibility, inclusivity, sustainability, and smart urban growth. As Pune continues to emerge as one of India's strongest real estate markets, these initiatives are expected to further accelerate residential development and infrastructure transformation.
      </ArticleP>

      <ArticleQuote attribution="Urban Development Perspective">
        A well-designed housing policy does not just build homes — it builds communities, creates opportunity, and lays the foundation for a more equitable and sustainable urban future.
      </ArticleQuote>

      <ArticleP>
        For homebuyers, investors, and real estate developers, Maharashtra's evolving policy landscape presents a significant opportunity to participate in one of India's most dynamic urban transformations. At Majestique Landmarks, we remain committed to delivering developments that align with these progressive aspirations.
      </ArticleP>
    </>
  )
}

function Blog4Content() {
  return (
    <>
      <ArticleIntro>
        Pune's real estate market has emerged as one of India's strongest and fastest-growing housing destinations, fueled by infrastructure development, economic expansion, and rising lifestyle aspirations.
      </ArticleIntro>
      <ArticleP>
        The city continues to attract first-time homebuyers, IT professionals, NRIs, luxury homebuyers, and commercial investors — cementing its position as a top-tier real estate destination that offers strong value compared to other major metropolitan cities.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Who Is Driving Demand?</ArticleH2>
      <ArticleList items={[
        'First-time homebuyers seeking quality and affordability',
        'IT professionals relocating to Pune\'s growing tech ecosystem',
        'Investors seeking strong rental yields and long-term appreciation',
        'NRIs investing in Indian real estate',
        'Luxury homebuyers upgrading to premium lifestyle residences',
        'Commercial investors tracking Pune\'s office and retail market',
      ]} />

      <ArticleDivider />

      <ArticleH2>The Rise Of Premium Housing</ArticleH2>
      <ArticleP>
        Demand for premium residences and luxury lifestyle developments continues to accelerate across Pune's high-growth micro-markets. Modern buyers increasingly seek larger homes, lifestyle amenities, community living, smart infrastructure, and long-term investment appreciation.
      </ArticleP>

      <AdvantageBox
        title="Pune's High-Growth Micro-Markets"
        color="#2d9d8f"
        items={[
          'Baner — Premium residential and commercial hub',
          'Balewadi — Sports infrastructure and lifestyle developments',
          'Kharadi — IT corridor with premium residential demand',
          'Hadapsar — Strong rental market and infrastructure growth',
          'Kothrud — Established community with strong appreciation',
          'Bavdhan — Growing connectivity and lifestyle infrastructure',
          'Wagholi — Affordable premium housing with strong demand',
        ]}
      />

      <ArticleH2>Modern Buyer Aspirations</ArticleH2>
      <ArticleList items={[
        'Larger home configurations — 2BHK, 3BHK, and 4BHK residences',
        'Premium lifestyle amenities — clubhouses, pools, fitness centers',
        'Community living with planned green spaces and social infrastructure',
        'Smart home features and modern building specifications',
        'Long-term investment appreciation in planned micro-markets',
      ]} />

      <ArticleDivider />

      <ArticleQuote attribution="Majestique Landmarks — Market Perspective">
        Pune's real estate market is not just growing — it is maturing. Today's buyers are more informed, more aspirational, and more committed to building lasting value through their property investments.
      </ArticleQuote>

      <ArticleH2>Pune — India's Future-Ready Real Estate Market</ArticleH2>
      <ArticleP>
        Despite rapid growth, Pune continues to offer strong value compared to other metropolitan cities, making it one of India's most attractive residential and investment destinations. With infrastructure growth, employment expansion, and rising urban aspirations, Pune's real estate journey is only beginning.
      </ArticleP>
      <ArticleP>
        At Majestique Landmarks, we remain committed to delivering thoughtfully designed residences across Pune's most valuable micro-markets — combining premium specifications, strategic location, and long-term value creation.
      </ArticleP>
    </>
  )
}

function Blog5Content() {
  return (
    <>
      <ArticleIntro>
        Maharashtra's ambitious economic vision is rapidly transforming Pune into one of India's most influential urban growth centers, positioning the state and its capital city as key drivers of India's economic future.
      </ArticleIntro>
      <ArticleP>
        With expanding infrastructure, thriving IT ecosystems, industrial growth, and increasing global investments, Pune is evolving into a major real estate and business hub — offering extraordinary opportunities for residents, investors, and businesses alike.
      </ArticleP>

      <ArticleDivider />

      <ArticleH2>Pune's Rapid Urban Evolution</ArticleH2>

      <ArticleH3>Infrastructure Expansion</ArticleH3>
      <ArticleP>
        Metro connectivity, expressways, transportation upgrades, and smart city initiatives are reshaping Pune's urban landscape. New corridors are improving inter-city connectivity and opening up previously underserved micro-markets to premium residential development.
      </ArticleP>

      <ArticleH3>Economic & Industrial Growth</ArticleH3>
      <ArticleP>
        IT parks, manufacturing corridors, startup ecosystems, and business expansion continue to generate employment and housing demand. Pune's diverse economic base — spanning IT, automotive, pharmaceuticals, and education — provides resilient demand drivers for the residential market.
      </ArticleP>

      <ArticleH3>Investment Momentum</ArticleH3>
      <ArticleP>
        Rising investor confidence and premium residential demand are positioning Pune as a highly attractive real estate destination. Domestic and international investors are increasingly recognizing Pune's strong fundamentals — employment growth, infrastructure investment, and lifestyle infrastructure.
      </ArticleP>

      <ArticleDivider />

      <AdvantageBox
        title="Maharashtra's Growth Drivers"
        color="#3d5a8a"
        items={[
          'Infrastructure investment — metro, roads, airports, and logistics',
          'IT and knowledge economy expansion across Pune and surrounding regions',
          'Industrial growth in automotive, pharma, and manufacturing sectors',
          'Startup ecosystem growth attracting talent and venture capital',
          'Tourism and hospitality sector expansion',
          'Global investments in Maharashtra\'s Special Economic Zones',
        ]}
      />

      <ArticleQuote attribution="Maharashtra Economic Vision">
        A $1 trillion economy is not just a financial milestone — it represents the aspirations of millions of families seeking better homes, better opportunities, and better futures across Maharashtra.
      </ArticleQuote>

      <ArticleH2>Building The Future With Majestique Landmarks</ArticleH2>
      <ArticleP>
        As Pune evolves into a globally connected urban center, Majestique Landmarks continues to contribute through thoughtfully designed residential communities focused on quality, innovation, and elevated lifestyles. Our developments across Pune's high-growth corridors reflect both the city's ambition and the aspirations of modern urban families.
      </ArticleP>
      <ArticleP>
        Every Majestique development is a commitment to Pune's future — built on decades of trust, transparency, and an unwavering dedication to delivering homes that create enduring value for homeowners and investors alike.
      </ArticleP>
    </>
  )
}

const CONTENT_MAP = {
  'ready-to-move-vs-under-construction': Blog1Content,
  'market-yard-new-lifestyle-destination-pune': Blog2Content,
  'maharashtra-housing-policy-urban-development': Blog3Content,
  'pune-housing-market-growth-2025': Blog4Content,
  'vibrant-maharashtra-1-trillion-economy': Blog5Content,
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function BlogDetail() {
  const { slug } = useParams()
  const blog = BLOGS.find((b) => b.slug === slug)

  if (!blog) return <Navigate to="/media/blogs" replace />

  const ContentComponent = CONTENT_MAP[slug]
  const currentIndex = BLOGS.findIndex((b) => b.slug === slug)
  const prevBlog = currentIndex > 0 ? BLOGS[currentIndex - 1] : null
  const nextBlog = currentIndex < BLOGS.length - 1 ? BLOGS[currentIndex + 1] : null

  return (
    <>
      <Seo
        title={blog.title}
        description={blog.seoDescription}
        image={blog.image}
      />

      <PageHero
        title={blog.title}
        subtitle={blog.subtitle}
        breadcrumb={['Home', 'Media', 'Blogs', blog.title]}
        bgImage={blog.image}
      />

      {/* ── Article Body ──────────────────────────────────────────── */}
      <div style={{ background: 'white' }}>
        <div className="container-luxury py-16">
          <div className="max-w-3xl mx-auto">

            {/* Article meta row */}
            <motion.div {...fU()} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(157,134,104,0.15)' }}>
              <span
                className="font-ui text-[0.58rem] tracking-widest uppercase px-3 py-1.5"
                style={{ background: blog.categoryColor + '18', color: blog.categoryColor, border: `1px solid ${blog.categoryColor}44` }}
              >
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm" style={{ color: 'rgba(44,62,88,0.5)' }}>
                <Calendar size={12} style={{ color: 'var(--gold)' }} />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm" style={{ color: 'rgba(44,62,88,0.5)' }}>
                <Clock size={12} style={{ color: 'var(--gold)' }} />
                {blog.readTime}
              </span>
            </motion.div>

            {/* Cover image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden mb-10"
              style={{ aspectRatio: '16/7' }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gold divider */}
            <motion.div {...fU(0.12)}>
              <div className="gold-line mb-8" />
            </motion.div>

            {/* Article content */}
            <motion.div {...fU(0.16)}>
              {ContentComponent && <ContentComponent />}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mt-12 p-8 text-center"
              style={{ background: 'var(--cream)', border: '1px solid rgba(157,134,104,0.18)' }}
            >
              <p className="font-ui text-[0.65rem] tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Explore Majestique</p>
              <h3 className="font-times text-2xl mb-2" style={{ color: 'var(--luxury-dark)' }}>Discover Your Majestique Address</h3>
              <div className="w-10 h-px mx-auto mb-4" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
              <p className="font-body text-sm mb-6 max-w-sm mx-auto" style={{ color: 'rgba(44,62,88,0.6)' }}>
                Explore ongoing and completed MahaRERA-registered developments across Pune's finest micro-markets.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/projects/ongoing" className="btn-gold transition-transform duration-300 hover:scale-105" style={{ fontSize: '0.75rem' }}>View Projects</Link>
                <Link to="/contact" className="btn-outline-dark transition-transform duration-300 hover:scale-105" style={{ fontSize: '0.75rem' }}>Get in Touch</Link>
              </div>
            </motion.div>

            {/* Navigation between articles */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(157,134,104,0.15)' }}
            >
              <Link
                to="/media/blogs"
                className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'var(--gold-dark)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-dark)' }}
              >
                <ArrowLeft size={13} /> All Articles
              </Link>
              <div className="flex items-center gap-4">
                {prevBlog && (
                  <Link
                    to={`/media/blogs/${prevBlog.slug}`}
                    className="font-ui text-xs tracking-widest uppercase transition-colors duration-300 flex items-center gap-2"
                    style={{ color: 'rgba(44,62,88,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(44,62,88,0.45)' }}
                  >
                    <ArrowLeft size={11} /> Prev
                  </Link>
                )}
                {nextBlog && (
                  <Link
                    to={`/media/blogs/${nextBlog.slug}`}
                    className="font-ui text-xs tracking-widest uppercase transition-colors duration-300 flex items-center gap-2"
                    style={{ color: 'rgba(44,62,88,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(44,62,88,0.45)' }}
                  >
                    Next <ArrowRight size={11} />
                  </Link>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── More Articles ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-10">
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Continue Reading</p>
            <div className="gold-line" />
            <h2 className="font-times font-normal" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--luxury-dark)' }}>More From The Journal</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.filter((b) => b.slug !== slug).slice(0, 3).map((relatedBlog, i) => (
              <motion.article
                key={relatedBlog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white overflow-hidden"
                style={{ border: '1px solid rgba(157,134,104,0.13)', boxShadow: '0 2px 16px rgba(5,5,5,0.05)', transition: 'box-shadow 0.35s, transform 0.35s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 44px rgba(5,5,5,0.1)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(5,5,5,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <Link to={`/media/blogs/${relatedBlog.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={relatedBlog.image}
                    alt={relatedBlog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3 left-3 font-ui text-[0.5rem] tracking-widest uppercase px-2 py-1"
                    style={{ background: relatedBlog.categoryColor, color: 'white' }}
                  >
                    {relatedBlog.category}
                  </span>
                </Link>
                <div className="p-5">
                  <span className="font-body text-xs mb-2 block" style={{ color: 'rgba(44,62,88,0.45)' }}>{relatedBlog.readTime} · {relatedBlog.date}</span>
                  <h3 className="font-times text-base leading-snug mb-3" style={{ color: 'var(--luxury-dark)' }}>
                    <Link to={`/media/blogs/${relatedBlog.slug}`} className="hover:opacity-70 transition-opacity">{relatedBlog.title}</Link>
                  </h3>
                  <Link
                    to={`/media/blogs/${relatedBlog.slug}`}
                    className="flex items-center gap-2 font-ui text-[0.62rem] tracking-widest uppercase transition-colors duration-300"
                    style={{ color: 'var(--gold-dark)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-dark)' }}
                  >
                    Read Article <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

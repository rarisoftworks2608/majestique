import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import GoogleReviewsBadge from '../ui/GoogleReviewsBadge'
import 'swiper/css'
import 'swiper/css/pagination'

const TESTIMONIALS = [
  { quote: "Moving into our Majestique home was the proudest moment of our lives. Every detail exceeded our expectations — the craftsmanship, the amenities, the lifetime support.", name: 'Rajesh Sharma',          designation: 'Business Owner',       project: 'Majestique Evolvus',        initials: 'RS' },
  { quote: "We evaluated over a dozen developers before choosing Majestique. Their MahaRERA compliance and on-time delivery set them apart completely. Three years on, we couldn\'t be more at home.", name: 'Dr. Priya Mehta', designation: 'Senior Physician',     project: 'Majestique Towers',         initials: 'PM' },
  { quote: "The redevelopment process was seamless. What seemed complex was made simple and stress-free. Our new home is beyond anything we imagined.", name: 'Suresh & Anita Kulkarni', designation: 'Retired Professionals', project: 'New Friends Society',       initials: 'SK' },
  { quote: "The attention to detail in every corner is extraordinary. From the lobby to our home, Majestique's commitment to quality is visible at every step.",                       name: 'Vikram Nair',         designation: 'IT Executive',         project: 'Rhythm County',             initials: 'VN' },
  { quote: "Investing in Majestique was the best financial decision of my life. The location, quality, and timely delivery have contributed to exceptional appreciation.",            name: 'Ananya Desai',        designation: 'Investment Banker',    project: 'Majestique Aravali',        initials: 'AD' },
]

function TestimonialCard({ t }) {
  return (
    <div
      className="relative flex flex-col h-full p-8 bg-white group transition-all duration-400"
      style={{ border: '1px solid rgba(157,134,104,0.15)', boxShadow: '0 2px 20px rgba(10,10,10,0.04)', minHeight: '290px' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 44px rgba(10,10,10,0.1)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.35)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(10,10,10,0.04)'; e.currentTarget.style.borderColor = 'rgba(157,134,104,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Gold top bar on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>★</span>
        ))}
      </div>

      {/* Decorative quote */}
      <div className="font-display select-none leading-none mb-3"
        style={{ fontSize: '2.8rem', color: 'rgba(157,134,104,0.1)', lineHeight: 0.7 }}>"</div>

      {/* Quote */}
      <blockquote className="font-display font-light italic leading-relaxed flex-1 mb-6"
        style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', color: 'var(--ink)', opacity: 0.90, letterSpacing: '0.005em' }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="mt-auto">
        <div className="mb-4" style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center font-ui text-[0.55rem] font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#fff' }}>
            {t.initials}
          </div>
          <div>
            <p className="font-ui tracking-[0.14em] uppercase mb-0.5"
              style={{ fontSize: '0.56rem', color: 'var(--gold-dark)', fontWeight: 700 }}>
              {t.name}
            </p>
            <p className="font-body" style={{ fontSize: '0.88rem', color: 'rgba(10,10,10,0.80)', fontWeight: 400 }}>
              {t.designation} · {t.project}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const dotsRef = useRef(null)

  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ background: '#F9F5EF', paddingTop: 'clamp(3rem, 5vw, 4.5rem)', paddingBottom: 'clamp(3rem, 5vw, 4.5rem)' }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />

      {/* Subtle dot pattern */}
      <div className="absolute top-0 right-0 w-56 h-56 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(157,134,104,1) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />

      {/* Header */}
      <div className="container-luxury mb-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-ui text-[0.80rem] tracking-[0.28em] uppercase font-bold block mb-4"
            style={{ color: 'var(--gold)' }}
          >
            ✦ &nbsp; Client Stories
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ width: '44px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', transformOrigin: 'left', margin: '0 0 1.5rem' }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', color: 'var(--ink)', letterSpacing: '0.01em' }}
          >
            Homes Built on <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>Trust</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-shrink-0 self-start"
        >
          <GoogleReviewsBadge />
        </motion.div>
      </div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.08}
          spaceBetween={18}
          centeredSlides
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: dotsRef.current || '.testi-dots' }}
          onSwiper={s => {
            if (dotsRef.current) {
              s.params.pagination.el = dotsRef.current
              s.pagination.init(); s.pagination.update()
            }
          }}
          breakpoints={{
            640:  { slidesPerView: 1.4, spaceBetween: 20 },
            1024: { slidesPerView: 2.3, spaceBetween: 22 },
            1440: { slidesPerView: 2.8, spaceBetween: 24 },
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i} style={{ height: 'auto' }}>
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={dotsRef} className="testi-dots flex items-center justify-center gap-2 mt-7" />
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="container-luxury mt-8 grid grid-cols-3 gap-0"
        style={{ borderTop: '1px solid rgba(157,134,104,0.14)', paddingTop: '1.75rem' }}
      >
        {[{ v: '18K+', l: 'Happy Families' }, { v: '5★', l: 'Average Rating' }, { v: '100%', l: 'On-Time Delivery' }].map((item, i) => (
          <div key={item.l} className="text-center py-3"
            style={{ borderRight: i < 2 ? '1px solid rgba(157,134,104,0.14)' : 'none' }}>
            <p className="font-display font-light mb-0.5"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', color: 'var(--gold-dark)', letterSpacing: '-0.02em' }}>
              {item.v}
            </p>
            <p className="font-ui text-[0.56rem] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(10,10,10,0.80)' }}>
              {item.l}
            </p>
          </div>
        ))}
      </motion.div>

      <style>{`
        .testi-dots .swiper-pagination-bullet{width:6px;height:2px;border-radius:0;background:rgba(157,134,104,0.3);opacity:1;transition:all .3s;margin:0 3px}
        .testi-dots .swiper-pagination-bullet-active{width:26px;background:#9D8668}
      `}</style>
    </motion.section>
  )
}

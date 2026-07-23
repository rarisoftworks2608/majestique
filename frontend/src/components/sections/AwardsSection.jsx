import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import { AWARDS as ALL_AWARDS } from '../../data/awards'

/* Most recent awards with photos — homepage highlights reel */
const AWARDS = [...ALL_AWARDS]
  .filter(a => a.image)
  .sort((a, b) => (b.year || 0) - (a.year || 0))
  .slice(0, 8)

export default function AwardsSection() {
  const navigate = useNavigate()
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section className="relative" style={{ background: '#fff' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(157,134,104,0.25),transparent)' }} />

      {/* ── Header ── */}
      <div className="container-luxury" style={{ paddingTop: '5rem', paddingBottom: '3.5rem' }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-ui text-[0.82rem] tracking-[0.28em] uppercase font-bold block mb-5"
          style={{ color: 'var(--gold)' }}
        >
          ✦ &nbsp; Recognition &amp; Excellence
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
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light leading-tight"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', color: 'var(--ink)', letterSpacing: '0.01em', maxWidth: '780px', textWrap: 'balance' }}
        >
          Celebrating Excellence. Honoring <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Trust.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="font-body mt-4"
          style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'rgba(10,10,10,0.85)', fontWeight: 400, maxWidth: 'none', lineHeight: 1.8, textWrap: 'pretty' }}
        >
          Our journey has been recognized through prestigious industry accolades that reflect our
          dedication to innovation, quality, and customer satisfaction. These recognitions are a
          testament to the trust placed in us by homeowners, partners, and industry leaders.
        </motion.p>
      </div>

      {/* ── Awards Swiper ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Nav */}
        <button ref={prevRef} aria-label="Previous"
          className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border transition-all duration-300"
          style={{ borderColor: 'rgba(157,134,104,0.35)', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(10,10,10,0.08)', color: 'var(--gold)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.color = 'var(--gold)' }}
        >
          <ArrowLeft size={15} />
        </button>
        <button ref={nextRef} aria-label="Next"
          className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border transition-all duration-300"
          style={{ borderColor: 'rgba(157,134,104,0.35)', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(10,10,10,0.08)', color: 'var(--gold)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.color = 'var(--gold)' }}
        >
          <ArrowRight size={15} />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1.15}
          centeredSlides
          spaceBetween={16}
          loop
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={s => {
            s.params.navigation.prevEl = prevRef.current
            s.params.navigation.nextEl = nextRef.current
            s.navigation.init(); s.navigation.update()
          }}
          breakpoints={{
            640:  { slidesPerView: 1.6,  spaceBetween: 20 },
            1024: { slidesPerView: 2.4,  spaceBetween: 24 },
            1440: { slidesPerView: 3,    spaceBetween: 28 },
          }}
        >
          {AWARDS.map((award, idx) => (
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`View award details: ${award.award}`}
                  onClick={() => navigate(`/media/awards/${award.slug}`)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/media/awards/${award.slug}`) } }}
                  className="relative overflow-hidden group block cursor-pointer [&_*]:cursor-pointer"
                  style={{
                    height: '420px',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                    opacity: isActive ? 1 : 0.72,
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
                    boxShadow: isActive ? '0 20px 60px rgba(10,10,10,0.14)' : '0 8px 24px rgba(10,10,10,0.08)',
                  }}
                >
                  <img src={award.image} alt={award.award}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 55%, transparent 100%)' }} />
                  <div className="absolute top-0 inset-x-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg,transparent,${isActive ? '#9D8668' : 'rgba(157,134,104,0.25)'},transparent)` }} />

                  {isActive && <>
                    <div className="absolute top-4 left-4 w-7 h-7 border-l border-t" style={{ borderColor: 'rgba(157,134,104,0.6)' }} />
                    <div className="absolute top-4 right-4 w-7 h-7 border-r border-t" style={{ borderColor: 'rgba(157,134,104,0.6)' }} />
                  </>}

                  <div className="absolute top-5 right-5">
                    <span className="font-ui text-[0.44rem] tracking-[0.22em] uppercase px-2.5 py-1.5"
                      style={{ background: 'rgba(157,134,104,0.9)', color: '#fff' }}>
                      {award.year}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <p className="font-ui text-[0.44rem] tracking-[0.24em] uppercase mb-1.5"
                      style={{ color: 'rgba(157,134,104,0.9)' }}>
                      {award.category}
                    </p>
                    <h3 className="font-display font-light leading-snug mb-2.5"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.45rem)', color: '#F3EFE8', letterSpacing: '0.01em' }}>
                      {award.award}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div style={{ width: '16px', height: '1px', background: 'var(--gold)' }} />
                      <p className="font-ui text-[0.44rem] tracking-[0.2em] uppercase"
                        style={{ color: 'rgba(243,239,232,0.88)' }}>
                        {award.platform}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ── CTA ── */}
      <div className="text-center mt-8 mb-8">
        <Link to="/media/awards"
          className="inline-flex items-center gap-2.5 font-ui tracking-[0.2em] uppercase transition-all duration-300 group"
          style={{ fontSize: '0.58rem', padding: '0.85rem 2.2rem', border: '1px solid rgba(10,10,10,0.22)', color: 'var(--ink)', background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.22)' }}
        >
          View All Awards <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

    </section>
  )
}

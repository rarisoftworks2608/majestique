'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Users, Target, ArrowRight, Camera } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'
import SectionHeader from '../../components/ui/SectionHeader'
import { ENGAGEMENT_ALBUMS, ENGAGEMENT_PHOTO_COUNT } from '../../data/engagementAlbums'

/* Photographs are served from public/images/engagement — the same set the
   Employee Engagement gallery uses, hand-picked here for the layout. */
const HERO = '/images/engagement/mpl-2025/05.jpg'
const PORTRAIT = '/images/engagement/ganpati-2025/02.jpg'
const BAND = '/images/engagement/ganpati-2025/06.jpg'

/* The three pillars are the copy already approved for the Careers page, kept
   word for word so the two pages tell the same story. */
const PILLARS = [
  {
    icon: Star,
    title: 'Excellence First',
    desc: 'Every detail matters. We build with precision, pride, and a commitment to standards that go beyond industry expectations.',
  },
  {
    icon: Users,
    title: 'Team & Belonging',
    desc: 'You are not just an employee but a valued member of the Majestique family, working toward a shared vision of excellence.',
  },
  {
    icon: Target,
    title: 'Purpose-Driven Work',
    desc: 'Every project we deliver creates homes for thousands of families. Your contribution directly shapes lives and communities.',
  },
]

/* Asymmetric editorial mosaic — spans are deliberate, so the grid reads as a
   composition rather than a uniform contact sheet. */
const MOSAIC = [
  { src: '/images/engagement/mpl-2025/09.jpg', span: 'col-span-2 row-span-2', caption: 'MPL finals' },
  { src: '/images/engagement/womens-day-2025/02.jpg', span: 'col-span-1 row-span-1', caption: "Women's Day" },
  { src: '/images/engagement/ganpati-2024/04.jpg', span: 'col-span-1 row-span-2', caption: 'Ganpati' },
  { src: '/images/engagement/mpl-2024/03.jpg', span: 'col-span-1 row-span-1', caption: 'Team MPL' },
  { src: '/images/engagement/womens-day-2026/04.jpg', span: 'col-span-2 row-span-1', caption: 'Celebrating together' },
  { src: '/images/engagement/ganpati-2025/01.jpg', span: 'col-span-1 row-span-1', caption: 'Visarjan' },
  { src: '/images/engagement/mpl-2025/10.jpg', span: 'col-span-1 row-span-1', caption: 'Champions' },
]

/* One cover frame per album, chosen by hand rather than defaulting to photo 1. */
const COVERS = {
  'ganpati-2025': '/images/engagement/ganpati-2025/02.jpg',
  'ganpati-2024': '/images/engagement/ganpati-2024/04.jpg',
  'mpl-2025': '/images/engagement/mpl-2025/09.jpg',
  'mpl-2024': '/images/engagement/mpl-2024/03.jpg',
  'womens-day-2026': '/images/engagement/womens-day-2026/02.jpg',
  'womens-day-2025': '/images/engagement/womens-day-2025/02.jpg',
}

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function PeopleCulture() {
  return (
    <>
      <PageHero
        title="People & Culture"
        subtitle="The people who build Majestique, and the culture that keeps them here"
        bgImage={HERO}
      />

      {/* ── Editorial intro ─────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.28),transparent)' }} />

        <div className="container-luxury relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="lg:col-span-5 relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={PORTRAIT}
                  alt="A Majestique colleague at the Ganpati celebrations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* gold frame offset, a quiet luxury cue used across the site */}
              <div
                className="absolute pointer-events-none hidden lg:block"
                style={{ inset: '-18px -18px 18px 18px', border: '1px solid rgba(212,175,55,0.35)', zIndex: -1 }}
                aria-hidden
              />
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.12 }} className="lg:col-span-7 lg:pl-4">
              <p className="section-label mb-4" style={{ color: 'var(--gold-dark)' }}>What We Stand For</p>
              <h2
                className="font-times font-normal leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)', color: 'var(--luxury-dark)' }}
              >
                Culture Built on <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Craft</em>
              </h2>
              <div className="w-14 h-px mb-7" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
              <p className="font-body leading-relaxed mb-5" style={{ fontSize: '0.98rem', color: 'rgba(26,26,26,0.66)' }}>
                Collaboration, ownership and excellence define our DNA. The same care that goes into a
                façade goes into how we work with each other.
              </p>
              <p className="font-body leading-relaxed" style={{ fontSize: '0.92rem', color: 'rgba(26,26,26,0.55)' }}>
                Through the year our teams come together for Ganpati, for the MPL season, for
                Women&apos;s Day. These are the days the company photographs, and they say more about
                us than any statement could.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pillars, on dark for contrast ───────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--luxury-dark)' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="font-display font-light whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'rgba(212,175,55,0.045)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            PEOPLE
          </span>
        </div>

        <div className="container-luxury relative">
          <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(212,175,55,0.18)' }}>
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-10 lg:p-12 text-center"
                style={{ background: 'var(--luxury-dark)' }}
              >
                <div
                  className="mx-auto mb-7 flex items-center justify-center rounded-full"
                  style={{ width: 58, height: 58, border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.06)' }}
                >
                  <pillar.icon size={21} strokeWidth={1.4} style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="font-times font-normal mb-4" style={{ fontSize: '1.25rem', color: 'var(--beige)' }}>
                  {pillar.title}
                </h3>
                <div className="w-8 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                <p className="font-body leading-relaxed" style={{ fontSize: '0.86rem', color: 'rgba(243,239,232,0.58)' }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-bleed band ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(300px, 46vh, 520px)' }}>
        <Image src={BAND} alt="Ganpati celebrations at Majestique" fill sizes="100vw" className="object-cover" style={{ objectPosition: 'center 55%' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.45) 55%, rgba(26,26,26,0.2) 100%)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container-luxury">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} style={{ maxWidth: '520px' }}>
              <p className="section-label mb-4" style={{ color: 'rgba(212,175,55,0.85)' }}>Life at Majestique</p>
              <h2 className="font-times font-normal leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--beige)' }}>
                The company shows up for its people, in full colour.
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Editorial mosaic ────────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: 'var(--cream)' }}>
        <div className="container-luxury">
          <div className="mb-12 text-center">
            <SectionHeader
              label="In Frame"
              title={<>Beyond the <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Desk</em></>}
              subtitle="Drums at dawn, floodlights at the ground, and a company that turns up for every one of them."
              align="center"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[210px]">
            {MOSAIC.map((shot, i) => (
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.07, 0.45) }}
                className={`group relative overflow-hidden ${shot.span}`}
                style={{ border: '1px solid rgba(212,175,55,0.16)' }}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.72), transparent 58%)' }}
                />
                <span
                  className="absolute bottom-4 left-5 font-ui text-[10px] tracking-[0.22em] uppercase translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: 'rgba(250,246,239,0.95)' }}
                >
                  {shot.caption}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Albums ──────────────────────────────────────────────── */}
      <section className="section-pad relative" style={{ background: '#fff' }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.22),transparent)' }} />
        <div className="container-luxury">
          <div className="mb-12 text-center">
            <SectionHeader
              label="The Albums"
              title={<>Traditions We <em style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Keep</em></>}
              subtitle={`${ENGAGEMENT_PHOTO_COUNT} photographs, gathered across ${ENGAGEMENT_ALBUMS.length} albums.`}
              align="center"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENT_ALBUMS.map((alb, i) => (
              <motion.div key={alb.slug} {...fadeUp} transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}>
                <Link
                  href="/about/employee-engagement"
                  className="group block relative overflow-hidden"
                  style={{ aspectRatio: '4/5', border: '1px solid rgba(212,175,55,0.18)' }}
                >
                  <Image
                    src={COVERS[alb.slug] || alb.photos[0]}
                    alt={`${alb.title} ${alb.year}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.86) 0%, rgba(26,26,26,0.25) 45%, transparent 70%)' }} />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="block font-ui text-[10px] tracking-[0.26em] uppercase mb-2" style={{ color: 'rgba(212,175,55,0.9)' }}>
                      {alb.year}
                    </span>
                    <span className="block font-times font-normal mb-2" style={{ fontSize: '1.2rem', color: 'var(--beige)' }}>
                      {alb.title}
                    </span>
                    <span className="flex items-center gap-2 font-body" style={{ fontSize: '0.75rem', color: 'rgba(243,239,232,0.6)' }}>
                      <Camera size={12} style={{ color: 'var(--gold)' }} /> {alb.photos.length} photographs
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about/employee-engagement"
              className="btn-gold inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              View the Full Gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Careers CTA ─────────────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'var(--luxury-dark2)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="absolute top-5 left-5 w-8 h-8 border-l border-t opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b opacity-20" style={{ borderColor: 'var(--gold)' }} />
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2" style={{ color: 'rgba(212,175,55,0.75)' }}>We are hiring</p>
            <h2 className="font-times text-2xl font-normal" style={{ color: 'var(--beige)' }}>
              Build a career worth talking about.
            </h2>
          </div>
          <Link href="/careers" className="btn-gold transition-transform duration-300 hover:scale-105">
            View Open Roles
          </Link>
        </div>
      </section>
    </>
  )
}

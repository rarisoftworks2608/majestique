import Seo from '../components/ui/Seo'
import HeroSection from '../components/sections/HeroSection'
import AboutPreviewSection from '../components/sections/AboutPreviewSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import AwardsSection from '../components/sections/AwardsSection'
import InvestmentSection from '../components/sections/InvestmentSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'

export default function Home() {
  return (
    <>
      <Seo
        title="Majestique Landmarks — Luxury Living. Global Vision. Timeless Landmarks."
        description="Pune's premier luxury real estate developer — 20M+ sq ft under development, 18,000+ happy families, 30+ landmark developments across Pune's finest addresses."
      />
      <HeroSection />
      <AboutPreviewSection />
      <FeaturedProjectsSection />
      <WhyChooseUsSection />
      <InvestmentSection />
      <TestimonialsSection />
      <AwardsSection />
    </>
  )
}

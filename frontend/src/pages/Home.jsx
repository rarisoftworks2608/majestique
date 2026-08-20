import Seo from '../components/ui/Seo'
import HeroSection from '../components/sections/HeroSection'
import LiveMajestiqueSection from '../components/sections/LiveMajestiqueSection'
import AboutPreviewSection from '../components/sections/AboutPreviewSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import AwardsSection from '../components/sections/AwardsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'

export default function Home() {
  return (
    <>
      <Seo
        title="Majestique Landmarks: Luxury Living. Global Vision. Timeless Landmarks."
        description="Pune's premier luxury real estate developer, with 20M+ sq ft under development, 18,000+ happy families, and 30+ landmark developments across Pune's finest addresses."
      />
      <HeroSection />
      <LiveMajestiqueSection />
      <AboutPreviewSection />
      <FeaturedProjectsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <AwardsSection />
    </>
  )
}

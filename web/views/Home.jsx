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

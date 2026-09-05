import Lenis from 'lenis'

/* Lenis previously drove its RAF loop through gsap.ticker, which forced
   gsap + ScrollTrigger (~100KB) into every page's bundle. Lenis ships its
   own RAF loop, and the only ScrollTrigger animation in the app (the
   CTASection parallax) now uses Framer Motion's useScroll instead. */
let lenisInstance = null
let rafId = null

export function initLenis() {
  if (lenisInstance) return lenisInstance
  if (typeof window === 'undefined') return null

  /* Respect the user's motion preference — smooth-scroll hijacking is a
     common accessibility complaint and an unnecessary main-thread cost. */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  const raf = (time) => {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate })
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
  }
}

export function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

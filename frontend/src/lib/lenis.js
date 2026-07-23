import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function initLenis() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add(time => lenisInstance.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
  }
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

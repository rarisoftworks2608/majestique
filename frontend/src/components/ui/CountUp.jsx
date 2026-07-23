import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue } from 'framer-motion'

/**
 * Animates a number counting up when it scrolls into view.
 * Pass either `to` (number) + `suffix`/`prefix`, or a single display
 * string like "30+", "18K+", "100%" via `value` — it will be parsed
 * into the numeric part (animated) and the surrounding text (static).
 */
export default function CountUp({ to, suffix = '', prefix = '', value, duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  let numTo = to
  let numPrefix = prefix
  let numSuffix = suffix

  if (value != null) {
    const match = String(value).match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/)
    if (match) {
      numPrefix = match[1]
      numTo = parseFloat(match[2].replace(/,/g, ''))
      numSuffix = match[3]
    } else {
      numTo = 0
      numPrefix = ''
      numSuffix = String(value)
    }
  }

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, numTo, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.floor(v).toString()),
    })
    return ctrl.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, numTo])

  return <span ref={ref}>{numPrefix}{display}{numSuffix}</span>
}

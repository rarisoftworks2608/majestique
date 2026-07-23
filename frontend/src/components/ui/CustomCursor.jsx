import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [hidden, setHidden] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, { stiffness: 320, damping: 30, mass: 0.3 })
  const y = useSpring(mouseY, { stiffness: 320, damping: 30, mass: 0.3 })

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setHidden(false) }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [isFinePointer, mouseX, mouseY])

  if (!isFinePointer) return null

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        userSelect: 'none',
      }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          lineHeight: 1,
          color: 'var(--gold)',
        }}
      >
        M
      </span>
    </motion.div>
  )
}

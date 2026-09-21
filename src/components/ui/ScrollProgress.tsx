import { useReducedMotion, useScroll, useSpring } from 'motion/react'
import * as m from 'motion/react-m'

/**
 * Playhead: linha de acento na base do header que avança conforme a página
 * rola, como o cursor de reprodução de uma DAW.
 *
 * A mola tira o "degrau" do scroll do mouse sem atrasar a ponto de descolar
 * do movimento real.
 */
export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  if (prefersReducedMotion) return null

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-accent glow-bar absolute inset-x-0 bottom-0 h-px origin-left"
    />
  )
}

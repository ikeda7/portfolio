import { motion, useReducedMotion } from 'motion/react'

import { EASE_OUT, VIEWPORT } from '@/lib/motion'

interface SectionHeadingProps {
  /** Numero da seção, ex.: "01". */
  readonly index: string
  /** Rótulo em caixa alta, ex.: "SOBRE". */
  readonly label: string
}

/**
 * Cabeçalho "01 / SOBRE" seguido de uma régua fina, como num rack de estúdio.
 * A régua se desenha da esquerda para a direita quando a seção entra na tela.
 */
export function SectionHeading({ index, label }: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mb-9 flex items-center gap-3">
      <span className="text-accent-text font-mono text-[11px] tracking-[0.16em] uppercase">
        {index} / {label}
      </span>
      <motion.span
        aria-hidden="true"
        className="bg-line h-px flex-1 origin-left"
        initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
    </div>
  )
}

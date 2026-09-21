import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'

import { REVEAL_TRANSITION, VIEWPORT, revealVariants } from '@/lib/motion'

interface RevealProps {
  readonly children: ReactNode
  readonly className?: string
  /** Atraso extra, em segundos, para encadear blocos irmãos. */
  readonly delay?: number
}

/**
 * Revela o conteúdo quando ele entra na viewport: sobe alguns pixels e aparece.
 * Dispara uma única vez (ver `REVEAL_DISTANCE` em `@/lib/motion`).
 *
 * Com `prefers-reduced-motion` o wrapper sai do caminho e o conteúdo é
 * renderizado direto — nenhum estado inicial invisível fica preso na tela.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={revealVariants}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </m.div>
  )
}

/**
 * Item de uma lista escalonada. Não observa a viewport por conta própria —
 * herda o estado do container que usa `staggerVariants`.
 */
export function RevealItem({ children, className }: Omit<RevealProps, 'delay'>) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div className={className} variants={revealVariants}>
      {children}
    </m.div>
  )
}

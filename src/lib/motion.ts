import type { Transition, Variants } from 'motion/react'

/**
 * Curvas e tempos compartilhados por todas as animações.
 *
 * Um único conjunto de constantes mantém a mesma "sensação" de atenuação do
 * começo ao fim da página — como usar o mesmo tempo de release em toda a
 * cadeia de um mix.
 */

/** `easeOutExpo` suave: entra rápido e assenta devagar, sem overshoot. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const REVEAL_TRANSITION: Transition = {
  duration: 0.6,
  ease: EASE_OUT,
}

/** Distância (px) que os elementos percorrem ao entrar na tela. */
export const REVEAL_DISTANCE = 24

/** Escalonamento entre irmãos de uma mesma lista (cards, canais do rack). */
export const STAGGER_STEP = 0.08

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0, transition: REVEAL_TRANSITION },
}

/** Container que escalona a entrada dos filhos. */
export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_STEP } },
}

/** Configuração de viewport usada em todos os reveals atrelados ao scroll. */
export const VIEWPORT = { once: true, amount: 0.2, margin: '-64px 0px' } as const

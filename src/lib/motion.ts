import type { Transition, Variants } from 'motion/react'

/**
 * Curvas e tempos compartilhados por todas as animações.
 *
 * Este arquivo é o único lugar para mexer no ritmo da página. Tudo que entra
 * na tela puxa daqui, então mudar um número abaixo muda a página inteira de
 * forma consistente — como usar o mesmo tempo de release em toda a cadeia de
 * um mix.
 *
 * As transições de *hover* NÃO vivem aqui: elas são `duration-300` do Tailwind,
 * fixadas pelo design aprovado, e hover precisa responder na hora.
 */

/** `easeOutExpo` suave: entra rápido e assenta devagar, sem overshoot. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Entrada dos blocos ao aparecerem na viewport. */
export const REVEAL_TRANSITION: Transition = {
  duration: 0.85,
  ease: EASE_OUT,
}

/** Preenchimento dos faders e das barras do rack — o gesto mais longo da página. */
export const FILL_TRANSITION: Transition = {
  duration: 1.25,
  ease: EASE_OUT,
}

/** Régua dos cabeçalhos de seção se desenhando da esquerda para a direita. */
export const RULE_TRANSITION: Transition = {
  duration: 1.1,
  ease: EASE_OUT,
}

/** Distância (px) que os elementos percorrem ao entrar na tela. */
export const REVEAL_DISTANCE = 24

/** Escalonamento entre irmãos de uma mesma lista (cards, canais do rack). */
export const STAGGER_STEP = 0.12

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

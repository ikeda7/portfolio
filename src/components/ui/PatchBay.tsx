import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'

interface PatchBayProps {
  readonly items: readonly string[]
}

/**
 * Bandeja de patch: uma grade de jacks rotulados.
 *
 * É o terceiro painel do rack. Onde os faders e o rack falam do que já está em
 * uso, este fala do que está entrando — por isso o jack, que é ponto de
 * conexão, e não uma barra, que sugeriria nível.
 *
 * Os jacks são decoração (`aria-hidden`); o que se lê é o rótulo.
 */
export function PatchBay({ items }: PatchBayProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.ul
      className="grid grid-cols-[repeat(auto-fit,minmax(min(148px,100%),1fr))] gap-2.5 px-[18px] py-[22px]"
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={VIEWPORT}
      variants={staggerVariants}
    >
      {items.map((item) => (
        <m.li
          key={item}
          variants={prefersReducedMotion ? undefined : revealVariants}
          className="border-line bg-panel-sunken hover:border-accent group flex items-center gap-2.5 rounded-lg border p-3 transition-all duration-300"
        >
          <span
            aria-hidden="true"
            className="border-knob-line bg-knob grid size-4 shrink-0 place-items-center rounded-full border"
          >
            <span className="bg-accent glow-led size-1.5 rounded-full" />
          </span>
          <span className="text-ink-muted group-hover:text-ink font-mono text-[10px] leading-[1.45] tracking-[0.1em] uppercase transition-colors duration-300">
            {item}
          </span>
        </m.li>
      ))}
    </m.ul>
  )
}

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { EASE_OUT, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillChannel } from '@/types/content'

interface RackRowProps extends SkillChannel {
  /** Posição da linha no rack — define o atraso do preenchimento em cadeia. */
  readonly index: number
}

/**
 * Linha horizontal do rack: rótulo e barra iluminada.
 *
 * Como nos faders, o comprimento da barra é composição visual, não nota —
 * por isso ela é `aria-hidden` e só o rótulo é lido.
 */
export function RackRow({ label, value, index }: RackRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${value}%`

  return (
    <div className="flex items-center gap-3">
      <span className="text-ink w-28 flex-none truncate font-mono text-[11px] uppercase">
        {label}
      </span>

      <div
        aria-hidden="true"
        className="border-line bg-panel-2 h-1.5 min-w-0 flex-1 overflow-hidden rounded-full border"
      >
        <m.span
          className="fill-horizontal glow-bar block h-full rounded-full"
          style={prefersReducedMotion ? { width: fill } : undefined}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { width: '0%' },
                whileInView: { width: fill },
                viewport: VIEWPORT,
                transition: { duration: 0.9, ease: EASE_OUT, delay: index * STAGGER_STEP },
              })}
        />
      </div>
    </div>
  )
}

import { motion, useReducedMotion } from 'motion/react'

import { EASE_OUT, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillChannel } from '@/types/content'

interface RackRowProps extends SkillChannel {
  /** Posição da linha no rack — define o atraso do preenchimento em cadeia. */
  readonly index: number
}

/** Linha horizontal do rack: rótulo, barra iluminada e valor. */
export function RackRow({ label, value, index }: RackRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${value}%`

  const animation = prefersReducedMotion
    ? { style: { width: fill } }
    : {
        initial: { width: '0%' },
        whileInView: { width: fill },
        viewport: VIEWPORT,
        transition: { duration: 0.9, ease: EASE_OUT, delay: index * STAGGER_STEP },
      }

  return (
    <div className="flex items-center gap-3">
      <span className="text-ink w-24 flex-none truncate font-mono text-[11px] uppercase">
        {label}
      </span>

      <div
        className="border-line bg-panel-2 h-1.5 min-w-0 flex-1 overflow-hidden rounded-full border"
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <meter> nativo nao e estilizavel o bastante para o design
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.span
          aria-hidden="true"
          className="fill-horizontal glow-bar block h-full rounded-full"
          {...animation}
        />
      </div>

      <span aria-hidden="true" className="text-ink-faint w-[34px] text-right font-mono text-[10px]">
        {value}
      </span>
    </div>
  )
}

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { EASE_OUT, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillChannel } from '@/types/content'

interface FaderProps extends SkillChannel {
  /** Posição do canal na mesa — define o atraso da subida em cadeia. */
  readonly index: number
}

/**
 * Canal vertical da mesa de som: trilho, preenchimento e knob.
 *
 * Ao entrar na tela o fader sobe de 0 até o valor, escalonado pelo índice —
 * a mesa "se ajusta" canal a canal, da esquerda para a direita.
 */
export function Fader({ label, value, index }: FaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${value}%`

  const animation = prefersReducedMotion
    ? {}
    : {
        initial: { height: '0%' },
        whileInView: { height: fill },
        viewport: VIEWPORT,
        transition: { duration: 0.9, ease: EASE_OUT, delay: index * STAGGER_STEP },
      }

  const knobAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { bottom: '0%' },
        whileInView: { bottom: fill },
        viewport: VIEWPORT,
        transition: { duration: 0.9, ease: EASE_OUT, delay: index * STAGGER_STEP },
      }

  return (
    <div
      className="flex min-w-0 flex-1 flex-col items-center gap-[10px]"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <meter> nativo nao e estilizavel o bastante para o design
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span className="text-ink-faint font-mono text-[10px]">{value}</span>

      <div className="border-line bg-panel-2 relative h-[150px] w-2 rounded-full border">
        <m.span
          aria-hidden="true"
          className="fill-vertical absolute inset-x-0 bottom-0 rounded-full"
          style={prefersReducedMotion ? { height: fill } : undefined}
          {...animation}
        />
        <m.span
          aria-hidden="true"
          className="bg-knob border-knob-line glow-knob absolute left-1/2 h-3 w-[26px] -translate-x-1/2 translate-y-1/2 rounded-[3px] border"
          style={prefersReducedMotion ? { bottom: fill } : undefined}
          {...knobAnimation}
        />
      </div>

      <span
        aria-hidden="true"
        className="text-ink-faint h-[78px] overflow-hidden font-mono text-[10px] tracking-[0.1em] uppercase [writing-mode:vertical-rl] [transform:rotate(180deg)]"
      >
        {label}
      </span>
    </div>
  )
}

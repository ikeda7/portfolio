import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { FILL_TRANSITION, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillChannel } from '@/types/content'

interface FaderProps extends SkillChannel {
  /** Posição do canal na mesa — define o atraso da subida em cadeia. */
  readonly index: number
}

/**
 * Canal vertical da mesa de som.
 *
 * O trilho, o preenchimento e o knob são decoração: a altura é composição
 * visual, não nota. Quem lê com leitor de tela recebe só o rótulo, que é a
 * informação de verdade.
 *
 * Ao entrar na tela o fader sobe de 0 até a posição, escalonado pelo índice —
 * a mesa "se ajusta" canal a canal, da esquerda para a direita.
 */
export function Fader({ label, value, index }: FaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${value}%`

  const transition = { ...FILL_TRANSITION, delay: index * STAGGER_STEP }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-[10px] self-stretch">
      <div
        aria-hidden="true"
        className="border-line bg-panel-2 relative w-2 flex-1 rounded-full border"
      >
        <m.span
          className="fill-vertical absolute inset-x-0 bottom-0 rounded-full"
          style={prefersReducedMotion ? { height: fill } : undefined}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { height: '0%' },
                whileInView: { height: fill },
                viewport: VIEWPORT,
                transition,
              })}
        />
        <m.span
          className="bg-knob border-knob-line glow-knob absolute left-1/2 h-3 w-[26px] -translate-x-1/2 translate-y-1/2 rounded-[3px] border"
          style={prefersReducedMotion ? { bottom: fill } : undefined}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { bottom: '0%' },
                whileInView: { bottom: fill },
                viewport: VIEWPORT,
                transition,
              })}
        />
      </div>

      <BotaoTecnologia
        termo={label}
        className="text-ink-muted hover:text-ink flex h-[86px] min-w-6 items-center justify-center overflow-hidden font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-300 [transform:rotate(180deg)] [writing-mode:vertical-rl]"
        classNameAtivo="text-accent-text"
      >
        {label}
      </BotaoTecnologia>
    </div>
  )
}

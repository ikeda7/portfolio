import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { FILL_TRANSITION, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillChannel } from '@/types/content'

interface RackRowProps extends SkillChannel {
  /** Posição da linha no rack — define o atraso do traçado em cadeia. */
  readonly index: number
}

/**
 * Linha do rack: rótulo, cabo e LED de canal conectado.
 *
 * Era uma barra de preenchimento cujo comprimento vinha de um número de 0 a
 * 100. O número não aparecia, mas a barra aparecia — e barra de comprimento
 * variável ao lado de um nome de tecnologia é lida como nota de proficiência,
 * que é afirmação sem fonte (ver `SkillChannel` em @/types/content).
 *
 * O cabo resolve isso sendo sempre inteiro: ele não mede nada, ele **liga**.
 * Todo canal do rack está conectado, e é exatamente o que o rack diz.
 */
export function RackRow({ label, index }: RackRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const transition = { ...FILL_TRANSITION, delay: index * STAGGER_STEP }

  return (
    <div className="flex items-center gap-3">
      <BotaoTecnologia
        termo={label}
        className="text-ink hover:text-accent-text flex min-h-6 w-28 flex-none items-center font-mono text-[11px] uppercase transition-colors duration-300"
        classNameAtivo="text-accent-text"
      >
        {label}
      </BotaoTecnologia>

      <div aria-hidden="true" className="flex min-w-0 flex-1 items-center gap-2">
        {/*
         * O cabo é traçado da esquerda para a direita, em cadeia — a mesma
         * cadência que os faders da mesa ao lado, para as duas metades da
         * seção entrarem como um aparelho só.
         */}
        <m.span
          className="bg-line block h-px min-w-0 flex-1 origin-left"
          style={prefersReducedMotion ? undefined : { transformOrigin: 'left' }}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { scaleX: 0 },
                whileInView: { scaleX: 1 },
                viewport: VIEWPORT,
                transition,
              })}
        />
        <m.span
          className="bg-accent glow-led block size-1.5 shrink-0 rounded-full"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: VIEWPORT,
                transition: { ...transition, delay: index * STAGGER_STEP + 0.18 },
              })}
        />
      </div>
    </div>
  )
}

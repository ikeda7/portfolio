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
 * Marca de unidade: onde todo canal para.
 *
 * É a mesma altura para os seis de propósito. Antes cada canal tinha a sua, e
 * uma fileira de faders em alturas diferentes é lida como nota mesmo sem número
 * nenhum na tela — foi o que aconteceu com a primeira pessoa que olhou a página
 * de fora. Nota de proficiência precisa de fonte; enquanto não existe, a mesa
 * fica calibrada em vez de opinativa. Ver `SkillChannel` em @/types/content.
 *
 * 72% e não 100%: fader no topo lê como "estourado", e a faixa vazia acima do
 * knob é o que faz o controle parecer um controle.
 */
const UNIDADE = 72

/**
 * Canal vertical da mesa de som.
 *
 * **O rótulo fica deitado nunca mais.** Ele era `writing-mode: vertical-rl` com
 * `rotate(180deg)`, o que economizava largura e custava a leitura: em teste com
 * leitor humano, a primeira reação a esta seção foi "texto deitado não dá pra
 * ler". Texto de interface se lê na horizontal. A largura que faltava veio de
 * deixar a mesa refluir — três canais por linha no celular, seis a partir de
 * `sm` (ver a grade em Skills).
 *
 * O trilho, o preenchimento e o knob são decoração e `aria-hidden`: quem usa
 * leitor de tela recebe só o rótulo, que é a informação — e o botão de foco.
 */
export function Fader({ label, index }: FaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${UNIDADE}%`

  const transition = { ...FILL_TRANSITION, delay: index * STAGGER_STEP }

  return (
    <div className="flex min-w-0 flex-col items-center gap-2.5">
      <div
        aria-hidden="true"
        className="border-line bg-panel-2 relative min-h-[104px] w-2 flex-1 rounded-full border"
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

      {/*
       * `min-h-8` com duas linhas cabendo: "EMBEDDINGS" quebra em coluna
       * estreita e "RAG" não, e sem a altura reservada a fileira de rótulos
       * ficava com os trilhos terminando em alturas diferentes.
       */}
      <BotaoTecnologia
        termo={label}
        className="text-ink-muted hover:text-ink flex min-h-8 w-full items-start justify-center text-center font-mono text-[11px] leading-[1.35] tracking-[0.04em] break-words uppercase transition-colors duration-300"
        classNameAtivo="text-accent-text"
      >
        {label}
      </BotaoTecnologia>
    </div>
  )
}

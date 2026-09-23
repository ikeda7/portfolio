import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { selo } from '@/data/skills'
import { FILL_TRANSITION, STAGGER_STEP, VIEWPORT } from '@/lib/motion'
import type { SkillTerm } from '@/types/content'

interface FaderProps {
  readonly termo: SkillTerm
  /** Posição do canal na mesa — define o atraso da subida em cadeia. */
  readonly index: number
}

/**
 * Marca de unidade: onde todo canal para.
 *
 * É a mesma altura para todos de propósito. Antes cada canal tinha a sua, e uma
 * fileira de faders em alturas diferentes é lida como nota mesmo sem número
 * nenhum na tela — foi o que aconteceu com a primeira pessoa que olhou a página
 * de fora. Nota de proficiência precisa de fonte; enquanto não existe, a mesa
 * fica calibrada em vez de opinativa.
 *
 * 72% e não 100%: fader no topo lê como "estourado", e a faixa vazia acima do
 * knob é o que faz o controle parecer um controle.
 */
const UNIDADE = 72

/**
 * Canal vertical da mesa de som — uma linguagem.
 *
 * **A mesa é só das linguagens.** Ela já misturou linguagem, técnica de IA e
 * biblioteca nos mesmos canais, e a leitura de fora foi "fica tudo muito
 * bagunçado o que é linguagem, o que é framework, o que é técnica de IA". Hoje
 * o nicho vem da taxonomia do próprio currículo, e a extensão no rótulo é o que
 * marca a categoria sem precisar de legenda: `.py` diz "linguagem" sozinho.
 *
 * **O rótulo fica deitado nunca mais.** Ele era `writing-mode: vertical-rl` com
 * `rotate(180deg)`, o que economizava largura e custava a leitura — "texto
 * deitado não dá pra ler" foi literal. A largura que faltava veio de deixar a
 * mesa refluir (ver a grade em Skills).
 *
 * O trilho, o preenchimento e o knob são decoração e `aria-hidden`: quem usa
 * leitor de tela recebe só o rótulo, que é a informação — e o botão de foco.
 */
export function Fader({ termo, index }: FaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${UNIDADE}%`
  const extensao = selo(termo)

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
       * `min-h-9` com duas linhas cabendo: o nome quebra em coluna estreita e a
       * extensão desce, e sem a altura reservada a fileira de rótulos deixaria
       * os trilhos terminando em alturas diferentes.
       */}
      <BotaoTecnologia
        termo={termo.label}
        className="text-ink-muted hover:text-ink flex min-h-9 w-full flex-col items-center justify-start gap-0.5 text-center font-mono text-[11px] leading-[1.3] tracking-[0.04em] break-words uppercase transition-colors duration-300"
        classNameAtivo="text-accent-text"
      >
        {termo.label}
        {extensao && (
          <span
            aria-hidden="true"
            className="text-ink-faint text-[11px] tracking-[0.06em] lowercase"
          >
            {extensao}
          </span>
        )}
      </BotaoTecnologia>
    </div>
  )
}

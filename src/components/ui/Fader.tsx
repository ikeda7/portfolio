import { useReducedMotion } from 'motion/react'
import { useState } from 'react'
import * as m from 'motion/react-m'

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
 * leitor de tela recebe só o rótulo, que é a informação.
 *
 * No hover o knob sobe um pouco e acende — é a mão no fader. Volta ao sair:
 * a altura parada continua sendo a mesma para todos (ver `UNIDADE`).
 *
 * **E o canal é um botão.** Tocar (ou clicar) prende o knob em cima e acende,
 * e tocar de novo solta. Era um `<div>` que só respondia a hover — no
 * celular, sem mouse, a mesa inteira era de enfeite (achado do dono, 24/09).
 * Ligar um canal não diz nada sobre a linguagem: todos sobem a mesma altura,
 * como no hover.
 */
export function Fader({ termo, index }: FaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const fill = `${UNIDADE}%`
  const extensao = selo(termo)

  const [ligado, setLigado] = useState(false)

  const transition = { ...FILL_TRANSITION, delay: index * STAGGER_STEP }

  return (
    <button
      type="button"
      aria-pressed={ligado}
      onClick={() => setLigado((atual) => !atual)}
      className="group/canal flex min-w-0 cursor-pointer flex-col items-center gap-2.5"
    >
      <div
        aria-hidden="true"
        className="border-line bg-panel-2 relative min-h-[104px] w-2 flex-1 rounded-full border"
      >
        {/*
         * O preenchimento é uma peça só. O contêiner (`m.span`) tem a altura da
         * marca da unidade, animada pelo `motion`; o azul dentro dele é
         * `absolute bottom-0` e, no hover, cresce 14px ACIMA do contêiner —
         * os mesmos 14px que o knob sobe (de `translate-y-1/2` para
         * `-translate-y-2`). Era um segmento separado por cima, e a emenda dos
         * dois arredondados aparecia como um corte nas laterais.
         */}
        <m.span
          className="absolute inset-x-0 bottom-0"
          style={prefersReducedMotion ? { height: fill } : undefined}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { height: '0%' },
                whileInView: { height: fill },
                viewport: VIEWPORT,
                transition,
              })}
        >
          <span
            className={`fill-vertical absolute inset-x-0 bottom-0 rounded-full transition-[height] duration-300 group-hover/canal:h-[calc(100%+14px)] ${
              ligado ? 'h-[calc(100%+14px)]' : 'h-full'
            }`}
          />
        </m.span>
        <m.span
          className={`bg-knob glow-knob group-hover/canal:border-accent absolute left-1/2 h-3 w-[26px] -translate-x-1/2 rounded-[3px] border transition-[translate,border-color] duration-300 group-hover/canal:-translate-y-2 ${
            ligado ? 'border-accent -translate-y-2' : 'border-knob-line translate-y-1/2'
          }`}
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
      {/*
       * Com dez linguagens, abaixo de `lg` a mesa tem cinco colunas estreitas
       * demais para "JAVASCRIPT": ali aparece só a extensão, em destaque
       * (sugestão do dono), e o nome fica para o leitor de tela. De `lg` para
       * cima, nome e extensão.
       */}
      <span
        className={`group-hover/canal:text-ink flex min-h-9 w-full flex-col items-center justify-start gap-0.5 text-center font-mono text-[11px] leading-[1.3] tracking-[0.04em] break-words uppercase transition-colors duration-300 ${
          ligado ? 'text-ink' : 'text-ink-muted'
        }`}
      >
        <span className="sr-only lg:not-sr-only">{termo.label}</span>
        {extensao && (
          <span
            aria-hidden="true"
            className="text-ink text-[13px] tracking-[0.04em] lowercase lg:text-ink-faint lg:text-[11px] lg:tracking-[0.06em]"
          >
            {extensao}
          </span>
        )}
      </span>
    </button>
  )
}

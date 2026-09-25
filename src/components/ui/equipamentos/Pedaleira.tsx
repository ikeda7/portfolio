import { useState } from 'react'

import { somKnob, somPedal } from '@/lib/som'
import type { SkillTerm } from '@/types/content'

interface PedaleiraProps {
  readonly termos: readonly SkillTerm[]
}

/** Curso de um knob de pedal: de -135deg (mínimo) a +135deg (máximo). */
const MIN = -135
const MAX = 135
const PASSO = 45

function sortearAngulo(): number {
  return Math.round((MIN + Math.random() * (MAX - MIN)) / 15) * 15
}

/**
 * Front-end & mobile como pedaleira: cada tecnologia é um pedal.
 *
 * Duas brincadeiras, nenhuma com significado:
 *
 * - **Pisar** (clicar no corpo do pedal) liga e desliga — o LED e a borda
 *   acendem. Nenhum pedal nasce ligado, para a fileira não parecer uma
 *   escolha de "favoritos".
 * - **Os knobs giram.** Cada um nasce num ângulo sorteado a cada visita e anda
 *   45deg por clique, voltando ao mínimo depois do máximo. Ideia do dono
 *   (24/09): pedal com todos os knobs no mesmo lugar parece desenho, e
 *   knob torto não é lido como nota — diferente de fader em alturas
 *   diferentes, que foi por que a mesa das Linguagens ficou reta.
 *
 * Os knobs são botões próprios (com área de toque de 24px), irmãos do botão
 * do pedal e não filhos: botão dentro de botão não é HTML válido.
 *
 * Oito pedais: **4+4** do tablet para cima (o contêiner tem a largura exata de
 * quatro) e **2x4** no celular, onde quatro por linha partiria "BOOTSTRAP".
 */
export function Pedaleira({ termos }: PedaleiraProps) {
  const [ligados, setLigados] = useState<ReadonlySet<string>>(new Set())
  const [angulos, setAngulos] = useState<Readonly<Record<string, number>>>(() =>
    Object.fromEntries(
      termos.flatMap((t) => [0, 1].map((k) => [`${t.label}-${k}`, sortearAngulo()])),
    ),
  )

  function alternar(label: string) {
    somPedal(!ligados.has(label))
    setLigados((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  function girar(chave: string) {
    somKnob()
    setAngulos((atual) => {
      const agora = atual[chave] ?? 0
      return { ...atual, [chave]: agora + PASSO > MAX ? MIN : agora + PASSO }
    })
  }

  return (
    <ul className="mx-auto grid max-w-[260px] flex-1 grid-cols-2 content-center justify-items-center gap-3 p-4 sm:flex sm:max-w-[452px] sm:flex-wrap sm:justify-center xl:max-w-[508px]">
      {termos.map((termo) => {
        const ligado = ligados.has(termo.label)

        return (
          <li
            key={termo.label}
            className={`bg-panel-2 relative flex h-[136px] w-[100px] flex-col items-center rounded-[10px] border transition-all duration-300 hover:-translate-y-0.5 sm:w-[96px] xl:w-[108px] ${
              ligado ? 'border-accent glow-soft' : 'border-line-strong/50 hover:border-accent'
            }`}
          >
            {/* Os dois knobs: giram, independentes do pedal. */}
            <span className="flex gap-1 pt-2">
              {[0, 1].map((k) => {
                const chave = `${termo.label}-${k}`
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => girar(chave)}
                    aria-label={`Girar o knob ${k + 1} do pedal ${termo.label}`}
                    className="group/knob flex size-6 items-center justify-center rounded-full"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-knob border-knob-line group-hover/knob:border-accent relative size-4 rounded-full border transition-[rotate,border-color] duration-300"
                      style={{ rotate: `${angulos[chave] ?? 0}deg` }}
                    >
                      <span className="bg-ink absolute top-0.5 left-1/2 h-1.5 w-px -translate-x-1/2" />
                    </span>
                  </button>
                )
              })}
            </span>

            {/* O corpo do pedal: é o que se pisa. */}
            <button
              type="button"
              aria-pressed={ligado}
              onClick={() => alternar(termo.label)}
              className="group/pedal flex w-full flex-1 flex-col items-center justify-between px-1.5 pt-2 pb-3 sm:px-2"
            >
              <span className="flex flex-col items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full transition-all duration-300 ${
                    ligado ? 'bg-accent glow-led' : 'bg-knob-line'
                  }`}
                />
                <span
                  className={`text-center font-mono text-[11px] leading-[1.25] tracking-[0.04em] uppercase transition-colors duration-300 sm:tracking-[0.06em] ${
                    ligado ? 'text-accent-text' : 'text-ink group-hover/pedal:text-accent-text'
                  }`}
                >
                  {termo.label}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`border-knob-line size-7 rounded-full border bg-[radial-gradient(circle_at_40%_35%,#5a5a5a,#2a2a2a_70%)] transition-transform duration-150 ${
                  ligado ? 'scale-90' : ''
                }`}
              />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

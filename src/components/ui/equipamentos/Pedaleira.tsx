import { useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface PedaleiraProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * Front-end & mobile como pedaleira: cada tecnologia é um pedal.
 *
 * Pisar (clicar) liga e desliga o pedal — o LED acende, a borda acende. Não
 * significa nada além disso, e é de propósito: é o brinquedo da seção, não um
 * filtro. Nenhum pedal nasce ligado, para a fileira não parecer uma escolha
 * de "favoritos".
 *
 * Largura fixa por pedal e `flex-wrap` centralizado: a fileira quebra 4+3 no
 * desktop e 2+2+2+1 no celular, e a linha incompleta fica no meio, como numa
 * pedaleira de verdade, em vez de órfã na esquerda.
 */
export function Pedaleira({ termos }: PedaleiraProps) {
  const [ligados, setLigados] = useState<ReadonlySet<string>>(new Set())

  function alternar(label: string) {
    setLigados((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="flex flex-1 flex-wrap content-center justify-center gap-3 p-4">
      {termos.map((termo) => {
        const ligado = ligados.has(termo.label)

        return (
          <li key={termo.label}>
            <button
              type="button"
              aria-pressed={ligado}
              onClick={() => alternar(termo.label)}
              className={`bg-panel-2 hover:border-accent flex h-[136px] w-[108px] flex-col items-center justify-between rounded-[10px] border px-2 py-3 transition-all duration-300 hover:-translate-y-0.5 ${
                ligado ? 'border-accent glow-soft' : 'border-line-strong/50'
              }`}
            >
              {/* Dois knobs decorativos, como num pedal de verdade. */}
              <span aria-hidden="true" className="flex gap-3">
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="bg-knob border-knob-line relative size-4 rounded-full border"
                  >
                    <span className="bg-ink-faint absolute top-0.5 left-1/2 h-1.5 w-px -translate-x-1/2" />
                  </span>
                ))}
              </span>

              <span className="flex flex-col items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full transition-all duration-300 ${
                    ligado ? 'bg-accent glow-led' : 'bg-knob-line'
                  }`}
                />
                <span
                  className={`text-center font-mono text-[11px] leading-[1.25] tracking-[0.06em] uppercase transition-colors duration-300 ${
                    ligado ? 'text-accent-text' : 'text-ink'
                  }`}
                >
                  {termo.label}
                </span>
              </span>

              {/* O footswitch: o que se pisa. */}
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

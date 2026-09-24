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
 * **4+3 a partir de `sm`.** Com `flex-wrap` solto a fileira quebrava onde a
 * largura mandava (5+2 num monitor largo); agora o contêiner tem a largura
 * exata de quatro pedais mais o padding (`max-w`), e a linha de três fica centralizada. No
 * celular são três por linha (3+3+1): quatro exigiriam pedais de ~54px em
 * 320, e "BOOTSTRAP" não cabe sem partir a palavra.
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
    <ul className="mx-auto flex max-w-[300px] flex-1 flex-wrap content-center justify-center gap-2 p-4 sm:max-w-[452px] xl:max-w-[508px] sm:gap-3">
      {termos.map((termo) => {
        const ligado = ligados.has(termo.label)

        return (
          <li key={termo.label}>
            <button
              type="button"
              aria-pressed={ligado}
              onClick={() => alternar(termo.label)}
              className={`bg-panel-2 hover:border-accent flex h-[124px] w-[74px] flex-col sm:h-[136px] sm:w-[96px] xl:w-[108px] items-center justify-between rounded-[10px] border px-1.5 py-3 transition-all sm:px-2 duration-300 hover:-translate-y-0.5 ${
                ligado ? 'border-accent glow-soft' : 'border-line-strong/50'
              }`}
            >
              {/* Dois knobs decorativos, como num pedal de verdade. */}
              <span aria-hidden="true" className="flex gap-1.5 sm:gap-3">
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="bg-knob border-knob-line relative size-3.5 rounded-full border sm:size-4"
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
                  className={`text-center font-mono text-[11px] leading-[1.25] tracking-[0.04em] uppercase sm:tracking-[0.06em] transition-colors duration-300 ${
                    ligado ? 'text-accent-text' : 'text-ink'
                  }`}
                >
                  {termo.label}
                </span>
              </span>

              {/* O footswitch: o que se pisa. */}
              <span
                aria-hidden="true"
                className={`border-knob-line size-6 rounded-full sm:size-7 border bg-[radial-gradient(circle_at_40%_35%,#5a5a5a,#2a2a2a_70%)] transition-transform duration-150 ${
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

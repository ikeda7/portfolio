import { useState } from 'react'

import { somRele } from '@/lib/som'
import type { SkillTerm } from '@/types/content'

interface RackProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * Ferramentas como rack: cada uma é um módulo de equipamento, com parafusos
 * nos cantos, nome serigrafado e um medidor de atividade.
 *
 * Até 24/09 o rack era do Back-end; o dono inverteu (ferramenta é
 * infraestrutura — Docker, Linux, CI — e é isso que fica no rack, rodando).
 * A vida é a atividade: cinco LEDs por módulo, piscando em ritmos diferentes
 * (`@utility led-atividade` + atraso por índice), e o módulo acende no hover.
 * Os LEDs são CSS, então o `prefers-reduced-motion` os para.
 *
 * **Cada módulo é um botão de energia** (25/09): era o único equipamento da
 * Stack que não se tocava. Todos nascem ligados — é infraestrutura rodando —
 * e um clique desliga com o estalo de um relé: os LEDs apagam e o nome
 * escurece. Outro clique religa. Desligar não diz nada sobre a ferramenta.
 *
 * **Grade de blocos, não lista**, para não ler igual às pistas de DAW. São
 * nove ferramentas, então 3x3 a partir de `sm` (o painel ocupa a largura
 * inteira da Stack); uma coluna no celular.
 */
export function Rack({ termos }: RackProps) {
  const [desligados, setDesligados] = useState<ReadonlySet<string>>(new Set())

  function alternar(label: string) {
    somRele(desligados.has(label))
    setDesligados((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="grid flex-1 auto-rows-fr gap-2 p-3 sm:grid-cols-3">
      {termos.map((termo, index) => {
        const ligado = !desligados.has(termo.label)

        return (
          <li key={termo.label} className="flex">
            <button
              type="button"
              aria-pressed={ligado}
              onClick={() => alternar(termo.label)}
              className="border-line hover:border-accent group/modulo relative flex flex-1 flex-col justify-between gap-3 rounded-[6px] border bg-[linear-gradient(180deg,#1d1d1d,#131313)] px-4 py-3 text-left transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.07)] active:scale-[0.99]"
            >
              {/* Parafusos dos quatro cantos. */}
              {[
                'top-1.5 left-1.5',
                'top-1.5 right-1.5',
                'bottom-1.5 left-1.5',
                'bottom-1.5 right-1.5',
              ].map((canto) => (
                <span
                  key={canto}
                  aria-hidden="true"
                  className={`bg-knob-line absolute size-1 rounded-full ${canto}`}
                />
              ))}

              <span
                className={`group-hover/modulo:text-accent-text font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                  ligado ? 'text-ink' : 'text-ink-faint'
                }`}
              >
                {termo.label}
              </span>

              <span aria-hidden="true" className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((led) => (
                  <span
                    key={led}
                    className={`h-1.5 w-3 rounded-[1px] transition-colors duration-300 ${
                      ligado ? 'bg-accent led-atividade' : 'bg-knob-line'
                    }`}
                    style={
                      ligado
                        ? {
                            animationDuration: `${(0.8 + ((index * 3 + led) % 5) * 0.33).toFixed(2)}s`,
                            animationDelay: `${(((index + led * 2) % 7) * 0.12).toFixed(2)}s`,
                          }
                        : undefined
                    }
                  />
                ))}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

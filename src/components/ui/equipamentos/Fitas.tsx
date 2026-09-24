import { useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface FitasProps {
  readonly termos: readonly SkillTerm[]
}

/*
 * O carretel: aro, raios e cubo, desenhados por gradiente. Os raios são o
 * que deixa o giro visível — um círculo liso girando parece parado.
 */
const RAIOS =
  'repeating-conic-gradient(from 0deg, var(--color-knob-line) 0 12deg, transparent 12deg 60deg)'

/**
 * Bancos de dados como fitas cassete: cada banco é uma fita.
 *
 * Banco de dados é onde o dado fica guardado, e fita é o armazenamento do
 * estúdio — a metáfora é a mais literal da Stack, de propósito. Clicar põe a
 * fita para tocar: os dois carretéis giram e o LED acende; clicar de novo
 * para, e os carretéis ficam no ângulo em que pararam (a animação só troca
 * de `paused` para `running`, como o vinil dos Projetos).
 *
 * Duas colunas em qualquer largura: são quatro fitas, e 2x2 fecha.
 */
export function Fitas({ termos }: FitasProps) {
  const [tocando, setTocando] = useState<ReadonlySet<string>>(new Set())

  function alternar(label: string) {
    setTocando((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="grid flex-1 grid-cols-2 content-center gap-3 p-4">
      {termos.map((termo) => {
        const ativa = tocando.has(termo.label)

        return (
          <li key={termo.label} className="flex">
            <button
              type="button"
              aria-pressed={ativa}
              onClick={() => alternar(termo.label)}
              className={`flex flex-1 flex-col gap-2.5 rounded-[8px] border bg-[linear-gradient(180deg,#1e1e1e,#151515)] p-2.5 transition-all duration-300 hover:border-[rgb(var(--accent-rgb)/0.6)] sm:p-3 ${
                ativa ? 'border-accent glow-soft' : 'border-line'
              }`}
            >
              {/* A etiqueta da fita. */}
              <span className="bg-panel-2 border-line flex items-center justify-between gap-2 rounded-[4px] border px-2 py-1.5">
                <span
                  className={`min-w-0 truncate font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-300 ${
                    ativa ? 'text-accent-text' : 'text-ink'
                  }`}
                >
                  {termo.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`size-1.5 shrink-0 rounded-full transition-all duration-300 ${
                    ativa ? 'bg-accent glow-led' : 'bg-knob-line'
                  }`}
                />
              </span>

              {/* A janela, com os dois carretéis. */}
              <span
                aria-hidden="true"
                className="border-line flex items-center justify-around rounded-full border bg-[#0f0f0f] px-3 py-1.5"
              >
                {[0, 1].map((lado) => (
                  <span
                    key={lado}
                    className="carretel border-knob-line relative flex size-8 items-center justify-center rounded-full border-2"
                    style={{
                      backgroundImage: RAIOS,
                      animationPlayState: ativa ? 'running' : 'paused',
                    }}
                  >
                    <span className="bg-bg border-knob-line size-2.5 rounded-full border" />
                  </span>
                ))}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

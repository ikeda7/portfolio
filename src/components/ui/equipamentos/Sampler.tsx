import { useState } from 'react'

import { somPad } from '@/lib/som'
import type { SkillTerm } from '@/types/content'

interface SamplerProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * IA aplicada como sampler de pads (a grade de uma MPC): cada técnica é um pad.
 *
 * **O pad liga e fica ligado.** Era um flash de ~400ms, que sumia antes de o
 * olho registrar; agora clicar acende e clicar de novo apaga, como um pad em
 * modo latch.
 *
 * **E toca uma nota ao ligar e ao desligar.** Som gerado na hora pela Web
 * Audio API — um oscilador com envelope curto, sem arquivo de áudio nenhum.
 * Só toca em resposta ao clique (nunca sozinho), é baixo, e o `AudioContext`
 * só nasce no primeiro clique, que é o que os navegadores exigem.
 *
 * Desligar toca a mesma nota **caindo uma oitava**, mais curta e mais baixa
 * (sugestão do dono, 24/09): o ouvido distingue "ligou" de "desligou" sem
 * olhar, e a nota continua sendo a do pad.
 *
 * Quatro colunas a partir de `sm` (4x2, fecha); duas no celular (2x4).
 */
export function Sampler({ termos }: SamplerProps) {
  const [ligados, setLigados] = useState<ReadonlySet<string>>(new Set())

  function alternar(label: string, index: number) {
    somPad(index, !ligados.has(label))
    setLigados((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="grid flex-1 grid-cols-2 gap-2.5 p-4 sm:grid-cols-4 sm:gap-3">
      {termos.map((termo, index) => {
        const aceso = ligados.has(termo.label)

        return (
          <li key={termo.label} className="flex">
            <button
              type="button"
              aria-pressed={aceso}
              onClick={() => alternar(termo.label, index)}
              className={`relative flex min-h-[84px] flex-1 flex-col justify-end rounded-lg border p-2.5 text-left transition-all duration-200 hover:border-[rgb(var(--accent-rgb)/0.6)] active:scale-[0.97] sm:p-3 ${
                aceso
                  ? 'border-accent glow-cta bg-[rgb(var(--accent-rgb)/0.3)]'
                  : 'border-line bg-[linear-gradient(180deg,#1f1f1f,#161616)]'
              }`}
            >
              <span
                className={`font-mono text-[11px] leading-[1.25] tracking-[0.04em] break-words hyphens-auto transition-colors duration-200 ${
                  aceso ? 'text-white' : 'text-ink'
                }`}
              >
                {termo.label}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

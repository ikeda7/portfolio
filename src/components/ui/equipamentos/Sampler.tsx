import { useEffect, useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface SamplerProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * IA aplicada como sampler de pads (a grade de uma MPC): cada técnica é um pad.
 *
 * Bater no pad (clicar) dispara um flash curto, como o pad que acende ao
 * tocar a amostra. É o único equipamento em que o toque não deixa estado:
 * pad não "fica ligado", e o flash volta sozinho.
 *
 * Três colunas em qualquer largura, porque são seis pads e 3x2 é a grade que
 * fecha. O número no canto é o do pad, não uma ordem de importância — segue a
 * ordem do currículo.
 */
export function Sampler({ termos }: SamplerProps) {
  const [tocando, setTocando] = useState<string | null>(null)

  useEffect(() => {
    if (tocando === null) return
    const id = window.setTimeout(() => setTocando(null), 380)
    return () => window.clearTimeout(id)
  }, [tocando])

  return (
    <ul className="grid flex-1 grid-cols-3 gap-2.5 p-4 sm:gap-3">
      {termos.map((termo, index) => {
        const aceso = tocando === termo.label

        return (
          <li key={termo.label} className="flex">
            <button
              type="button"
              onClick={() => setTocando(termo.label)}
              className={`relative flex min-h-[88px] flex-1 flex-col justify-end rounded-lg border p-2.5 text-left transition-all duration-200 hover:border-[rgb(var(--accent-rgb)/0.6)] sm:p-3 ${
                aceso
                  ? 'border-accent bg-[rgb(var(--accent-rgb)/0.32)] glow-cta'
                  : 'border-line bg-[linear-gradient(180deg,#1f1f1f,#161616)] active:scale-[0.97]'
              }`}
            >
              <span
                aria-hidden="true"
                className="text-ink-faint absolute top-2 left-2.5 font-mono text-[11px] tabular-nums sm:left-3"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
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

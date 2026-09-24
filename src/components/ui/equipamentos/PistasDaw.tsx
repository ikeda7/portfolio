import { useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface PistasDawProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * Ferramentas & processos como as pistas de uma DAW: cada item é uma pista,
 * com medidor de nível e os botões M (mute) e S (solo).
 *
 * Os dois botões funcionam como numa DAW: M apaga a pista; S deixa só as
 * pistas em solo acesas e apaga o resto. É o nicho que mistura ferramenta com
 * processo, e a DAW é justamente onde o dia a dia é pista de tudo.
 *
 * O medidor é CSS (`@utility medidor`), com duração por índice para as pistas
 * não baterem juntas; parado sob `prefers-reduced-motion`, e em pista muda.
 * Some abaixo de `sm`: "Levantamento de requisitos" precisa da largura.
 */
export function PistasDaw({ termos }: PistasDawProps) {
  const [mudas, setMudas] = useState<ReadonlySet<string>>(new Set())
  const [solos, setSolos] = useState<ReadonlySet<string>>(new Set())

  function alternar(
    set: (f: (atual: ReadonlySet<string>) => ReadonlySet<string>) => void,
    label: string,
  ) {
    set((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="divide-line flex flex-1 flex-col divide-y">
      {termos.map((termo, index) => {
        const muda = mudas.has(termo.label)
        const solo = solos.has(termo.label)
        const apagada = muda || (solos.size > 0 && !solo)

        return (
          <li
            key={termo.label}
            className={`flex flex-1 items-center gap-3 px-[18px] py-1.5 transition-opacity duration-300 ${
              apagada ? 'opacity-40' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className="text-ink-faint hidden w-5 shrink-0 font-mono text-[11px] tabular-nums sm:block"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="text-ink min-w-0 flex-1 font-mono text-[11px] tracking-[0.06em]">
              {termo.label}
            </span>

            <span
              aria-hidden="true"
              className="bg-panel-2 hidden h-1.5 w-16 shrink-0 overflow-hidden rounded-full sm:block"
            >
              <span
                className={`fill-horizontal block h-full origin-left rounded-full ${
                  apagada ? 'scale-x-0' : 'medidor'
                }`}
                style={{ animationDuration: `${(1.1 + (index % 4) * 0.35).toFixed(2)}s` }}
              />
            </span>

            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-pressed={muda}
                aria-label={`Mute em ${termo.label}`}
                onClick={() => alternar(setMudas, termo.label)}
                className={`flex size-7 items-center justify-center rounded border font-mono text-[11px] transition-all duration-300 ${
                  muda
                    ? 'border-accent text-accent-text bg-[rgb(var(--accent-rgb)/0.14)]'
                    : 'border-line-strong/60 text-ink-muted hover:border-accent hover:text-ink'
                }`}
              >
                M
              </button>
              <button
                type="button"
                aria-pressed={solo}
                aria-label={`Solo em ${termo.label}`}
                onClick={() => alternar(setSolos, termo.label)}
                className={`flex size-7 items-center justify-center rounded border font-mono text-[11px] transition-all duration-300 ${
                  solo
                    ? 'border-accent text-accent-text bg-[rgb(var(--accent-rgb)/0.14)]'
                    : 'border-line-strong/60 text-ink-muted hover:border-accent hover:text-ink'
                }`}
              >
                S
              </button>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

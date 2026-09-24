import { useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface PistasDawProps {
  readonly termos: readonly SkillTerm[]
}

/*
 * Forma de onda dos clipes: barras finas de alturas que se repetem, desenhadas
 * por gradiente. É decoração pura — todo clipe tem o mesmo comprimento, de
 * propósito, para nenhum ler como "tempo de uso".
 */
const ONDA =
  'repeating-linear-gradient(90deg, rgb(var(--accent-rgb) / 0.55) 0 2px, transparent 2px 5px)'

/**
 * Back-end como a tela de arranjo de uma DAW: cada tecnologia é uma pista,
 * com M (mute), S (solo), o nome, e um clipe na linha do tempo que um cursor
 * de reprodução atravessa. (Até 24/09 as pistas eram das Ferramentas; o dono
 * inverteu com o rack.)
 *
 * M e S funcionam como numa DAW: M apaga a pista; S deixa só as pistas em solo
 * acesas. **Os botões ficam à esquerda do nome**; perto da borda direita eles
 * já disputaram o clique com a régua de seções — resolvido na própria régua
 * (ver SectionNav), e à esquerda eles continuam mais longe dela.
 *
 * O cursor é um traço por pista, todos com a mesma animação (`@utility
 * cabecote`), então leem como uma linha só atravessando o arranjo. CSS, parado
 * sob `prefers-reduced-motion`.
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

  const botao = (ativo: boolean) =>
    `flex size-7 shrink-0 items-center justify-center rounded border font-mono text-[11px] transition-all duration-300 ${
      ativo
        ? 'border-accent text-accent-text bg-[rgb(var(--accent-rgb)/0.14)]'
        : 'border-line-strong/60 text-ink-muted hover:border-accent hover:text-ink'
    }`

  return (
    <div className="flex flex-1 flex-col py-2">
      <ul className="flex flex-1 flex-col">
        {termos.map((termo) => {
          const muda = mudas.has(termo.label)
          const solo = solos.has(termo.label)
          const apagada = muda || (solos.size > 0 && !solo)

          return (
            <li
              key={termo.label}
              className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center gap-3 px-[18px] py-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  aria-pressed={muda}
                  aria-label={`Mute em ${termo.label}`}
                  onClick={() => alternar(setMudas, termo.label)}
                  className={botao(muda)}
                >
                  M
                </button>
                <button
                  type="button"
                  aria-pressed={solo}
                  aria-label={`Solo em ${termo.label}`}
                  onClick={() => alternar(setSolos, termo.label)}
                  className={botao(solo)}
                >
                  S
                </button>
                <span
                  className={`min-w-0 font-mono text-[11px] tracking-[0.04em] transition-colors duration-300 ${
                    apagada ? 'text-ink-faint' : 'text-ink'
                  }`}
                >
                  {termo.label}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="bg-panel-2 relative h-7 overflow-hidden rounded-[3px]"
              >
                <span
                  className={`absolute inset-y-1 right-1 left-1 rounded-[2px] border transition-all duration-300 ${
                    apagada
                      ? 'border-line bg-transparent opacity-40'
                      : 'border-[rgb(var(--accent-rgb)/0.5)] bg-[rgb(var(--accent-rgb)/0.12)]'
                  }`}
                  style={apagada ? undefined : { backgroundImage: ONDA }}
                />
                <span className="bg-ink/70 cabecote absolute inset-y-0 w-px" />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

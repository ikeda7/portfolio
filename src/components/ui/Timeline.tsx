import type { TimelineEntry } from '@/types/content'

interface TimelineProps {
  readonly entries: readonly TimelineEntry[]
  /** Nivel do titulo de cada entrada, para nao quebrar a hierarquia da pagina. */
  readonly headingLevel?: 'h3' | 'h4'
  /** Texto menor e sem marcadores — usado na coluna de Formacao. */
  readonly compact?: boolean
}

/**
 * Linha do tempo vertical, no formato de uma track lane de DAW: um trilho
 * contínuo à esquerda e um marcador por entrada.
 *
 * O marcador da posição atual acende no acento; os anteriores ficam no cinza
 * do knob. O trilho é `aria-hidden` — quem usa leitor de tela recebe uma lista
 * ordenada comum, que já carrega a sequência.
 */
export function Timeline({ entries, headingLevel = 'h3', compact = false }: TimelineProps) {
  const Heading = headingLevel

  return (
    <ol className="relative space-y-8 pl-7">
      <span aria-hidden="true" className="bg-line absolute top-2 bottom-2 left-[3.5px] w-px" />

      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.period}`} className="relative">
          {/*
           * Todo marcador acende. O apagado (cinza do knob) era o unico LED
           * escuro da pagina — hero, canais, PatchBay e Idiomas acendem todos —
           * e por isso lia como defeito, nao como "posicao anterior".
           *
           * A distincao entre atual e passado continua existindo, mas so no
           * brilho: o atual tem halo, o anterior nao. Quem carrega a informacao
           * de verdade e a etiqueta "Em andamento", em texto, ao lado.
           */}
          <span
            aria-hidden="true"
            className={`bg-accent absolute top-[7px] -left-7 size-2 rounded-full ${
              entry.current ? 'glow-led' : 'opacity-70'
            }`}
          />

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-accent-text font-mono text-[11px] tracking-[0.14em] uppercase">
              {entry.period}
            </span>
            {entry.current && (
              <span className="border-line bg-panel text-ink-faint rounded-full border px-2 py-0.5 font-mono text-[11px] tracking-[0.12em] uppercase">
                Em andamento
              </span>
            )}
          </div>

          <Heading
            className={`text-ink mt-2 font-semibold tracking-[-0.01em] ${
              compact ? 'text-[15px]' : 'text-[17px]'
            }`}
          >
            {entry.title}
          </Heading>

          <p className="text-ink-muted mt-1 text-[14px] leading-[1.5]">
            {entry.org}
            {entry.context && <span className="text-ink-faint"> · {entry.context}</span>}
          </p>

          {entry.bullets && (
            <ul className={compact ? 'mt-2' : 'mt-3 space-y-2'}>
              {entry.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className={`text-ink-muted relative text-[13px] leading-[1.65] ${
                    compact ? '' : 'pl-4'
                  }`}
                >
                  {!compact && (
                    <span
                      aria-hidden="true"
                      className="bg-accent/60 absolute top-[0.62em] left-0 size-1 rounded-full"
                    />
                  )}
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

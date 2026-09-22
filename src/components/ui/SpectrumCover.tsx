import type { LanguageShare } from '@/types/content'

interface SpectrumCoverProps {
  /** Caminho do repositório, ex.: `~/sports-control`. */
  readonly repo: string
  readonly languages: readonly LanguageShare[]
}

/** Altura mínima da barra, para que 0,6% apareça como traço em vez de sumir. */
const MIN_BAR = 4

/** Folga no topo: sem isso a barra dominante encosta no teto da capa. */
const HEIGHT_SCALE = 0.88

/**
 * Analisador de espectro: a composição real de linguagens do repositório.
 *
 * As alturas são percentuais medidos pela API do GitHub, não estimativa — é a
 * mesma régua do resto do site, onde número na tela precisa ter fonte.
 *
 * Cada coluna estica (`justify-end` dentro de altura cheia) porque a altura da
 * barra é percentual: num pai de altura automática, `height: 87%` não resolve.
 */
export function SpectrumCover({ repo, languages }: SpectrumCoverProps) {
  return (
    <div className="bg-panel-sunken flex h-full w-full flex-col justify-between p-4">
      <div className="text-ink-faint flex items-baseline justify-between font-mono text-[10px] tracking-[0.14em] uppercase">
        {/* Recuo para nao colidir com o numero da faixa, que e absoluto no canto. */}
        <span className="truncate pl-6">{repo}</span>
        <span className="shrink-0 pl-2">Espectro</span>
      </div>

      <div aria-hidden="true" className="flex flex-1 gap-2 pt-3 pb-1">
        {languages.map((language) => (
          <div key={language.label} className="flex min-w-0 flex-1 flex-col justify-end gap-1">
            <span className="text-ink-faint text-center font-mono text-[10px] tabular-nums">
              {language.share.toFixed(1)}
            </span>
            <div
              className="fill-vertical w-full rounded-t-[3px]"
              style={{ height: `${Math.max(language.share, MIN_BAR) * HEIGHT_SCALE}%` }}
            />
          </div>
        ))}
      </div>

      <ul className="border-line flex gap-2 border-t pt-2.5">
        {languages.map((language) => (
          <li
            key={language.label}
            className="text-ink-muted min-w-0 flex-1 truncate text-center font-mono text-[10px] tracking-[0.08em] uppercase"
          >
            {language.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

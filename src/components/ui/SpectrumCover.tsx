import type { LanguageShare } from '@/types/content'

interface SpectrumCoverProps {
  /** Caminho do repositório, ex.: `~/sports-control`. */
  readonly repo: string
  readonly languages: readonly LanguageShare[]
}

/** Altura mínima da barra, para que 0,6% apareça como traço em vez de sumir. */
const MIN_BAR = 4

/**
 * Altura reservada para o rotulo de porcentagem que fica acima de cada barra.
 *
 * Sem reservar, a coluna mais alta somava rotulo + barra e estourava o
 * contêiner: o `justify-end` nao tinha para onde empurrar e a barra subia,
 * saindo da linha de base das outras. Descontar aqui garante que toda barra
 * termine no mesmo Y, seja ela de 0,6% ou de 99,3%.
 */
const ALTURA_ROTULO = 18

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
              style={{
                height: `calc((100% - ${ALTURA_ROTULO}px) * ${Math.max(language.share, MIN_BAR) / 100})`,
              }}
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

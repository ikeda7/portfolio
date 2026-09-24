import { useReducedMotion } from 'motion/react'

interface MarqueeProps {
  /** O que corre na fita. */
  readonly items: readonly string[]
  /**
   * Segundos por termo. A duração da volta sai do tamanho da lista, para a
   * velocidade não mudar quando a lista cresce ou encolhe.
   */
  readonly segundosPorTermo?: number
}

/**
 * Fita rolando em loop — o transporte de tape / display de LED de um rack.
 *
 * O loop é perfeito porque a lista é renderizada duas vezes e a animação
 * translada exatamente -50%: quando a primeira cópia sai, a segunda está no
 * lugar exato onde a primeira começou.
 *
 * **Não é interativa.** Cada termo era um botão do foco técnico, que
 * acendia a tecnologia nos projetos; o foco saiu em 24/09 (ver Projects.tsx)
 * e a fita voltou a ser um letreiro. Também deixou de repetir a Stack — hoje
 * carrega as bibliotecas do GitHub que a Stack não tem —, e por isso perdeu as
 * etiquetas de nicho e a legenda fixa.
 *
 * Mais rápida desde que parou de ser clicável: a volta era lenta para dar
 * tempo de mirar num botão, e letreiro só precisa ser lido. Pausa no hover, e
 * vira lista estática sob `prefers-reduced-motion`.
 */
export function Marquee({ items, segundosPorTermo = 2 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const track = [...items, ...items]
  const duration = Math.round(items.length * segundosPorTermo)

  return (
    <div className="border-line group relative overflow-hidden border-y">
      <div className="overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul
          aria-label="Bibliotecas e frameworks do GitHub"
          className={`flex w-max items-center gap-10 ${
            prefersReducedMotion
              ? 'flex-wrap justify-center'
              : 'group-hover:[animation-play-state:paused]'
          }`}
          style={
            prefersReducedMotion ? undefined : { animation: `marquee ${duration}s linear infinite` }
          }
        >
          {track.map((item, index) => (
            <li
              key={`${item}-${index}`}
              // A segunda copia e puramente visual: some para leitores de tela.
              aria-hidden={index >= items.length ? 'true' : undefined}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap"
            >
              <span className="text-ink-faint font-mono text-[11px] tracking-[0.18em] uppercase">
                {item}
              </span>
              <span aria-hidden="true" className="bg-accent/40 size-1 shrink-0 rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

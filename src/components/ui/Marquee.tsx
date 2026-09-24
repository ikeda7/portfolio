import { useReducedMotion } from 'motion/react'

interface MarqueeProps {
  /** O que corre na fita. */
  readonly items: readonly string[]
  /** Legenda fixa à esquerda: diz o que a fita é, sem precisar ler os termos. */
  readonly legenda: string
  /** Segundos para a fita completar uma volta. Maior = mais lento. */
  readonly duration?: number
}

/**
 * Fita rolando em loop — o transporte de tape / display de LED de um rack.
 *
 * O loop é perfeito porque a lista é renderizada duas vezes e a animação
 * translada exatamente -50%: quando a primeira cópia sai, a segunda está no
 * lugar exato onde a primeira começou.
 *
 * **Não é mais interativa.** Cada termo era um botão do foco técnico, que
 * acendia a tecnologia nos projetos; o foco saiu em 24/09 (ver Projects.tsx)
 * e a fita voltou a ser o que parecia: um letreiro. Também deixou de repetir
 * a Stack — hoje carrega as bibliotecas dos projetos, que a Stack não tem —,
 * e por isso perdeu as etiquetas de nicho, que só existiam para situar um
 * termo da Stack.
 *
 * Pausa no hover, e vira lista estática sob `prefers-reduced-motion`. A volta
 * leva 90s: o texto precisa ser lido, não perseguido.
 */
export function Marquee({ items, legenda, duration = 90 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const track = [...items, ...items]

  return (
    <div className="border-line group relative flex items-center overflow-hidden border-y">
      {/*
       * A legenda fica parada, com fundo, por cima do começo da fita: sem
       * ela, uma fita de nomes de biblioteca logo depois da Stack seria lida
       * como a Stack repetida — que era exatamente o problema.
       */}
      <p className="border-line bg-bg text-accent-text relative z-10 shrink-0 border-r px-4 py-4 font-mono text-[11px] tracking-[0.18em] uppercase sm:px-6">
        {legenda}
      </p>

      <div className="min-w-0 flex-1 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
        <ul
          aria-label={legenda}
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

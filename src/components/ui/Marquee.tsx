import { useReducedMotion } from 'motion/react'

interface MarqueeProps {
  readonly items: readonly string[]
  /** Segundos para a fita completar uma volta. Maior = mais lento. */
  readonly duration?: number
}

/**
 * Fita rolando em loop — a metáfora do transporte de tape / display de LED de
 * um equipamento de rack.
 *
 * O loop é perfeito porque a lista é renderizada duas vezes e a animação
 * translada exatamente -50%: quando a primeira cópia sai, a segunda está no
 * lugar exato onde a primeira começou.
 *
 * A fita pausa no hover e some inteira sob `prefers-reduced-motion`, onde vira
 * uma lista estática.
 */
export function Marquee({ items, duration = 38 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const track = [...items, ...items]

  return (
    <div
      className="border-line group relative overflow-hidden border-y py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      role="presentation"
    >
      <ul
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
            // A segunda cópia é puramente visual: some para leitores de tela.
            aria-hidden={index >= items.length ? 'true' : undefined}
            className="text-ink-faint hover:text-accent-text flex shrink-0 items-center gap-10 font-mono text-[11px] tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300"
          >
            {item}
            <span aria-hidden="true" className="bg-accent/40 size-1 rounded-full" />
          </li>
        ))}
      </ul>
    </div>
  )
}

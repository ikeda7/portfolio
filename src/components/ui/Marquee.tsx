import { useReducedMotion } from 'motion/react'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { useFocoTecnico } from '@/hooks/useFocoTecnico'
import { estaEmFoco } from '@/lib/foco'

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
 * Cada termo é um botão: clicar acende a tecnologia na página inteira, igual
 * aos canais da Stack. A fita **para** enquanto houver algo em foco — perseguir
 * um alvo que se move é a definição de interface hostil — e volta a correr
 * quando o foco sai. Também pausa no hover e vira lista estática sob
 * `prefers-reduced-motion`.
 */
export function Marquee({ items, duration = 38 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const { foco } = useFocoTecnico()
  const track = [...items, ...items]

  const parada = prefersReducedMotion || foco !== null

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
        /*
         * A pausa por foco vai no style, não em classe: o atalho `animation`
         * inline reinicia `animation-play-state` para `running`, e inline
         * ganha de classe — a fita continuava correndo.
         */
        style={
          prefersReducedMotion
            ? undefined
            : {
                animation: `marquee ${duration}s linear infinite`,
                animationPlayState: parada ? 'paused' : 'running',
              }
        }
      >
        {track.map((item, index) => {
          const copia = index >= items.length

          return (
            <li
              key={`${item}-${index}`}
              // A segunda copia e puramente visual: some para leitores de tela
              // e sai da ordem de tabulacao, senao cada termo apareceria duas
              // vezes para quem navega por teclado.
              aria-hidden={copia ? 'true' : undefined}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap"
            >
              {copia ? (
                <span
                  className={`font-mono text-[11px] tracking-[0.18em] uppercase ${
                    estaEmFoco(item, foco) ? 'text-accent-text' : 'text-ink-faint'
                  }`}
                >
                  {item}
                </span>
              ) : (
                <BotaoTecnologia
                  termo={item}
                  className="text-ink-faint hover:text-accent-text flex min-h-6 min-w-6 items-center justify-center font-mono text-[11px] tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300"
                  classNameAtivo="text-accent-text"
                >
                  {item}
                </BotaoTecnologia>
              )}
              <span aria-hidden="true" className="bg-accent/40 size-1 shrink-0 rounded-full" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

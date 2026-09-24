import { useReducedMotion } from 'motion/react'
import { Fragment } from 'react'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { useFocoTecnico } from '@/hooks/useFocoTecnico'
import type { GrupoDaFita } from '@/data/skills'
import { estaEmFoco } from '@/lib/foco'

interface MarqueeProps {
  /** Os termos, agrupados por nicho — o título do grupo corre antes deles. */
  readonly items: readonly GrupoDaFita[]
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
 *
 * A volta leva 90s. Eram 38s no protótipo e 60s depois do primeiro pedido;
 * a 60s ainda corria mais que a leitura, e os títulos de nicho que entraram
 * junto alongaram a fita. O número é por volta inteira, então fita mais longa
 * a 90s anda na mesma velocidade que a antiga andaria a ~80s.
 */
export function Marquee({ items, duration = 90 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const { foco } = useFocoTecnico()
  const track = [...items, ...items]
  const metade = items.length

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
        {track.map((grupo, indiceGrupo) => {
          // A segunda copia e puramente visual: some para leitores de tela e
          // sai da ordem de tabulacao, senao cada termo apareceria duas vezes
          // para quem navega por teclado.
          const copia = indiceGrupo >= metade

          return (
            <Fragment key={`${grupo.titulo}-${indiceGrupo}`}>
              <li
                aria-hidden={copia ? 'true' : undefined}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap"
              >
                {/*
                 * O titulo do nicho: mesmo corpo dos termos, em acento e entre
                 * colchetes, para ler como etiqueta de grupo e nao como mais um
                 * termo. Nao e botao — nicho nao e tecnologia.
                 */}
                <span className="text-accent-text font-mono text-[11px] tracking-[0.18em] uppercase">
                  [ {grupo.titulo} ]
                </span>
              </li>
              {grupo.termos.map((item) => (
                <li
                  key={`${item}-${indiceGrupo}`}
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
              ))}
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}

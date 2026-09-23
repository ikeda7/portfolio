import * as m from 'motion/react-m'
import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePointerGlow } from '@/hooks/usePointerGlow'

interface SectionProps {
  /** Id da âncora, sem `#`. O título da seção precisa usar `<id>-title`. */
  readonly id: string
  /** Número da faixa no cabeçalho, ex.: "01". */
  readonly index: string
  /** Rótulo em caixa alta do cabeçalho, ex.: "Sobre". */
  readonly label: string
  readonly children: ReactNode
  /**
   * Ocupar no mínimo uma tela. `false` para seção cujo conteúdo já preenche —
   * Projetos, com 6 cards, ficaria alto demais e obrigaria a rolar.
   */
  readonly fill?: boolean
}

/**
 * Container padrão de uma seção — o que faz as cinco terem o mesmo ritmo.
 *
 * Cada seção ocupa **no mínimo** uma tela. É mínimo e não altura fixa: Projetos
 * passa disso e simplesmente cresce, em vez de espremer os cards. Usamos `svh`
 * (small viewport height) porque no mobile a barra do navegador recolhe, e com
 * `vh` a seção daria um salto de altura no meio da rolagem.
 *
 * O container cresce em tela muito larga: parado em 1200px, um monitor de
 * 1900px deixava o conteúdo como uma coluna estreita cercada de vazio.
 *
 * **O respiro escala com a altura da janela.** Com `py` fixo, a 1920x1080 o
 * conteúdo ficava como um bloco de ~500px no meio de 1080 — 53% de ocupação no
 * Contato, com 200px mortos em cima e embaixo. Agora o espaço vai para dentro
 * do conteúdo em vez de sobrar em volta: o miolo recebe `h-full` e cada seção
 * distribui o que tem na altura disponível.
 *
 * **As duas luzes moram aqui, e não em cada seção.** Elas existiam só no hero:
 * um pulso ambiente e um brilho de acento que persegue o cursor. Quem descia a
 * página entrava numa sequência de blocos parados e o site parecia perder
 * energia depois da primeira tela. Implementadas no container, toda seção
 * recebe as duas sem que ninguém precise lembrar de repetir o código — e o
 * ambiente **alterna de lado** conforme o número da faixa, para a página não
 * parecer o mesmo quadro colado seis vezes.
 *
 * Nenhuma das duas sobrevive a `prefers-reduced-motion`: o pulso morre no kill
 * switch CSS do `index.css`, e `usePointerGlow` devolve `background: null`.
 */
export function Section({ id, index, label, children, fill = true }: SectionProps) {
  const { bind, background } = usePointerGlow<HTMLElement>({ size: 520, alpha: 0.1 })
  const daEsquerda = Number(index) % 2 === 1

  return (
    <section
      {...bind}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative flex items-stretch overflow-hidden px-6 ${
        fill ? 'min-h-[100svh] py-[clamp(3.5rem,7vh,6rem)]' : 'py-12'
      }`}
    >
      <div
        aria-hidden="true"
        className={`animate-driftglow pointer-events-none absolute -top-[220px] h-[min(520px,62vw)] w-[min(860px,120%)] bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.16),rgb(13_13_13/0)_70%)] blur-[14px] ${
          daEsquerda ? '-left-[12%]' : '-right-[12%]'
        }`}
      />

      {background && (
        <m.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0"
        />
      )}

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col 2xl:max-w-[1440px]">
        <SectionHeading index={index} label={label} />
        {/*
         * `flex-1` entrega a altura que sobra para o conteúdo. Quem decide o
         * que fazer com ela é cada seção: as de tela cheia esticam as colunas
         * e distribuem os blocos, em vez de deixar o respiro sobrar em volta.
         */}
        <div className={fill ? 'flex flex-1 flex-col' : ''}>{children}</div>
      </div>
    </section>
  )
}

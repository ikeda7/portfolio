import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/ui/SectionHeading'

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
 * Cada seção ocupa **no mínimo** uma tela — a tela que sobra embaixo do
 * header, e não `100svh` cheios. Com a tela cheia, toda seção passava 66px da
 * dobra ao chegar pela navegação: a âncora pousa abaixo do header, então a
 * base da seção sempre caía fora da janela, e ela nunca cabia de uma vez.
 * É a mesma conta que o hero já fazia. É mínimo e não altura fixa: Projetos
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
 * **Nenhuma luz mora aqui.** Já moraram duas: a do cursor (hoje uma só,
 * `fixed` na raiz — ver [BrilhoDoCursor](./BrilhoDoCursor.tsx)) e um pulso
 * ambiente fixo num canto de cada seção, alternando de lado pelo número da
 * faixa. O pulso saiu em 24/09: com a luz do cursor andando pela página, uma
 * mancha azul parada num canto lia como "uma luz que não é a do meu cursor"
 * (print do dono, atrás da Stack). O hero mantém o dele, centralizado no topo,
 * que é parte do desenho da primeira tela.
 */
export function Section({ id, index, label, children, fill = true }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative flex items-stretch overflow-hidden px-6 ${
        fill
          ? 'py-9 sm:min-h-[calc(100svh-var(--header-h))] sm:py-[clamp(2.5rem,6vh,5rem)]'
          : 'py-9 sm:py-12'
      }`}
    >
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

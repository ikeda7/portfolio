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
 * **O pulso ambiente mora aqui; a luz do cursor não.** As duas existiam só no
 * hero, e quem descia a página entrava numa sequência de blocos parados — o
 * site parecia perder energia depois da primeira tela. O pulso continua por
 * seção de propósito: é ele que **alterna de lado** conforme o número da
 * faixa, para a página não parecer o mesmo quadro colado seis vezes.
 *
 * A luz do cursor saiu daqui. Com uma por seção, cada uma media a posição
 * relativa a si mesma e zerava no `onPointerLeave`: a luz morria de um lado da
 * fronteira e renascia do outro. Agora é uma só, `fixed` na raiz — ver
 * [BrilhoDoCursor](./BrilhoDoCursor.tsx). Esta seção voltou a não saber de luz
 * de cursor, e por isso também não precisa mais de handler de ponteiro.
 *
 * O pulso não sobrevive a `prefers-reduced-motion`: morre no kill switch CSS
 * do `index.css`.
 */
export function Section({ id, index, label, children, fill = true }: SectionProps) {
  const daEsquerda = Number(index) % 2 === 1

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative flex items-stretch overflow-hidden px-6 ${
        fill ? 'min-h-[calc(100svh-var(--header-h))] py-[clamp(2.5rem,6vh,5rem)]' : 'py-12'
      }`}
    >
      {/*
       * O pulso nasce 220px ACIMA da seção, e a seção corta o que passa da
       * borda (`overflow-hidden`). Sem a máscara, o corte caía perto do
       * centro do brilho — a parte mais forte — e virava uma linha reta na
       * fronteira com a seção de cima; o brilho do cursor, passando por ali,
       * parecia mudar de intensidade (leitura do dono, 24/09). A máscara faz
       * o pulso começar transparente exatamente na borda (220px) e chegar à
       * força total 160px abaixo dela.
       */}
      <div
        aria-hidden="true"
        className={`animate-driftglow pointer-events-none absolute -top-[220px] [mask-image:linear-gradient(to_bottom,transparent_220px,#000_380px)] h-[min(520px,62vw)] w-[min(860px,120%)] bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.16),rgb(13_13_13/0)_70%)] blur-[14px] ${
          daEsquerda ? '-left-[12%]' : '-right-[12%]'
        }`}
      />

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

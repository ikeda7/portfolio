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
   * Ocupar no mínimo uma tela.  para seção cujo conteúdo já preenche —
   * Projetos, com 6 cards, ficaria alto demais e obrigaria a rolar.
   */
  readonly fill?: boolean
}

/**
 * Container padrão de uma seção — o que faz as quatro terem o mesmo ritmo.
 *
 * Cada seção ocupa **no mínimo** uma tela. É mínimo e não altura fixa: Projetos
 * passa disso e simplesmente cresce, em vez de espremer os cards. Usamos `svh`
 * (small viewport height) porque no mobile a barra do navegador recolhe, e com
 * `vh` a seção daria um salto de altura no meio da rolagem.
 *
 * O container cresce em tela muito larga: parado em 1200px, um monitor de
 * 1900px deixava o conteúdo como uma coluna estreita cercada de vazio — foi a
 * causa da impressão de "não é responsivo", já que nada quebrava, só sobrava
 * margem.
 */
export function Section({ id, index, label, children, fill = true }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`flex items-center px-6 ${fill ? 'min-h-[100svh] py-24' : 'py-12'}`}
    >
      <div className="mx-auto w-full max-w-[1200px] 2xl:max-w-[1440px]">
        <SectionHeading index={index} label={label} />
        {children}
      </div>
    </section>
  )
}

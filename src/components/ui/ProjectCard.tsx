import { ArrowRight } from 'lucide-react'
import * as m from 'motion/react-m'

import { ProjectCover } from '@/components/ui/ProjectCover'
import { useFocoTecnico } from '@/hooks/useFocoTecnico'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import { algumEmFoco } from '@/lib/foco'
import type { Project } from '@/types/content'

/**
 * Card de projeto no formato "capa de vinil / painel de plugin".
 *
 * **A área de hit não se move.** O `<article>` fica parado e quem sobe no hover
 * é o `<div>` interno. Com o transform no próprio `<article>`, a área sensível
 * subia junto: perto da borda de baixo o card fugia do cursor, perdia o hover,
 * voltava, ganhava de novo — e ficava piscando. O atalho fixo no rodapé da
 * janela só tornou isso evidente, mas o laço existia em qualquer borda.
 *
 * O link usa *stretched link*: o `::after` do `<a>` cobre o card inteiro, então
 * a área clicável é o card todo em vez dos ~17px de altura do texto "Abrir" —
 * que ficava abaixo do mínimo de 24x24 da WCAG 2.5.8. O DOM continua com um
 * único link, rotulado com o nome do projeto.
 *
 * A ordem das camadas é frágil: o `::after` se ancora no ancestral posicionado
 * mais próximo, então o miolo do card NÃO pode ser `relative` — senão a área
 * clicável encolhe para o tamanho dele. Por isso o brilho vai por último no DOM
 * (pinta acima do conteúdo em fluxo, com `pointer-events-none`) e o `::after`
 * sobe para z-20, acima do brilho.
 */
export function ProjectCard({ track, title, description, tags, href, cover }: Project) {
  const { bind, background } = usePointerGlow<HTMLElement>({
    size: 260,
    alpha: 0.16,
    smooth: false,
  })

  /*
   * Com uma tecnologia em foco, os cards que a usam ficam em evidencia e os
   * outros recuam — nao somem. Esconder daria a impressao de que o Setlist
   * encolheu; recuar diz "estes tres, entre os seis".
   */
  const { foco } = useFocoTecnico()
  const combina = algumEmFoco(tags, foco)
  const recuado = foco !== null && !combina

  return (
    <article
      {...bind}
      className={`group relative h-full min-w-0 transition-all duration-500 ${
        recuado ? 'opacity-40 saturate-50' : 'opacity-100'
      }`}
    >
      <div
        className={`bg-panel group-hover:border-accent group-hover:glow-card group-focus-within:border-accent flex h-full flex-col overflow-hidden rounded-[14px] border transition-all duration-300 group-hover:-translate-y-2 group-focus-within:-translate-y-2 ${
          combina ? 'border-accent glow-soft' : 'border-line'
        }`}
      >
        <ProjectCover track={track} title={title} cover={cover} />

        <div className="flex-1 p-4">
          <h3 className="text-ink text-[17px] font-semibold tracking-[-0.01em]">{title}</h3>
          <p className="text-ink-muted mt-2 text-[13px] leading-[1.6]">{description}</p>

          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="bg-panel-2 text-ink-faint rounded px-2 py-1 font-mono text-[10px] tracking-[0.12em]"
              >
                {tag}
              </li>
            ))}
          </ul>

          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink-muted group-hover:text-accent-text mt-3 inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-3 after:absolute after:inset-0 after:z-20 after:content-['']"
              aria-label={`Abrir o projeto ${title} em uma nova aba`}
            >
              Abrir
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          ) : (
            // Sem link publico — trabalho de cliente ou repositorio privado.
            <span className="text-ink-faint mt-3 inline-flex font-mono text-[11px] tracking-[0.12em] uppercase">
              Sem link público
            </span>
          )}
        </div>
      </div>

      {/*
       * O brilho fica fora do miolo que se move, ancorado no `<article>`
       * parado. Dentro dele, o `inset-0` continuaria medindo a partir do
       * `<article>` enquanto o `overflow-hidden` recortaria no espaço já
       * deslocado — sobrava uma faixa sem brilho no topo durante o hover.
       */}
      {background && (
        <m.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[14px]"
        />
      )}
    </article>
  )
}

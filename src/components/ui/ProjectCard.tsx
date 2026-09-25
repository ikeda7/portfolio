import { ArrowRight } from 'lucide-react'

import { LabelCover } from '@/components/ui/LabelCover'
import { somScratch } from '@/lib/som'
import type { Project } from '@/types/content'

/**
 * Card de projeto, no formato capa de vinil.
 *
 * **A área de hit não se move.** O `<article>` fica parado e quem sobe no hover
 * é o `<div>` interno. Com o transform no próprio `<article>`, a área sensível
 * subia junto: perto da borda de baixo o card fugia do cursor, perdia o hover,
 * voltava, ganhava de novo — e ficava piscando.
 *
 * O link usa *stretched link*: o `::after` do `<a>` cobre o card inteiro, então
 * a área clicável é o card todo em vez dos ~17px de altura do texto "Abrir" —
 * que ficava abaixo do mínimo de 24x24 da WCAG 2.5.8. O DOM continua com um
 * único link, rotulado com o nome do projeto.
 *
 * O `::after` se ancora no ancestral posicionado mais próximo, então o miolo
 * do card NÃO pode ser `relative` — senão a área clicável encolhe para o
 * tamanho dele.
 *
 * **Sem brilho próprio desde 24/09.** O card tinha uma luz de cursor só dele,
 * ancorada no `<article>` parado: quando o miolo subia no hover, a luz ficava
 * 8px abaixo — um corte reto perto do topo e luz vazando embaixo do card
 * (print do dono). Hoje a luz do cursor da página inteira passa por cima de
 * tudo (ver BrilhoDoCursor), e o card é iluminado como qualquer outro
 * elemento.
 */
export function ProjectCard({ track, title, description, tags, href, estado, repo }: Project) {
  return (
    <article className="group relative h-full min-w-0">
      <div className="bg-panel border-line group-hover:border-accent group-hover:glow-card group-focus-within:border-accent flex h-full flex-col overflow-hidden rounded-[14px] border transition-all duration-300 group-hover:-translate-y-2 group-focus-within:-translate-y-2">
        <div className="border-line relative aspect-[16/7] overflow-hidden border-b">
          <LabelCover track={track} estado={estado} repo={repo} />
        </div>

        {/*
         * Coluna flex para o rodape do card poder descer com `mt-auto`.
         *
         * O projeto 01 tem 3 linhas de descricao e os outros tem 2, entao as
         * tags e o "Abrir" desciam um degrau e a fileira ficava desalinhada.
         * Dar `min-h` a descricao resolveria este texto e quebraria no
         * proximo; empurrar o rodape resolve para qualquer descricao futura.
         */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-ink group-hover:text-accent-text text-[17px] font-semibold tracking-[-0.01em] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-ink-muted texto-justo mt-2 text-[13px] leading-[1.6]">{description}</p>

          {/*
           * Tags e "Abrir" descem juntos. Alinhar so o "Abrir" deixaria as
           * tags na altura em que a descricao terminou, que e justamente o
           * degrau que se quer tirar da fileira.
           *
           * Este `<div>` NAO pode ganhar `relative`: o `::after` do link se
           * ancora no ancestral posicionado mais proximo, e a area clicavel
           * encolheria do card inteiro para este bloco.
           */}
          <div className="mt-auto pt-2.5">
            {/*
             * As tags liam apagadas: `ink-faint` sobre `panel-2`, sem borda,
             * pareciam desabilitadas. Agora tem contorno em acento e texto um
             * degrau acima, e acendem juntas no hover do card.
             *
             * O hover e do card e nao de cada tag de proposito: o `::after`
             * do "Abrir" cobre o card inteiro (z-20), entao uma tag sob o
             * mouse nunca recebe o ponteiro. Subir a tag acima dele criaria
             * pontos mortos no clique do card, que e o que importa.
             */}
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="text-ink-muted group-hover:text-accent-text group-hover:border-accent rounded border border-[rgb(var(--accent-rgb)/0.35)] bg-[rgb(var(--accent-rgb)/0.06)] px-2 py-1 font-mono text-[11px] tracking-[0.12em] transition-all duration-300 group-hover:bg-[rgb(var(--accent-rgb)/0.14)]"
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
                onClick={somScratch}
                className="text-ink-muted hover:text-accent-text group-hover:text-accent-text mt-3 inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-3 after:absolute after:inset-0 after:z-20 after:content-['']"
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
      </div>
    </article>
  )
}

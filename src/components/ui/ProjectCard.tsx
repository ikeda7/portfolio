import { ArrowRight } from 'lucide-react'
import * as m from 'motion/react-m'

import { ProjectCover } from '@/components/ui/ProjectCover'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import type { Project } from '@/types/content'

/**
 * Card de projeto no formato "capa de vinil / painel de plugin".
 *
 * O link usa o padrão *stretched link*: o `::after` do `<a>` cobre o card
 * inteiro, então a área clicável é o card todo em vez dos ~17px de altura do
 * texto "Abrir" — que ficava abaixo do mínimo de 24x24 da WCAG 2.5.8. O DOM
 * continua com um único link, rotulado com o nome do projeto.
 *
 * A ordem das camadas importa e é frágil: o `::after` se ancora no ancestral
 * posicionado mais próximo, então o miolo do card NÃO pode ser `relative` —
 * senão a área clicável encolhe para o tamanho dele. Por isso o brilho vai por
 * último no DOM (pinta acima do conteúdo em fluxo, com `pointer-events-none`)
 * e o `::after` sobe para z-20, acima do brilho.
 */
export function ProjectCard({ track, title, description, tags, href, cover }: Project) {
  const { bind, background } = usePointerGlow<HTMLElement>({
    size: 260,
    alpha: 0.16,
    smooth: false,
  })

  return (
    <article
      {...bind}
      className="group border-line bg-panel hover:border-accent hover:glow-card relative flex h-full min-w-0 flex-col overflow-hidden rounded-[14px] border transition-all duration-300 hover:-translate-y-2 focus-within:-translate-y-2"
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
          // Sem link publico — LexTrack e trabalho de cliente em producao.
          <span className="text-ink-faint mt-3 inline-flex font-mono text-[11px] tracking-[0.12em] uppercase">
            Em produção · sem repositório público
          </span>
        )}
      </div>

      {background && (
        <m.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 z-10"
        />
      )}
    </article>
  )
}

import { ArrowRight } from 'lucide-react'

import { VinylCover } from '@/components/ui/VinylCover'
import type { Project } from '@/types/content'

/** Card de projeto no formato "capa de vinil / painel de plugin". */
export function ProjectCard({ track, title, description, tags, href, cover }: Project) {
  return (
    <article className="group border-line bg-panel hover:border-accent hover:glow-card min-w-0 overflow-hidden rounded-[14px] border transition-all duration-300 hover:-translate-y-2">
      {cover ? (
        <img
          src={cover}
          alt={`Capa do projeto ${title}`}
          className="border-line aspect-[16/10] w-full border-b object-cover"
          loading="lazy"
        />
      ) : (
        <VinylCover track={track} />
      )}

      <div className="p-[18px]">
        <h3 className="text-ink text-[17px] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="text-ink-muted mt-2 text-[13px] leading-[1.6]">{description}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="bg-panel-2 text-ink-faint rounded px-2 py-1 font-mono text-[9px] tracking-[0.12em]"
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
            className="text-ink-muted group-hover:text-accent mt-4 inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-3"
            aria-label={`Abrir o projeto ${title} em uma nova aba`}
          >
            Abrir
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        ) : (
          // Regra de Ouro: sem link real, nao inventamos destino — marcamos o pendente.
          <span className="text-ink-faint mt-4 inline-flex font-mono text-[11px] tracking-[0.12em] uppercase">
            [INSERIR LINK]
          </span>
        )}
      </div>
    </article>
  )
}

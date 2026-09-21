import { SleeveCover } from '@/components/ui/SleeveCover'
import { TerminalCover } from '@/components/ui/TerminalCover'
import type { ProjectCover as Cover } from '@/types/content'

interface ProjectCoverProps {
  readonly track: string
  readonly title: string
  readonly tags: readonly string[]
  readonly cover: Cover
}

/**
 * Capa do card, no formato disco de vinil.
 *
 * A arte da frente é a **sleeve** e o disco fica atrás: no hover a sleeve
 * desliza para a esquerda e o disco aparece pela direita, girando — um vinil
 * saindo da capa.
 *
 * A sleeve muda conforme o projeto tem o quê para mostrar: print do site,
 * terminal com os comandos reais, ou capa tipográfica.
 */
export function ProjectCover({ track, title, tags, cover }: ProjectCoverProps) {
  return (
    <div className="border-line bg-panel-sunken relative aspect-[16/10] overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[8%] flex items-center justify-end"
      >
        <div className="flex aspect-square h-[62%] items-center justify-center rounded-full border border-[#2E2E2E] bg-[conic-gradient(from_0deg,#151515,#1D1D1D,#141414,#1D1D1D,#151515)] transition-transform duration-700 group-hover:rotate-[24deg]">
          <div className="glow-knob aspect-square w-[22%] rounded-full border border-[rgb(var(--accent-rgb)/0.6)] bg-[rgb(var(--accent-rgb)/0.35)]" />
        </div>
      </div>

      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-x-[22%]">
        {cover.kind === 'shot' && (
          <img
            src={cover.src}
            alt={`Tela inicial de ${title}`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        )}
        {cover.kind === 'terminal' && <TerminalCover lines={cover.lines} />}
        {cover.kind === 'sleeve' && <SleeveCover track={track} title={title} tags={tags} />}
      </div>

      <span
        aria-hidden="true"
        className="text-ink-faint absolute top-[10px] left-3 z-10 font-mono text-[10px] tracking-[0.14em]"
      >
        {track}
      </span>
    </div>
  )
}

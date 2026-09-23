import { SleeveCover } from '@/components/ui/SleeveCover'
import { SpectrumCover } from '@/components/ui/SpectrumCover'
import { TerminalCover } from '@/components/ui/TerminalCover'
import type { ProjectCover as Cover } from '@/types/content'

interface ProjectCoverProps {
  readonly track: string
  readonly title: string
  readonly cover: Cover
}

/**
 * Capa do card, no formato disco de vinil.
 *
 * A arte da frente é a **sleeve** e o disco fica atrás: no hover a sleeve
 * desliza para a esquerda e o disco aparece pela direita, girando — um vinil
 * saindo da capa.
 *
 * **A arte muda conforme o projeto tem o quê para mostrar** — e isso é
 * escolha de conteúdo, não de estética. Já foi espectro de linguagens nos
 * seis, e seis gráficos quase idênticos (quatro deles abrindo em
 * "TypeScript ~85%") diziam duas vezes o que as tags do card já diziam uma.
 * Quem tem site no ar mostra o site, quem é linha de comando mostra o
 * comando, e quem não tem nem um nem outro leva placa cega.
 */
export function ProjectCover({ track, title, cover }: ProjectCoverProps) {
  return (
    <div className="border-line bg-panel-sunken relative aspect-[16/7] overflow-hidden border-b">
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
            alt={`Captura de tela de ${title}`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        )}
        {cover.kind === 'terminal' && <TerminalCover lines={cover.lines} />}
        {cover.kind === 'spectrum' && (
          <SpectrumCover repo={cover.repo} languages={cover.languages} />
        )}
        {cover.kind === 'sleeve' && <SleeveCover status={cover.status} />}
      </div>

      <span
        aria-hidden="true"
        className="text-ink-faint absolute top-[10px] left-3 z-10 font-mono text-[11px] tracking-[0.14em]"
      >
        {track}
      </span>
    </div>
  )
}

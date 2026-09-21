interface SleeveCoverProps {
  readonly track: string
  readonly title: string
  readonly tags: readonly string[]
}

/**
 * Capa tipográfica, para o projeto que não tem nada público para mostrar.
 * Em vez de um card vazio, uma capa de disco: número da faixa grande, nome e
 * uma barra de acento — lê como escolha, não como falta.
 */
export function SleeveCover({ track, title, tags }: SleeveCoverProps) {
  return (
    <div className="bg-panel-sunken relative flex h-full w-full flex-col justify-between overflow-hidden p-5">
      <div
        aria-hidden="true"
        className="absolute -top-6 -right-4 font-mono text-[92px] leading-none font-bold text-[rgb(var(--accent-rgb)/0.10)] select-none"
      >
        {track}
      </div>

      <span aria-hidden="true" className="bg-accent glow-bar h-0.5 w-10 rounded-full" />

      <div className="relative">
        <p className="text-ink max-w-[85%] text-[19px] leading-[1.15] font-semibold tracking-[-0.02em]">
          {title}
        </p>
        <p className="text-ink-faint mt-2 font-mono text-[10px] tracking-[0.12em] uppercase">
          {tags.join(' · ')}
        </p>
      </div>
    </div>
  )
}

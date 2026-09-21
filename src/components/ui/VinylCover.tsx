interface VinylCoverProps {
  /** Número da faixa exibido no canto superior esquerdo. */
  readonly track: string
  /** Print do projeto. Sem ele, a capa mostra só o disco. */
  readonly cover: string | null
  readonly title: string
}

/**
 * Capa do card, no formato disco de vinil.
 *
 * Quando existe print do projeto, ele é a **capa** e o disco fica atrás: no
 * hover a capa desliza para a esquerda e o disco aparece pela direita, como
 * um vinil saindo da sleeve. Quem não tem site no ar mostra só o disco — o
 * que, na metáfora, é o projeto que não foi prensado.
 */
export function VinylCover({ track, cover, title }: VinylCoverProps) {
  return (
    <div className="border-line bg-panel-sunken relative aspect-[16/10] overflow-hidden border-b">
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 flex items-center ${
          cover ? 'right-[8%] justify-end' : 'inset-x-0 justify-center'
        }`}
      >
        <div className="flex aspect-square h-[62%] items-center justify-center rounded-full border border-[#2E2E2E] bg-[conic-gradient(from_0deg,#151515,#1D1D1D,#141414,#1D1D1D,#151515)] transition-transform duration-700 group-hover:rotate-[24deg]">
          <div className="glow-knob aspect-square w-[22%] rounded-full border border-[rgb(var(--accent-rgb)/0.6)] bg-[rgb(var(--accent-rgb)/0.35)]" />
        </div>
      </div>

      {cover && (
        <img
          src={cover}
          alt={`Tela inicial de ${title}`}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:-translate-x-[22%]"
        />
      )}

      {!cover && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1E1E1E,#101010)] mix-blend-multiply"
        />
      )}

      <span
        aria-hidden="true"
        className="text-ink-faint absolute top-[10px] left-3 z-10 font-mono text-[10px] tracking-[0.14em]"
      >
        {track}
      </span>
    </div>
  )
}

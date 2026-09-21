interface VinylCoverProps {
  /** Número da faixa exibido no canto superior esquerdo. */
  readonly track: string
}

/**
 * Capa em CSS puro (disco de vinil) usada enquanto o projeto não tem imagem.
 * Ao ter a arte real, trocar por `<img>` 16:10 com `object-fit: cover`.
 */
export function VinylCover({ track }: VinylCoverProps) {
  return (
    <div
      aria-hidden="true"
      className="border-line relative flex aspect-[16/10] items-center justify-center border-b bg-[radial-gradient(circle_at_50%_50%,#1E1E1E,#101010)]"
    >
      <span className="text-ink-faint absolute top-[10px] left-3 font-mono text-[10px] tracking-[0.14em]">
        {track}
      </span>

      <div className="flex aspect-square w-[42%] items-center justify-center rounded-full border border-[#2E2E2E] bg-[conic-gradient(from_0deg,#151515,#1D1D1D,#141414,#1D1D1D,#151515)]">
        <div className="glow-knob aspect-square w-[22%] rounded-full border border-[rgb(var(--accent-rgb)/0.6)] bg-[rgb(var(--accent-rgb)/0.35)]" />
      </div>
    </div>
  )
}

interface SectionHeadingProps {
  /** Numero da seção, ex.: "01". */
  readonly index: string
  /** Rótulo em caixa alta, ex.: "SOBRE". */
  readonly label: string
}

/** Cabeçalho "01 / SOBRE" seguido de uma régua fina, como num rack de estúdio. */
export function SectionHeading({ index, label }: SectionHeadingProps) {
  return (
    <div className="mb-9 flex items-center gap-3">
      <span className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
        {index} / {label}
      </span>
      <span aria-hidden="true" className="bg-line h-px flex-1" />
    </div>
  )
}

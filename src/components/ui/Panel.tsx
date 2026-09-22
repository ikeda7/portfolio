import type { ReactNode } from 'react'

interface PanelProps {
  readonly title: string
  /** Código mono exibido à direita do cabeçalho (estética de equipamento). */
  readonly code: string
  readonly children: ReactNode
}

/** Painel com cabeçalho, usado pelos racks de habilidades e pelo bloco de canais. */
export function Panel({ title, code, children }: PanelProps) {
  return (
    <div className="border-line bg-panel flex h-full flex-col overflow-hidden rounded-[14px] border">
      <div className="border-line bg-panel-2 flex items-center justify-between border-b px-[18px] py-[14px]">
        <h3 className="text-ink font-mono text-[11px] tracking-[0.14em] uppercase">{title}</h3>
        <span className="text-ink-faint font-mono text-[10px]">{code}</span>
      </div>
      {children}
    </div>
  )
}

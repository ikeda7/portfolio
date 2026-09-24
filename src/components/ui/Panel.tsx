import type { ReactNode } from 'react'

interface PanelProps {
  readonly title: string
  /**
   * Detalhe à direita do cabeçalho — hoje, a contagem do que o painel lista
   * (ver `contagem` em `lib/`). Opcional: onde contar não significa nada, como
   * no formulário, o canto fica vazio.
   */
  readonly code?: string
  /**
   * Esticar até a altura do irmão mais alto.
   *
   * Serve para painéis lado a lado numa grade, onde alturas diferentes ficam
   * desalinhadas. **Não use em coluna:** ali o contêiner tem altura definida, os
   * painéis viram todos `height: 100%`, e o resultado é um painel curto com um
   * vão morto embaixo e outro com o conteúdo cortado pelo `overflow-hidden`.
   */
  readonly fill?: boolean
  readonly children: ReactNode
}

/** Painel com cabeçalho, usado pelos racks de habilidades e pelo bloco de canais. */
export function Panel({ title, code, fill = false, children }: PanelProps) {
  return (
    <div
      className={`border-line bg-panel flex flex-col overflow-hidden rounded-[14px] border ${
        fill ? 'h-full' : ''
      }`}
    >
      <div className="border-line bg-panel-2 flex items-center justify-between border-b px-[18px] py-[14px]">
        <h3 className="text-ink font-mono text-[11px] tracking-[0.14em] uppercase">{title}</h3>
        <span className="text-ink-faint font-mono text-[11px]">{code}</span>
      </div>
      {children}
    </div>
  )
}

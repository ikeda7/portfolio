import type { ReactNode } from 'react'

interface PanelProps {
  readonly title: string
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
export function Panel({ title, fill = false, children }: PanelProps) {
  return (
    <div
      className={`border-line bg-panel flex flex-col overflow-hidden rounded-[14px] border ${
        fill ? 'h-full' : ''
      }`}
    >
      {/*
       * Só o título. O canto direito já teve códigos de equipamento (LANG,
       * OUT) e depois contagens ("8 pads", "3 idiomas"); as duas saíram — a
       * contagem repetia o que o olho vê contando os itens (24/09, "menos é
       * mais").
       */}
      <div className="border-line bg-panel-2 border-b px-[18px] py-[14px]">
        <h3 className="text-ink font-mono text-[11px] tracking-[0.14em] uppercase">{title}</h3>
      </div>
      {children}
    </div>
  )
}

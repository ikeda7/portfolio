interface SleeveCoverProps {
  /** Estado real do projeto, em uma linha. */
  readonly status: string
}

/**
 * Capa tipográfica: um painel cego de rack.
 *
 * Existe para o projeto que **não tem o que mostrar**: sem print (porque não há
 * interface pública para fotografar, ou porque o dono do portfólio pediu para
 * não fotografar) e sem repositório aberto para ler comandos ou medir
 * linguagens. A resposta honesta a isso não é desenhar um gráfico bonito com o
 * que sobrou — é a mesma peça que um rack de verdade usa quando um slot está
 * vazio: uma placa cega, ranhurada, com a etiqueta do que está ali.
 *
 * Por isso a única informação é o `status`, e ele é fato verificável ("Em
 * produção", "Repositório privado"), nunca adjetivo. O resto é textura de
 * chapa — `repeating-linear-gradient`, sem imagem e sem nó de texto, então não
 * há nada aqui competindo com as tags do card logo abaixo.
 */
export function SleeveCover({ status }: SleeveCoverProps) {
  return (
    <div className="bg-panel-sunken relative flex h-full w-full items-center justify-center overflow-hidden p-4">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0 9px, rgb(var(--accent-rgb) / 0.045) 9px 10px)',
        }}
      />

      {/* Orelhas do rack: a placa é parafusada, não flutua. */}
      <span
        aria-hidden="true"
        className="bg-line absolute inset-x-6 top-1/2 hidden h-px sm:block"
      />

      <span className="border-line bg-panel text-ink-muted relative max-w-[85%] rounded-full border px-3.5 py-1.5 text-center font-mono text-[11px] leading-tight tracking-[0.14em] uppercase">
        {status}
      </span>
    </div>
  )
}

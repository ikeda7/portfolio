import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { normalizar } from '@/lib/foco'

/**
 * Foco técnico: a tecnologia que o visitante escolheu destacar.
 *
 * Clicar num canal ou numa tag da Stack acende o mesmo termo onde quer que ele
 * apareça — na fita e nos cards de projeto que o usam. É a pergunta que um
 * portfólio raramente responde: "onde ele usou isso de verdade?".
 *
 * A comparação de termos mora em [`@/lib/foco`](../lib/foco.ts), sem JSX, para
 * este arquivo exportar só o provider e o hook.
 */

interface FocoTecnico {
  readonly foco: string | null
  /** Clicar no termo já em foco desliga — o mesmo botão liga e desliga. */
  readonly alternar: (termo: string) => void
  readonly limpar: () => void
}

const Contexto = createContext<FocoTecnico>({
  foco: null,
  alternar: () => {},
  limpar: () => {},
})

export function FocoTecnicoProvider({ children }: { readonly children: ReactNode }) {
  const [foco, setFoco] = useState<string | null>(null)

  const alternar = useCallback((termo: string) => {
    setFoco((atual) => (atual !== null && normalizar(atual) === normalizar(termo) ? null : termo))
  }, [])

  const limpar = useCallback(() => setFoco(null), [])

  const valor = useMemo(() => ({ foco, alternar, limpar }), [foco, alternar, limpar])

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

// O hook e o provider sao o mesmo contrato; separa-los em dois arquivos so
// afastaria um do outro sem ganho nenhum de leitura.
// oxlint-disable-next-line react/only-export-components
export function useFocoTecnico(): FocoTecnico {
  return useContext(Contexto)
}

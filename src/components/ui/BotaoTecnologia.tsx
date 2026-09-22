import type { ReactNode } from 'react'

import { useFocoTecnico } from '@/hooks/useFocoTecnico'
import { estaEmFoco } from '@/lib/foco'

interface BotaoTecnologiaProps {
  /** Termo que este botão acende. Comparado de forma normalizada. */
  readonly termo: string
  /** Classes do estado normal. */
  readonly className: string
  /** Classes adicionadas quando o termo está em foco. */
  readonly classNameAtivo: string
  readonly children: ReactNode
}

/**
 * Botão que põe uma tecnologia em foco na página inteira.
 *
 * Toda vez que um nome de tecnologia aparece na Stack ele passa por aqui, para
 * que a afordância seja uma só: se parece clicável, é clicável. O estado vive
 * em `useFocoTecnico`, então a fita e os cards de projeto reagem juntos.
 *
 * `aria-pressed` porque é um botão de alternar, não um link: ele não leva a
 * lugar nenhum, muda o que a página destaca. Clicar no termo já aceso desliga.
 */
export function BotaoTecnologia({
  termo,
  className,
  classNameAtivo,
  children,
}: BotaoTecnologiaProps) {
  const { foco, alternar } = useFocoTecnico()
  const ativo = estaEmFoco(termo, foco)

  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={() => alternar(termo)}
      title={ativo ? `Tirar ${termo} do destaque` : `Destacar ${termo} na página`}
      className={`${className} ${ativo ? classNameAtivo : ''}`}
    >
      {children}
    </button>
  )
}

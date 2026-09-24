import { Fragment } from 'react'

interface TrilhasProps {
  /** "Full Stack · Data Science · IA Aplicada" — separado por " · ". */
  readonly texto: string
}

/**
 * O subtítulo das três trilhas, que só quebra linha nos separadores.
 *
 * Em mono e caixa alta ele não cabe numa linha de celular, e quebrando onde o
 * navegador quisesse saía "IA" numa linha e "APLICADA" sozinho na de baixo.
 * Cada trilha fica inteira (`nowrap`) e a quebra só acontece depois de um "·".
 */
export function Trilhas({ texto }: TrilhasProps) {
  const partes = texto.split(' · ')

  return partes.map((parte, index) => (
    <Fragment key={parte}>
      <span className="whitespace-nowrap">{parte}</span>
      {index < partes.length - 1 && ' · '}
    </Fragment>
  ))
}

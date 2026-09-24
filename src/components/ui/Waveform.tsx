import { useEffect, useState } from 'react'

import { waveformHeights } from '@/data/site'

interface WaveformProps {
  readonly meta: string
  readonly timecode: string
  /** Os canais. O escolhido redesenha as barras e pinta a página. */
  readonly canais: readonly CanalWaveform[]
}

/** O tom de acento de cada trilha — os valores vivem em `index.css`. */
type Tom = 'azul' | 'roxo' | 'vermelho'

interface CanalWaveform {
  readonly label: string
  readonly tom: Tom
}

/**
 * Desenha as barras de um canal a partir do mesmo array aprovado.
 *
 * Nenhum padrão novo foi inventado: o canal 0 é o array do protótipo, e os
 * outros são ele rotacionado. Rotação mantém a mesma distribuição de alturas —
 * a silhueta muda, o "som" é o mesmo take.
 */
function barrasDoCanal(canal: number): readonly number[] {
  const giro = (canal * 7) % waveformHeights.length
  return [...waveformHeights.slice(giro), ...waveformHeights.slice(0, giro)]
}

/**
 * Painel de waveform do hero: 48 barras pulsando fora de fase, e um seletor de
 * trilha que as redesenha e troca a cor de acento da página inteira.
 *
 * Os canais eram três etiquetas com uma marcada como ativa e **nenhuma
 * clicável** — o visual prometia uma interação que não existia. Agora são
 * botões de verdade, com `aria-pressed`, navegáveis por teclado.
 *
 * Duração e delay da animação derivam do índice, reproduzindo o protótipo.
 */
export function Waveform({ meta, timecode, canais }: WaveformProps) {
  const [canalAtivo, setCanalAtivo] = useState(0)
  const barras = barrasDoCanal(canalAtivo)
  const tom = canais[canalAtivo]?.tom ?? 'azul'

  /*
   * O acento é da página, não do painel: escrever no <html> é o que deixa
   * header, cards, glows e o brilho do cursor trocarem juntos, sem nenhum
   * deles saber que a waveform existe. Azul é o padrão do `@theme`, então ele
   * não escreve atributo — tira.
   */
  useEffect(() => {
    const raiz = document.documentElement
    if (tom === 'azul') delete raiz.dataset.trilha
    else raiz.dataset.trilha = tom
    return () => {
      delete raiz.dataset.trilha
    }
  }, [tom])

  return (
    <div className="border-line glow-panel mx-auto mt-18 w-full max-w-[880px] rounded-[14px] border bg-gradient-to-b from-[#141414] to-[#101010] p-[22px]">
      <div className="text-ink-faint flex items-center justify-between font-mono text-[11px] tracking-[0.14em] uppercase">
        <span>{meta}</span>
        <span>{timecode}</span>
      </div>

      <div aria-hidden="true" className="mt-4 flex h-[120px] items-center gap-[3px]">
        {barras.map((height, index) => (
          <span
            key={index}
            className="fill-vertical min-w-0 flex-1 origin-center rounded-full transition-[height] duration-500 ease-out"
            style={{
              height: `${height}%`,
              animation: `wavepulse ${(1.6 + (index % 5) * 0.28).toFixed(2)}s ease-in-out ${((index % 12) * 0.09).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        // <fieldset> e para controle de formulario; estes botoes so trocam o
        // que a tela mostra e nao enviam dado nenhum. role="group" com rotulo
        // e o padrao ARIA para um conjunto de botoes relacionados.
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="group"
        aria-label="Canal da waveform"
        className="border-line mt-4 flex flex-wrap gap-2 border-t pt-4"
      >
        {canais.map((canal, index) => {
          const ativo = index === canalAtivo

          return (
            <button
              key={canal.label}
              type="button"
              aria-pressed={ativo}
              onClick={() => setCanalAtivo(index)}
              className={`min-h-6 rounded px-[10px] py-[5px] font-mono text-[11px] transition-all duration-300 ${
                ativo
                  ? 'text-ink border border-[rgb(var(--accent-rgb)/0.4)] bg-[rgb(var(--accent-rgb)/0.14)] hover:border-[rgb(var(--accent-rgb)/0.75)] hover:bg-[rgb(var(--accent-rgb)/0.24)]'
                  : 'bg-panel-2 text-ink-muted hover:text-ink border border-transparent hover:border-[rgb(var(--accent-rgb)/0.3)]'
              }`}
            >
              {canal.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

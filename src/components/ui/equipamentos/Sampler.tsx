import { useRef, useState } from 'react'

import type { SkillTerm } from '@/types/content'

interface SamplerProps {
  readonly termos: readonly SkillTerm[]
}

/*
 * Uma nota por pad, da escala pentatônica de lá menor (A3 a E5): em qualquer
 * combinação de pads ligados, nada soa errado junto.
 */
const NOTAS = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25]

/**
 * IA aplicada como sampler de pads (a grade de uma MPC): cada técnica é um pad.
 *
 * **O pad liga e fica ligado.** Era um flash de ~400ms, que sumia antes de o
 * olho registrar; agora clicar acende e clicar de novo apaga, como um pad em
 * modo latch.
 *
 * **E toca uma nota ao ligar.** Som gerado na hora pela Web Audio API — um
 * oscilador com envelope curto, sem arquivo de áudio nenhum. Só toca em
 * resposta ao clique (nunca sozinho), é baixo, e o `AudioContext` só nasce no
 * primeiro clique, que é o que os navegadores exigem. Desligar não toca.
 *
 * Quatro colunas a partir de `sm` (4x2, fecha); duas no celular (2x4).
 */
export function Sampler({ termos }: SamplerProps) {
  const [ligados, setLigados] = useState<ReadonlySet<string>>(new Set())
  const audio = useRef<AudioContext | null>(null)

  function tocar(index: number) {
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const agora = ctx.currentTime
      const osc = ctx.createOscillator()
      const ganho = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = NOTAS[index % NOTAS.length] ?? 440
      ganho.gain.setValueAtTime(0.0001, agora)
      ganho.gain.exponentialRampToValueAtTime(0.09, agora + 0.01)
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.6)
      osc.connect(ganho).connect(ctx.destination)
      osc.start(agora)
      osc.stop(agora + 0.65)
    } catch {
      // Sem Web Audio (navegador antigo, politica do sistema): o pad liga mudo.
    }
  }

  function alternar(label: string, index: number) {
    const ligar = !ligados.has(label)
    if (ligar) tocar(index)
    setLigados((atual) => {
      const novo = new Set(atual)
      if (novo.has(label)) novo.delete(label)
      else novo.add(label)
      return novo
    })
  }

  return (
    <ul className="grid flex-1 grid-cols-2 gap-2.5 p-4 sm:grid-cols-4 sm:gap-3">
      {termos.map((termo, index) => {
        const aceso = ligados.has(termo.label)

        return (
          <li key={termo.label} className="flex">
            <button
              type="button"
              aria-pressed={aceso}
              onClick={() => alternar(termo.label, index)}
              className={`relative flex min-h-[84px] flex-1 flex-col justify-end rounded-lg border p-2.5 text-left transition-all duration-200 hover:border-[rgb(var(--accent-rgb)/0.6)] active:scale-[0.97] sm:p-3 ${
                aceso
                  ? 'border-accent glow-cta bg-[rgb(var(--accent-rgb)/0.3)]'
                  : 'border-line bg-[linear-gradient(180deg,#1f1f1f,#161616)]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-2 left-2.5 font-mono text-[11px] tabular-nums sm:left-3 ${
                  aceso ? 'text-white/80' : 'text-ink-faint'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-mono text-[11px] leading-[1.25] tracking-[0.04em] break-words hyphens-auto transition-colors duration-200 ${
                  aceso ? 'text-white' : 'text-ink'
                }`}
              >
                {termo.label}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

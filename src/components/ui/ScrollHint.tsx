import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { EASE_OUT } from '@/lib/motion'

interface ScrollHintProps {
  /** Id da seção que o hint acompanha — some quando ela sai da tela. */
  readonly watch: string
  /** Âncora do primeiro bloco abaixo do hero. */
  readonly href: string
  readonly label: string
}

/**
 * Indicação de rolagem, presa ao rodapé da janela enquanto o hero está visível.
 *
 * Com todas as seções ocupando a tela inteira, nada no primeiro quadro diz que
 * existe mais página abaixo — o hero termina onde a viewport acaba.
 *
 * É `fixed`, não `absolute` no rodapé da seção: em janela baixa o conteúdo do
 * hero passa da altura disponível, e um hint ancorado no fim da seção nasceria
 * fora da tela, que é exatamente o contrário do que ele serve. Preso à janela,
 * ele aparece sempre — e um IntersectionObserver o apaga assim que o hero sai,
 * para não virar um enfeite perseguindo o visitante pela página inteira.
 *
 * É link de verdade, não enfeite: quem chega pelo teclado tabula até ele. Sob
 * `prefers-reduced-motion` a barrinha para de descer e o link continua inteiro.
 */
export function ScrollHint({ watch, href, label }: ScrollHintProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visivel, setVisivel] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const alvo = document.getElementById(watch)
    if (!alvo || typeof IntersectionObserver === 'undefined') return

    // Some quando menos de 35% do hero ainda esta na tela — o visitante ja
    // entendeu que a pagina rola e nao precisa mais da dica.
    const observer = new IntersectionObserver(
      ([entry]) => setVisivel(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    )
    observer.observe(alvo)
    return () => observer.disconnect()
  }, [watch])

  return (
    <div
      ref={containerRef}
      aria-hidden={!visivel}
      className={`pointer-events-none fixed bottom-6 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500 ${
        visivel ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <a
        href={href}
        tabIndex={visivel ? 0 : -1}
        className="text-ink-faint hover:text-accent-text group pointer-events-auto flex flex-col items-center gap-2 transition-colors duration-300"
      >
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase">{label}</span>

        <span
          aria-hidden="true"
          className="border-line bg-bg/70 group-hover:border-accent relative h-7 w-[18px] overflow-hidden rounded-full border backdrop-blur-sm transition-colors duration-300"
        >
          {prefersReducedMotion ? (
            <span className="bg-accent absolute top-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full" />
          ) : (
            <m.span
              className="bg-accent absolute left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full"
              initial={{ top: 5, opacity: 0 }}
              animate={{ top: [5, 16, 16], opacity: [0, 1, 0] }}
              transition={{ duration: 1.9, ease: EASE_OUT, repeat: Infinity, repeatDelay: 0.3 }}
            />
          )}
        </span>
      </a>
    </div>
  )
}

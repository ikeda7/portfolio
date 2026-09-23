import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { useActiveSection } from '@/hooks/useActiveSection'
import { destinos } from '@/data/site'
import { EASE_OUT } from '@/lib/motion'

const IDS = destinos.map((d) => d.href.slice(1))
const TOPO = destinos[0]

/**
 * Botão de "próxima seção", centralizado no rodapé da janela.
 *
 * Antes só existia no hero, apontando para Sobre. Como todas as seções ocupam
 * a tela inteira, quem está no meio da página fica sem nenhuma pista de que há
 * mais abaixo — a mesma falta, repetida em cada seção. Agora ele acompanha a
 * página e troca de rótulo junto.
 *
 * Na última seção vira "voltar ao topo", e a barrinha sobe em vez de descer.
 * A alternativa era sumir, mas aí ele deixava no DOM um link sem destino e sem
 * nome acessível — e um atalho para o topo é útil justamente ali.
 *
 * É link de verdade, não enfeite: quem chega pelo teclado tabula até ele. Sob
 * `prefers-reduced-motion` a barrinha para e o link continua inteiro.
 *
 * **A pastilha é deitada de propósito.** Empilhado, rótulo sobre a barrinha,
 * ele media ~60px de altura e, sendo `fixed`, cobria o que estivesse no
 * rodapé da janela: numa captura da seção de Contato ele estava exatamente
 * por cima do "Enviar mensagem", roubando o clique do botão mais importante
 * da página. Deitado ele tem ~32px e cabe no respiro que toda seção já tem
 * embaixo, em vez de disputar espaço com o conteúdo.
 */
export function ScrollHint() {
  const prefersReducedMotion = useReducedMotion()
  const atual = useActiveSection(IDS)

  const indice = destinos.findIndex((d) => d.href.slice(1) === atual)
  // Antes do observador responder (`indice === -1`), assumimos o topo: o
  // primeiro quadro e o que mais precisa da dica.
  const proximo = destinos[(indice === -1 ? 0 : indice) + 1]
  const noFim = proximo === undefined
  const destino = proximo ?? TOPO

  if (!destino) return null

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-10 -translate-x-1/2">
      <a
        href={destino.href}
        aria-label={noFim ? 'Voltar ao topo' : `Ir para ${destino.label}`}
        className="text-ink-faint hover:text-accent-text group border-line bg-bg/80 hover:border-accent pointer-events-auto flex items-center gap-2.5 rounded-full border py-1.5 pr-2 pl-3.5 backdrop-blur-sm transition-colors duration-300"
      >
        <span aria-hidden="true" className="font-mono text-[11px] tracking-[0.16em] uppercase">
          {noFim ? 'Topo' : destino.label}
        </span>

        <span
          aria-hidden="true"
          className="border-line bg-bg/70 group-hover:border-accent relative h-5 w-[14px] shrink-0 overflow-hidden rounded-full border backdrop-blur-sm transition-colors duration-300"
        >
          {prefersReducedMotion ? (
            <span
              className={`bg-accent absolute left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full ${
                noFim ? 'bottom-1' : 'top-1'
              }`}
            />
          ) : (
            <m.span
              key={noFim ? 'sobe' : 'desce'}
              className="bg-accent absolute left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full"
              initial={{ top: noFim ? 11 : 4, opacity: 0 }}
              animate={{
                top: noFim ? [11, 4, 4] : [4, 11, 11],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.9, ease: EASE_OUT, repeat: Infinity, repeatDelay: 0.3 }}
            />
          )}
        </span>
      </a>
    </div>
  )
}

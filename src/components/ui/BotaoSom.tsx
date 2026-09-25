import { Volume2, VolumeX } from 'lucide-react'
import { useSyncExternalStore } from 'react'

import { assinarSom, definirSom, somLigado } from '@/lib/som'

/**
 * Liga e desliga todos os efeitos sonoros da página (sugestão aceita pelo
 * dono, 25/09): com pedal, fita, pad, fader e scratch fazendo barulho, quem
 * visita no trabalho ou de fone precisa de um jeito de calar tudo.
 *
 * Nasce ligado e a escolha fica lembrada no navegador (ver `lib/som.ts`). O
 * estado mora no módulo de som, e não aqui, porque é lá que cada efeito
 * decide se toca; este botão só assina as mudanças.
 */
export function BotaoSom() {
  const ligado = useSyncExternalStore(assinarSom, somLigado, () => true)
  const Icone = ligado ? Volume2 : VolumeX

  return (
    <button
      type="button"
      aria-pressed={ligado}
      aria-label={ligado ? 'Desligar os sons da página' : 'Ligar os sons da página'}
      title={ligado ? 'Som ligado' : 'Som desligado'}
      onClick={() => definirSom(!ligado)}
      className={`hover:text-ink hover:border-accent flex size-11 items-center justify-center rounded-md border transition-all duration-300 sm:size-8 ${
        ligado ? 'border-line text-ink-muted' : 'border-line text-ink-faint'
      }`}
    >
      <Icone aria-hidden="true" className="size-4" />
    </button>
  )
}

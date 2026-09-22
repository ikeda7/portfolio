interface SleeveCoverProps {
  /** Semente do padrão — o mesmo projeto sempre gera a mesma grade. */
  readonly title: string
}

const COLS = 16
const ROWS = 8
const CELLS = COLS * ROWS

/** Células em acento cheio. Baixo de propósito: a capa não pode gritar. */
const BRIGHT_RATE = 7
/** Células em acento apagado, que dão textura sem puxar o olho. */
const DIM_RATE = 20

function seedOf(text: string): number {
  let hash = 2166136261
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** xorshift determinístico: mesma semente e índice, mesma célula, todo render. */
function levelOf(seed: number, index: number): 'bright' | 'dim' | 'off' {
  let x = (seed + Math.imul(index, 2654435761)) >>> 0
  x ^= x << 13
  x >>>= 0
  x ^= x >>> 17
  x ^= x << 5
  x >>>= 0
  const roll = x % 100
  if (roll < BRIGHT_RATE) return 'bright'
  if (roll < BRIGHT_RATE + DIM_RATE) return 'dim'
  return 'off'
}

const CELL_CLASS: Record<ReturnType<typeof levelOf>, string> = {
  bright: 'bg-accent rounded-[2px] shadow-[0_0_8px_rgb(var(--accent-rgb)/0.45)]',
  dim: 'rounded-[2px] bg-[rgb(var(--accent-rgb)/0.22)]',
  off: 'border-line rounded-[2px] border bg-[#141414]',
}

/**
 * Grade de sequenciador — a capa de quem não tem print nem terminal para
 * mostrar (projeto de cliente, sem repositório público).
 *
 * É decoração assumida, não dado: uma matriz de LEDs como a de um step
 * sequencer. O padrão vem de um hash do nome do projeto, então é estável entre
 * renders e diferente entre cards, sem nunca fingir ser uma interface real.
 *
 * Não repete título nem tags: isso tudo está no corpo do card, logo abaixo.
 */
export function SleeveCover({ title }: SleeveCoverProps) {
  const seed = seedOf(title)

  return (
    <div aria-hidden="true" className="bg-panel-sunken h-full w-full p-4">
      <div
        className="grid h-full w-full gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: CELLS }, (_, index) => (
          <span key={index} className={CELL_CLASS[levelOf(seed, index)]} />
        ))}
      </div>
    </div>
  )
}

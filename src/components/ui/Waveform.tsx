import { waveformHeights } from '@/data/site'

interface WaveformProps {
  readonly meta: string
  readonly timecode: string
  readonly tags: readonly string[]
}

/**
 * Painel de waveform do hero: 48 barras pulsando fora de fase.
 * Duração e delay derivam do índice, reproduzindo o protótipo aprovado.
 */
export function Waveform({ meta, timecode, tags }: WaveformProps) {
  return (
    <div className="border-line glow-panel mx-auto mt-18 w-full max-w-[880px] rounded-[14px] border bg-gradient-to-b from-[#141414] to-[#101010] p-[22px]">
      <div className="text-ink-faint flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase">
        <span>{meta}</span>
        <span>{timecode}</span>
      </div>

      <div aria-hidden="true" className="mt-4 flex h-[120px] items-center gap-[3px]">
        {waveformHeights.map((height, index) => (
          <span
            key={index}
            className="fill-vertical min-w-0 flex-1 origin-center rounded-full"
            style={{
              height: `${height}%`,
              animation: `wavepulse ${(1.6 + (index % 5) * 0.28).toFixed(2)}s ease-in-out ${((index % 12) * 0.09).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="border-line mt-4 flex flex-wrap gap-2 border-t pt-4">
        {tags.map((tag, index) => (
          <span
            key={tag}
            className={
              index === tags.length - 1
                ? 'text-ink rounded border border-[rgb(var(--accent-rgb)/0.4)] bg-[rgb(var(--accent-rgb)/0.14)] px-[10px] py-[5px] font-mono text-[10px]'
                : 'bg-panel-2 text-ink-faint rounded px-[10px] py-[5px] font-mono text-[10px]'
            }
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

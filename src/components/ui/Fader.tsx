import type { SkillChannel } from '@/types/content'

/** Canal vertical da mesa de som: trilho, preenchimento e knob. */
export function Fader({ label, value }: SkillChannel) {
  const fill = `${value}%`

  return (
    <div
      className="flex min-w-0 flex-1 flex-col items-center gap-[10px]"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <meter> nativo nao e estilizavel o bastante para o design
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span className="text-ink-faint font-mono text-[10px]">{value}</span>

      <div className="border-line bg-panel-2 relative h-[150px] w-2 rounded-full border">
        <span
          aria-hidden="true"
          className="fill-vertical absolute inset-x-0 bottom-0 rounded-full"
          style={{ height: fill }}
        />
        <span
          aria-hidden="true"
          className="bg-knob border-knob-line glow-knob absolute left-1/2 h-3 w-[26px] -translate-x-1/2 translate-y-1/2 rounded-[3px] border"
          style={{ bottom: fill }}
        />
      </div>

      <span
        aria-hidden="true"
        className="text-ink-faint h-[78px] overflow-hidden font-mono text-[10px] tracking-[0.1em] uppercase [writing-mode:vertical-rl] [transform:rotate(180deg)]"
      >
        {label}
      </span>
    </div>
  )
}

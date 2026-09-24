import type { SkillTerm } from '@/types/content'

interface RackProps {
  readonly termos: readonly SkillTerm[]
}

/**
 * Back-end & dados como rack de 19": cada tecnologia é um módulo de 1U.
 *
 * É o equipamento que não se toca — servidor e banco ficam no rack, rodando.
 * Por isso a vida aqui é a atividade: três LEDs por módulo piscando em ritmos
 * diferentes (`@utility led-atividade` + atraso por índice), e o módulo acende
 * no hover. Os LEDs são CSS, então o `prefers-reduced-motion` os para.
 *
 * Uma coluna, como a lista que o nicho já era: nome de tecnologia de back-end
 * é comprido ("Entity Framework", "Oracle Database"), e uma coluna não deixa
 * órfão em largura nenhuma.
 */
export function Rack({ termos }: RackProps) {
  return (
    <ul className="flex flex-1 flex-col gap-1.5 p-3">
      {termos.map((termo, index) => (
        <li
          key={termo.label}
          className="border-line hover:border-accent group/modulo flex flex-1 items-center gap-3 rounded-[4px] border bg-[linear-gradient(180deg,#1b1b1b,#141414)] px-3 py-2 transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.07)]"
        >
          {/* Parafusos das orelhas do rack. */}
          <span aria-hidden="true" className="bg-knob-line size-1.5 shrink-0 rounded-full" />

          <span className="text-ink group-hover/modulo:text-accent-text min-w-0 flex-1 font-mono text-[11px] tracking-[0.06em] transition-colors duration-300">
            {termo.label}
          </span>

          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            {[0, 1, 2].map((led) => (
              <span
                key={led}
                className="bg-accent led-atividade size-1.5 rounded-full"
                style={{
                  animationDuration: `${(0.9 + ((index * 3 + led) % 5) * 0.37).toFixed(2)}s`,
                  animationDelay: `${(((index + led * 2) % 7) * 0.13).toFixed(2)}s`,
                }}
              />
            ))}
          </span>

          <span aria-hidden="true" className="bg-knob-line size-1.5 shrink-0 rounded-full" />
        </li>
      ))}
    </ul>
  )
}

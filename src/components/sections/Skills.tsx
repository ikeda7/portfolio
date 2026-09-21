import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { Fader } from '@/components/ui/Fader'
import { Panel } from '@/components/ui/Panel'
import { RackRow } from '@/components/ui/RackRow'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faderPanel, rackPanel, skillTags } from '@/data/skills'
import { VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'

/** Rack de processamento: mesa de som (IA & Dados) + rack (engenharia). */
export function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="habilidades"
      className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:py-20"
      aria-labelledby="habilidades-title"
    >
      <SectionHeading index="02" label="Stack" />
      <h2 id="habilidades-title" className="sr-only">
        Habilidades técnicas
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        <Reveal className="h-full">
          <Panel title={faderPanel.title} code={faderPanel.code}>
            <div className="flex justify-between gap-2.5 px-[18px] py-[26px]">
              {faderPanel.channels.map((channel, index) => (
                <Fader key={channel.label} index={index} {...channel} />
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <Panel title={rackPanel.title} code={rackPanel.code}>
            <div className="flex flex-col gap-3.5 px-[18px] py-[22px]">
              {rackPanel.channels.map((channel, index) => (
                <RackRow key={channel.label} index={index} {...channel} />
              ))}

              <m.ul
                className="border-line mt-1 flex flex-wrap gap-1.5 border-t pt-3.5"
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={VIEWPORT}
                variants={staggerVariants}
              >
                {skillTags.map((tag) => (
                  <m.li
                    key={tag}
                    variants={prefersReducedMotion ? undefined : revealVariants}
                    className="border-line bg-panel-2 text-ink-faint hover:border-accent hover:text-ink rounded border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-300"
                  >
                    {tag}
                  </m.li>
                ))}
              </m.ul>
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}

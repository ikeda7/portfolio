import { Fader } from '@/components/ui/Fader'
import { Panel } from '@/components/ui/Panel'
import { RackRow } from '@/components/ui/RackRow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faderPanel, rackPanel, skillTags } from '@/data/skills'

/** Rack de processamento: mesa de som (IA & Dados) + rack (engenharia). */
export function Skills() {
  return (
    <section
      id="habilidades"
      className="mx-auto w-full max-w-[1200px] px-6 py-20"
      aria-labelledby="habilidades-title"
    >
      <SectionHeading index="02" label="Stack" />
      <h2 id="habilidades-title" className="sr-only">
        Habilidades técnicas
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        <Panel title={faderPanel.title} code={faderPanel.code}>
          <div className="flex justify-between gap-2.5 px-[18px] py-[26px]">
            {faderPanel.channels.map((channel) => (
              <Fader key={channel.label} {...channel} />
            ))}
          </div>
        </Panel>

        <Panel title={rackPanel.title} code={rackPanel.code}>
          <div className="flex flex-col gap-3.5 px-[18px] py-[22px]">
            {rackPanel.channels.map((channel) => (
              <RackRow key={channel.label} {...channel} />
            ))}

            <ul className="border-line mt-1 flex flex-wrap gap-1.5 border-t pt-3.5">
              {skillTags.map((tag) => (
                <li
                  key={tag}
                  className="border-line bg-panel-2 text-ink-faint hover:border-accent hover:text-ink rounded border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
    </section>
  )
}

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { Fader } from '@/components/ui/Fader'
import { Panel } from '@/components/ui/Panel'
import { PatchBay } from '@/components/ui/PatchBay'
import { RackRow } from '@/components/ui/RackRow'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { codigoDoPainel, faderPanel, formacaoPanel, rackPanel, skillTags } from '@/data/skills'
import { VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'

/**
 * Rack de processamento: mesa de som (IA & dados), rack (engenharia) e a
 * bandeja de patch (o que a pós aprofunda).
 *
 * Os corpos dos painéis são `flex-1` para que os três cresçam até a altura da
 * linha — sem isso a mesa ficava com um vão embaixo, porque os faders têm
 * altura fixa e o rack ao lado é mais alto.
 */
export function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="habilidades" index="03" label="Stack">
      <h2 id="habilidades-title" className="sr-only">
        Habilidades técnicas
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        <Reveal className="h-full">
          <Panel title={faderPanel.title} code={codigoDoPainel(faderPanel)} fill>
            {/*
             * A mesa reflui: tres canais por linha ate `sm`, seis depois.
             * Os rotulos deixaram de ser verticais (ninguem le texto deitado)
             * e passaram a precisar de largura — em 320px, seis colunas
             * horizontais dariam ~31px cada e "EMBEDDINGS" nao caberia em
             * nenhuma. `auto-rows-fr` mantem as duas fileiras com a mesma
             * altura de trilho quando ela quebra.
             */}
            <div className="grid flex-1 auto-rows-fr grid-cols-3 gap-x-2.5 gap-y-7 px-[18px] py-[26px] sm:grid-cols-6 sm:gap-y-0">
              {faderPanel.channels.map((channel, index) => (
                <Fader key={channel.label} index={index} {...channel} />
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <Panel title={rackPanel.title} code={codigoDoPainel(rackPanel)} fill>
            <div className="flex flex-1 flex-col gap-3.5 px-[18px] py-[22px]">
              {rackPanel.channels.map((channel, index) => (
                <RackRow key={channel.label} index={index} {...channel} />
              ))}

              <m.ul
                className="border-line mt-auto flex flex-wrap gap-1.5 border-t pt-3.5"
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={VIEWPORT}
                variants={staggerVariants}
              >
                {skillTags.map((tag) => (
                  <m.li key={tag} variants={prefersReducedMotion ? undefined : revealVariants}>
                    <BotaoTecnologia
                      termo={tag}
                      className="border-line bg-panel-2 text-ink-faint hover:border-accent hover:text-ink block min-h-6 rounded border px-2.5 py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300"
                      classNameAtivo="border-accent text-accent-text bg-[rgb(var(--accent-rgb)/0.12)]"
                    >
                      {tag}
                    </BotaoTecnologia>
                  </m.li>
                ))}
              </m.ul>
            </div>
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={0.24} className="mt-5 block">
        <Panel title={formacaoPanel.title} code={formacaoPanel.code} fill>
          <PatchBay items={formacaoPanel.topics} />
        </Panel>
      </Reveal>
    </Section>
  )
}

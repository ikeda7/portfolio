import type { ReactNode } from 'react'

import { Fader } from '@/components/ui/Fader'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Pedaleira } from '@/components/ui/equipamentos/Pedaleira'
import { PistasDaw } from '@/components/ui/equipamentos/PistasDaw'
import { Rack } from '@/components/ui/equipamentos/Rack'
import { Sampler } from '@/components/ui/equipamentos/Sampler'
import { backend, ferramentas, frontend, iaAplicada, linguagens } from '@/data/skills'
import { contagem } from '@/lib/contagem'
import type { SkillNiche } from '@/types/content'

/**
 * Stack: os cinco nichos do currículo, **um equipamento por nicho**.
 *
 * A taxonomia é a da seção "Competências técnicas" do currículo; ver
 * [skills.ts](src/data/skills.ts). O que mudou em 24/09 foi a forma: era uma
 * mesa (Linguagens) e quatro listas iguais, e a leitura do dono foi que
 * faltava dinâmica — só as linguagens tinham um equipamento. Agora cada nicho
 * é uma peça diferente de estúdio, e cada peça tem uma interação própria:
 *
 * - Linguagens → mesa de som: o fader sobe sob a mão.
 * - Front-end & mobile → pedaleira: pisar liga o pedal.
 * - IA aplicada → sampler: o pad liga, fica aceso e toca uma nota.
 * - Back-end & dados → rack: os módulos rodam sozinhos, LEDs piscando.
 * - Ferramentas → arranjo de DAW: mute e solo funcionam.
 *
 * Nenhuma interação diz nível nem filtra nada. Nível por tecnologia continua
 * sendo conteúdo do dono (ver docs/PENDENCIAS.md), e o foco técnico que
 * ligava a Stack aos Projetos saiu no mesmo dia.
 *
 * Na linha de cima, sampler e pedaleira têm dois andares de peças cada; na
 * de baixo, arranjo (9 pistas) e rack (4 andares de módulos) esticam juntos.
 */
export function Skills() {
  return (
    <Section id="habilidades" index="03" label="Stack">
      <h2 id="habilidades-title" className="sr-only">
        Habilidades técnicas
      </h2>

      <div className="flex flex-1 flex-col gap-5">
        <Reveal>
          <Painel nicho={linguagens}>
            {/*
             * Dez linguagens: cinco colunas ate `lg` (2x5, so a extensao no
             * rotulo) e dez de `lg` para cima. As duas contas fecham, entao
             * nenhuma largura deixa fileira pela metade.
             */}
            <div className="grid auto-rows-fr grid-cols-5 gap-x-2.5 gap-y-7 px-[18px] py-[26px] lg:grid-cols-10 lg:gap-y-0">
              {linguagens.terms.map((termo, index) => (
                <Fader key={termo.label} index={index} termo={termo} />
              ))}
            </div>
          </Painel>
        </Reveal>

        {/*
         * Duas colunas com intenção: a da DIREITA é o full stack (front em
         * cima, back embaixo), a da esquerda é IA e o dia a dia de
         * ferramentas. A troca também tirou as pistas de DAW, com os botões
         * M/S, de perto da borda direita, onde fica a régua de seções.
         *
         * Ordem no DOM = ordem de leitura no celular (uma coluna): IA,
         * front, ferramentas, back. No `lg` a grade posiciona explicitamente.
         */}
        <div className="grid flex-1 items-stretch gap-5 lg:grid-cols-2">
          <Reveal delay={0.08} className="h-full lg:col-start-1 lg:row-start-1">
            <Painel nicho={iaAplicada} fill>
              <Sampler termos={iaAplicada.terms} />
            </Painel>
          </Reveal>
          <Reveal delay={0.16} className="h-full lg:col-start-2 lg:row-start-1">
            <Painel nicho={frontend} fill>
              <Pedaleira termos={frontend.terms} />
            </Painel>
          </Reveal>
          <Reveal delay={0.24} className="h-full lg:col-start-1 lg:row-start-2">
            <Painel nicho={ferramentas} fill>
              <PistasDaw termos={ferramentas.terms} />
            </Painel>
          </Reveal>
          <Reveal delay={0.32} className="h-full lg:col-start-2 lg:row-start-2">
            <Painel nicho={backend} fill>
              <Rack termos={backend.terms} />
            </Painel>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/** O painel de um nicho: título dele e a contagem na unidade do equipamento. */
function Painel({
  nicho,
  fill = false,
  children,
}: {
  readonly nicho: SkillNiche
  readonly fill?: boolean
  readonly children: ReactNode
}) {
  return (
    <Panel title={nicho.title} code={contagem(nicho.terms.length, ...nicho.unidade)} fill={fill}>
      {children}
    </Panel>
  )
}

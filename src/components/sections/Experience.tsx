import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Timeline } from '@/components/ui/Timeline'
import { education, experience, languages } from '@/data/experience'

/**
 * Trajetória: a linha do tempo profissional, com formação e idiomas ao lado.
 *
 * O site tinha a carreira inteira espremida num parágrafo da seção Sobre —
 * para quem busca posição, portfólio sem linha do tempo de trabalho lê como
 * incompleto. Tudo aqui vem do currículo.
 *
 * A coluna lateral usa `self-start`: sem isso ela estica até a altura da linha
 * da grade, os painéis herdam essa altura e sobra um vão morto embaixo do
 * menor — que era exatamente o problema do painel de Idiomas.
 */
export function Experience() {
  return (
    <Section id="experiencia" index="02" label="Experiência">
      <h2 id="experiencia-title" className="sr-only">
        Experiência profissional e formação
      </h2>

      <div className="grid h-full items-stretch gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Reveal>
          <Timeline entries={experience} />
        </Reveal>

        <Reveal delay={0.14} className="flex h-full flex-col justify-between gap-5">
          <Panel title="Formação" code="EDU">
            <div className="px-[18px] py-[22px]">
              <Timeline entries={education} compact />
            </div>
          </Panel>

          <Panel title="Idiomas" code="LANG">
            <ul className="divide-line divide-y">
              {languages.map((idioma) => (
                <li
                  key={idioma.nome}
                  className="flex items-center justify-between gap-3 px-[18px] py-3"
                >
                  <span className="text-ink flex items-center gap-2.5 font-mono text-[11px] tracking-[0.06em]">
                    <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
                    {idioma.nome}
                  </span>
                  <span className="text-ink-faint font-mono text-[11px] tracking-[0.1em] uppercase">
                    {idioma.nivel}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}

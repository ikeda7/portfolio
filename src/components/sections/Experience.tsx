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
 */
export function Experience() {
  return (
    <Section id="experiencia" index="02" label="Experiência">
      <h2 id="experiencia-title" className="sr-only">
        Experiência profissional e formação
      </h2>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Reveal>
          <Timeline entries={experience} />
        </Reveal>

        <Reveal delay={0.14} className="flex flex-col gap-5">
          <Panel title="Formação" code="EDU">
            <div className="px-[18px] py-[22px]">
              <Timeline entries={education} compact />
            </div>
          </Panel>

          <Panel title="Idiomas" code="LANG">
            <ul className="flex flex-col gap-2.5 px-[18px] py-[18px]">
              {languages.map((language) => (
                <li
                  key={language}
                  className="text-ink-muted flex items-center gap-2.5 font-mono text-[11px] tracking-[0.06em]"
                >
                  <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
                  {language}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}

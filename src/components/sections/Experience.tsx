import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Timeline } from '@/components/ui/Timeline'
import { academica, education, experience, languages } from '@/data/experience'
import { contagem } from '@/lib/contagem'

/**
 * Trajetória: a linha do tempo profissional e, embaixo dela, a atuação
 * acadêmica; formação e idiomas na coluna ao lado.
 *
 * O site tinha a carreira inteira espremida num parágrafo da seção Sobre —
 * para quem busca posição, portfólio sem linha do tempo de trabalho lê como
 * incompleto. Tudo aqui vem do currículo.
 *
 */
export function Experience() {
  return (
    <Section id="experiencia" index="02" label="Experiência">
      <h2 id="experiencia-title" className="sr-only">
        Experiência profissional e formação
      </h2>

      <div className="grid h-full items-stretch gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        {/*
         * Tres blocos: profissional (a linha do tempo, com entregas),
         * academica (painel compacto, so cargo e entidade) e, na coluna ao
         * lado, formacao e idiomas. A academica fica embaixo da profissional,
         * e nao na coluna da direita, para as duas colunas fecharem com
         * alturas parecidas.
         */}
        <Reveal className="flex flex-col gap-10">
          <Timeline entries={experience} />

          <Panel title="Atuação acadêmica" code={contagem(academica.length, 'cargo', 'cargos')}>
            {/*
             * Lado a lado a partir de `sm`: empilhadas, as duas deixavam a
             * coluna da esquerda ~170px mais alta que a da direita, e o vao
             * sobrava entre Formacao e Idiomas.
             */}
            <div className="grid gap-6 px-[18px] py-[22px] sm:grid-cols-2">
              {academica.map((entrada) => (
                <Timeline key={entrada.org} entries={[entrada]} compact />
              ))}
            </div>
          </Panel>
        </Reveal>

        {/*
         * Formação estica até a base da coluna (`flex-1`) e distribui as duas
         * entradas na altura dela. A coluna da esquerda é ~100px mais alta, e
         * com `justify-between` entre os painéis essa diferença virava um vão
         * solto entre Formação e Idiomas; agora ela vira trilho da linha do
         * tempo, entre a pós e o bacharelado.
         */}
        <Reveal delay={0.14} className="flex h-full flex-col gap-5">
          <div className="flex flex-1 flex-col">
            <Panel title="Formação" code={contagem(education.length, 'curso', 'cursos')} fill>
              <div className="flex-1 px-[18px] py-[22px]">
                <Timeline entries={education} compact espalhar />
              </div>
            </Panel>
          </div>

          <Panel title="Idiomas" code={contagem(languages.length, 'idioma', 'idiomas')}>
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

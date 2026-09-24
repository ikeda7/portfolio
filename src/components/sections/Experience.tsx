import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Timeline } from '@/components/ui/Timeline'
import { academica, education, experience, languages } from '@/data/experience'

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
    <Section id="experiencia" index="02" label="Experiência" fill={false}>
      <h2 id="experiencia-title" className="sr-only">
        Experiência profissional e formação
      </h2>

      <div className="grid items-stretch gap-5 lg:gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        {/*
         * Tres blocos: profissional (a linha do tempo, com entregas),
         * academica (painel compacto, so cargo e entidade) e, na coluna ao
         * lado, formacao e idiomas. A academica fica embaixo da profissional,
         * e nao na coluna da direita, para as duas colunas fecharem com
         * alturas parecidas.
         */}
        <Reveal className="flex flex-col gap-10">
          <Timeline entries={experience} />

          <Panel title="Atuação acadêmica">
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
         * A coluna da esquerda é ~100px mais alta que Formação + Idiomas. Essa
         * diferença já foi um vão solto entre os dois painéis e, depois, um
         * trilho esticado dentro da Formação — os dois liam como buraco.
         * Agora ela vai para Idiomas, que tem o que mostrar com o espaço: o
         * painel estica até a base (`flex-1`), as linhas se distribuem, e o
         * inglês ganha a escala do Quadro Europeu da certificação dele.
         *
         * **A seção tem a altura do conteúdo** (`fill={false}`, 24/09). Com uma
         * tela no mínimo, a grade esticava até o fim da seção, mas a coluna da
         * esquerda não: o Idiomas, que estica, passava ~40px da base da
         * Atuação acadêmica (print do dono). Sem a altura forçada, a linha da
         * grade é a da coluna da esquerda e o Idiomas fecha rente com ela.
         */}
        <Reveal delay={0.14} className="flex h-full flex-col gap-5">
          <Panel title="Formação">
            <div className="px-[18px] py-[22px]">
              <Timeline entries={education} compact />
            </div>
          </Panel>

          <div className="flex flex-1 flex-col">
            <Panel title="Idiomas" fill>
              <ul className="divide-line flex flex-1 flex-col divide-y">
                {languages.map((idioma) => (
                  <li
                    key={idioma.nome}
                    className="flex flex-1 flex-col justify-center gap-3 px-[18px] py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-ink flex items-center gap-2.5 font-mono text-[11px] tracking-[0.06em]">
                        <span
                          aria-hidden="true"
                          className="bg-accent glow-led size-1.5 rounded-full"
                        />
                        {idioma.nome}
                      </span>
                      <span className="text-ink-faint font-mono text-[11px] tracking-[0.1em] uppercase">
                        {idioma.nivel}
                      </span>
                    </div>

                    {idioma.cefr && (
                      <EscalaCefr nivel={idioma.cefr} emissor={idioma.certificacao} />
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

const NIVEIS_CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

/**
 * A escala do Quadro Europeu (A1 a C2) com o nível certificado aceso.
 *
 * É a régua pública em que o próprio certificado se expressa — não uma nota
 * inventada: os seis degraus são os do CEFR, e só o que o Linguaskill deu
 * (B2) acende, com os anteriores preenchidos para ler como posição na escala.
 * Português ("nativo") e espanhol ("básico") não têm certificação, então não
 * ganham régua: "básico" não diz se é A1 ou A2, e escolher seria inventar.
 */
function EscalaCefr({
  nivel,
  emissor,
}: {
  readonly nivel: (typeof NIVEIS_CEFR)[number]
  readonly emissor: string | undefined
}) {
  const posicao = NIVEIS_CEFR.indexOf(nivel)

  return (
    <div>
      <ol
        aria-label={`Nível ${nivel} na escala do Quadro Europeu, de A1 a C2`}
        className="grid grid-cols-6 gap-1"
      >
        {NIVEIS_CEFR.map((degrau, index) => (
          <li key={degrau} className="flex flex-col gap-1">
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full ${
                index < posicao
                  ? 'bg-[rgb(var(--accent-rgb)/0.45)]'
                  : index === posicao
                    ? 'bg-accent glow-led'
                    : 'bg-panel-2'
              }`}
            />
            <span
              className={`text-center font-mono text-[11px] ${
                index === posicao ? 'text-accent-text' : 'text-ink-faint'
              }`}
            >
              {degrau}
            </span>
          </li>
        ))}
      </ol>
      {emissor && (
        <p className="text-ink-faint mt-2 font-mono text-[11px] tracking-[0.06em]">
          {emissor} · Quadro Europeu (CEFR)
        </p>
      )}
    </div>
  )
}

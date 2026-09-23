import { Fader } from '@/components/ui/Fader'
import { NichePanel } from '@/components/ui/NichePanel'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { backend, ferramentas, frontend, iaAplicada, linguagens } from '@/data/skills'

/**
 * Stack, separada pelos cinco nichos do currículo.
 *
 * A seção já teve três painéis que misturavam linguagem, framework, banco,
 * técnica de IA e ferramenta nos mesmos blocos — e a leitura de fora foi "fica
 * tudo muito bagunçado". A taxonomia que resolve isso já existia na seção
 * "Competências técnicas" do currículo; ver [skills.ts](src/data/skills.ts).
 *
 * **Linguagens sobe para a mesa, sozinha e na largura inteira.** É o único
 * nicho com tratamento próprio, e por um motivo: é o único onde a extensão de
 * arquivo (`.py`, `.ts`) significa alguma coisa. Num framework ela não marca
 * nada, e usar a mesa nos cinco apagaria a distinção que a seção existe para
 * fazer.
 *
 * Os outros quatro entram numa grade 2x2 como listas de uma coluna. Coluna
 * única não produz linha órfã: a grade anterior quebrava sozinha e deixava o
 * último item isolado embaixo de uma linha cheia.
 */
export function Skills() {
  return (
    <Section id="habilidades" index="03" label="Stack">
      <h2 id="habilidades-title" className="sr-only">
        Habilidades técnicas
      </h2>

      <div className="flex flex-1 flex-col gap-5">
        <Reveal>
          <Panel title={linguagens.title} code={linguagens.code}>
            {/*
             * Quatro colunas ate `sm`, oito depois — e as duas contas fecham:
             * sao oito linguagens, entao nenhuma largura deixa fileira pela
             * metade. Rotulo horizontal precisa de largura, e em 320px oito
             * colunas dariam ~31px cada.
             */}
            <div className="grid auto-rows-fr grid-cols-4 gap-x-2.5 gap-y-7 px-[18px] py-[26px] sm:grid-cols-8 sm:gap-y-0">
              {linguagens.terms.map((termo, index) => (
                <Fader key={termo.label} index={index} termo={termo} />
              ))}
            </div>
          </Panel>
        </Reveal>

        <div className="grid flex-1 items-stretch gap-5 lg:grid-cols-2">
          {/*
           * Os pares sao montados por TAMANHO, nao pela ordem do curriculo.
           * As linhas sao `flex-1` e paineis irmaos esticam ate a altura do
           * mais alto: com 6 ao lado de 9, as seis linhas do menor ficavam
           * gordas e as nove do maior apertadas, e a grade inteira lia
           * desalinhada. 7+6 em cima e 8+9 embaixo mantem a diferenca em uma
           * linha.
           */}
          {[frontend, iaAplicada, backend, ferramentas].map((nicho, index) => (
            <Reveal key={nicho.id} delay={0.08 * (index + 1)} className="h-full">
              <NichePanel nicho={nicho} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

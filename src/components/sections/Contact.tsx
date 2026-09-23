import { ContactChannels } from '@/components/ui/ContactChannels'
import { ContactForm } from '@/components/ui/ContactForm'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/site'

const { contact } = site

/**
 * Booking: canais de contato + formulário.
 *
 * **O título saiu de dentro da coluna.** Ele dividia a coluna da esquerda com
 * os canais enquanto o formulário ocupava a direita inteira, e o resultado era
 * uma seção sem primeira linha: o olho batia na tarja "05 / Contato", caía num
 * texto corrido no meio da esquerda e só então achava os dois blocos. Agora o
 * convite é a largura toda e os dois painéis entram embaixo, lado a lado.
 *
 * Os dois viraram painel com a mesma moldura, e o par de códigos não é piada
 * interna: **OUT** são os canais por onde eu saio, **IN** é por onde a mensagem
 * entra. O formulário era o único bloco solto da página, sem borda, encostado
 * num painel — era daí que vinha boa parte da estranheza.
 */
export function Contact() {
  return (
    <Section id="contato" index="05" label="Contato">
      <div className="flex flex-1 flex-col">
        <Reveal>
          <h2
            id="contato-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {contact.heading}
          </h2>
          <p className="text-ink-muted mt-5 max-w-[620px] text-[15px] leading-[1.7]">
            {contact.description}
          </p>
        </Reveal>

        {/*
         * O formulário ganha a coluna maior porque tem três campos para
         * preencher; os canais são leitura, e leem melhor estreitos.
         */}
        <div className="mt-10 grid flex-1 items-stretch gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="h-full">
            <ContactChannels />
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <Panel title="Mensagem" code="IN" fill>
              <div className="flex flex-1 flex-col px-[18px] py-[22px]">
                <ContactForm />
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

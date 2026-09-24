import { ContactChannels } from '@/components/ui/ContactChannels'
import { ContactForm } from '@/components/ui/ContactForm'
import { CopiarEmail } from '@/components/ui/CopiarEmail'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/site'
import { socialChannels } from '@/data/social'

const { contact } = site

// O endereco sai do canal de e-mail, e nao de uma string repetida aqui.
const email = socialChannels.find((canal) => canal.icon === 'mail')?.handle

/**
 * Booking: o convite e os canais à esquerda, o formulário à direita.
 *
 * **Os canais não esticam mais.** Eles eram um painel da altura do
 * formulário, e quatro linhas de uma palavra esticadas até ~480px davam
 * ~120px por linha — o painel mais vazio da página, e a leitura do dono foi
 * "muito grande para algo que pode ser mais simples". Agora a lista tem a
 * altura do que é (~48px por linha) e divide a coluna com o convite: título
 * no topo, canais na base, e as duas pontas alinham com as do formulário.
 *
 * Abaixo de `lg` tudo empilha na ordem de leitura: convite, canais,
 * formulário.
 */
export function Contact() {
  return (
    <Section id="contato" index="05" label="Contato">
      <div className="my-auto grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Reveal className="flex flex-col justify-between gap-8">
          <div>
            <h2
              id="contato-title"
              className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
            >
              {contact.heading}
            </h2>
            <p className="text-ink-muted texto-justo mt-5 max-w-[620px] text-[15px] leading-[1.7]">
              {contact.description}
            </p>
            {email && (
              <div className="mt-6 max-w-[620px]">
                <CopiarEmail email={email} />
              </div>
            )}
          </div>

          <ContactChannels />
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <Panel title="Mensagem" fill>
            <div className="flex flex-1 flex-col px-[18px] py-[22px]">
              <ContactForm />
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}

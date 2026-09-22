import { ContactChannels } from '@/components/ui/ContactChannels'
import { ContactForm } from '@/components/ui/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/site'

const { contact } = site

/** Booking: canais de contato + formulário. */
export function Contact() {
  return (
    <Section id="contato" index="05" label="Contato">
      <div className="grid h-full grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-stretch gap-14">
        <Reveal className="flex h-full flex-col">
          <h2
            id="contato-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {contact.heading}
          </h2>
          <p className="text-ink-muted mt-5 max-w-[420px] text-[15px] leading-[1.7]">
            {contact.description}
          </p>

          <div className="mt-8 lg:mt-auto lg:pt-10">
            <ContactChannels />
          </div>
        </Reveal>

        <Reveal delay={0.14} className="flex h-full flex-col">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}

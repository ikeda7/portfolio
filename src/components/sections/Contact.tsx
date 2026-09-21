import { ContactChannels } from '@/components/ui/ContactChannels'
import { ContactForm } from '@/components/ui/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'

const { contact } = site

/** Booking: canais de contato + formulário. */
export function Contact() {
  return (
    <section
      id="contato"
      className="mx-auto w-full max-w-[1200px] px-6 py-20"
      aria-labelledby="contato-title"
    >
      <SectionHeading index="04" label="Contato" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-14">
        <Reveal>
          <h2
            id="contato-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {contact.heading}
          </h2>
          <p className="text-ink-muted mt-5 max-w-[420px] text-[15px] leading-[1.7]">
            {contact.description}
          </p>

          <div className="mt-8">
            <ContactChannels />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

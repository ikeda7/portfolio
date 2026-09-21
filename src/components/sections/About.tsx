import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutStats, site } from '@/data/site'

const { about } = site

/** Backstage: narrativa em duas colunas com stats e retrato. */
export function About() {
  return (
    <section
      id="sobre"
      className="mx-auto w-full max-w-[1200px] px-6 py-20"
      aria-labelledby="sobre-title"
    >
      <SectionHeading index="01" label="Sobre" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12">
        <div>
          <h2
            id="sobre-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {about.heading}
          </h2>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted mt-5 text-[15px] leading-[1.75]">
              {paragraph}
            </p>
          ))}

          <dl className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="border-line bg-panel rounded-[10px] border p-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-accent block font-mono text-2xl font-bold">
                    {stat.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink-faint mt-1 block font-mono text-[10px] tracking-[0.12em] uppercase"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-y-[18px] -right-[18px] left-[18px] rounded-2xl bg-[radial-gradient(circle_at_70%_70%,rgb(var(--accent-rgb)/0.45),transparent_70%)] blur-3xl"
          />

          {about.photo.src ? (
            <img
              src={about.photo.src}
              alt={about.photo.alt}
              className="border-line glow-photo relative aspect-square w-full rounded-2xl border object-cover"
            />
          ) : (
            // Regra de Ouro: sem a foto real, mantemos o placeholder do design.
            <div className="border-line bg-panel glow-photo relative flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border">
              <span
                aria-hidden="true"
                className="size-16 rounded-[14px] border border-[rgb(var(--accent-rgb)/0.5)] bg-[rgb(var(--accent-rgb)/0.12)]"
              />
              <span className="text-ink-faint font-mono text-[10px] tracking-[0.12em] uppercase">
                [INSERIR FOTO]
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

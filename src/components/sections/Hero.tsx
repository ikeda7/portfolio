import { Waveform } from '@/components/ui/Waveform'
import { site } from '@/data/site'

const { hero } = site

/** Palco principal: pill de status, título, CTAs e painel de waveform. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-24 pb-28"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="animate-driftglow pointer-events-none absolute -top-[180px] left-1/2 h-[460px] w-[760px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.22),rgb(13_13_13/0)_70%)] blur-[10px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <p className="border-line bg-panel text-ink-muted flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase">
          <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
          {hero.statusLabel}
        </p>

        <h1
          id="hero-title"
          className="mt-7 max-w-[900px] text-[clamp(40px,7vw,76px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
        >
          {hero.title}
        </h1>

        <p className="text-accent mt-[18px] font-mono text-[clamp(12px,1.6vw,15px)] tracking-[0.18em] uppercase">
          {hero.subtitle}
        </p>

        <p className="text-ink-muted mt-[22px] max-w-[560px] text-base leading-[1.65] text-pretty">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={hero.primaryCta.href}
            className="border-accent bg-accent hover:glow-cta rounded-lg border px-[26px] py-3.5 text-sm font-semibold text-[#0D0D0D] transition-all duration-300 hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="border-line text-ink hover:border-accent hover:glow-soft rounded-lg border bg-transparent px-[26px] py-3.5 text-sm font-medium transition-all duration-300"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <Waveform
          meta={hero.waveform.meta}
          timecode={hero.waveform.timecode}
          tags={hero.waveform.tags}
        />
      </div>
    </section>
  )
}

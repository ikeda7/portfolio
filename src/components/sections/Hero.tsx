import { motion, useReducedMotion } from 'motion/react'

import { Waveform } from '@/components/ui/Waveform'
import { site } from '@/data/site'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import { REVEAL_TRANSITION, VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'

const { hero } = site

/**
 * Palco principal: pill de status, título, CTAs e painel de waveform.
 *
 * A entrada é escalonada na montagem (não no scroll — o hero já nasce visível)
 * e um brilho roxo persegue o cursor pela seção inteira.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { bind, background } = usePointerGlow<HTMLElement>({ size: 460, alpha: 0.14 })

  return (
    <section
      {...bind}
      id="top"
      className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-24 sm:pb-28"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="animate-driftglow pointer-events-none absolute -top-[180px] left-1/2 h-[min(460px,60vw)] w-[min(760px,130%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.22),rgb(13_13_13/0)_70%)] blur-[10px]"
      />

      {background && (
        <motion.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0"
        />
      )}

      <motion.div
        className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
        variants={staggerVariants}
      >
        <motion.p
          variants={revealVariants}
          className="border-line bg-panel text-ink-muted flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase"
        >
          <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
          {hero.statusLabel}
        </motion.p>

        <motion.h1
          variants={revealVariants}
          id="hero-title"
          className="mt-7 max-w-[900px] text-[clamp(40px,7vw,76px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          variants={revealVariants}
          className="text-accent-text mt-[18px] font-mono text-[clamp(12px,1.6vw,15px)] tracking-[0.18em] uppercase"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          variants={revealVariants}
          className="text-ink-muted mt-[22px] max-w-[560px] text-base leading-[1.65] text-pretty"
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={revealVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={hero.primaryCta.href}
            className="border-accent bg-accent hover:glow-cta rounded-lg border px-[26px] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="border-line text-ink hover:border-accent hover:glow-soft rounded-lg border bg-transparent px-[26px] py-3.5 text-sm font-medium transition-all duration-300"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.div
          className="w-full"
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={VIEWPORT}
          variants={revealVariants}
          transition={REVEAL_TRANSITION}
        >
          <Waveform
            meta={hero.waveform.meta}
            timecode={hero.waveform.timecode}
            tags={hero.waveform.tags}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

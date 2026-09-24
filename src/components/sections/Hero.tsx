import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { Trilhas } from '@/components/ui/Trilhas'
import { Waveform } from '@/components/ui/Waveform'
import { site } from '@/data/site'
import { REVEAL_TRANSITION, VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'

const { hero } = site

/**
 * Palco principal: título, as três trilhas, CTAs e painel de waveform.
 *
 * Abria com uma pill "Bauru – SP · Brasil". A cidade saiu do hero em 24/09
 * (fica só no Contato), e a pill saiu junto: sem ela o título sobe e o
 * primeiro quadro fica menos carregado.
 *
 * A entrada é escalonada na montagem — não no scroll, porque o hero já nasce
 * visível.
 *
 * A luz que segue o cursor **não mora mais aqui**: é uma só para a página
 * inteira, `fixed` na raiz, em
 * [BrilhoDoCursor](../ui/BrilhoDoCursor.tsx). Com uma por seção, ela morria na
 * fronteira entre o hero e o Sobre. O pulso ambiente abaixo continua sendo do
 * hero, porque é a única luz que precisa nascer centrada.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="top"
      /*
       * O header e sticky, entao ocupa espaco no fluxo e o hero comeca abaixo
       * dele. Com `100svh` cheios, o hero terminava exatamente a altura do
       * header abaixo da dobra — e a indicacao de rolagem, ancorada no rodape
       * da secao, nascia fora da tela. Descontar `--header-h` faz o primeiro
       * quadro conter o hero inteiro.
       *
       * **Os respiros escalam com a ALTURA da janela** (`vh` nos clamps daqui,
       * do titulo e da waveform). Com valores fixos o hero media ~760px, e um
       * notebook de 1366x768 com o navegador aberto tem ~650px uteis: a
       * waveform saia cortada no meio. O `pb` nunca desce de 72px porque o
       * atalho de rolagem, `fixed` no rodape da janela, precisa desse chao.
       */
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden px-6 pt-[clamp(1.5rem,5vh,4rem)] pb-[clamp(4.5rem,10vh,5.5rem)]"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="animate-driftglow pointer-events-none absolute -top-[180px] left-1/2 h-[min(460px,60vw)] w-[min(760px,130%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.22),rgb(13_13_13/0)_70%)] blur-[10px]"
      />

      <m.div
        className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
        variants={staggerVariants}
      >
        <m.h1
          variants={revealVariants}
          id="hero-title"
          className="max-w-[900px] text-[clamp(40px,min(7vw,9vh),76px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
        >
          {hero.title}
        </m.h1>

        <m.p
          variants={revealVariants}
          className="text-accent-text mt-[18px] font-mono text-[clamp(12px,1.6vw,15px)] tracking-[0.18em] uppercase"
        >
          <Trilhas texto={hero.subtitle} />
        </m.p>

        <m.p
          variants={revealVariants}
          className="text-ink-muted mt-[22px] max-w-[560px] text-base leading-[1.65] text-pretty"
        >
          {hero.description}
        </m.p>

        <m.div
          variants={revealVariants}
          className="mt-[clamp(1.25rem,4vh,2.5rem)] flex flex-wrap items-center justify-center gap-3"
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
        </m.div>

        <m.div
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
            canais={hero.waveform.canais}
          />
        </m.div>
      </m.div>
    </section>
  )
}

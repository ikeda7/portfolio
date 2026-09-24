import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { aboutStats, site } from '@/data/site'

const { about } = site

/** Backstage: narrativa em duas colunas com stats e retrato. */
export function About() {
  return (
    <Section id="sobre" index="01" label="Sobre">
      {/*
       * **A foto é quadrada e inteira, sempre.** Em 23/09 ela saiu do fluxo e
       * passou a acompanhar a altura do texto; alinhava, mas cortava a imagem
       * (até ~17% a 1920px), e o dono preferiu a foto como era.
       *
       * Então quem se ajusta é a LARGURA da coluna da foto (`--foto`), medida
       * para o quadrado ficar da altura do texto. Com os quatro parágrafos de
       * 24/09 o texto ficou longo, e duas decisões saíram da medição:
       *
       * - Lado a lado só de `xl` para cima. Entre `lg` e `xl` o texto ficava
       *   100–190px mais alto que qualquer foto que coubesse ao lado — e
       *   alargar a foto estreita o texto, que cresce de novo. Abaixo de `xl`
       *   empilha, como no celular, com a foto limitada a 440px.
       * - Os stats ficam numa linha inteira embaixo das duas colunas. Na
       *   coluna do texto eles o deixavam ~100px mais alto que a foto.
       *
       * - No `2xl` a coluna do texto tem teto (720px) e a foto, 490px: sem o
       *   teto o texto alargava, encurtava, e a foto sobrava embaixo.
       *
       * `my-auto` centraliza o bloco na altura da seção, para o respiro que
       * sobrar se dividir entre o rótulo e o atalho de rolagem.
       *
       * Mudou o texto do Sobre, remeça (script em docs/PENDENCIAS.md).
       */}
      <div className="my-auto grid gap-x-12 gap-y-6 xl:grid-cols-[minmax(0,1fr)_var(--foto)] xl:[--foto:min(500px,42%)] 2xl:[--foto:490px] 2xl:grid-cols-[minmax(0,720px)_var(--foto)] 2xl:justify-between">
        <Reveal className="xl:col-start-1 xl:row-start-1">
          <h2
            id="sobre-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {about.heading}
          </h2>

          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-ink-muted texto-justo mt-4 text-[15px] leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {/*
         * Os stats são item próprio da grade para poderem ocupar a linha
         * inteira embaixo das duas colunas (ver o comentário da grade).
         */}
        <Reveal className="xl:col-span-2 xl:row-start-2">
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(120px,100%),1fr))] gap-3">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="border-line bg-panel hover:border-accent rounded-[10px] border p-4 transition-all duration-300"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-accent-text block font-mono text-2xl font-bold">
                    {stat.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink-faint mt-1 block font-mono text-[11px] tracking-[0.12em] uppercase"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          delay={0.14}
          className="relative mx-auto w-full max-w-[440px] self-start xl:col-start-2 xl:row-start-1 xl:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-[18px] -right-[18px] left-[18px] rounded-2xl bg-[radial-gradient(circle_at_70%_70%,rgb(var(--accent-rgb)/0.45),transparent_70%)] blur-3xl"
          />

          {about.photo.src ? (
            <div className="border-line glow-photo relative aspect-square w-full overflow-hidden rounded-2xl border">
              <img
                src={about.photo.src}
                alt={about.photo.alt}
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />

              {/*
                O retrato foi feito em fundo de estúdio quase branco. Sem
                tratamento ele vira o objeto mais claro da página inteira: rouba
                o olho do texto e apaga o glow de acento em volta, porque o
                brilho da foto supera o do glow.

                A vinheta escurece só a periferia e deixa o rosto intacto — o
                quadrado se dissolve no carvão em vez de flutuar sobre ele. É
                camada de CSS, não edição do arquivo: trocar a foto não exige
                reprocessar nada.
              */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_30%,rgb(13_13_13/0.62)_100%)]"
              />
            </div>
          ) : (
            // Regra de Ouro: sem a foto real, mantemos o placeholder do design.
            <div className="border-line bg-panel glow-photo relative flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border">
              <span
                aria-hidden="true"
                className="size-16 rounded-[14px] border border-[rgb(var(--accent-rgb)/0.5)] bg-[rgb(var(--accent-rgb)/0.12)]"
              />
              <span className="text-ink-faint font-mono text-[11px] tracking-[0.12em] uppercase">
                [INSERIR FOTO]
              </span>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  )
}

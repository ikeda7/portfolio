import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { aboutStats, site } from '@/data/site'

const { about } = site

/** Backstage: narrativa em duas colunas com stats e retrato. */
export function About() {
  return (
    <Section id="sobre" index="01" label="Sobre">
      {/*
       * **A foto é quadrada e inteira, sempre**, e quem se ajusta é a
       * largura da coluna dela (`--foto`), medida para o quadrado ter a
       * altura do texto. Histórico em docs/PENDENCIAS.md; o estado de 24/09:
       *
       * - **Ordem: foto, texto, números.** É a ordem do DOM, e é a que o
       *   celular mostra (pedido do dono). Do `xl` em diante a grade põe
       *   texto e foto lado a lado e os números numa linha inteira embaixo.
       * - Lado a lado só do `xl` para cima: abaixo disso o texto fica
       *   100–190px mais alto que qualquer foto que caiba ao lado.
       * - `xl`: foto de 540px e entrelinha um pouco menor (1.65); fecha em
       *   14px. `2xl`: o texto sobe para 17px — em tela larga ele ficava baixo
       *   demais para a foto — e a foto vai a 580px; fecha em 15px.
       * - Os números: 2x2 no celular, quatro numa linha do tablet para cima.
       *
       * `my-auto` centraliza o bloco na altura da seção. Mudou o texto do
       * Sobre, remeça (o script está no histórico da conversa de 24/09 e a
       * regra é: base da foto contra a base do último parágrafo).
       */}
      <div className="my-auto grid gap-x-12 gap-y-6 xl:grid-cols-[minmax(0,1fr)_var(--foto)] xl:[--foto:min(540px,45%)] 2xl:[--foto:580px]">
        <Reveal
          delay={0}
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

        <Reveal delay={0.08} className="xl:col-start-1 xl:row-start-1">
          <h2
            id="sobre-title"
            className="text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-semibold tracking-[-0.03em]"
          >
            {about.heading}
          </h2>

          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-ink-muted texto-justo mt-4 text-[15px] leading-[1.75] xl:mt-3 xl:leading-[1.65] 2xl:mt-4 2xl:text-[17px] 2xl:leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {/*
         * Quatro números: 2x2 no celular, uma linha de quatro do tablet para
         * cima — do `xl` em diante, numa linha inteira embaixo do texto e da
         * foto.
         */}
        <Reveal className="xl:col-span-2 xl:row-start-2">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
      </div>
    </Section>
  )
}

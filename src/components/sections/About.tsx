import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { aboutStats, site } from '@/data/site'

const { about } = site

/** Backstage: narrativa em duas colunas com stats e retrato. */
export function About() {
  return (
    <Section id="sobre" index="01" label="Sobre">
      {/*
       * `items-stretch` e nao `items-center`: e o que permite a foto casar com
       * a altura do texto em vez de sobrar dos dois lados.
       *
       * A foto era `aspect-square w-full`, entao a altura dela saia da LARGURA
       * da coluna enquanto a altura do texto sai do CONTEUDO. As duas nunca
       * batiam, e o desencontro mudava de tamanho a cada largura de tela —
       * por isso nenhum numero fixo resolvia. Em 1400px sobravam ~25px em cima
       * e ~25px embaixo.
       *
       * Da coluna de duas para cima a foto sai do fluxo (`md:absolute`) e
       * preenche a celula. Fora do fluxo ela nao empurra mais a altura da
       * linha, entao quem manda na altura passa a ser o texto — que e o que se
       * queria. Empilhado, volta a ser quadrada em fluxo, porque ali a celula
       * nao tem altura propria para preencher.
       */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-stretch gap-12">
        <Reveal>
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

          <dl className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(120px,100%),1fr))] gap-3">
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

        <Reveal delay={0.14} className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-y-[18px] -right-[18px] left-[18px] rounded-2xl bg-[radial-gradient(circle_at_70%_70%,rgb(var(--accent-rgb)/0.45),transparent_70%)] blur-3xl"
          />

          {about.photo.src ? (
            <div className="border-line glow-photo relative aspect-square w-full overflow-hidden rounded-2xl border md:absolute md:inset-0 md:aspect-auto md:h-full">
              <img
                src={about.photo.src}
                alt={about.photo.alt}
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"
                /*
                 * O corte puxa para cima (`20%`), nao para o centro.
                 *
                 * Agora que o quadro acompanha a altura do texto, ele fica
                 * cada vez mais deitado quanto mais larga a tela — a 1920px o
                 * texto tem 454px e o quadro precisa esconder ~17% da imagem.
                 * Com o padrao `50%`, esses 17% saem metade de cima e metade
                 * de baixo, e a cabeca ficava decepada no topo. Puxando o foco
                 * para 20% quase tudo o que sai e rodape, que e fundo de
                 * estudio.
                 */
                className="h-full w-full object-cover object-[50%_20%]"
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
            <div className="border-line bg-panel glow-photo relative flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border md:absolute md:inset-0 md:aspect-auto md:h-full">
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

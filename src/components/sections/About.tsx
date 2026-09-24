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
       * Então quem se ajusta agora é a LARGURA da coluna da foto, não o
       * recorte: a partir de `lg` ela é `--foto`, uma fração da linha com
       * teto, escolhida medindo para o quadrado ficar da altura do texto. O
       * que sobrar de diferença a grade absorve: a linha do texto é `1fr`,
       * então o vão fica entre os parágrafos e os stats, e a foto começa e
       * termina junto com o bloco.
       *
       * Entre `lg` e `xl` a foto ENCOLHE conforme a tela alarga, ao contrário
       * do resto: é a faixa em que o texto mais perde altura ao ganhar
       * largura, e com a foto fixa em 440px ela chegava a sobrar 105px abaixo
       * do último parágrafo a 1279px. `700px - 28vw` saiu da medição em 1024,
       * 1152 e 1279.
       *
       * `my-auto`: a seção tem a altura da janela, e o bloco inteiro mede
       * ~500px. Sem centralizar, a 1440x900 sobravam ~170px mortos embaixo;
       * centralizado, o respiro se divide entre o rótulo e o atalho de rolagem.
       *
       * Abaixo de `lg` empilha, com a foto limitada a 440px: quadrada na
       * largura inteira de um tablet ela passava de 700px de altura.
       */}
      <div className="my-auto grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_var(--foto)] lg:grid-rows-[1fr_auto] lg:[--foto:clamp(320px,calc(700px-28vw),440px)] xl:[--foto:min(500px,42%)]">
        <Reveal className="lg:col-start-1 lg:row-start-1">
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
        </Reveal>

        {/*
         * Os stats são item próprio da grade para poderem trocar de lugar: de
         * `xl` para cima ficam na coluna do texto, sob os parágrafos, e a foto
         * desce as duas linhas; entre `lg` e `xl` o texto ficava 80–125px mais
         * alto que a foto, então ali eles vão para uma linha inteira embaixo
         * das duas colunas.
         */}
        <Reveal className="lg:col-span-2 lg:row-start-2 xl:col-span-1 xl:col-start-1">
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
          className="relative mx-auto w-full max-w-[440px] self-start lg:col-start-2 lg:row-start-1 lg:max-w-none xl:row-span-2"
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

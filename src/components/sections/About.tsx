import { useInView } from 'motion/react'
import { useRef, useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/site'

const { about } = site

/** Backstage: retrato e narrativa, lado a lado do `xl` para cima. */
export function About() {
  /*
   * A foto entra sozinha quando termina de carregar. O `Reveal` anima o
   * quadro, mas a imagem é `lazy`: no celular, com rede mais lenta, a
   * animação acabava antes de o arquivo chegar e a foto só "piscava" na tela
   * (dono, 24/09).
   *
   * E mesmo carregada ela entrava fora da vista: o reveal dispara quando só
   * a beirada do bloco (64px) entra na tela, e no celular a animação acabava
   * com quase toda a foto ainda abaixo da dobra — ao rolar até ela, já
   * estava lá, "do nada" (dono, 25/09). Agora a foto só entra quando está
   * carregada E com 40% à vista, numa entrada longa (1,4s): fade, um zoom
   * de saída e um desfoque que se desfaz. Sem movimento, o kill switch do
   * `index.css` corta a transição e ela aparece direto.
   */
  const quadroDaFoto = useRef<HTMLDivElement>(null)
  const fotoNaTela = useInView(quadroDaFoto, { once: true, amount: 0.4 })
  const [fotoPronta, setFotoPronta] = useState(false)
  const mostrarFoto = fotoNaTela && fotoPronta

  return (
    <Section id="sobre" index="01" label="Sobre" fill={false}>
      {/*
       * **A foto é quadrada e inteira, sempre**, e quem se ajusta é a
       * largura da coluna dela (`--foto`), medida para o quadrado ter a
       * altura do texto. Histórico em docs/PENDENCIAS.md; o estado de 24/09:
       *
       * - **Ordem: foto, texto.** É a ordem do DOM, e é a que o celular
       *   mostra (pedido do dono). Do `xl` em diante, lado a lado.
       * - **Sem cards de números**, desde 24/09. Já foram "2026 / B2", depois
       *   estatísticas do GitHub (repositórios, commits, bibliotecas): as
       *   primeiras repetiam Formação e Idiomas, e as do GitHub só contam o
       *   que é público — 583 commits em 5 anos lia como pouco, quando o
       *   trabalho maior está em repositório privado ou de empresa. O dono
       *   decidiu tirar: o texto já fecha a seção.
       * - Lado a lado só do `xl` para cima: abaixo disso o texto fica
       *   100–190px mais alto que qualquer foto que caiba ao lado.
       * - **A seção tem a altura do conteúdo** (`fill={false}`), e não uma
       *   tela no mínimo. Com a tela cheia e o bloco centralizado (`my-auto`),
       *   sobrava vão em cima e embaixo que crescia com o monitor: ~190px e
       *   ~220px a 1920x1080 (leitura do dono, 24/09).
       * - **A foto segue a altura da janela**: `100svh` menos header e
       *   respiros, limitada a 44% da largura. Assim o Sobre inteiro cabe
       *   numa tela de 1280x720 a 1920x1080, sem sobra.
       * - O texto acompanha: 15px com entrelinha 1.65 no `xl`, 18px no
       *   `2xl`, onde a foto é mais alta. Base da foto contra a base do
       *   último parágrafo: dentro de 15px em 1280x720, 1366x768, 1440x900,
       *   1536x864, 1680x1050 e 1920x1080. Mudou o texto, remeça.
       */}
      <div className="grid gap-x-12 gap-y-6 xl:grid-cols-[minmax(0,1fr)_var(--foto)] xl:[--foto:min(44%,calc(100svh-var(--header-h)-180px))]">
        <Reveal
          delay={0}
          className="relative mx-auto w-full max-w-[440px] self-start xl:col-start-2 xl:row-start-1 xl:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-[18px] -right-[18px] left-[18px] rounded-2xl bg-[radial-gradient(circle_at_70%_70%,rgb(var(--accent-rgb)/0.45),transparent_70%)] blur-3xl"
          />

          {about.photo.src ? (
            <div
              ref={quadroDaFoto}
              className="border-line glow-photo relative aspect-square w-full overflow-hidden rounded-2xl border"
            >
              <img
                src={about.photo.src}
                alt={about.photo.alt}
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"
                ref={(foto) => {
                  if (foto?.complete) setFotoPronta(true)
                }}
                onLoad={() => setFotoPronta(true)}
                className={`h-full w-full object-cover transition-[opacity,scale,filter] duration-[1400ms] ease-out ${
                  mostrarFoto ? 'scale-100 opacity-100 blur-none' : 'scale-[1.08] opacity-0 blur-md'
                }`}
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
              className="text-ink-muted texto-justo mt-4 text-[15px] leading-[1.75] xl:mt-3 xl:leading-[1.65] 2xl:mt-4 2xl:text-[18px] 2xl:leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}

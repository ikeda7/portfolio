import { LazyMotion, domAnimation } from 'motion/react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SectionNav } from '@/components/layout/SectionNav'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { BrilhoDoCursor } from '@/components/ui/BrilhoDoCursor'
import { Marquee } from '@/components/ui/Marquee'
import { OndaDeFundo } from '@/components/ui/OndaDeFundo'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { bibliotecasDoGithub } from '@/data/skills'

export default function App() {
  return (
    /**
     * `domAnimation` traz animações, variants e gestos — e, dentro dos gestos,
     * o `InViewFeature`, que é o que faz `whileInView` funcionar. Sem ele todo
     * reveal pararia em silêncio, com o conteúdo preso em opacity 0.
     *
     * `strict` proíbe `motion.*` dentro desta árvore: se alguém esquecer de
     * usar `m.*`, o erro aparece no desenvolvimento em vez de virar peso morto
     * no bundle.
     */
    <LazyMotion features={domAnimation} strict>
      <a
        href="#conteudo"
        className="bg-accent sr-only rounded-lg px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      {/*
       * Uma luz de cursor para a página inteira, antes de todo o resto na
       * árvore para pintar por baixo. Aqui e não dentro das seções: uma por
       * seção media a posição relativa a si mesma e apagava ao sair, então o
       * brilho se partia na fronteira entre uma e outra.
       */}
      <BrilhoDoCursor />

      {/*
       * A onda sonora do fundo, também por baixo de tudo: começa depois do
       * hero e liga uma seção à outra. Ver OndaDeFundo.
       */}
      <OndaDeFundo />

      <Header />
      <SectionNav />
      <ScrollHint />

      <main id="conteudo">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Marquee items={bibliotecasDoGithub} />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </LazyMotion>
  )
}

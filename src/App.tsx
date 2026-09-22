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
import { Marquee } from '@/components/ui/Marquee'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { marqueeItems } from '@/data/skills'

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

      <Header />
      <SectionNav />
      <ScrollHint />

      <main id="conteudo">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Marquee items={marqueeItems} />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </LazyMotion>
  )
}

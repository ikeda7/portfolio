import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Marquee } from '@/components/ui/Marquee'
import { marqueeItems } from '@/data/skills'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="bg-accent sr-only rounded-lg px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <About />
        <Skills />
        <Marquee items={marqueeItems} />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

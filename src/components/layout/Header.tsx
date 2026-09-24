import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Marca } from '@/components/ui/Marca'
import { navLinks } from '@/data/site'

const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

/**
 * Header sticky com blur, marca, navegação por âncora e playhead de scroll.
 *
 * No mobile a marca e a navegação ficam empilhadas: lado a lado, os links
 * quebravam em três linhas a partir de ~390px e o header triplicava de altura.
 * Os links têm 44px de altura até `sm` para virarem alvos de toque confortáveis;
 * a marca fica na altura natural para o header não comer a tela.
 *
 * Com a quinta seção (Experiência) a nav passou a quebrar em duas linhas até
 * 414px, levando o header a 145px — 20% da tela de um celular, e mais alto que
 * o `scroll-margin-top`, o que escondia o topo de cada seção ao navegar. Por
 * isso, até `sm`, a nav vira uma faixa de rolagem horizontal: os links ficam em
 * uma linha só, com máscara de fade na direita indicando que há mais. Acima de
 * `sm` ela volta a ser uma linha comum, sem rolagem.
 */
export function Header() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="border-line sticky top-0 z-20 border-b bg-[rgb(13_13_13/0.82)] backdrop-blur-[14px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-1 px-6 py-2 sm:flex-row sm:justify-between sm:gap-6 sm:py-3.5">
        <Marca className="py-1.5 sm:py-1" />

        <nav
          aria-label="Navegação principal"
          className="w-full [mask-image:linear-gradient(90deg,#000_88%,transparent)] sm:w-auto sm:[mask-image:none]"
        >
          <ul className="flex snap-x gap-1 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)

              return (
                <li key={link.href} className="snap-start">
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`hover:bg-panel-2 hover:text-ink flex min-h-11 items-center rounded-md px-3 font-mono text-[11px] whitespace-nowrap tracking-[0.1em] uppercase transition-all duration-300 sm:min-h-0 sm:py-2 ${
                      isActive ? 'text-accent-text' : 'text-ink-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ScrollProgress />
    </header>
  )
}

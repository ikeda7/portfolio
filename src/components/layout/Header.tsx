import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { navLinks, site } from '@/data/site'

const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

/**
 * Header sticky com blur, marca, navegação por âncora e playhead de scroll.
 *
 * No mobile a marca e a navegação ficam empilhadas: lado a lado, os 4 links
 * quebravam em três linhas a partir de ~390px e o header triplicava de altura.
 * Os links têm 44px de altura até `sm` para virarem alvos de toque confortáveis;
 * a marca fica na altura natural para o header não comer a tela.
 */
export function Header() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="border-line sticky top-0 z-20 border-b bg-[rgb(13_13_13/0.82)] backdrop-blur-[14px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-1 px-6 py-2 sm:flex-row sm:justify-between sm:gap-6 sm:py-3.5">
        <a
          href="#top"
          className="flex items-baseline gap-2 py-1 sm:py-0"
          aria-label="Voltar ao topo"
        >
          <span className="text-ink text-base font-bold tracking-[-0.02em]">
            {site.brand.firstName}
          </span>
          <span className="text-accent-text font-mono text-[11px] tracking-[0.08em]">
            /{site.brand.lastName.toUpperCase()}
          </span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`hover:bg-panel-2 hover:text-ink flex min-h-11 items-center rounded-md px-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300 sm:min-h-0 sm:py-2 ${
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

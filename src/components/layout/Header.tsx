import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { navLinks, site } from '@/data/site'

const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

/** Header sticky com blur, marca, navegação por âncora e playhead de scroll. */
export function Header() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="border-line sticky top-0 z-20 border-b bg-[rgb(13_13_13/0.82)] backdrop-blur-[14px]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-6 py-3.5">
        <a href="#top" className="flex items-baseline gap-2" aria-label="Voltar ao topo">
          <span className="text-ink text-base font-bold tracking-[-0.02em]">
            {site.brand.firstName}
          </span>
          <span className="text-accent font-mono text-[11px] tracking-[0.08em]">
            /{site.brand.lastName.toUpperCase()}
          </span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`hover:bg-panel-2 hover:text-ink relative block rounded-md px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300 ${
                      isActive ? 'text-accent' : 'text-ink-muted'
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

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Marca } from '@/components/ui/Marca'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { navLinks } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

/**
 * Header sticky com blur, marca, navegação por âncora e playhead de scroll.
 *
 * **Do `sm` para cima**, marca à esquerda e os cinco links numa linha — é o
 * header que o dono deu como finalizado em 24/09, e não mudou.
 *
 * **No celular, um botão "Menu".** Antes a navegação era uma faixa de rolagem
 * horizontal embaixo da marca: cabia até "Projetos" e o "Contato" ficava
 * escondido depois da borda, que é justamente o destino mais importante da
 * página (leitura do dono, 24/09). Com o menu, os cinco aparecem inteiros ao
 * tocar, com alvo de 44px, e o header do celular cai de 97px para ~60px —
 * mais tela para o conteúdo. `--header-h` em `index.css` acompanha.
 *
 * O menu fecha ao escolher um link, com Esc, e sozinho se a tela alargar até
 * o layout de desktop.
 */
export function Header() {
  const activeId = useActiveSection(SECTION_IDS)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAberto(false)
    }
    const telaLarga = window.matchMedia('(min-width: 40rem)')
    const aoAlargar = () => {
      if (telaLarga.matches) setAberto(false)
    }
    window.addEventListener('keydown', aoTeclar)
    telaLarga.addEventListener('change', aoAlargar)
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      telaLarga.removeEventListener('change', aoAlargar)
    }
  }, [aberto])

  return (
    <header className="border-line sticky top-0 z-20 border-b bg-[rgb(13_13_13/0.82)] backdrop-blur-[14px]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-6 py-2 sm:py-3.5">
        <Marca className="py-1.5 sm:py-1" />

        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((atual) => !atual)}
          className="border-line text-ink-muted hover:text-ink hover:border-accent flex min-h-11 items-center gap-2 rounded-md border px-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300 sm:hidden"
        >
          {aberto ? (
            <X aria-hidden="true" className="size-4" />
          ) : (
            <Menu aria-hidden="true" className="size-4" />
          )}
          Menu
        </button>

        <nav aria-label="Navegação principal" className="hidden sm:block">
          <ul className="flex flex-wrap justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`hover:bg-panel-2 hover:text-ink flex items-center rounded-md px-3 py-2 font-mono text-[11px] whitespace-nowrap tracking-[0.1em] uppercase transition-all duration-300 ${
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

      {/* O menu do celular: abre embaixo da barra, por cima do conteúdo. */}
      {aberto && (
        <nav
          id="menu-principal"
          aria-label="Navegação principal"
          className="border-line bg-bg absolute inset-x-0 top-full border-b px-6 pb-4 shadow-[0_18px_40px_rgb(0_0_0/0.6)] sm:hidden"
        >
          <ul className="divide-line flex flex-col divide-y">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setAberto(false)}
                    className={`hover:text-ink flex min-h-12 items-center justify-between font-mono text-[12px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      isActive ? 'text-accent-text' : 'text-ink-muted'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="bg-accent glow-led size-1.5 rounded-full"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}

      <ScrollProgress />
    </header>
  )
}

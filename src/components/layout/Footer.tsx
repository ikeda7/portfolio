import { navLinks, site } from '@/data/site'
import { socialChannels } from '@/data/social'

/**
 * Rodapé.
 *
 * Tinha só duas linhas soltas. Com todas as seções ocupando a tela inteira,
 * quem chega ao fim da página está longe do header — repetir a navegação e os
 * canais aqui evita a rolagem de volta ao topo só para achar um link.
 *
 * Nada aqui é conteúdo novo: navegação e canais saem das mesmas fontes que o
 * Header e a seção de Contato usam.
 */
export function Footer() {
  return (
    <footer className="border-line border-t px-6 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="flex items-baseline gap-2" aria-label="Voltar ao topo">
              <span className="text-ink text-base font-bold tracking-[-0.02em]">
                {site.brand.firstName}
              </span>
              <span className="text-accent-text font-mono text-[11px] tracking-[0.08em]">
                /{site.brand.lastName.toUpperCase()}
              </span>
            </a>
            <p className="text-ink-faint mt-2 font-mono text-[10px] tracking-[0.12em] uppercase">
              {site.hero.subtitle}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink-muted hover:text-accent-text flex min-h-8 items-center font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socialChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href ?? undefined}
                  target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  className="text-ink-muted hover:text-accent-text flex min-h-8 items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-300"
                  aria-label={`${channel.label}: ${channel.handle}`}
                >
                  <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-line text-ink-faint flex flex-wrap items-center justify-between gap-3 border-t pt-6 font-mono text-[10px] tracking-[0.12em] uppercase">
          <span>{site.footer.left}</span>
          <span>{site.footer.right}</span>
        </div>
      </div>
    </footer>
  )
}

import { IconeCanal } from '@/components/ui/IconeCanal'
import { Marca } from '@/components/ui/Marca'
import { Trilhas } from '@/components/ui/Trilhas'
import { navLinks, site } from '@/data/site'
import { socialChannels } from '@/data/social'

const ROTULO = 'text-ink-faint font-mono text-[11px] tracking-[0.14em] uppercase'

/**
 * Rodapé: uma faixa só, e uma linha de assinatura embaixo.
 *
 * Era uma grade de três colunas (marca | navegação | canais) em `1.6fr 1fr
 * 1fr`, cada coluna com rótulo e lista vertical. A 1440 isso deixava ~350px
 * vazios no meio, cinco links empilhados para uma coluna de canais de quatro,
 * e o subtítulo quebrando num `max-w-[280px]` que cortava a frase ao meio —
 * a leitura do dono foi "muito espaço vazio, a descrição corta do nada".
 *
 * Agora cada coisa ocupa a largura do que é: marca e trilhas à esquerda, a
 * navegação numa linha no centro, os canais como ícones à direita. Nada foi
 * tirado — os mesmos links, das mesmas fontes que o Header e o Contato usam.
 * Abaixo de `lg` a faixa empilha centralizada.
 */
export function Footer() {
  /*
   * `pb-20` ate `sm`: o atalho flutuante de rolagem e `fixed` e centrado no
   * rodape da janela, e no celular a linha de assinatura tambem e centrada —
   * no fim da pagina ele pousava em cima do "Feito com". De `sm` para cima a
   * linha abre para os cantos e o centro fica livre.
   */
  return (
    <footer className="border-line border-t px-6 pt-10 pb-20 sm:pb-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 2xl:max-w-[1440px]">
        <div className="flex flex-col items-center gap-6 text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
          <div className="flex flex-col items-center gap-2.5 lg:items-start">
            <Marca className="py-1" />
            <p className="text-accent-text font-mono text-[11px] tracking-[0.14em] uppercase">
              <Trilhas texto={site.hero.subtitle} />
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            {/*
             * `max-w-[300px]` ate `lg`: cinco links nao cabem numa linha de
             * celular, e soltos quebravam 4+1, com "Contato" sozinho. Com o
             * teto, quebram 3+2 em qualquer largura de 320 a 1023.
             */}
            <ul className="mx-auto flex max-w-[300px] flex-wrap justify-center gap-x-1 gap-y-1 lg:max-w-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink-muted hover:text-ink hover:bg-panel-2 flex min-h-9 items-center rounded-md px-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/*
           * Os canais viram ícone: aqui eles são atalho, e o nome de cada um
           * está no `aria-label` e no `title`. Quem quiser o endereço escrito
           * tem o painel do Contato logo acima.
           */}
          <ul className="flex items-center gap-2 lg:justify-end">
            {socialChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href ?? undefined}
                  target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  aria-label={`${channel.label}: ${channel.handle}`}
                  title={channel.label}
                  className="border-line text-ink-muted hover:border-accent hover:text-accent-text hover:glow-soft flex size-10 items-center justify-center rounded-lg border transition-all duration-300"
                >
                  <IconeCanal icon={channel.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${ROTULO} border-line flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t pt-6 sm:justify-between`}
        >
          <span>{site.footer.left}</span>
          <span>Feito com React, Tailwind e Vite</span>
        </div>
      </div>
    </footer>
  )
}

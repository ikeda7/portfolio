import { ArrowUpRight, Download } from 'lucide-react'

import { Panel } from '@/components/ui/Panel'
import { socialChannels } from '@/data/social'

const LINHA_CLASS =
  'flex h-full items-center gap-3 px-[18px] py-3.5 transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.07)]'

/**
 * Os dois PDFs já estavam versionados em `public/` e não tinham link nenhum na
 * página — currículo que existe no repositório e não existe na tela é currículo
 * que ninguém lê. Ficam aqui, e não em `socialChannels`, porque não são canal:
 * são documento. O tipo `SocialChannel` pede `handle`, e "PT-BR" não é handle
 * de lugar nenhum.
 */
const CURRICULOS = [
  { idioma: 'PT-BR', href: '/curriculo-lucas-ikeda-pt.pdf', acessivel: 'em português' },
  { idioma: 'EN', href: '/curriculo-lucas-ikeda-en.pdf', acessivel: 'em inglês' },
] as const

/**
 * Painel "Canais": os contatos como linhas de um patchbay.
 *
 * Eram quatro cartões numa grade 2x2, cada um com o identificador centralizado
 * e `break-all` — o que picava "lucasvikeda@gmail.com" no meio da palavra para
 * caber na coluna. Em linha o endereço cabe inteiro, o painel ganha altura o
 * bastante para encostar no formulário ao lado, e a leitura vira uma varredura
 * vertical em vez de quatro paradas.
 *
 * O LED redondo vem do protótipo aprovado. TODO(design): trocar por ícones de
 * marca — `lucide-react@1` removeu Github/Linkedin/Instagram, então a fonte
 * será Simple Icons (SVG inline, 16px, `currentColor`).
 */
export function ContactChannels() {
  return (
    <Panel title="Canais" code="OUT" fill>
      <ul className="divide-line flex flex-1 flex-col divide-y">
        {socialChannels.map((channel) => (
          <li key={channel.label} className="group/canal flex-1">
            <a
              href={channel.href ?? undefined}
              target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer noopener"
              className={LINHA_CLASS}
              aria-label={`${channel.label}: ${channel.handle}`}
            >
              <span
                aria-hidden="true"
                className="bg-accent glow-led size-2 shrink-0 rounded-full"
              />

              {/*
               * `flex-wrap` e nao largura fixa: em 320px o rotulo e o endereco
               * nao cabem na mesma linha, e truncar esconderia justamente o
               * e-mail. Quebrando, ele desce inteiro para a linha de baixo.
               */}
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="text-ink font-mono text-[11px] tracking-[0.1em] uppercase">
                  {channel.label}
                </span>
                <span className="text-ink-faint font-mono text-[11px] tracking-[0.04em] break-all">
                  {channel.handle}
                </span>
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="text-ink-faint group-hover/canal:text-accent-text size-3.5 shrink-0 transition-all duration-300"
              />
            </a>
          </li>
        ))}

        <li className="flex-1">
          <div className={LINHA_CLASS}>
            <span aria-hidden="true" className="bg-accent glow-led size-2 shrink-0 rounded-full" />
            <span className="text-ink min-w-0 flex-1 font-mono text-[11px] tracking-[0.1em] uppercase">
              Currículo
            </span>

            <span className="flex shrink-0 items-center gap-1.5">
              {CURRICULOS.map((curriculo) => (
                <a
                  key={curriculo.idioma}
                  href={curriculo.href}
                  download
                  className="border-line text-ink-faint hover:border-accent hover:text-accent-text inline-flex min-h-6 items-center gap-1.5 rounded border px-2 py-1 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-300"
                  aria-label={`Baixar o currículo ${curriculo.acessivel} em PDF`}
                >
                  <Download aria-hidden="true" className="size-3" />
                  {curriculo.idioma}
                </a>
              ))}
            </span>
          </div>
        </li>
      </ul>
    </Panel>
  )
}

import { ArrowUpRight } from 'lucide-react'

import { Panel } from '@/components/ui/Panel'
import { socialChannels } from '@/data/social'

const LINHA_CLASS =
  'flex h-full items-center gap-3 px-[18px] py-3.5 transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.07)]'

/**
 * Painel "Canais": os contatos como linhas de um patchbay.
 *
 * Eram quatro cartões numa grade 2x2, cada um com o identificador centralizado
 * e `break-all` — o que picava "lucasvikeda@gmail.com" no meio da palavra para
 * caber na coluna. Em linha o endereço cabe inteiro, o painel ganha altura o
 * bastante para encostar no formulário ao lado, e a leitura vira uma varredura
 * vertical em vez de quatro paradas.
 *
 * **Sem currículo em PDF, de propósito.** Ele chegou a ficar aqui, com
 * download em PT-BR e EN, e foi removido em 23/09: o PDF traz o telefone,
 * e o telefone é justamente o dado que `socialChannels` mantém fora da
 * página para não virar alvo de robô de spam. Publicar o arquivo desfazia
 * em silêncio uma decisão que o resto do arquivo documenta. As experiências
 * que o currículo carrega já estão na seção Experiência.
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
      </ul>
    </Panel>
  )
}

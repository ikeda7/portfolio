import { ArrowUpRight } from 'lucide-react'

import { IconeCanal } from '@/components/ui/IconeCanal'
import { Panel } from '@/components/ui/Panel'
import { socialChannels } from '@/data/social'
import { contagem } from '@/lib/contagem'

const LINHA_CLASS =
  'flex items-center gap-3 px-[18px] py-4 transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.07)]'

/**
 * Painel "Canais": os contatos como linhas de um patchbay.
 *
 * Eram quatro cartões numa grade 2x2, cada um com o identificador centralizado
 * e `break-all` — o que picava "lucasvikeda@gmail.com" no meio da palavra para
 * caber na coluna. Em linha o endereço cabe inteiro e a leitura vira uma
 * varredura vertical em vez de quatro paradas. Cada linha tem a altura
 * natural: o painel já esticou até a altura do formulário ao lado, e virou o
 * bloco mais vazio da página.
 *
 * **Sem currículo em PDF, de propósito.** Ele chegou a ficar aqui, com
 * download em PT-BR e EN, e foi removido em 23/09: o PDF traz o telefone,
 * e o telefone é justamente o dado que `socialChannels` mantém fora da
 * página para não virar alvo de robô de spam. Publicar o arquivo desfazia
 * em silêncio uma decisão que o resto do arquivo documenta. As experiências
 * que o currículo carrega já estão na seção Experiência.
 *
 * Cada linha abre com o ícone do canal. Era um LED redondo, o mesmo nas
 * quatro, herdado do protótipo — e um LED igual em tudo não diferencia nada.
 * O ícone troca o LED no mesmo lugar e no mesmo tamanho, de propósito: o
 * pedido foi deixar o painel mais legível sem encolhê-lo e perder o
 * alinhamento com o formulário. De onde vem cada desenho está em
 * [IconeCanal](./IconeCanal.tsx).
 */
export function ContactChannels() {
  return (
    <Panel title="Canais" code={contagem(socialChannels.length, 'canal', 'canais')}>
      <ul className="divide-line flex flex-col divide-y">
        {socialChannels.map((channel) => (
          <li key={channel.label} className="group/canal">
            <a
              href={channel.href ?? undefined}
              target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer noopener"
              className={LINHA_CLASS}
              aria-label={`${channel.label}: ${channel.handle}`}
            >
              {/*
               * O icone ocupa o lugar exato do LED (so a coluna da esquerda
               * muda), entao a altura das linhas e o alinhamento com o
               * formulario ao lado ficam onde estavam. `text-accent-text` e
               * nao `text-accent`: o azul cheio reprova como traco fino.
               */}
              <IconeCanal
                icon={channel.icon}
                className="text-accent-text size-4 shrink-0 transition-all duration-300 group-hover/canal:scale-110"
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

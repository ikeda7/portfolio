import { Panel } from '@/components/ui/Panel'
import { socialChannels } from '@/data/social'

const ITEM_CLASS =
  'border-line bg-panel-sunken hover:border-accent flex h-full flex-col items-center gap-2 rounded-lg border p-3.5 text-center transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.08)]'

/**
 * Painel "Canais": botões de rede estilizados como controles de painel.
 *
 * Cada botão mostra o identificador abaixo do rótulo, para a pessoa conseguir
 * me achar mesmo sem clicar — e para o e-mail ficar copiável a olho nu.
 *
 * O LED redondo vem do protótipo aprovado. TODO(design): trocar por ícones de
 * marca — `lucide-react@1` removeu Github/Linkedin/Instagram, então a fonte
 * será Simple Icons (SVG inline, 16px, `currentColor`).
 */
export function ContactChannels() {
  return (
    <Panel title="Canais" code="OUT">
      <ul className="grid grid-cols-2 gap-2.5 p-3.5">
        {socialChannels.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href ?? undefined}
              target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer noopener"
              className={ITEM_CLASS}
              aria-label={`${channel.label}: ${channel.handle}`}
            >
              <span aria-hidden="true" className="bg-accent glow-led size-2 rounded-full" />
              <span className="text-ink font-mono text-[11px] uppercase">{channel.label}</span>
              <span className="text-ink-faint w-full font-mono text-[10px] leading-tight tracking-[0.04em] break-all">
                {channel.handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

import { Panel } from '@/components/ui/Panel'
import { socialChannels } from '@/data/social'

const ITEM_CLASS =
  'border-line bg-panel-sunken hover:border-accent flex flex-col items-center gap-2 rounded-lg border p-3.5 transition-all duration-300 hover:bg-[rgb(var(--accent-rgb)/0.08)]'

/**
 * Painel "Canais": botões de rede estilizados como controles de painel.
 *
 * O LED redondo vem do protótipo aprovado. TODO(design): trocar por ícones de
 * marca — `lucide-react@1` removeu Github/Linkedin/X, então a fonte será
 * Simple Icons (SVG inline, 16px, `currentColor`).
 */
export function ContactChannels() {
  return (
    <Panel title="Canais" code="OUT">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(110px,100%),1fr))] gap-2.5 p-3.5">
        {socialChannels.map((channel) => (
          <li key={channel.label}>
            {channel.href ? (
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer noopener"
                className={ITEM_CLASS}
                aria-label={`Abrir ${channel.label} em uma nova aba`}
              >
                <span aria-hidden="true" className="bg-accent glow-led size-2 rounded-full" />
                <span className="text-ink font-mono text-[11px] uppercase">{channel.label}</span>
              </a>
            ) : (
              // Regra de Ouro: sem URL confirmada, o canal fica visivelmente pendente.
              <div className={`${ITEM_CLASS} opacity-50`} aria-disabled="true">
                <span aria-hidden="true" className="bg-ink-faint size-2 rounded-full" />
                <span className="text-ink-faint font-mono text-[11px] uppercase">
                  {channel.label}
                </span>
                <span className="text-ink-faint font-mono text-[10px]">[INSERIR URL]</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

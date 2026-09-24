import { useActiveSection } from '@/hooks/useActiveSection'
import { destinos } from '@/data/site'

const IDS = destinos.map((d) => d.href.slice(1))

/**
 * Régua de seções na lateral, no formato da escala de um fader: um traço por
 * seção, o da seção atual mais longo e aceso.
 *
 * Existe porque todas as seções ocupam a tela inteira — quem está no meio da
 * página não tem referência de onde está nem de quanto falta, e a indicação de
 * rolagem do hero só aparece no primeiro quadro. O header continua sendo a
 * navegação principal; isto é orientação, e some abaixo de `lg`, onde a tela é
 * estreita demais para gastar margem com isso.
 *
 * Os rótulos ficam escondidos até o hover ou o foco, mas sempre existem no DOM:
 * são o nome acessível de cada link.
 *
 * **O rótulo é `absolute` e `pointer-events-none`.** Em fluxo, ele ocupava a
 * largura de "EXPERIÊNCIA" mesmo invisível, e essa faixa transparente ficava
 * por cima do conteúdo da direita recebendo o clique — os botões M/S da Stack
 * paravam de responder perto da borda. Agora o alvo é só o traço (32px de
 * largura, 24 de altura), e o rótulo aparece ao lado sem capturar nada.
 */
export function SectionNav() {
  const activeId = useActiveSection(IDS)

  return (
    <nav
      aria-label="Ir para seção"
      className="fixed top-1/2 right-6 z-10 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {destinos.map((destino) => {
          const isActive = activeId === destino.href.slice(1)

          return (
            <li key={destino.href}>
              <a
                href={destino.href}
                aria-current={isActive ? 'true' : undefined}
                // min-h-6: com `py-1` o link fechava em 23px de altura, 1px
                // abaixo do minimo de 24x24 da WCAG 2.5.8.
                className="group relative flex min-h-6 min-w-8 items-center justify-end py-1 pl-2"
              >
                <span
                  className={`pointer-events-none absolute right-full mr-3 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    isActive ? 'text-accent-text' : 'text-ink-muted'
                  }`}
                >
                  {destino.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? 'bg-accent glow-bar w-7'
                      : 'bg-ink-faint w-3.5 group-hover:bg-ink-muted group-hover:w-5'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

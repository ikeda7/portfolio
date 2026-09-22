import { navLinks, site } from '@/data/site'
import { socialChannels } from '@/data/social'

/*
 * A primeira linha das tres colunas mora numa caixa de 24px com o conteudo
 * centralizado. Sem isso a marca (16px bold) e os rotulos (10px mono) tinham
 * metricas de fonte diferentes e comecavam 7px desencontrados, o que lia como
 * desalinhamento mesmo com as colunas nascendo no mesmo y.
 */
const LINHA_TOPO = 'flex min-h-6 items-center'
const ROTULO = 'text-ink-faint font-mono text-[10px] tracking-[0.14em] uppercase'
const ITEM =
  'text-ink-muted hover:text-accent-text flex min-h-6 items-center gap-2 font-mono text-[11px] tracking-[0.06em] transition-colors duration-300'

/**
 * Rodapé.
 *
 * Com todas as seções ocupando a tela inteira, quem chega ao fim está longe do
 * header — repetir navegação e canais aqui evita a rolagem de volta ao topo só
 * para achar um link. Nada aqui é conteúdo novo: sai das mesmas fontes que o
 * Header e a seção de Contato usam.
 *
 * As colunas são grade, não `justify-between` com listas horizontais. Antes os
 * três blocos tinham larguras diferentes (382/357/339px a 1440) e, a 768px, a
 * navegação e os canais quebravam em duas linhas enquanto a marca ficava em
 * uma — o conjunto lia como esfarrapado. Em colunas verticais de largura
 * declarada, cada item cai embaixo do anterior e as três colunas começam e
 * terminam alinhadas.
 */
export function Footer() {
  return (
    <footer className="border-line border-t px-6 py-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 2xl:max-w-[1440px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="#top" className={`${LINHA_TOPO} gap-2`} aria-label="Voltar ao topo">
              <span className="text-ink text-base font-bold tracking-[-0.02em]">
                {site.brand.firstName}
              </span>
              <span className="text-accent-text font-mono text-[11px] tracking-[0.08em]">
                /{site.brand.lastName.toUpperCase()}
              </span>
            </a>
            <p className="text-ink-muted mt-3 max-w-[280px] text-[13px] leading-[1.6]">
              {site.hero.subtitle}
            </p>
            <p className={`${ROTULO} mt-3`}>{site.footer.right}</p>
          </div>

          <nav aria-labelledby="rodape-nav">
            <span id="rodape-nav" className={`${ROTULO} ${LINHA_TOPO}`}>
              Navegação
            </span>
            <ul className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={ITEM}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span id="rodape-canais" className={`${ROTULO} ${LINHA_TOPO}`}>
              Canais
            </span>
            <ul aria-labelledby="rodape-canais" className="mt-4 flex flex-col gap-1">
              {socialChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href ?? undefined}
                    target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    className={ITEM}
                    aria-label={`${channel.label}: ${channel.handle}`}
                  >
                    <span aria-hidden="true" className="bg-accent glow-led size-1.5 rounded-full" />
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`${ROTULO} border-line flex flex-wrap items-center justify-between gap-3 border-t pt-6`}
        >
          <span>{site.footer.left}</span>
          <span>Feito com React, Tailwind e Vite</span>
        </div>
      </div>
    </footer>
  )
}

interface LabelCoverProps {
  /** Número da faixa, impresso no selo. */
  readonly track: string
  /** Primeira linha do estado: "Site no ar", "Em produção", "TCC". */
  readonly estado: string
  /** Segunda linha: "Repositório público", "Código fechado". */
  readonly repo: string
}

/**
 * A capa dos seis cards: o selo de vinil.
 *
 * **É o mesmo desenho em todos**, e essa é a única regra que importa aqui. As
 * capas já foram quatro tratamentos diferentes — print do site, terminal com os
 * comandos do README, espectro de linguagens, placa cega —, cada projeto com o
 * que tinha para mostrar. Cada uma se justificava sozinha e o conjunto ficou
 * ruim: seis cards lado a lado com seis linguagens visuais leem como falta de
 * padrão, não como cuidado.
 *
 * Print em todos era impossível: três dos seis não têm tela nenhuma. Com três
 * impossíveis, qualquer mistura reintroduz a exceção — então nenhum tem print,
 * e o que varia é só o que já é diferente entre eles: o número e o estado.
 *
 * **Três tons, não um.** A primeira versão empilhava `panel-sunken` no fundo,
 * um disco quase invisível e o selo em `panel`: tecnicamente três cores, na
 * prática um retângulo preto. A leitura foi "tá tudo muito escuro, o texto
 * camufla". A auditoria não pegava porque ela mede WCAG, e o AA é o piso: um
 * par pode passar em 6:1 e ainda assim sumir num tipo de 11px em caixa alta.
 *
 * Agora o fundo é o mais escuro da página, o disco sobe para ~#1e1e1e e o selo
 * sobe de novo — cada camada se separa da de baixo, e o aro claro fecha a borda
 * do disco. A diferença que faz o desenho ler não é a que passa no teste, é a
 * que se enxerga.
 */
/*
 * O reflexo do disco, em X: dois feixes que atravessam o centro, cada um com
 * as duas pontas opostas acesas. Era uma cunha só de um lado, que lia como V.
 *
 * O selo cobre quase toda a altura da capa, então o X só aparece nas laterais
 * — e a capa é larga (~2.3:1). Por isso os feixes cruzam a 47deg e não a 90:
 * parados, cada ponta aponta para um canto da capa (23.5deg acima e abaixo da
 * horizontal), e o par dos dois lados do selo lê como um X aberto. Em 90 as
 * pontas batiam no topo e na base, escondidas atrás do selo.
 *
 * `from 66.5deg`: o zero do conic é 12h, então 90 - 23.5 põe o primeiro feixe
 * no canto de cima à direita.
 */
const FEIXE = 'rgb(var(--accent-rgb) / 0.22)'
const BRILHO_EM_X = [
  `${FEIXE} 0deg`,
  'transparent 11deg',
  'transparent 36deg',
  `${FEIXE} 47deg`,
  'transparent 58deg',
  'transparent 169deg',
  `${FEIXE} 180deg`,
  'transparent 191deg',
  'transparent 216deg',
  `${FEIXE} 227deg`,
  'transparent 238deg',
  'transparent 349deg',
  `${FEIXE} 360deg`,
].join(', ')

export function LabelCover({ track, estado, repo }: LabelCoverProps) {
  return (
    <div className="bg-panel-sunken relative flex h-full w-full items-center justify-center overflow-hidden">
      {/*
       * Os sulcos e o brilho ficam no disco, que gira — e o selo NÃO gira, é
       * irmão dele. Num vinil de verdade o selo roda junto, mas aqui ele carrega
       * o número e o estado, e texto girando não se lê. Preferi a legibilidade.
       *
       * O brilho é cônico porque sulco concêntrico é radialmente simétrico:
       * sem ele, a rotação no hover seria matematicamente real e visualmente
       * invisível. O desenho do brilho está em `BRILHO_EM_X`, acima.
       *
       * Gira sem parar enquanto o card está sob o mouse ou com foco, e congela
       * no ângulo em que estava quando sai — o próximo hover continua dali.
       * O mecanismo está no `@utility vinil-gira`, em `index.css`.
       */}
      <div
        aria-hidden="true"
        className="absolute aspect-square h-[240%] rounded-full ring-1 ring-white/[0.07] vinil-gira"
        style={{
          backgroundImage: [
            `conic-gradient(from 66.5deg, ${BRILHO_EM_X})`,
            'repeating-radial-gradient(circle, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 4px)',
            'radial-gradient(circle at 38% 32%, #232323, #141414 62%, #0f0f0f)',
          ].join(','),
        }}
      />

      {/*
       * `h-[96%]` e `px-3`: "Repositório público" mede ~134px em mono de 11px, e
       * num selo menor ele quebrava em duas linhas e empurrava o estado para
       * fora do círculo. O texto é curto e fixo, então o selo é dimensionado
       * para ele caber — e não o contrário.
       */}
      <div className="border-line-strong relative flex aspect-square h-[96%] flex-col items-center justify-center rounded-full border bg-[radial-gradient(circle_at_50%_38%,#202020,#161616)] px-3 text-center">
        <span className="text-ink font-mono text-[24px] leading-none font-semibold tracking-[0.06em] tabular-nums">
          {track}
        </span>

        {/* Furo central: é o que faz o círculo ler como selo, e não como botão. */}
        <span
          aria-hidden="true"
          className="bg-bg border-line-strong my-2 size-2.5 shrink-0 rounded-full border"
        />

        <span className="text-ink font-mono text-[11px] leading-[1.3] tracking-[0.06em] whitespace-nowrap uppercase">
          {estado}
        </span>
        <span className="text-ink-muted font-mono text-[11px] leading-[1.3] tracking-[0.04em] whitespace-nowrap uppercase">
          {repo}
        </span>
      </div>
    </div>
  )
}

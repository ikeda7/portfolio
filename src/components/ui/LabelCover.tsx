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
 * O reflexo do disco: dois borrões largos e opostos.
 *
 * A primeira versão era um borrão só — uma cunha larga de um lado do disco
 * (a 210deg) e um eco fraco perto dela —, e a outra metade ficava apagada. A
 * segunda trocou por um X de feixes estreitos, que acendia o disco todo mas
 * virou "hastes" retas demais. Esta junta as duas: o mesmo borrão largo e
 * macio do original, repetido do lado oposto, então o brilho cobre o vinil
 * inteiro sem virar risco.
 *
 * Parte de 255deg, e não dos 210 do original: com dois borrões opostos, 210
 * os punha em cima e embaixo, atrás do selo, que cobre quase toda a altura
 * da capa. Em 255 eles nascem nas laterais, que é o que se vê do disco.
 *
 * Cada metade do círculo repete o desenho do original comprimido em 50%:
 * pico forte, apaga, eco fraco, volta ao pico.
 */
const FORTE = 'rgb(var(--accent-rgb) / 0.2)'
const FRACO = 'rgb(var(--accent-rgb) / 0.12)'
const BRILHO = [
  `${FORTE} 0%`,
  'transparent 11%',
  'transparent 33%',
  `${FRACO} 42%`,
  `${FORTE} 50%`,
  'transparent 61%',
  'transparent 83%',
  `${FRACO} 92%`,
  `${FORTE} 100%`,
].join(', ')

/*
 * Raios dos sulcos, no `viewBox` de 400 do disco. O disco tem ~2,4x a altura
 * da capa (~440px num card comum), então 3,6 unidades dão ~4px entre um
 * sulco e o outro — o mesmo passo do gradiente que eles substituem. Começam
 * embaixo do selo, que cobre o miolo, e param na borda.
 */
const SULCOS = Array.from({ length: 38 }, (_, i) => 64 + i * 3.6)

export function LabelCover({ track, estado, repo }: LabelCoverProps) {
  return (
    <div className="bg-panel-sunken relative flex h-full w-full items-center justify-center overflow-hidden">
      {/*
       * O brilho gira sobre o disco — e o selo NÃO gira, é
       * irmão dele. Num vinil de verdade o selo roda junto, mas aqui ele carrega
       * o número e o estado, e texto girando não se lê. Preferi a legibilidade.
       *
       * O brilho é cônico porque sulco concêntrico é radialmente simétrico:
       * sem ele, a rotação no hover seria matematicamente real e visualmente
       * invisível. O desenho do brilho está em `BRILHO`, acima.
       *
       * Gira sempre, em qualquer aparelho (no celular não existe hover, e o
       * disco ficava parado). Ver `@utility vinil-gira`, em `index.css`.
       *
       * **Não é o elemento que gira, é o ângulo do brilho** (`--vinil-angulo`).
       * Girar o disco por `transform` fazia o navegador girá-lo como imagem
       * pronta, e numa placa de vídeo real os sulcos sumiam e o brilho virava
       * uma faixa de borda reta (print do dono, 24/09). O motivo completo está
       * junto do `@property`, em `index.css`.
       *
       * **Os sulcos são círculos de SVG, e não gradiente.** Eram um
       * `repeating-radial-gradient` com listras de ~1px, e sumiram três vezes
       * na tela do dono (24/09), mesmo reforçados: com placa de vídeo, o
       * navegador tira a média de listras finas de gradiente e elas viram um
       * cinza liso. Traço de SVG é desenhado como linha — com
       * `vector-effect: non-scaling-stroke` fica em 1px de tela, nítido em
       * qualquer escala. Ficam por cima do brilho, que é o que um sulco de
       * verdade faz com o reflexo.
       */}
      <div
        aria-hidden="true"
        className="vinil-gira absolute aspect-square h-[240%] rounded-full ring-1 ring-white/[0.07]"
        style={{
          backgroundImage: [
            `conic-gradient(from var(--vinil-angulo), ${BRILHO})`,
            'radial-gradient(circle at 38% 32%, #232323, #141414 62%, #0f0f0f)',
          ].join(','),
        }}
      >
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
          {SULCOS.map((raio) => (
            <circle
              key={raio}
              cx="200"
              cy="200"
              r={raio}
              fill="none"
              stroke="rgb(255 255 255 / 0.08)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

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

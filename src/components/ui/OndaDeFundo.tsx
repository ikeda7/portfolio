import { useEffect, useRef } from 'react'

/** Distância entre as barras, em px de documento. */
const PASSO = 6
/** Espessura de cada barra. */
const ESPESSURA = 2
/** Opacidade das barras longe da agulha. */
const ALFA_BASE = 0.07
/** Quanto a agulha (o meio da janela) acende as barras em volta. */
const ALFA_AGULHA = 0.1
/** Meia altura da faixa acesa pela agulha. */
const RAIO_AGULHA = 160
/** Meia altura da faixa que incha em volta do cursor. */
const RAIO_CURSOR = 110
/** Velocidade do pulso de um clique, em px por ms, e quanto ele dura. */
const VELOCIDADE_PULSO = 0.9
const VIDA_PULSO = 1400
/** Espessura da frente de onda do pulso. */
const FRENTE_PULSO = 46

interface Pulso {
  /** Onde nasceu, em px de documento. */
  readonly origem: number
  readonly inicio: number
}

/** A trilha escolhida no hero, lida de `data-trilha` no `<html>`. */
type Trilha = 'azul' | 'roxo' | 'vermelho'

/** Uma componente do sinal: peso, frequência no espaço, fase e velocidade. */
type Componente = readonly [peso: number, frequencia: number, fase: number, velocidade: number]

/**
 * Um desenho de onda por trilha (ideia do dono, 24/09): os botões do hero
 * trocam a cor e também a forma, como já trocam a waveform de lá.
 *
 * - **azul** (Full Stack): equilibrada, três componentes de pesos parecidos.
 * - **roxo** (Data Science): ondas longas e macias, que leem como curvas de
 *   distribuição.
 * - **vermelho** (IA Aplicada): nervosa, com picos curtos, densos e rápidos.
 */
const FORMAS: Readonly<Record<Trilha, readonly Componente[]>> = {
  azul: [
    [0.55, 0.021, 0, 0.9],
    [0.3, 0.057, 1.3, -1.6],
    [0.15, 0.13, 0.7, 2.7],
  ],
  roxo: [
    [0.75, 0.011, 0.2, 0.5],
    [0.25, 0.029, 2.1, -0.8],
  ],
  vermelho: [
    [0.4, 0.034, 0.5, 1.5],
    [0.35, 0.089, 1.9, -2.4],
    [0.25, 0.21, 0.3, 3.9],
  ],
}

/** Quanto dura a transição de um desenho para o outro, em ms. */
const TRANSICAO = 700

function trilhaAtual(): Trilha {
  const valor = document.documentElement.dataset.trilha
  return valor === 'roxo' || valor === 'vermelho' ? valor : 'azul'
}

/**
 * O sinal da onda numa altura do **documento**, de 0 a 1.
 *
 * Soma de senoides em frequências que não se alinham, como um áudio de
 * verdade, e não uma senoide pura, que leria como enfeite de régua. Uma
 * envoltória lenta por cima faz trechos mais altos e mais baixos ao longo da
 * página. A posição no documento decide o desenho, então a onda rola com a
 * página como se estivesse impressa nela; o tempo (`t`, em segundos) só a faz
 * vibrar no lugar — cada componente corre num sentido e numa velocidade, e a
 * soma "toca" em vez de só deslizar.
 */
function sinal(y: number, t: number, forma: readonly Componente[]): number {
  let onda = 0
  for (const [peso, frequencia, fase, velocidade] of forma) {
    onda += peso * Math.sin(y * frequencia + fase + t * velocidade)
  }
  const envoltoria = 0.55 + 0.45 * Math.sin(y * 0.0021 + 0.4)
  return Math.abs(onda) * envoltoria
}

/**
 * A onda sonora que atravessa a página de cima a baixo, atrás de tudo.
 *
 * Ideia 4 da conversa sobre o fundo (24/09), escolhida pelo dono: uma trilha
 * contínua, bem apagada, que liga as seções — o fundo deixa de ser preto
 * chapado sem voltar às manchas paradas que existiam antes (o pulso ambiente
 * de cada seção, que lia como "uma luz que não é a do meu cursor").
 *
 * **Mesma linguagem da waveform do hero**, deitada: barras horizontais
 * empilhadas, espelhadas em volta do centro da página. Começa depois do hero
 * (lá a waveform de verdade já está) e some perto do fim.
 *
 * **Reage à rolagem de dois jeitos:**
 * - a **agulha**: as barras perto do meio da janela acendem, como o cabeçote
 *   passando pela trilha enquanto se rola;
 * - o **nível**: rolar rápido aumenta a amplitude, que volta ao normal
 *   sozinha em menos de um segundo — o sinal "toca" com o movimento.
 *
 * **E toca sozinha** (pedido do dono, 24/09): as componentes do sinal correm
 * com o tempo, cada uma num sentido, e as barras sobem e descem como a
 * waveform do hero. Canvas `fixed` que desenha só o trecho visível, e não um
 * SVG da altura da página: são ~150 retângulos por quadro. Em
 * `prefers-reduced-motion` a onda fica parada (só rola com a página), o nível
 * não reage à velocidade e o ponteiro não mexe nela.
 *
 * **E responde ao ponteiro** (pedido do dono, 24/09): as barras na altura do
 * cursor incham e acendem, como se ele tocasse a onda ali, e um clique ou um
 * toque solta um pulso que corre pela onda para cima e para baixo e se apaga.
 *
 * A cor vem de `--accent-rgb`, então acompanha a trilha escolhida no hero.
 */
export function OndaDeFundo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)')
    let quadro = 0
    let nivel = 0
    let ultimoY = window.scrollY
    let ultimoT = performance.now()

    /*
     * O cursor: altura na janela e quanto está "encostado" (0 a 1, sobe ao
     * mexer e cai sozinho). A altura é suavizada, senão a faixa inchada
     * pularia de barra em barra.
     */
    let cursorAlvo = -1
    let cursorY = -1
    let toque = 0
    const pulsos: Pulso[] = []

    // A forma da trilha e a de antes, para a troca ser uma transição.
    let forma = trilhaAtual()
    let formaAnterior = forma
    let trocouEm = -Infinity

    const dimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const desenhar = () => {
      quadro = 0
      const largura = window.innerWidth
      const altura = window.innerHeight
      const topo = window.scrollY
      const fimDoDocumento = document.documentElement.scrollHeight
      const fimDoHero = document.getElementById('top')?.getBoundingClientRect().bottom ?? 0
      const heroNoDocumento = fimDoHero + topo

      const agora = performance.now()
      const tempo = reduzido.matches ? 0 : agora / 1000
      const dt = Math.max(agora - ultimoT, 1)
      const velocidade = Math.abs(topo - ultimoY) / dt
      ultimoY = topo
      ultimoT = agora
      if (!reduzido.matches) {
        nivel = Math.max(nivel * 0.9, Math.min(velocidade / 4, 1))
      }

      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim()
      const centro = largura / 2
      const maximo = Math.min(largura * 0.36, 460) * (1 + nivel * 0.35)
      const agulha = altura / 2
      // No celular o texto ocupa a largura toda e a onda fica sempre atrás
      // dele: ali ela é mais apagada.
      const discricao = largura < 640 ? 0.6 : 1

      if (cursorAlvo >= 0)
        cursorY = cursorY < 0 ? cursorAlvo : cursorY + (cursorAlvo - cursorY) * 0.2
      toque *= 0.985
      // 0 a 1 ao longo da transição, com entrada e saída suaves.
      const passo = reduzido.matches ? 1 : Math.min((agora - trocouEm) / TRANSICAO, 1)
      const mistura = passo * passo * (3 - 2 * passo)
      const atual = FORMAS[forma]
      const anterior = FORMAS[formaAnterior]

      while (pulsos.length > 0 && agora - (pulsos[0]?.inicio ?? 0) > VIDA_PULSO) pulsos.shift()

      ctx.clearRect(0, 0, largura, altura)

      // A primeira barra visível, alinhada à grade do documento.
      const inicio = Math.floor(topo / PASSO) * PASSO
      for (let yDoc = inicio; yDoc < topo + altura; yDoc += PASSO) {
        // Entra ao longo do último terço do hero e sai nos 240px finais.
        const entrada = Math.min(
          Math.max((yDoc - heroNoDocumento * 0.66) / (heroNoDocumento * 0.34), 0),
          1,
        )
        const saida = Math.min(Math.max((fimDoDocumento - yDoc) / 240, 0), 1)
        const presenca = entrada * saida
        if (presenca <= 0) continue

        const y = yDoc - topo
        const distancia = Math.abs(y - agulha) / RAIO_AGULHA
        const acesa = distancia < 1 ? (1 - distancia) ** 2 : 0

        // O cursor incha e acende as barras na altura dele.
        const perto = cursorY >= 0 ? Math.abs(y - cursorY) / RAIO_CURSOR : 1
        const tocada = perto < 1 ? (1 - perto * perto) ** 2 * toque : 0

        // Cada pulso é uma frente que corre para cima e para baixo do clique.
        let onda = 0
        for (const pulso of pulsos) {
          const idade = agora - pulso.inicio
          const frente = Math.abs(Math.abs(yDoc - pulso.origem) - idade * VELOCIDADE_PULSO)
          if (frente < FRENTE_PULSO) {
            onda = Math.max(onda, (1 - frente / FRENTE_PULSO) * (1 - idade / VIDA_PULSO))
          }
        }

        const alfa =
          (ALFA_BASE + ALFA_AGULHA * acesa + 0.16 * tocada + 0.2 * onda) * presenca * discricao
        const meia = Math.max(
          (mistura < 1
            ? sinal(yDoc, tempo, anterior) * (1 - mistura) + sinal(yDoc, tempo, atual) * mistura
            : sinal(yDoc, tempo, atual)) *
            maximo *
            (1 + 0.55 * tocada + 0.7 * onda),
          3,
        )

        ctx.fillStyle = `rgb(${rgb} / ${alfa.toFixed(3)})`
        ctx.fillRect(centro - meia, y, meia * 2, ESPESSURA)
      }

      // O nível decai sozinho: continua desenhando até voltar ao repouso.
      if (nivel <= 0.01) nivel = 0
      // Animada, redesenha todo quadro (o navegador pausa sozinho com a aba
      // escondida). Parada, só quando rola ou o nível ainda está caindo.
      if (!reduzido.matches || nivel > 0) agendar()
    }

    const agendar = () => {
      if (quadro === 0) quadro = requestAnimationFrame(desenhar)
    }

    /*
     * Interação: só com movimento ligado. Mouse e caneta incham a faixa sob o
     * cursor; clique ou toque solta um pulso. Escuta a janela inteira e não o
     * canvas, que fica por baixo de tudo e não recebe ponteiro.
     */
    const aoMover = (event: PointerEvent) => {
      if (reduzido.matches || event.pointerType === 'touch') return
      cursorAlvo = event.clientY
      toque = 1
    }
    const aoSair = () => {
      cursorAlvo = -1
    }
    const aoClicar = (event: PointerEvent) => {
      if (reduzido.matches) return
      pulsos.push({ origem: event.clientY + window.scrollY, inicio: performance.now() })
      if (pulsos.length > 6) pulsos.shift()
    }

    const aoRedimensionar = () => {
      dimensionar()
      agendar()
    }

    // A trilha do hero troca `--accent-rgb` e a forma: redesenha na nova.
    const trilha = new MutationObserver(() => {
      const nova = trilhaAtual()
      if (nova === forma) return
      formaAnterior = forma
      forma = nova
      trocouEm = performance.now()
      agendar()
    })
    trilha.observe(document.documentElement, { attributes: true, attributeFilter: ['data-trilha'] })

    dimensionar()
    agendar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', aoRedimensionar)
    window.addEventListener('pointermove', aoMover, { passive: true })
    window.addEventListener('pointerdown', aoClicar, { passive: true })
    document.documentElement.addEventListener('pointerleave', aoSair)

    return () => {
      window.removeEventListener('pointermove', aoMover)
      window.removeEventListener('pointerdown', aoClicar)
      document.documentElement.removeEventListener('pointerleave', aoSair)
      trilha.disconnect()
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', aoRedimensionar)
      if (quadro !== 0) cancelAnimationFrame(quadro)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}

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

/**
 * O sinal da onda numa altura do **documento**, de 0 a 1.
 *
 * Soma de senoides em frequências que não se alinham, como um áudio de
 * verdade, e não uma senoide pura, que leria como enfeite de régua. Uma
 * envoltória lenta por cima faz trechos mais altos e mais baixos ao longo da
 * página. É determinístico: a mesma altura dá sempre a mesma barra, então a
 * onda rola com a página como se estivesse impressa nela.
 */
function sinal(y: number): number {
  const onda =
    0.55 * Math.sin(y * 0.021) + 0.3 * Math.sin(y * 0.057 + 1.3) + 0.15 * Math.sin(y * 0.13 + 0.7)
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
 * Canvas `fixed` que desenha só o trecho visível, e não um SVG da altura da
 * página: são ~150 retângulos por quadro, e nada é desenhado sem rolagem. Em
 * `prefers-reduced-motion` a onda continua (ela só rola com a página), mas o
 * nível não reage à velocidade.
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
        const alfa = (ALFA_BASE + ALFA_AGULHA * acesa) * presenca * discricao
        const meia = Math.max(sinal(yDoc) * maximo, 3)

        ctx.fillStyle = `rgb(${rgb} / ${alfa.toFixed(3)})`
        ctx.fillRect(centro - meia, y, meia * 2, ESPESSURA)
      }

      // O nível decai sozinho: continua desenhando até voltar ao repouso.
      if (nivel > 0.01) agendar()
      else nivel = 0
    }

    const agendar = () => {
      if (quadro === 0) quadro = requestAnimationFrame(desenhar)
    }

    const aoRedimensionar = () => {
      dimensionar()
      agendar()
    }

    // A trilha do hero troca `--accent-rgb` no <html>: redesenha na cor nova.
    const trilha = new MutationObserver(agendar)
    trilha.observe(document.documentElement, { attributes: true, attributeFilter: ['data-trilha'] })

    dimensionar()
    agendar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', aoRedimensionar)

    return () => {
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

import { useEffect } from 'react'
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'

/** Raio do halo largo e do miolo, em px. */
const TAMANHO = 520
const MIOLO = 260
/** Opacidade do centro de cada um. */
const ALFA = 0.08
const ALFA_MIOLO = 0.14

/*
 * Mola curta: por cima do conteúdo, uma luz que chega atrasada lê como "não é
 * onde está o meu cursor". A antiga (stiffness 60) só funcionava porque a luz
 * ficava no fundo, meio escondida.
 */
const SPRING = { stiffness: 320, damping: 34, mass: 0.4 }

/**
 * A luz que segue o cursor na página inteira — **uma só, na raiz**.
 *
 * Antes cada seção tinha a sua, via `usePointerGlow`. Cada uma media a posição
 * relativa a si mesma e zerava a opacidade no `onPointerLeave`, então ao passar
 * de uma seção para a outra o brilho morria de um lado e renascia do outro: a
 * luz "dividia" na fronteira, que é exatamente o defeito que se vê rolando a
 * página devagar.
 *
 * Aqui a coordenada é a da **janela**, não a de um elemento, e não há fronteira
 * nenhuma para cruzar. De quebra é um listener em vez de seis.
 *
 * `fixed` e não `absolute` por dois motivos que andam juntos: a coordenada do
 * cursor já é de viewport, e o elemento precisa acompanhar a rolagem sem
 * recalcular nada.
 *
 * **Fica POR CIMA do conteúdo** (`z-[15]`, abaixo só do header), em
 * `mix-blend-screen`, desde 24/09. Atrás de tudo ela só aparecia no fundo:
 * painéis e cards têm fundo próprio e a cobriam, e só o card de projeto tinha
 * um brilho próprio por cima. O dono pediu esse efeito do card no site
 * inteiro. `screen` só clareia — nunca escurece nem tinge o que já é claro —,
 * então a luz passa por painel, equipamento e texto sem sujar nada, e o
 * brilho próprio do card (que ficava preso à posição de repouso do card e
 * desalinhava quando ele subia no hover) deixou de existir.
 *
 * **Só responde a mouse e caneta.** No toque não existe `pointerleave`, então
 * a luz ficaria acesa e parada onde o dedo encostou pela última vez.
 *
 * Como toda animação em JS, o kill switch CSS do `index.css` não a alcança —
 * por isso o componente checa `useReducedMotion()` e não renderiza nada.
 */
export function BrilhoDoCursor() {
  const prefersReducedMotion = useReducedMotion()

  const rawX = useMotionValue(-TAMANHO)
  const rawY = useMotionValue(-TAMANHO)
  const rawOpacity = useMotionValue(0)

  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)
  const opacity = useSpring(rawOpacity, SPRING)

  const background = useMotionTemplate`radial-gradient(${MIOLO}px circle at ${x}px ${y}px, rgb(var(--accent-rgb) / calc(${ALFA_MIOLO} * ${opacity})), transparent 70%), radial-gradient(${TAMANHO}px circle at ${x}px ${y}px, rgb(var(--accent-rgb) / calc(${ALFA} * ${opacity})), transparent 70%)`

  useEffect(() => {
    if (prefersReducedMotion) return

    const mover = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      rawX.set(event.clientX)
      rawY.set(event.clientY)
      rawOpacity.set(1)
    }

    /*
     * `pointerleave` no documento cobre o cursor saindo pela borda da janela.
     * Sem isso a luz fica acesa na última posição enquanto o visitante está
     * noutra aba.
     */
    const apagar = () => rawOpacity.set(0)

    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', apagar)

    return () => {
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', apagar)
    }
  }, [prefersReducedMotion, rawOpacity, rawX, rawY])

  if (prefersReducedMotion) return null

  return (
    <m.div
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[15] mix-blend-screen"
    />
  )
}

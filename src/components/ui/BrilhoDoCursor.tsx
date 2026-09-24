import { useEffect } from 'react'
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'

/** Raio do brilho, em px. */
const TAMANHO = 520
/** Opacidade do centro. */
const ALFA = 0.12

const SPRING = { stiffness: 60, damping: 20, mass: 0.6 }

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
 * recalcular nada. Fica em `z-0` e antes de todo o resto na árvore, então
 * qualquer conteúdo posicionado pinta por cima — os painéis com fundo próprio
 * cobrem a luz igual cobriam antes.
 *
 * **Só responde a mouse e caneta.** No toque não existe `pointerleave`, então
 * a luz ficaria acesa e parada onde o dedo encostou pela última vez. O pulso
 * ambiente de cada seção (`animate-driftglow`) continua por seção, de
 * propósito: é ele que alterna de lado e impede a página de parecer o mesmo
 * quadro colado seis vezes.
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

  const background = useMotionTemplate`radial-gradient(${TAMANHO}px circle at ${x}px ${y}px, rgb(var(--accent-rgb) / calc(${ALFA} * ${opacity})), transparent 70%)`

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
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

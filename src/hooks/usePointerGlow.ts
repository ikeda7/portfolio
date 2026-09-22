import { useCallback, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'

interface PointerGlowOptions {
  /** Raio do brilho, em px. */
  readonly size?: number
  /** Opacidade do centro do brilho (0–1). */
  readonly alpha?: number
  /**
   * `true` faz o brilho perseguir o cursor com inércia (bom em áreas grandes
   * como o hero); `false` cola no cursor (bom dentro de um card).
   */
  readonly smooth?: boolean
}

interface PointerGlow<T extends HTMLElement> {
  /** Props a espalhar no elemento que captura o movimento do cursor. */
  readonly bind: {
    readonly ref: RefObject<T | null>
    readonly onPointerMove: (event: ReactPointerEvent<T>) => void
    readonly onPointerLeave: () => void
  }
  /** `background` pronto para um `motion.div`, ou `null` quando desativado. */
  readonly background: MotionValue<string> | null
}

const SPRING = { stiffness: 60, damping: 20, mass: 0.6 }

/**
 * Brilho de acento que acompanha o cursor dentro de um elemento.
 *
 * O brilho vive em uma camada `absolute inset-0` própria, então nunca compete
 * com o hover dos filhos. Retorna `background: null` quando o visitante pede
 * menos movimento — aí o componente simplesmente não renderiza a camada.
 */
export function usePointerGlow<T extends HTMLElement>({
  size = 420,
  alpha = 0.12,
  smooth = true,
}: PointerGlowOptions = {}): PointerGlow<T> {
  const elementRef = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  const rawX = useMotionValue(-size)
  const rawY = useMotionValue(-size)
  const rawOpacity = useMotionValue(0)

  const springX = useSpring(rawX, SPRING)
  const springY = useSpring(rawY, SPRING)
  const springOpacity = useSpring(rawOpacity, SPRING)

  const x = smooth ? springX : rawX
  const y = smooth ? springY : rawY
  const opacity = smooth ? springOpacity : rawOpacity

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgb(var(--accent-rgb) / calc(${alpha} * ${opacity})), transparent 70%)`

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const bounds = elementRef.current?.getBoundingClientRect()
      if (!bounds) return

      rawX.set(event.clientX - bounds.left)
      rawY.set(event.clientY - bounds.top)
      rawOpacity.set(1)
    },
    [rawOpacity, rawX, rawY],
  )

  const onPointerLeave = useCallback(() => {
    rawOpacity.set(0)
  }, [rawOpacity])

  return {
    bind: { ref: elementRef, onPointerMove, onPointerLeave },
    background: prefersReducedMotion ? null : background,
  }
}

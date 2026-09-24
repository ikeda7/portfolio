import { useEffect, useState } from 'react'

/*
 * A linha de referência: 30% da janela abaixo do header. A seção ativa é a
 * última cujo topo já passou dela — é quando a seção "chegou" na tela.
 */
const FRACAO_DA_JANELA = 0.3

/**
 * Devolve o id da seção corrente. Usado pelo header, pela régua lateral e pelo
 * botão de próxima seção.
 *
 * **A regra é posicional, e não por área visível.** Era um
 * `IntersectionObserver` com limiares de 10%, 35% e 60% da área de cada
 * seção, numa faixa de ~45% da janela. Seção alta demais nunca cruzava o
 * primeiro limiar: no celular, Projetos (nove cards em uma coluna, ~3000px)
 * ocupava no máximo ~9% da faixa, nunca virava ativa, e o botão de próxima
 * seção ficava preso na Stack mandando para Projetos em loop (achado do dono,
 * 24/09). Agora a ativa é a última seção cujo topo passou de uma linha fixa,
 * o que funciona para qualquer altura — e também no vão da fita, entre Stack
 * e Projetos, que não é seção: ali a ativa continua sendo a Stack.
 *
 * No fim da página a última seção é a ativa mesmo que o topo dela não chegue
 * à linha (quando ela é mais baixa que a janela).
 *
 * @param sectionIds ids das `<section>` na ordem em que aparecem na página.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    let quadro = 0

    const medir = () => {
      quadro = 0
      const header = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      const linha = header + window.innerHeight * FRACAO_DA_JANELA
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      let ativa: string | null = null
      if (noFim) {
        ativa = elements[elements.length - 1]?.id ?? null
      } else {
        for (const el of elements) {
          if (el.getBoundingClientRect().top <= linha) ativa = el.id
        }
      }
      setActiveId(ativa)
    }

    // Um cálculo por quadro, no máximo: rolagem dispara dezenas de eventos.
    const agendar = () => {
      if (quadro === 0) quadro = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    return () => {
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
      if (quadro !== 0) cancelAnimationFrame(quadro)
    }
  }, [sectionIds])

  return activeId
}

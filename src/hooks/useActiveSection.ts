import { useEffect, useState } from 'react'

/**
 * Observa as seções âncora e devolve o id da que está visível no momento.
 * Usado pelo header para destacar o link corrente na cor de acento.
 *
 * @param sectionIds ids das `<section>` na ordem em que aparecem na página.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (top) setActiveId(top.target.id)
      },
      // Compensa o header sticky de 80px e só considera ativa a seção
      // que ocupa a faixa central do viewport.
      { rootMargin: '-80px 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

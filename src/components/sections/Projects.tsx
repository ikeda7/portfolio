import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { ProjectCard } from '@/components/ui/ProjectCard'
import { RevealItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { projects } from '@/data/projects'
import { VIEWPORT, staggerVariants } from '@/lib/motion'

/**
 * Setlist: grid responsivo de cards, revelados em cadeia.
 *
 * Já teve um aviso no topo — "React: 3 projetos do Setlist usam" — ligado ao
 * foco técnico, que acendia uma tecnologia clicada na Stack ou na fita. Saiu
 * em 24/09: com nove projetos e ~35 termos, a maioria dos cliques respondia
 * "nenhum projeto usa", e isso lia como falta de prática em algo que o
 * currículo mostra ter sido usado no trabalho, fora do GitHub.
 */
export function Projects() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="projetos" index="04" label="Projetos" fill={false}>
      <h2 id="projetos-title" className="sr-only">
        Projetos
      </h2>

      <m.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={VIEWPORT}
        variants={staggerVariants}
      >
        {/*
         * Nove cards: 3x3 a partir de `lg`. Em duas colunas o nono sobraria
         * sozinho na ultima linha, entao ali o primeiro (o TCC) ocupa a linha
         * inteira e a conta fecha em 1 + 4x2. Volta a uma coluna so em `lg`.
         */}
        {projects.map((project, index) => (
          <RevealItem
            key={project.track}
            className={`h-full ${index === 0 && projects.length % 2 === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <ProjectCard {...project} />
          </RevealItem>
        ))}
      </m.div>
    </Section>
  )
}

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { ProjectCard } from '@/components/ui/ProjectCard'
import { RevealItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { projects } from '@/data/projects'
import { VIEWPORT, staggerVariants } from '@/lib/motion'

/** Setlist: grid responsivo de cards, revelados em cadeia. */
export function Projects() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="projetos" index="03" label="Projetos">
      <h2 id="projetos-title" className="sr-only">
        Projetos
      </h2>

      <m.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={VIEWPORT}
        variants={staggerVariants}
      >
        {projects.map((project) => (
          <RevealItem key={project.track} className="h-full">
            <ProjectCard {...project} />
          </RevealItem>
        ))}
      </m.div>
    </Section>
  )
}

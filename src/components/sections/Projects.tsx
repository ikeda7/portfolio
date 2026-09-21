import { motion, useReducedMotion } from 'motion/react'

import { ProjectCard } from '@/components/ui/ProjectCard'
import { RevealItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'
import { VIEWPORT, staggerVariants } from '@/lib/motion'

/** Setlist: grid responsivo de cards, revelados em cadeia. */
export function Projects() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="projetos"
      className="mx-auto w-full max-w-[1200px] px-6 py-20"
      aria-labelledby="projetos-title"
    >
      <SectionHeading index="03" label="Projetos" />
      <h2 id="projetos-title" className="sr-only">
        Projetos
      </h2>

      <motion.div
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5"
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
      </motion.div>
    </section>
  )
}

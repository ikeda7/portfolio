import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

/** Setlist: grid responsivo de cards de projeto. */
export function Projects() {
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.track} {...project} />
        ))}
      </div>
    </section>
  )
}

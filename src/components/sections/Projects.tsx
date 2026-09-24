import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { X } from 'lucide-react'

import { ProjectCard } from '@/components/ui/ProjectCard'
import { RevealItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { projects } from '@/data/projects'
import { useFocoTecnico } from '@/hooks/useFocoTecnico'
import { algumEmFoco } from '@/lib/foco'
import { VIEWPORT, staggerVariants } from '@/lib/motion'

/**
 * Setlist: grid responsivo de cards, revelados em cadeia.
 *
 * Com uma tecnologia em foco (clicada na Stack ou na fita), a seção diz quantos
 * projetos a usam e oferece a saída. Sem esse aviso, quem clicasse num termo
 * sem correspondência veria só os cards recuarem, sem entender por quê — e sem
 * caminho de volta a não ser achar o mesmo botão lá em cima.
 */
export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const { foco, limpar } = useFocoTecnico()

  const combinam = foco === null ? 0 : projects.filter((p) => algumEmFoco(p.tags, foco)).length

  return (
    <Section id="projetos" index="04" label="Projetos" fill={false}>
      <h2 id="projetos-title" className="sr-only">
        Projetos
      </h2>

      <div aria-live="polite" className="mb-4 min-h-9">
        {foco !== null && (
          <div className="border-line bg-panel inline-flex items-center gap-3 rounded-lg border px-3 py-2">
            <span className="text-ink-muted font-mono text-[11px] tracking-[0.06em]">
              <span className="text-accent-text">{foco}</span>
              {combinam === 0
                ? ' — nenhum projeto do Setlist usa'
                : combinam === 1
                  ? ' — 1 projeto do Setlist usa'
                  : ` — ${combinam} projetos do Setlist usam`}
            </span>
            <button
              type="button"
              onClick={limpar}
              className="text-ink-faint hover:text-ink flex min-h-6 min-w-6 items-center justify-center rounded transition-colors duration-300"
              aria-label="Limpar destaque"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        )}
      </div>

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

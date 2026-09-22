import type { SkillPanel } from '@/types/content'

/**
 * Rack de processamento. As tecnologias vêm da seção "Competências
 * técnicas" do currículo.
 *
 * Os canais NÃO carregam nota: auto-avaliação numérica não é verificável e
 * convida a pergunta que ninguém consegue responder ("por que 82 e não 90?").
 * A altura de cada fader é composição visual — uma mesa não zerada — e o que
 * informa é o rótulo.
 */

/** Painel A — mesa de som com faders verticais. */
export const faderPanel: SkillPanel = {
  id: 'ia-dados',
  title: 'IA aplicada & dados',
  code: 'CH 01–05',
  channels: [
    { label: 'Python', value: 82 },
    { label: 'PyTorch', value: 64 },
    { label: 'RAG', value: 91 },
    { label: 'Agentes', value: 55 },
    { label: 'Prompt', value: 73 },
  ],
}

/** Painel B — rack horizontal de engenharia de software. */
export const rackPanel: SkillPanel = {
  id: 'engenharia',
  title: 'Engenharia de software',
  code: 'RACK A',
  channels: [
    { label: 'TypeScript', value: 88 },
    { label: 'React', value: 76 },
    { label: 'Node.js', value: 69 },
    { label: 'PostgreSQL', value: 81 },
    { label: 'C#', value: 58 },
  ],
}

/** Tags auxiliares exibidas abaixo do rack de engenharia. */
export const skillTags: readonly string[] = [
  'NEXT.JS',
  'NESTJS',
  'PRISMA',
  'FLUTTER',
  'DOCKER',
  'ORACLE PL/SQL',
  'ASP.NET MVC',
  'VERCEL',
]

/**
 * Fita de tecnologias exibida entre Habilidades e Projetos.
 * Deriva dos painéis + tags para não duplicar a fonte da verdade.
 */
export const marqueeItems: readonly string[] = [
  ...faderPanel.channels.map((channel) => channel.label),
  ...rackPanel.channels.map((channel) => channel.label),
  ...skillTags,
]

/**
 * Bandeja de patch — o que a pós em Engenharia de Software em IA Aplicada
 * (UniPDS) aprofunda. Curso em andamento.
 *
 * Mesma fonte do segundo parágrafo da seção Sobre: a ementa do curso, não
 * inferência. Estavam soltos no meio de um parágrafo, onde quem escaneia a
 * página nunca ia ler — aqui viram conteúdo escaneável.
 */
export const formacaoPanel = {
  id: 'formacao',
  title: 'Pós · IA aplicada',
  code: 'EM CURSO',
  topics: [
    'LLMs',
    'Embeddings',
    'Vector databases',
    'Sistemas multiagente',
    'MCP',
    'Fine-tuning',
    'Governança',
  ],
} as const

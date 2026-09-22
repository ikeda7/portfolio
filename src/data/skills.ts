import type { SkillPanel } from '@/types/content'

/**
 * Codigo do cabecalho contado a partir dos canais: "CH 01–06".
 *
 * Estava cravado como string e ficou errado no instante em que um canal
 * entrou — dizia 05 com seis na tela. Numero que descreve uma lista sai da
 * lista.
 */
export function codigoDoPainel(painel: SkillPanel): string {
  return painel.code ?? 'CH 01–' + String(painel.channels.length).padStart(2, '0')
}

/**
 * Rack de processamento. As tecnologias vêm da seção "Competências
 * técnicas" do currículo.
 *
 * Os canais NÃO carregam nota: auto-avaliação numérica não é verificável e
 * convida a pergunta que ninguém consegue responder ("por que 82 e não 90?").
 * A altura de cada fader é composição visual — uma mesa não zerada — e o que
 * informa é o rótulo.
 */

/**
 * Painel A — mesa de som com faders verticais.
 *
 * Cobre a linha "IA aplicada" do curriculo inteira: engenharia de prompt, RAG,
 * embeddings, agentes, PyTorch e APIs de LLM. "Embeddings" faltava — estava na
 * competencia e nao na tela. Python fica como a linguagem que sustenta tudo
 * isso; sem ela o painel nomearia tecnicas sem dizer em que sao feitas.
 */
export const faderPanel: SkillPanel = {
  id: 'ia-dados',
  title: 'IA aplicada & dados',
  channels: [
    { label: 'Python', value: 82 },
    { label: 'PyTorch', value: 64 },
    { label: 'RAG', value: 91 },
    { label: 'Embeddings', value: 68 },
    { label: 'Agentes', value: 55 },
    { label: 'Prompt', value: 73 },
  ],
}

/** Painel B — rack horizontal de engenharia de software. */
export const rackPanel: SkillPanel = {
  id: 'engenharia',
  title: 'Engenharia de software',
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

import type { SkillPanel } from '@/types/content'

/**
 * Rack de processamento (seção Habilidades).
 *
 * ATENÇÃO — Regra de Ouro: os NOMES das tecnologias vieram do planejamento do
 * dono do portfólio. Os VALORES numéricos (0–100) ainda são os do protótipo de
 * design e NÃO representam auto-avaliação real: substituir antes do deploy.
 */

/** Painel A — mesa de som com faders verticais. */
export const faderPanel: SkillPanel = {
  id: 'ia-dados',
  title: 'IA & Dados',
  code: 'CH 01–05',
  channels: [
    { label: 'Python', value: 82 },
    { label: 'Pandas', value: 64 },
    { label: 'Jupyter', value: 91 },
    { label: 'Modelos', value: 55 },
    { label: 'Vibecoding', value: 73 },
  ],
}

/** Painel B — rack horizontal de engenharia de software. */
export const rackPanel: SkillPanel = {
  id: 'engenharia',
  title: 'Engenharia de software',
  code: 'RACK A',
  channels: [
    { label: 'React', value: 88 },
    { label: 'TypeScript', value: 76 },
    { label: 'Node.js', value: 69 },
    { label: 'C#', value: 81 },
    { label: 'SQL', value: 58 },
  ],
}

/** Tags auxiliares exibidas abaixo do rack de engenharia. */
export const skillTags: readonly string[] = [
  'FLUTTER',
  'DART',
  'DOCKER',
  'VITE',
  'PHP',
  'JAVA',
  'ANGULAR',
  'ASP.NET',
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

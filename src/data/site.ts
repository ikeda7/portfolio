import type { AboutStat } from '@/types/content'

/**
 * Identidade e copy da pagina.
 * PENDENTE: todo texto marcado com `[INSERIR ...]` aguarda o curriculo atualizado.
 */
export const site = {
  brand: {
    firstName: 'Lucas',
    lastName: 'Ikeda',
  },
  hero: {
    statusLabel: 'Disponível para projetos',
    title: 'Lucas Ikeda',
    subtitle: 'Engenheiro de IA & Desenvolvedor Fullstack',
    description: 'Treinando modelos, extraindo dados e orquestrando soluções.',
    primaryCta: { label: 'Ver projetos', href: '#projetos' },
    secondaryCta: { label: 'Falar comigo', href: '#contato' },
    waveform: {
      meta: 'Waveform · master',
      timecode: '00:00:00 / 00:03:24',
      tags: ['PYTHON', 'REACT', 'IA & DADOS'],
    },
  },
  about: {
    heading: '[INSERIR TÍTULO DA SEÇÃO SOBRE]',
    paragraphs: [
      '[INSERIR PARÁGRAFO 1 — trajetória do desenvolvimento fullstack para IA e dados, a partir do currículo atualizado.]',
      '[INSERIR PARÁGRAFO 2 — momento atual (implementação de IA, suporte, vibecoding) e a especialização em Engenharia de IA Aplicada na UniPDS.]',
    ],
    photo: {
      /** PENDENTE: colocar a foto em src/assets/ e apontar o import aqui. */
      src: null as string | null,
      alt: 'Retrato de Lucas Ikeda',
      placeholderLabel: 'Foto',
    },
  },
  contact: {
    heading: '[INSERIR TÍTULO DA SEÇÃO CONTATO]',
    description: '[INSERIR CHAMADA CURTA PARA CONTATO]',
  },
  footer: {
    left: '© 2026 Lucas Ikeda',
    right: 'Dark Studio · Build 0.1.0',
  },
} as const

export const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Stack', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
] as const

/** PENDENTE: números reais (anos de experiência, projetos entregues, etc.). */
export const aboutStats: readonly AboutStat[] = [
  { value: '--', label: '[INSERIR MÉTRICA 1]' },
  { value: '--', label: '[INSERIR MÉTRICA 2]' },
  { value: '--', label: '[INSERIR MÉTRICA 3]' },
]

/**
 * Alturas (em %) das 48 barras da waveform do hero.
 * Valores fixos vindos do protótipo aprovado (docs/design-reference).
 */
export const waveformHeights: readonly number[] = [
  22, 38, 54, 30, 66, 82, 48, 70, 90, 58, 34, 74, 96, 62, 44, 80, 52, 68, 88, 40, 26, 58, 76, 92,
  64, 36, 50, 84, 70, 46, 32, 60, 86, 54, 28, 72, 94, 42, 56, 78, 38, 66, 48, 90, 60, 34, 44, 24,
]

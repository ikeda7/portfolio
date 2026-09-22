import retrato from '@/assets/lucas-ikeda.webp'
import type { AboutStat } from '@/types/content'

/**
 * Conteúdo da página. Tudo aqui vem do currículo de Lucas Ikeda
 * (Set/2026) ou do perfil github.com/ikeda7 — nada é inferido.
 */
export const site = {
  brand: {
    firstName: 'Lucas',
    lastName: 'Ikeda',
  },
  hero: {
    statusLabel: 'Bauru – SP · Brasil',
    title: 'Lucas Ikeda',
    subtitle: 'Desenvolvedor de Software · Implantação e IA Aplicada',
    description:
      'Sistemas ERP nas duas pontas, back-end e dados — e IA generativa aplicada para automatizar levantamento, documentação e testes.',
    primaryCta: { label: 'Ver projetos', href: '#projetos' },
    secondaryCta: { label: 'Falar comigo', href: '#contato' },
    waveform: {
      meta: 'Waveform · master',
      timecode: '00:00:00 / 00:03:24',
      tags: ['PYTHON', 'TYPESCRIPT', 'IA APLICADA'],
    },
  },
  about: {
    heading: 'Da engenharia de software para a IA aplicada',
    paragraphs: [
      'Sou bacharel em Ciência da Computação pela FCT-UNESP e pós-graduando em Engenharia de Software em IA Aplicada na UniPDS. Trabalho com sistemas ERP nas duas pontas: desenvolvi módulos em PHP, JavaScript e Oracle PL/SQL, e hoje atuo na implantação do ERP de uma operação de medicina diagnóstica — mapeamento de processos, levantamento de requisitos, parametrização, QA e sustentação.',
      'Em back-end e dados uso Python, TypeScript, C#, PostgreSQL e Docker. Aplico IA generativa — engenharia de prompt, RAG e agentes — para automatizar levantamento, documentação e testes, e é nisso que a pós se aprofunda: LLMs, embeddings e vector databases, sistemas multiagente, MCP, fine-tuning e governança.',
    ],
    photo: {
      src: retrato as string,
      alt: 'Lucas Ikeda',
      placeholderLabel: 'Foto',
    },
  },
  contact: {
    heading: 'Vamos conversar',
    description:
      'Estou em Bauru – SP. Para falar sobre um projeto, uma vaga ou qualquer coisa que envolva software e IA, é só chamar por e-mail ou LinkedIn.',
  },
  footer: {
    left: '© 2026 Lucas Ikeda',
    right: 'Bauru – SP · Brasil',
  },
} as const

export const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Stack', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
] as const

/**
 * Números verificáveis — currículo e perfil público do GitHub, conferidos em
 * 21/09/2026. Os 35 repositórios incluem trabalhos de disciplina, então o
 * número diz volume, não curadoria; os projetos escolhidos estão no Setlist.
 */
export const aboutStats: readonly AboutStat[] = [
  { value: '2026', label: 'Ciência da Computação' },
  { value: '35', label: 'Repositórios públicos' },
  { value: 'B2', label: 'Inglês · Linguaskill' },
]

/**
 * Alturas (em %) das 48 barras da waveform do hero.
 * Valores fixos vindos do protótipo aprovado (docs/design-reference).
 */
export const waveformHeights: readonly number[] = [
  22, 38, 54, 30, 66, 82, 48, 70, 90, 58, 34, 74, 96, 62, 44, 80, 52, 68, 88, 40, 26, 58, 76, 92,
  64, 36, 50, 84, 70, 46, 32, 60, 86, 54, 28, 72, 94, 42, 56, 78, 38, 66, 48, 90, 60, 34, 44, 24,
]

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
    title: 'Lucas Ikeda',
    /*
     * As três trilhas, na ordem dos canais da waveform logo abaixo. Era
     * "Desenvolvedor de Software · Implantação e IA Aplicada": implantação
     * é o cargo atual e continua na Experiência, mas não é o foco do
     * portfólio (decisão do Lucas, 24/09).
     */
    subtitle: 'Full Stack · Data Science · IA Aplicada',
    description:
      'Do front-end ao banco de dados, com IA generativa aplicada para automatizar levantamento, documentação e testes.',
    primaryCta: { label: 'Ver projetos', href: '#projetos' },
    secondaryCta: { label: 'Falar comigo', href: '#contato' },
    waveform: {
      meta: 'Waveform · master',
      // Era '00:00:00 / 00:03:24' — a única coisa na tela sem fonte, num site
      // cuja regra é não inventar nada. As 48 bandas existem de verdade em
      // `waveformHeights`, logo abaixo, e são desenhadas em CSS puro.
      timecode: '48 bandas · CSS',
      /**
       * As três trilhas de atuação, nas palavras do Lucas (23/09). Cada uma
       * é um **botão de verdade**: redesenha a waveform e troca a cor do neon
       * da página inteira. O primeiro é o padrão.
       *
       * Eram PYTHON / TYPESCRIPT / IA APLICADA — linguagem, linguagem e área
       * misturadas no mesmo seletor.
       */
      canais: [
        { label: 'DESENVOLVIMENTO FULL STACK', tom: 'azul' },
        { label: 'DATA SCIENCE', tom: 'roxo' },
        { label: 'IA APLICADA', tom: 'vermelho' },
      ],
    },
  },
  about: {
    heading: 'Da engenharia de software para a IA aplicada',
    paragraphs: [
      'Sou bacharel em Ciência da Computação pela FCT-UNESP e pós-graduando em Engenharia de Software em IA Aplicada na UniPDS. Trabalho com sistemas ERP nas duas pontas: desenvolvi módulos em PHP, JavaScript e Oracle PL/SQL, e hoje atuo na implantação do ERP de uma operação de medicina diagnóstica — mapeamento de processos, levantamento de requisitos, parametrização, QA e sustentação.',
      'Em back-end e dados uso Python, TypeScript, C#, PostgreSQL e Docker. Aplico IA generativa — engenharia de prompt, RAG e agentes — para automatizar levantamento, documentação e testes — que é exatamente onde a pós se aprofunda.',
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
  /*
   * A cidade aparece só no Contato. Estava também no hero e no rodapé, e
   * saiu dos dois em 24/09: dado pessoal repetido numa página aberta. No
   * Contato ela fica porque é onde recrutador procura.
   */
  footer: {
    left: '© 2026 Lucas Ikeda',
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
 * A página em ordem, incluindo o hero — que não está em `navLinks` porque não
 * é destino de menu, mas é destino de navegação.
 *
 * Fonte única da régua lateral e do botão de próxima seção. Sem isso, as duas
 * teriam a ordem das seções duplicada e sairiam de sincronia na primeira vez
 * que alguém mexesse em uma delas.
 */
export const destinos = [{ label: 'Topo', href: '#top' }, ...navLinks] as const

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

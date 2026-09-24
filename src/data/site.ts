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
      // O canto direito do painel mostra em que trilha se está ("01 / 03"),
      // calculado pelo Waveform. Já foi '00:00:00 / 00:03:24' (sem fonte) e
      // depois '48 bandas · CSS', que era verdade e não dizia nada a quem lê.
      meta: 'Waveform · trilha',
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
    /*
     * Reescrito em 24/09 a pedido do Lucas: menos engessado, e mostrando como
     * os hobbies se ligam ao perfil profissional. As ligações são as que
     * existem no próprio portfólio — o TCC é IA que gera música, o Sports
     * Control organiza rachão de vôlei, o Inhouse LoL organiza partidas de LoL
     * — e nada além do que ele contou (música, igreja e missões, home studio,
     * vôlei, futsal e basquete, LoL/CS/Valorant, lives na Twitch).
     *
     * O primeiro parágrafo não lista mais as tarefas da implantação: não é o
     * foco do portfólio, e elas estão na Experiência.
     */
    paragraphs: [
      'Sou bacharel em Ciência da Computação pela FCT-UNESP e pós-graduando em Engenharia de Software em IA Aplicada na UniPDS. Já passei pelas duas pontas de um ERP: desenvolvi módulos em PHP, JavaScript e Oracle PL/SQL, e hoje atuo na implantação de um, numa operação de medicina diagnóstica.',
      'No dia a dia uso Python, TypeScript, C#, PostgreSQL e Docker, e aplico IA generativa — engenharia de prompt, RAG e agentes — para automatizar levantamento, documentação e testes. É justamente o que a pós aprofunda.',
      'A música veio antes do código, e os dois acabaram se encontrando. Sou multi-instrumentista, toco na igreja e sirvo em missões por ela, o que já me levou a várias cidades. Em meu home studio estudo produção musical e teoria — e foi desse cruzamento que nasceram o meu TCC, uma IA que compõe música, e a estética deste site.',
      'O esporte e os games também viraram projeto. Sempre gostei de futsal e basquete, mas hoje o vôlei é o que mais jogo, e o Sports Control nasceu para organizar os nossos rachões. Nos games sou dos competitivos — League of Legends, CS e Valorant, com passagem por lives na Twitch —, e o Inhouse LoL veio daí.',
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
 * Os três números do Sobre — todos do GitHub, e nenhum repetido em outra
 * seção. Eram "2026 · Ciência da Computação" e "B2 · Inglês", que a Formação e
 * os Idiomas já mostram (leitura do dono, 24/09).
 *
 * Conferidos em 24/09/2026: 35 repositórios públicos e conta criada em
 * junho de 2021 (API do GitHub, perfil ikeda7), e 583 commits públicos (busca
 * de commits `author:ikeda7`, que conta a branch principal de cada repo).
 * Repositórios e commits envelhecem: ver a ideia de gerar no build em
 * docs/PENDENCIAS.md. Os anos no GitHub já são calculados.
 */
const CONTA_GITHUB_CRIADA = Date.UTC(2021, 5, 11) // 11/06/2021, API do GitHub
const ANOS_NO_GITHUB = Math.floor((Date.now() - CONTA_GITHUB_CRIADA) / (365.25 * 24 * 3600 * 1000))

export const aboutStats: readonly AboutStat[] = [
  { value: '35', label: 'Repositórios públicos' },
  { value: '583', label: 'Commits públicos' },
  // Calculado na hora, a partir da data de criação da conta: não envelhece.
  { value: `${ANOS_NO_GITHUB} anos`, label: 'No GitHub' },
]

/**
 * Alturas (em %) das 48 barras da waveform do hero.
 * Valores fixos vindos do protótipo aprovado (docs/design-reference).
 */
export const waveformHeights: readonly number[] = [
  22, 38, 54, 30, 66, 82, 48, 70, 90, 58, 34, 74, 96, 62, 44, 80, 52, 68, 88, 40, 26, 58, 76, 92,
  64, 36, 50, 84, 70, 46, 32, 60, 86, 54, 28, 72, 94, 42, 56, 78, 38, 66, 48, 90, 60, 34, 44, 24,
]

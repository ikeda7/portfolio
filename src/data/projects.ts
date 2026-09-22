import type { Project } from '@/types/content'

/**
 * Setlist. Seis projetos do currículo e do github.com/ikeda7, na ordem que
 * conta a história: IA generativa primeiro, depois a engenharia que a sustenta.
 *
 * Toda capa é o **espectro real de linguagens** do repositório, medido pela API
 * do GitHub em 21/09/2026. Para conferir ou atualizar qualquer um:
 *
 *     gh api repos/ikeda7/<repo>/languages
 *
 * Mostramos as quatro primeiras — as caudas abaixo de 0,1% viram traço
 * invisível e só poluem o rótulo. Por isso a soma na tela nem sempre fecha 100.
 *
 * Os tipos `shot` (print do site) e `terminal` (comandos do README) continuam
 * disponíveis em `@/types/content` e já têm componente pronto: voltar um card
 * para print é trocar a linha `cover`.
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'Geração de Música com IA',
    description:
      'TCC: Transformer em PyTorch treinado sobre MAESTRO, POP909 e Groove MIDI. Gera MIDI multi-instrumental com filtragem por teoria musical.',
    tags: ['PYTORCH', 'PYTHON', 'TRANSFORMER'],
    href: 'https://github.com/ikeda7/music-ai-generator',
    // TeX e BibTeX sao a monografia, que vive no mesmo repositorio do modelo.
    cover: {
      kind: 'spectrum',
      repo: '~/music-ai-generator',
      languages: [
        { label: 'Python', share: 67.6 },
        { label: 'TeX', share: 24.5 },
        { label: 'BibTeX', share: 7.7 },
      ],
    },
  },
  {
    track: '02',
    title: 'LexTrack',
    description:
      'Gestão para escritório de advocacia previdenciário: controle de prazos, casos e prestação de contas. Em produção.',
    tags: ['REACT', 'NODE.JS', 'POSTGRESQL'],
    href: null,
    cover: {
      kind: 'spectrum',
      repo: '~/lextrack',
      languages: [
        { label: 'TypeScript', share: 89.2 },
        { label: 'JavaScript', share: 5.4 },
        { label: 'SCSS', share: 4.5 },
        { label: 'Shell', share: 0.6 },
      ],
    },
  },
  {
    track: '03',
    title: 'Inhouse LoL',
    description:
      'Gerenciador de partidas 5x5 com sorteio por funções, Fearless Draft em MD3 e importação automática de partidas pela Riot API.',
    tags: ['REACT', 'TYPESCRIPT', 'PRISMA'],
    href: 'https://inhouse-lol.vercel.app',
    cover: {
      kind: 'spectrum',
      repo: '~/inhouse-lol',
      languages: [
        { label: 'TypeScript', share: 84.9 },
        { label: 'JavaScript', share: 14.3 },
        { label: 'CSS', share: 0.5 },
        { label: 'HTML', share: 0.1 },
      ],
    },
  },
  {
    track: '04',
    title: 'Sports Control',
    description:
      'Gestão de rachão de vôlei: cadastro, check-in, sorteio equilibrado de times e placar ao vivo. Roda em Windows, Android e web.',
    tags: ['FLUTTER', 'DART', 'DRIFT'],
    href: 'https://sportscontrol.vercel.app',
    cover: {
      kind: 'spectrum',
      repo: '~/sports-control',
      languages: [
        { label: 'Dart', share: 87.0 },
        { label: 'C++', share: 7.2 },
        { label: 'CMake', share: 3.9 },
        { label: 'Shell', share: 1.0 },
      ],
    },
  },
  {
    track: '05',
    title: 'X9 — Jogo do Impostor',
    description:
      'Party game de dedução social para jogar com amigos em um único celular, passando o aparelho de mão em mão.',
    tags: ['REACT', 'VITE', 'TYPESCRIPT'],
    href: 'https://x9.dev.br',
    cover: {
      kind: 'spectrum',
      repo: '~/x9-game',
      languages: [
        { label: 'TypeScript', share: 61.3 },
        { label: 'CSS', share: 14.7 },
        { label: 'JavaScript', share: 13.4 },
        { label: 'HTML', share: 10.7 },
      ],
    },
  },
  {
    track: '06',
    title: 'Consolidação de PDFs',
    description:
      'Monta um PDF único a partir de uma planilha e de certificados emitidos em lote, preservando os selos de assinatura digital (gov.br/ICP-Brasil).',
    tags: ['NODE.JS', 'JAVASCRIPT', 'AUTOMAÇÃO'],
    href: 'https://github.com/ikeda7/merge-pdf',
    // Node puro, sem dependencia: uma barra so, e isso e o recado.
    cover: {
      kind: 'spectrum',
      repo: '~/merge-pdf',
      languages: [{ label: 'JavaScript', share: 100.0 }],
    },
  },
]

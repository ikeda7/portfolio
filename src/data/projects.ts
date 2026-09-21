import capaInhouse from '@/assets/capa-inhouse-lol.webp'
import capaX9 from '@/assets/capa-x9.webp'
import type { Project } from '@/types/content'

/**
 * Setlist. Seis projetos escolhidos do currículo e do github.com/ikeda7,
 * na ordem que conta a história: IA generativa primeiro, depois a
 * engenharia que a sustenta.
 *
 * `href` aponta para o que existe de mais útil — o site no ar quando há um,
 * senão o repositório. LexTrack é trabalho de cliente em produção, sem
 * repositório público.
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'Geração de Música com IA',
    description:
      'TCC: Transformer em PyTorch treinado sobre MAESTRO, POP909 e Groove MIDI. Gera MIDI multi-instrumental com filtragem por teoria musical.',
    tags: ['PYTORCH', 'PYTHON', 'TRANSFORMER'],
    href: 'https://github.com/ikeda7/music-ai-generator',
    cover: null,
  },
  {
    track: '02',
    title: 'LexTrack',
    description:
      'Gestão para escritório de advocacia previdenciário: controle de prazos, casos e prestação de contas. Em produção.',
    tags: ['REACT', 'NODE.JS', 'POSTGRESQL'],
    href: null,
    cover: null,
  },
  {
    track: '03',
    title: 'Inhouse LoL',
    description:
      'Gerenciador de partidas 5x5 com sorteio por funções, Fearless Draft em MD3 e importação automática de partidas pela Riot API.',
    tags: ['REACT', 'TYPESCRIPT', 'PRISMA'],
    href: 'https://inhouse-lol.vercel.app',
    cover: capaInhouse,
  },
  {
    track: '04',
    title: 'Sports Control',
    description:
      'Gestão de rachão de vôlei: cadastro, check-in, sorteio equilibrado de times e placar ao vivo. Roda em Windows, Android e web.',
    tags: ['FLUTTER', 'DART', 'DRIFT'],
    href: 'https://sportscontrol.vercel.app',
    cover: null,
  },
  {
    track: '05',
    title: 'X9 — Jogo do Impostor',
    description:
      'Party game de dedução social para jogar com amigos em um único celular, passando o aparelho de mão em mão.',
    tags: ['REACT', 'VITE', 'TYPESCRIPT'],
    href: 'https://x9.dev.br',
    cover: capaX9,
  },
  {
    track: '06',
    title: 'Consolidação de PDFs',
    description:
      'Monta um PDF único a partir de uma planilha e de certificados emitidos em lote, preservando os selos de assinatura digital (gov.br/ICP-Brasil).',
    tags: ['NODE.JS', 'JAVASCRIPT', 'AUTOMAÇÃO'],
    href: 'https://github.com/ikeda7/merge-pdf',
    cover: null,
  },
]

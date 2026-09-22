import capaInhouse from '@/assets/capa-inhouse-lol.webp'
import capaX9 from '@/assets/capa-x9.webp'
import type { Project } from '@/types/content'

/**
 * Setlist. Seis projetos do currículo e do github.com/ikeda7, na ordem que
 * conta a história: IA generativa primeiro, depois a engenharia que a sustenta.
 *
 * As capas de terminal usam comandos **copiados dos READMEs dos próprios
 * repositórios** — nenhuma saída foi inventada. Para um projeto de linha de
 * comando o terminal é a interface, então mostrar isso é mais honesto (e mais
 * informativo) do que uma ilustração.
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'Geração de Música com IA',
    description:
      'TCC: Transformer em PyTorch treinado sobre MAESTRO, POP909 e Groove MIDI. Gera MIDI multi-instrumental com filtragem por teoria musical.',
    tags: ['PYTORCH', 'PYTHON', 'TRANSFORMER'],
    href: 'https://github.com/ikeda7/music-ai-generator',
    cover: {
      kind: 'terminal',
      lines: [
        { kind: 'path', text: '~/music-ai-generator/TCC' },
        { kind: 'comment', text: 'Gerar música no modo canônico' },
        { kind: 'command', text: 'python generate.py \\' },
        { kind: 'flag', text: '--checkpoint checkpoint_epoch_74.pt \\' },
        { kind: 'flag', text: '--key C --tempo 100 --top_k 40 \\' },
        { kind: 'flag', text: '--render_as_trio --solid_base' },
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
    cover: { kind: 'sleeve' },
  },
  {
    track: '03',
    title: 'Inhouse LoL',
    description:
      'Gerenciador de partidas 5x5 com sorteio por funções, Fearless Draft em MD3 e importação automática de partidas pela Riot API.',
    tags: ['REACT', 'TYPESCRIPT', 'PRISMA'],
    href: 'https://inhouse-lol.vercel.app',
    cover: { kind: 'shot', src: capaInhouse },
  },
  {
    track: '04',
    title: 'Sports Control',
    description:
      'Gestão de rachão de vôlei: cadastro, check-in, sorteio equilibrado de times e placar ao vivo. Roda em Windows, Android e web.',
    tags: ['FLUTTER', 'DART', 'DRIFT'],
    href: 'https://sportscontrol.vercel.app',
    // Percentuais reais de github.com/ikeda7/sports-control, pela API de
    // linguagens, medidos em 21/09/2026. Para atualizar:
    // gh api repos/ikeda7/sports-control/languages
    cover: {
      kind: 'spectrum',
      repo: '~/sports-control',
      languages: [
        { label: 'Dart', share: 87.0 },
        { label: 'C++', share: 7.2 },
        { label: 'CMake', share: 3.9 },
        { label: 'Shell', share: 1.0 },
        { label: 'HTML', share: 0.6 },
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
    cover: { kind: 'shot', src: capaX9 },
  },
  {
    track: '06',
    title: 'Consolidação de PDFs',
    description:
      'Monta um PDF único a partir de uma planilha e de certificados emitidos em lote, preservando os selos de assinatura digital (gov.br/ICP-Brasil).',
    tags: ['NODE.JS', 'JAVASCRIPT', 'AUTOMAÇÃO'],
    href: 'https://github.com/ikeda7/merge-pdf',
    cover: {
      kind: 'terminal',
      lines: [
        { kind: 'path', text: '~/merge-pdf' },
        { kind: 'command', text: 'node build.js' },
        { kind: 'comment', text: 'corta ~metade do peso, sem tocar no original' },
        { kind: 'command', text: 'node scripts/comprimir.js 82 200' },
        { kind: 'comment', text: 'lista os documentos assinados digitalmente' },
        { kind: 'command', text: 'node scripts/assinaturas.js' },
      ],
    },
  },
]

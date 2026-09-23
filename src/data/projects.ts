import type { Project } from '@/types/content'

/**
 * Setlist. Seis projetos do currículo e do github.com/ikeda7, na ordem que
 * conta a história: IA generativa primeiro, depois a engenharia que a sustenta.
 *
 * **Os seis têm a mesma capa: o selo de vinil.** Muda só o que já é diferente
 * entre eles — número da faixa, nome e estado.
 *
 * As capas já foram quatro tratamentos diferentes, cada projeto com o que tinha
 * para mostrar: print do site, terminal com os comandos do README, espectro de
 * linguagens, placa cega. Era defensável um a um e ficou ruim junto — seis
 * cards lado a lado com seis linguagens visuais leem como falta de padrão, não
 * como cuidado.
 *
 * E "print em todos" não era opção: três destes seis **não têm tela nenhuma**.
 * O TCC é linha de comando, o LexTrack é trabalho de cliente sem site público e
 * o Flowers2 abre numa página pessoal que o dono pediu para não fotografar. Com
 * três impossíveis, qualquer mistura vira exceção — e exceção era o problema.
 *
 * `estado` e `repo` são os únicos campos que a capa mostra além do número, e
 * os dois são **fato verificável**. Visibilidade dos repositórios conferida em 23/09/2026:
 *
 *     gh api repos/ikeda7/<repo> --jq .visibility
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'Geração de Música com IA',
    description:
      'TCC: Transformer em PyTorch treinado sobre MAESTRO, POP909 e Groove MIDI. Gera MIDI multi-instrumental com filtragem por teoria musical.',
    tags: ['PYTORCH', 'PYTHON', 'TRANSFORMER'],
    href: 'https://github.com/ikeda7/music-ai-generator',
    estado: 'TCC',
    repo: 'Repositório público',
  },
  {
    track: '02',
    title: 'LexTrack',
    description:
      'Gestão para escritório de advocacia previdenciário: controle de prazos, casos e prestação de contas. Em produção.',
    tags: ['REACT', 'NODE.JS', 'POSTGRESQL'],
    // Trabalho de cliente: nao ha site publico nem repositorio aberto.
    href: null,
    estado: 'Em produção',
    repo: 'Código fechado',
  },
  {
    track: '03',
    title: 'Inhouse LoL',
    description:
      'Gerenciador de partidas 5x5 com sorteio por funções, Fearless Draft em MD3 e importação automática de partidas pela Riot API.',
    tags: ['REACT', 'TYPESCRIPT', 'PRISMA'],
    href: 'https://inhouse-lol.vercel.app',
    estado: 'Site no ar',
    repo: 'Repositório público',
  },
  {
    track: '04',
    title: 'Sports Control',
    description:
      'Gestão de rachão de vôlei: cadastro, check-in, sorteio equilibrado de times e placar ao vivo. Roda em Windows, Android e web.',
    tags: ['FLUTTER', 'DART', 'DRIFT'],
    href: 'https://sportscontrol.vercel.app',
    estado: 'Site no ar',
    repo: 'Repositório público',
  },
  {
    track: '05',
    title: 'X9 — Jogo do Impostor',
    description:
      'Party game de dedução social para jogar com amigos em um único celular, passando o aparelho de mão em mão.',
    tags: ['REACT', 'VITE', 'TYPESCRIPT'],
    href: 'https://x9.dev.br',
    estado: 'Site no ar',
    repo: 'Repositório público',
  },
  {
    track: '06',
    title: 'Flowers2',
    description:
      'Buquê de flores em 3D voxel montado por código: o arranjo é resolvido por simulação de encaixe, não posicionado a mão.',
    tags: ['THREE.JS', 'TYPESCRIPT', '3D VOXEL'],
    /*
     * O deploy publico abre em "Flores para Rebeca ♥" — e um presente pessoal.
     * O dono do portfolio foi avisado do destino e decidiu publicar assim mesmo
     * em 22/09/2026, e pediu para o card nao levar print.
     */
    href: 'https://flowers2.dev',
    estado: 'Site no ar',
    repo: 'Repositório privado',
  },
]

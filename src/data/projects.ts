import capaInhouse from '@/assets/capa-inhouse-lol.webp'
import capaX9 from '@/assets/capa-x9.webp'
import type { Project } from '@/types/content'

/**
 * Setlist. Seis projetos do currículo e do github.com/ikeda7, na ordem que
 * conta a história: IA generativa primeiro, depois a engenharia que a sustenta.
 *
 * **Cada capa mostra o que aquele projeto tem para mostrar.** Durante um tempo
 * as seis foram o espectro de linguagens do repositório. O espectro é dado
 * real — sai de `gh api repos/ikeda7/<repo>/languages` —, mas usado nos seis
 * ele dizia duas vezes a mesma coisa: quatro cards abriam com uma barra de
 * "TypeScript ~85%" e, três linhas abaixo, uma tag escrita TYPESCRIPT. Seis
 * gráficos quase idênticos também deixavam o Setlist inteiro com a mesma cara.
 *
 * O critério agora é o que o projeto oferece, nesta ordem:
 *
 * 1. tem interface pública → `shot`, print do site no ar;
 * 2. é linha de comando → `terminal`, comandos copiados do README do repo;
 * 3. a composição do repo conta algo que as tags não contam → `spectrum`;
 * 4. não tem nenhum dos três → `sleeve`, placa cega com o estado real.
 *
 * Nada aqui é ilustração: print é print, comando é comando e o que não tem
 * fonte fica como placa em vez de virar gráfico bonito.
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'Geração de Música com IA',
    description:
      'TCC: Transformer em PyTorch treinado sobre MAESTRO, POP909 e Groove MIDI. Gera MIDI multi-instrumental com filtragem por teoria musical.',
    tags: ['PYTORCH', 'PYTHON', 'TRANSFORMER'],
    href: 'https://github.com/ikeda7/music-ai-generator',
    /*
     * O unico espectro que sobreviveu, e por um motivo: o quarto do
     * repositorio em TeX e BibTeX **e a monografia**. Isso e informacao que
     * nenhuma tag do card carrega — o card diz "TCC" em texto, a barra mostra
     * que o trabalho escrito esta versionado junto do modelo.
     *
     * Medido em 21/09/2026: gh api repos/ikeda7/music-ai-generator/languages
     */
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
    /*
     * Trabalho de cliente: nao ha site publico para fotografar nem repositorio
     * aberto para ler. O espectro daqui existia, mas era um numero que o
     * visitante nao tem como conferir em lugar nenhum — placa cega e mais
     * honesto do que grafico sem fonte publica.
     */
    /*
     * "codigo fechado" e nao "sem repositorio publico": a segunda versao
     * tinha 38 caracteres e quebrava a etiqueta em duas linhas, deixando
     * "PUBLICO" sozinho embaixo. Em mono com tracking, a placa comporta
     * ~36 caracteres em uma linha.
     */
    cover: { kind: 'sleeve', status: 'Em produção · código fechado' },
  },
  {
    track: '03',
    title: 'Inhouse LoL',
    description:
      'Gerenciador de partidas 5x5 com sorteio por funções, Fearless Draft em MD3 e importação automática de partidas pela Riot API.',
    tags: ['REACT', 'TYPESCRIPT', 'PRISMA'],
    href: 'https://inhouse-lol.vercel.app',
    // Print da classificacao geral, que e a tela que o projeto existe para ter.
    cover: { kind: 'shot', src: capaInhouse },
  },
  {
    track: '04',
    title: 'Sports Control',
    description:
      'Gestão de rachão de vôlei: cadastro, check-in, sorteio equilibrado de times e placar ao vivo. Roda em Windows, Android e web.',
    tags: ['FLUTTER', 'DART', 'DRIFT'],
    href: 'https://sportscontrol.vercel.app',
    /*
     * Comandos e comentarios copiados da secao "Desenvolvimento" do README de
     * ikeda7/sports-control, sem uma palavra alterada. Os dois alvos de `flutter
     * run` sao a prova do "roda em Windows, Android e web" da descricao — as
     * tags dizem FLUTTER, o terminal mostra para onde ele compila.
     */
    cover: {
      kind: 'terminal',
      lines: [
        { kind: 'comment', text: 'Windows' },
        { kind: 'command', text: 'flutter run -d windows' },
        { kind: 'comment', text: 'Android' },
        { kind: 'command', text: 'flutter run -d android' },
        { kind: 'comment', text: 'Gerar código do Drift após alterar o schema' },
        { kind: 'command', text: 'dart run build_runner build' },
        { kind: 'flag', text: '--delete-conflicting-outputs' },
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
    // Print da tela de entrada: e um jogo, e a capa dele e a capa dele.
    cover: { kind: 'shot', src: capaX9 },
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
     * em 22/09/2026, e pediu para o card nao levar print. O repositorio segue
     * privado e o README dele so tem os comandos de template do Vite, entao
     * nao ha comando proprio para mostrar: sobra a placa.
     */
    href: 'https://flowers2.dev',
    cover: { kind: 'sleeve', status: 'Site no ar · repositório privado' },
  },
]

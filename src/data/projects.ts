import type { Project } from '@/types/content'

/**
 * Setlist de projetos.
 *
 * Regra de Ouro: os TÍTULOS vieram do planejamento do dono do portfólio.
 * Descrições, tags e links estão como placeholder visível até serem mapeados
 * do GitHub (github.com/ikeda7) e do currículo atualizado.
 */
export const projects: readonly Project[] = [
  {
    track: '01',
    title: 'IA de Geração Musical (TCC)',
    description: '[INSERIR DESCRIÇÃO — treinamento de modelos generativos de áudio em RTX local]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
  {
    track: '02',
    title: 'Análise Exploratória de Dados',
    description: '[INSERIR DESCRIÇÃO — scripts Python/Jupyter de tratamento e visualização]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
  {
    track: '03',
    title: 'LexTrack',
    description: '[INSERIR DESCRIÇÃO — plataforma cloud de gestão jurídica]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
  {
    track: '04',
    title: 'VolleyControl',
    description: '[INSERIR DESCRIÇÃO — app mobile/web em Flutter]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
  {
    track: '05',
    title: 'x9-game',
    description: '[INSERIR DESCRIÇÃO — multiplayer local single-device]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
  {
    track: '06',
    title: 'Flowers Two',
    description: '[INSERIR DESCRIÇÃO — experimento criativo 3D interativo / 8-bit]',
    tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'],
    href: null,
    cover: null,
  },
]

import type { TimelineEntry } from '@/types/content'

/**
 * Linha do tempo profissional e formação.
 *
 * Transcrito do currículo (versão pt-BR, Set/2026). Cargo, empresa e período
 * são o tipo de dado que a Regra de Ouro proíbe inferir: não existem no GitHub
 * e não dá para deduzir do código. Nada aqui foi reescrito além de encurtar
 * frases — o conteúdo é o do currículo.
 */
export const experience: readonly TimelineEntry[] = [
  {
    period: 'Ago/2026 — Atual',
    title: 'Analista Administrativo · Implantação de ERP',
    org: '3S Gestão em Saúde',
    context: 'Alocado na CDA Medicina Diagnóstica — Bauru, SP',
    current: true,
    bullets: [
      'Implantação do novo ERP da operação: mapeamento dos fluxos de trabalho de cada setor, levantamento de requisitos junto às áreas de negócio e parametrização dos módulos.',
      'QA e homologação dos módulos antes do go-live, registrando não conformidades e validando correções junto ao fornecedor.',
      'Sustentação da operação: atendimento de chamados, suporte remoto (AnyDesk), treinamento de key-users e documentação de procedimentos.',
      'Automação de rotinas e prototipagem de ajustes com IA generativa, reduzindo o tempo de levantamento e de documentação.',
    ],
  },
  {
    period: 'Nov/2024 — Abr/2025',
    title: 'Estagiário em Desenvolvimento',
    org: 'BMC Active I.T / Engetex',
    bullets: [
      'Desenvolvimento fullstack de módulos para sistema ERP em PHP e JavaScript, com interfaces responsivas em HTML5, CSS3, Bootstrap e jQuery.',
      'Manutenção e otimização de banco Oracle PL/SQL, com foco em performance de queries (DBeaver).',
    ],
  },
]

/**
 * Formação.
 *
 * Sem a ementa da pós de propósito: ela já é o painel "Pós · IA aplicada" da
 * seção Stack, em formato escaneável. Aqui fica a credencial — o quê, onde e
 * quando. Repetir os dois lugares só alongaria o painel.
 *
 * A UNESP aparece pelo nome por extenso, e não só pela sigla do campus, porque
 * universidade pública estadual é informação que pesa para quem lê.
 */
export const education: readonly TimelineEntry[] = [
  {
    period: 'Set/2026 — Atual',
    title: 'Pós em Engenharia de Software em IA Aplicada',
    org: 'UniPDS',
    current: true,
  },
  {
    period: 'Concluído em Ago/2026',
    title: 'Bacharelado em Ciência da Computação',
    org: 'UNESP — Universidade Estadual Paulista',
    context: 'FCT · Presidente Prudente, SP',
  },
]

/** Idiomas, do bloco final do currículo. */
export const languages: readonly { readonly nome: string; readonly nivel: string }[] = [
  { nome: 'Português', nivel: 'Nativo' },
  { nome: 'Inglês', nivel: 'B2 · Linguaskill' },
  { nome: 'Espanhol', nivel: 'Básico' },
]

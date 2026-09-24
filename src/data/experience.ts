import type { TimelineEntry } from '@/types/content'

/**
 * Linha do tempo profissional e formação.
 *
 * Transcrito do currículo (versão pt-BR, Set/2026), com uma exceção anotada
 * na própria entrada: o CACiC não está no currículo nem no LinkedIn e veio do
 * dono, por voz. Cargo, organização e período são o tipo de dado que a Regra
 * de Ouro proíbe inferir — não existem no GitHub e não dá para deduzir do
 * código —, então cada um deles tem que ter vindo de algum lugar.
 *
 * A ordem é por início, do mais recente para o mais antigo. EJCOMP e CACiC
 * são atuação acadêmica e entram na mesma linha do tempo em vez de num bloco
 * separado: têm cargo, período e responsabilidade, e leem como experiência
 * porque são experiência.
 */
export const experience: readonly TimelineEntry[] = [
  {
    period: 'Ago/2026 — Atual',
    title: 'Analista Administrativo · Implantação de ERP',
    org: '3S Gestão em Saúde',
    // Sem a cidade: desde 24/09 ela aparece so no Contato.
    context: 'Alocado na CDA Medicina Diagnóstica',
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
 * Atuação acadêmica — separada da profissional a pedido do Lucas (24/09).
 *
 * Estavam as quatro na mesma linha do tempo, e duas delas (empresa júnior e
 * centro acadêmico) disputavam atenção com o cargo e o estágio. Aqui ficam só
 * cargo, entidade e período: nenhuma das duas é da área de tecnologia, e a
 * descrição que o CACiC tinha não acrescentava ao que o portfólio mostra.
 *
 * O que já estava registrado sobre cada uma continua valendo: a EJCOMP nunca
 * teve bullets (a extração do PDF perde o começo de cada um e reconstruir
 * seria inventar), e o CACiC é a única entrada ditada pelo dono em vez de
 * sair do currículo.
 */
export const academica: readonly TimelineEntry[] = [
  {
    period: 'Nov/2024 — Ago/2026',
    title: 'Gerente de Recursos Humanos',
    org: 'EJCOMP — Empresa Júnior de Computação',
    context: 'FCT-UNESP · Presidente Prudente, SP',
  },
  {
    period: 'Abr/2024 — Abr/2025',
    title: 'Diretor de Marketing',
    org: 'CACiC — Centro Acadêmico de Ciência da Computação',
    context: 'FCT-UNESP · Presidente Prudente, SP',
  },
]

/**
 * Formação.
 *
 * **A ementa da pós vive aqui agora.** Ela era o painel "Pós · IA aplicada" da
 * seção Stack e, ao mesmo tempo, o fim do segundo parágrafo do Sobre — os
 * mesmos sete termos, escritos duas vezes na mesma página. A auditoria de
 * redundância mediu: seis deles apareciam 2x e "embeddings" aparecia 3x.
 *
 * Ementa de curso é atributo do curso, então o lugar dela é na entrada do
 * curso. O texto é o do currículo, incluindo o que o painel de chips não
 * cabia — LangChain/LangGraph e LoRA/PEFT.
 *
 * A UNESP aparece pelo nome por extenso, e não só pela sigla do campus, porque
 * universidade pública estadual é informação que pesa para quem lê.
 */
export const education: readonly TimelineEntry[] = [
  {
    period: 'Set/2026 — Atual',
    /*
     * "Engenharia de SOFTWARE em IA Aplicada", com o "Software". Confirmado
     * pelo dono em 23/09, depois de eu ter trocado por "Engenharia de IA
     * Aplicada" e ele reverter.
     *
     * O site da UniPDS chama o curso de "Engenharia de IA Aplicada" e a
     * organizacao dos alunos no GitHub e `unipds-engenharia-de-ia-aplicada`.
     * Nada disso manda aqui: quem diz o nome do proprio curso e ele. Nao
     * "corrija" de novo com base na pagina da escola.
     */
    title: 'Pós em Engenharia de Software em IA Aplicada',
    org: 'UniPDS',
    current: true,
    bullets: [
      'LLMs e engenharia de prompt; RAG, embeddings e vector databases.',
      'Agentes autônomos e multiagente (LangChain/LangGraph); MCP.',
      'Fine-tuning (LoRA/PEFT) e governança em IA.',
    ],
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

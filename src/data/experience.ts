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
    /*
     * Entra na linha do tempo principal, e nao num bloco separado de "atuacao
     * academica": e cargo de gestao numa empresa junior, com periodo e
     * responsabilidade — le como experiencia porque e experiencia.
     *
     * **Sem bullets de proposito.** O curriculo tem uma linha de entregas aqui,
     * mas a extracao do PDF perde o comeco de cada bullet nos dois idiomas (so
     * sobra "...-focused team meetings and 1-on-1s"). Reconstruir a frase seria
     * inventar entrega, que e exatamente o que a Regra de Ouro proibe. Entrada
     * sem bullets e honesta; as de formacao ja sao assim.
     */
    period: 'Nov/2024 — Ago/2026',
    title: 'Gerente de Recursos Humanos',
    org: 'EJCOMP — Empresa Júnior de Computação',
    context: 'FCT-UNESP · Presidente Prudente, SP',
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
  {
    /*
     * Unica entrada da pagina que NAO sai do curriculo nem do GitHub: o dono
     * ditou cargo, periodo e atividades, e fonte direta dele e fonte valida.
     * Por isso o texto fica proximo do que ele disse — "social media,
     * postagens, comunicacao, canal de comunicacao no WhatsApp" —, arrumado
     * no mesmo registro das outras entradas.
     *
     * Ele pediu para "dar uma embelezada nas palavras", e embelezar aqui e
     * escolher verbo e ordem, nao acrescentar resultado. Nenhum numero, nenhum
     * alcance, nenhum "aumentou X%": nada disso foi dito, e inventar entrega e
     * exatamente o que a Regra de Ouro proibe.
     */
    period: 'Abr/2024 — Abr/2025',
    title: 'Diretor de Marketing',
    org: 'CACiC — Centro Acadêmico de Ciência da Computação',
    context: 'FCT-UNESP · Presidente Prudente, SP',
    bullets: [
      'Comunicação do centro acadêmico com o corpo discente: pauta, redação e publicação das postagens.',
      'Gestão das redes sociais e do canal de comunicação no WhatsApp.',
    ],
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

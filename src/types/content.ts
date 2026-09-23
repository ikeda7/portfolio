/**
 * Contratos do conteudo do portfolio.
 *
 * Regra de Ouro (DIRETRIZES_CLAUDE.MD): nada aqui pode ser inventado.
 * Campos ainda sem fonte no curriculo/GitHub ficam como placeholder visivel
 * no formato `[INSERIR ...]` — e devem ser substituidos antes do deploy.
 */

/**
 * Um canal da "mesa de som" (fader vertical) ou do "rack" (linha horizontal).
 *
 * **So tem rotulo, de proposito.** Havia aqui um `value` de 0 a 100 que
 * desenhava a altura do fader. O numero nunca chegou a aparecer na tela, mas o
 * desenho aparecia: seis faders parados em alturas diferentes sao lidos como
 * nota, e nota de proficiencia e exatamente o tipo de afirmacao que a Regra de
 * Ouro (DIRETRIZES_CLAUDE.MD) proibe inventar. Quem olhou a pagina de fora leu
 * como nota na primeira passada — foi assim que o problema apareceu.
 *
 * Hoje todo canal sobe ate a mesma marca de unidade: a mesa fica calibrada em
 * vez de opinativa, e a informacao e o rotulo, que tambem e o botao de foco.
 */
export interface SkillChannel {
  /** Rotulo curto exibido no canal. Tambem e o termo do foco tecnico. */
  readonly label: string
}

export interface SkillPanel {
  readonly id: string
  /** Titulo do painel (cabecalho do rack). */
  readonly title: string
  /**
   * Codigo mono exibido a direita do cabecalho (estetica de equipamento).
   *
   * Omitido, vira "CH 01–NN" contado a partir dos canais. Era cravado como
   * string e ficou desatualizado assim que um canal entrou: dizia 05 com seis
   * canais na tela. Numero que descreve uma lista deve sair da lista.
   */
  readonly code?: string
  readonly channels: readonly SkillChannel[]
}

/** Uma linha da capa de terminal. */
export interface TerminalLine {
  readonly kind: 'path' | 'comment' | 'command' | 'flag'
  readonly text: string
}

/**
 * A arte da capa. Sempre existe uma — o card nunca fica com buraco.
 *
 * - `shot`: print do site no ar. So para projeto que tem interface publica.
 * - `terminal`: comandos REAIS do README do repositorio. Para projeto de
 *   linha de comando, o terminal e a interface — nao e ilustracao.
 * - `spectrum`: composicao real de linguagens do repositorio (API do GitHub).
 * - `sleeve`: capa tipografica, para projeto sem print e sem repositorio
 *   publico. Nao desenha dado nenhum — so o numero da faixa e o estado real.
 *
 * **Nao use `spectrum` como padrao.** Ele ja foi a capa dos seis, e seis
 * graficos iguais diziam duas vezes a mesma coisa: quatro abriam com
 * "TypeScript ~85%" enquanto as tags logo abaixo ja diziam TYPESCRIPT. Um
 * grafico so se justifica quando a composicao conta o que as tags nao contam —
 * no TCC, o quarto do repositorio em TeX e a monografia.
 */
export interface LanguageShare {
  readonly label: string
  /** Percentual real do repositorio, 0-100, medido pela API do GitHub. */
  readonly share: number
}

export type ProjectCover =
  | { readonly kind: 'shot'; readonly src: string }
  | { readonly kind: 'terminal'; readonly lines: readonly TerminalLine[] }
  | {
      readonly kind: 'spectrum'
      readonly repo: string
      readonly languages: readonly LanguageShare[]
    }
  | {
      readonly kind: 'sleeve'
      /**
       * Estado do projeto, em uma linha. Fato verificavel ("Em producao",
       * "Repositorio privado"), nunca adjetivo.
       */
      readonly status: string
    }

export interface Project {
  /** Numero da "faixa" exibido na capa (01…06). */
  readonly track: string
  readonly title: string
  readonly description: string
  /** Tecnologias exibidas como tags. */
  readonly tags: readonly string[]
  /** URL do repositorio ou do site no ar. `null` => card sem link. */
  readonly href: string | null
  readonly cover: ProjectCover
}

export interface SocialChannel {
  readonly label: string
  readonly href: string | null
  /** Identificador mostrado abaixo do rotulo: "/ikeda7", "@_ikedaz", o e-mail. */
  readonly handle: string
  readonly icon: 'github' | 'linkedin' | 'instagram' | 'mail'
}

export interface AboutStat {
  readonly value: string
  readonly label: string
}

/**
 * Uma entrada da linha do tempo — emprego ou formacao.
 *
 * Todo campo sai do curriculo. Cargo, empresa e periodo sao exatamente o tipo
 * de dado que a Regra de Ouro proibe inferir: nao existe no GitHub e nao da
 * para deduzir do codigo.
 */
export interface TimelineEntry {
  /** Periodo como aparece no curriculo, ex.: "Ago/2026 — Atual". */
  readonly period: string
  /** Cargo, ou o nome do curso no caso de formacao. */
  readonly title: string
  /** Empresa ou instituicao. */
  readonly org: string
  /** Complemento de uma linha: alocacao, campus, cidade. */
  readonly context?: string
  /** Entregas da posicao, ou ementa resumida do curso. */
  readonly bullets?: readonly string[]
  /** Em andamento — acende o LED e marca a entrada como atual. */
  readonly current?: boolean
}

export type FormStatus = 'idle' | 'enviando' | 'ok' | 'erro'

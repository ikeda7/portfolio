/**
 * Contratos do conteudo do portfolio.
 *
 * Regra de Ouro (DIRETRIZES_CLAUDE.MD): nada aqui pode ser inventado.
 * Campos ainda sem fonte no curriculo/GitHub ficam como placeholder visivel
 * no formato `[INSERIR ...]` — e devem ser substituidos antes do deploy.
 */

/** Um canal da "mesa de som" (fader vertical) ou do "rack" (barra horizontal). */
export interface SkillChannel {
  /** Rotulo curto exibido no canal. */
  readonly label: string
  /**
   * Altura do fader / comprimento da barra, de 0 a 100.
   *
   * E composicao visual — uma mesa que nao esta zerada — e NAO auto-avaliacao.
   * Por isso o valor nunca aparece na tela nem e exposto a leitor de tela.
   */
  readonly value: number
}

export interface SkillPanel {
  readonly id: string
  /** Titulo do painel (cabecalho do rack). */
  readonly title: string
  /** Codigo mono exibido a direita do cabecalho (estetica de equipamento). */
  readonly code: string
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
  /** Identificador mostrado abaixo do rotulo: "/ikeda7", "@ikedaz", o e-mail. */
  readonly handle: string
  readonly icon: 'github' | 'linkedin' | 'instagram' | 'mail'
}

export interface AboutStat {
  readonly value: string
  readonly label: string
}

export type FormStatus = 'idle' | 'enviando' | 'ok' | 'erro'

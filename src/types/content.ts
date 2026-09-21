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
  /** 0–100. PLACEHOLDER enquanto o dono do portfolio nao definir o valor real. */
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

export interface Project {
  /** Numero da "faixa" exibido na capa (01…06). */
  readonly track: string
  readonly title: string
  /** Descricao curta. Placeholder ate vir do GitHub/curriculo. */
  readonly description: string
  /** Tecnologias exibidas como tags. */
  readonly tags: readonly string[]
  /** URL real do repositorio ou case. `null` => card renderiza estado pendente. */
  readonly href: string | null
  /** Caminho da capa 16:10. `null` => renderiza a capa de vinil em CSS. */
  readonly cover: string | null
}

export interface SocialChannel {
  readonly label: string
  readonly href: string | null
  /** Nome do icone lucide-react usado no botao. */
  readonly icon: 'github' | 'linkedin' | 'mail' | 'x'
}

export interface AboutStat {
  readonly value: string
  readonly label: string
}

export type FormStatus = 'idle' | 'enviando' | 'ok' | 'erro'

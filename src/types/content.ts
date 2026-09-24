/**
 * Contratos do conteudo do portfolio.
 *
 * Regra de Ouro (DIRETRIZES_CLAUDE.MD): nada aqui pode ser inventado. Todo
 * campo sai do curriculo (versao pt-BR, Set/2026), do github.com/ikeda7 ou de
 * algo que o dono do portfolio disse explicitamente.
 */

/**
 * Um termo da Stack.
 *
 * **So tem rotulo, de proposito.** Havia um `value` de 0 a 100 que desenhava a
 * altura do fader. O numero nunca chegou a aparecer na tela, mas o desenho
 * aparecia: uma fileira de faders parados em alturas diferentes e lida como
 * nota, e nota de proficiencia e exatamente o tipo de afirmacao que a Regra de
 * Ouro proibe inventar. Quem olhou a pagina de fora leu como nota na primeira
 * passada — foi assim que o problema apareceu.
 */
export interface SkillTerm {
  /** Rotulo exibido. Tambem e o termo do foco tecnico. */
  readonly label: string
  /**
   * Extensao de arquivo da linguagem, sem ponto: 'py', 'ts', 'cs'.
   *
   * **So existe no nicho Linguagens**, e e isso que a faz funcionar: a extensao
   * e a marca visual de "isto e uma linguagem". Num framework ou numa tecnica
   * de IA ela nao significa nada e nao deve aparecer.
   */
  readonly ext?: string
}

/**
 * Um nicho da Stack.
 *
 * Os cinco nichos e a divisao entre eles **nao sao invencao**: sao a secao
 * "Competencias tecnicas" do curriculo, na ordem em que ela lista. Antes a
 * pagina misturava linguagem, framework, banco, tecnica de IA e ferramenta nos
 * mesmos tres blocos, e a leitura de fora foi "fica tudo muito bagunçado".
 * A taxonomia ja existia — faltava usar.
 */
export interface SkillNiche {
  readonly id: string
  readonly title: string
  /** Palavra da contagem no canto do painel: a peça do equipamento do nicho ("7 pedais"). */
  readonly unidade: readonly [singular: string, plural: string]
  readonly terms: readonly SkillTerm[]
}

/**
 * Um projeto do Setlist.
 *
 * **Nao existe mais campo de capa.** A capa ja foi uniao discriminada com
 * quatro variantes — print, terminal, espectro de linguagens e placa — e cada
 * projeto escolhia pelo que tinha para mostrar. Era honesto e ficou feio: seis
 * cards com seis tratamentos diferentes leem como falta de padrao, nao como
 * cuidado. A leitura do dono foi direta: "um tem print de codigo, o outro uma
 * censura de site fechado, o outro print da tela".
 *
 * Hoje os seis recebem o **mesmo selo de vinil**, e a unica coisa que muda e o
 * que ja e diferente entre eles: numero da faixa, nome e estado. Print para
 * todos era impossivel — tres projetos nao tem tela nenhuma para fotografar —
 * e misturar era justamente o problema.
 */
export interface Project {
  /** Numero da "faixa" impresso no selo (01…09). */
  readonly track: string
  readonly title: string
  readonly description: string
  /** Tecnologias exibidas como tags. */
  readonly tags: readonly string[]
  /** URL do repositorio ou do site no ar. `null` => card sem link. */
  readonly href: string | null
  /**
   * Estado do projeto, em duas linhas **separadas de proposito**.
   *
   * Era uma frase so ("Site no ar · repositorio publico") e o selo e redondo:
   * a frase quebrava onde a largura mandava, saia em tres linhas e cortava o
   * separador no lugar errado ("EM PRODUCAO · CODIGO / FECHADO"). Separadas, as
   * duas linhas caem sempre no mesmo lugar, nos seis cards.
   *
   * Fato verificavel nos dois campos, nunca adjetivo.
   */
  readonly estado: string
  readonly repo: string
}

export interface SocialChannel {
  readonly label: string
  readonly href: string | null
  /** Identificador mostrado ao lado do rotulo: "/ikeda7", "@_ikedaz", o e-mail. */
  readonly handle: string
  readonly icon: 'github' | 'linkedin' | 'instagram' | 'mail'
}

/**
 * Uma entrada da linha do tempo — trabalho, atuacao academica ou formacao.
 *
 * Cargo, organizacao e periodo sao exatamente o tipo de dado que a Regra de
 * Ouro proibe inferir: nao existem no GitHub e nao da para deduzir do codigo.
 */
export interface TimelineEntry {
  /** Periodo como aparece no curriculo, ex.: "Ago/2026 — Atual". */
  readonly period: string
  /** Cargo, ou o nome do curso no caso de formacao. */
  readonly title: string
  /** Empresa, entidade ou instituicao. */
  readonly org: string
  /** Complemento de uma linha: alocacao, campus, cidade. */
  readonly context?: string
  /** Entregas da posicao, ou ementa resumida do curso. */
  readonly bullets?: readonly string[]
  /** Em andamento — acende o LED e marca a entrada como atual. */
  readonly current?: boolean
}

export type FormStatus = 'idle' | 'enviando' | 'ok' | 'erro'

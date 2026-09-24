/**
 * "8 linguagens", "1 curso": o número e a palavra concordando.
 *
 * É o que vai no canto direito do cabeçalho dos painéis. Ali moravam códigos
 * de equipamento (LANG, EDU, OUT, "UI · 07") que não diziam nada a quem lê —
 * e "LANG" aparecia duas vezes, em Linguagens e em Idiomas, com sentidos
 * diferentes. Contagem por extenso é a mesma informação que "UI · 07" tentava
 * dar, sem precisar de legenda.
 *
 * Sempre calculada da lista, nunca escrita à mão: número que descreve uma
 * lista sai da lista — já houve um painel dizendo "CH 01–05" com seis canais.
 */
export function contagem(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`
}

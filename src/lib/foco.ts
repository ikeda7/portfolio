/**
 * Comparação de termos técnicos, sem JSX.
 *
 * Os mesmos termos aparecem escritos de formas diferentes pela página: a Stack
 * diz "Node.js", o card de projeto diz "NODE.JS", a fita diz "Node.js".
 * Comparar sem normalizar faria o destaque errar justamente onde ele importa.
 */

/** Deixa dois rótulos comparáveis: minúsculas, sem acento e sem pontuação. */
export function normalizar(termo: string): string {
  return termo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+#]/g, '')
}

/** `true` quando o termo é o foco atual. Sem foco, ninguém está em destaque. */
export function estaEmFoco(termo: string, foco: string | null): boolean {
  return foco !== null && normalizar(termo) === normalizar(foco)
}

/** `true` se qualquer um dos termos casa com o foco. */
export function algumEmFoco(termos: readonly string[], foco: string | null): boolean {
  return foco !== null && termos.some((t) => estaEmFoco(t, foco))
}

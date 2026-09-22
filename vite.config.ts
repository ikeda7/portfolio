import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Troca `%SITE_URL%` no `index.html` pelo valor de `VITE_SITE_URL`.
 *
 * Existe porque `canonical`, `og:url` e `og:image` precisam de URL **absoluta**:
 * LinkedIn, WhatsApp e X buscam a imagem a partir de um servidor deles, onde um
 * caminho relativo não resolve. Sem a variável o site continua funcionando, mas
 * o card de compartilhamento sai em branco — então o build avisa alto.
 */
const BLOCO_ABSOLUTO = /<!-- social:url-absoluta -->[\s\S]*?<!-- \/social:url-absoluta -->/

function injectSiteUrl(siteUrl: string): Plugin {
  return {
    name: 'inject-site-url',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (siteUrl) return html.replaceAll('%SITE_URL%', siteUrl)

        this.warn(
          'VITE_SITE_URL não definida: o card de compartilhamento (og:image) foi omitido ' +
            'do HTML. Defina em .env.local ou no deploy para a prévia do link funcionar.',
        )

        // Remover é melhor do que emitir caminho relativo: nenhum leitor de
        // link resolve `/og.png`, e um `href="/"` faz o Vite tentar ler a raiz
        // do projeto como arquivo e quebrar o build com EISDIR.
        return html.replace(BLOCO_ABSOLUTO, '')
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefixo vazio para ler também variáveis que o deploy injeta no ambiente.
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss(), injectSiteUrl(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})

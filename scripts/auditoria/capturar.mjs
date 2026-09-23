/**
 * Captura de seções do portfólio, para alguém conseguir **olhar** o resultado.
 *
 * Existe porque a auditoria ao lado mede e não vê. Ela responde "contraste ok,
 * nada cortado, nada de overflow" com precisão, e mesmo assim deixou passar
 * duas coisas que uma olhada resolveu em segundos:
 *
 * - a etiqueta do LexTrack quebrando em duas linhas, com "PÚBLICO" órfão
 *   embaixo — cabia no contêiner, então nada foi reportado;
 * - o atalho flutuante de próxima seção pousado exatamente em cima do
 *   "Enviar mensagem", roubando o clique do botão mais importante da página —
 *   dois elementos posicionados, nenhum deles cortado ou sem nome acessível.
 *
 * Nenhuma checagem automática ia pegar essas duas. Por isso isto é versionado
 * em vez de viver na pasta temporária de quem o escreveu: sem o arquivo aqui, a
 * próxima pessoa volta a pedir print por mensagem.
 *
 * Sem dependência nova, como a auditoria: o Node 24 tem `WebSocket` global, e
 * o Chrome ou o Edge que já existe na máquina responde CDP.
 *
 *     npm run build
 *     npm run preview -- --port 4173 --strictPort    (noutro terminal)
 *     npm run capturar                    # todas as seções, 1400px de largura
 *     npm run capturar -- 390             # todas as seções, num celular
 *     npm run capturar -- 390 "#contato"  # só uma
 *
 * Os PNGs vão para `capturas/`, que é ignorada pelo git — são artefato de
 * conferência, não conteúdo do site.
 *
 * Variáveis:
 *   BROWSER_PATH   caminho do executável, se a busca automática falhar
 *   BROWSER_FLAGS  flags extras, separadas por espaço (ex.: --no-sandbox no CI)
 *   AUDIT_URL      alvo (padrão http://localhost:4173/)
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const URL_ALVO = process.env.AUDIT_URL ?? 'http://localhost:4173/'
const PORTA_CDP = 9700 + Math.floor(Math.random() * 400)
const FLAGS_EXTRAS = (process.env.BROWSER_FLAGS ?? '').split(' ').filter(Boolean)
const PASTA = 'capturas'

/**
 * Teto de lado do PNG.
 *
 * A seção de Projetos em 390px passa de 3000px de altura, e imagem desse
 * tamanho é recusada por quase tudo que a leria depois. A escala cai só o
 * necessário para caber.
 */
const LADO_MAXIMO = 1500

const [larguraBruta, ...alvosBrutos] = process.argv.slice(2)
const LARGURA = Number(larguraBruta) || 1400

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Procura um navegador baseado em Chromium nos caminhos usuais de cada SO. */
function acharNavegador() {
  if (process.env.BROWSER_PATH) return process.env.BROWSER_PATH
  const candidatos = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  const achado = candidatos.find((c) => existsSync(c))
  if (!achado) {
    throw new Error(
      'Nenhum navegador Chromium encontrado. Defina BROWSER_PATH com o caminho do executável.',
    )
  }
  return achado
}

async function main() {
  const perfil = await mkdtemp(path.join(tmpdir(), 'captura-'))
  const navegador = spawn(acharNavegador(), [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORTA_CDP}`,
    '--user-data-dir=' + perfil,
    `--window-size=${LARGURA},900`,
    ...FLAGS_EXTRAS,
    URL_ALVO,
  ])

  let alvos
  for (let i = 0; i < 60; i++) {
    await sleep(400)
    try {
      const r = await fetch(`http://127.0.0.1:${PORTA_CDP}/json`)
      alvos = (await r.json()).filter((x) => x.type === 'page' && !x.url.startsWith('devtools'))
      if (alvos.length) break
    } catch {
      /* navegador ainda subindo */
    }
  }
  if (!alvos?.length)
    throw new Error(`Não consegui falar com o navegador. O preview está no ar em ${URL_ALVO}?`)

  const ws = new WebSocket(alvos[0].webSocketDebuggerUrl)
  let id = 0
  const pendentes = new Map()
  const send = (metodo, params = {}) =>
    new Promise((res) => {
      const i = ++id
      pendentes.set(i, res)
      ws.send(JSON.stringify({ id: i, method: metodo, params }))
    })
  await new Promise((r) => (ws.onopen = r))
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pendentes.has(m.id)) pendentes.get(m.id)(m.result)
  }
  await send('Runtime.enable')

  const js = async (expr) => {
    const o = await send('Runtime.evaluate', { returnByValue: true, expression: expr })
    if (o.exceptionDetails) throw new Error(o.exceptionDetails.exception?.description)
    return o.result.value
  }

  for (let i = 0; i < 30; i++) {
    if (await js(`!!document.querySelector('main section[id]')`)) break
    await sleep(400)
  }
  await js(`document.documentElement.style.scrollBehavior='auto'`)

  /*
   * Varre a página inteira em passos de meia tela **antes** de fotografar.
   *
   * Todo bloco da página entra por `whileInView`, então o que nunca cruzou a
   * viewport continua em `opacity: 0`. A primeira versão disto dava um
   * `scrollIntoView` por seção, o que basta no desktop porque seção cabe na
   * tela — mas em 390px a Stack tem ~1300px de altura, os dois painéis de baixo
   * nunca entravam, e a captura saía com meia seção em branco. Quase virou
   * relatório de espaço morto.
   */
  const alturaTotal = await js('document.body.scrollHeight')
  const passo = Math.max(200, Math.floor((await js('window.innerHeight')) * 0.5))
  for (let y = 0; y <= alturaTotal; y += passo) {
    await js(`window.scrollTo(0,${y})`)
    await sleep(240)
  }
  await js('window.scrollTo(0,0)')
  await sleep(500)

  const alvos_ = alvosBrutos.length
    ? alvosBrutos
    : JSON.parse(
        await js(
          `JSON.stringify([...document.querySelectorAll('main section[id]')].map((s) => '#' + s.id))`,
        ),
      )

  mkdirSync(PASTA, { recursive: true })
  console.log(`\n### CAPTURAS  (${LARGURA}px de largura)\n`)

  for (const alvo of alvos_) {
    const bruto = await js(
      `(() => { const e = document.querySelector('${alvo}'); if (!e) return null
        e.scrollIntoView(); const r = e.getBoundingClientRect()
        return JSON.stringify({ x: r.x + window.scrollX, y: r.y + window.scrollY, w: r.width, h: r.height }) })()`,
    )
    if (!bruto) {
      console.log(`  ${alvo.padEnd(16)} não encontrado na página`)
      continue
    }

    const caixa = JSON.parse(bruto)
    await sleep(400)

    const escala = Math.min(1, LADO_MAXIMO / caixa.h, LADO_MAXIMO / caixa.w)
    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      // Sem isto, o que está fora da viewport sai preto.
      captureBeyondViewport: true,
      clip: { x: caixa.x, y: caixa.y, width: caixa.w, height: caixa.h, scale: escala },
    })

    const nome = path.join(PASTA, `${alvo.replace(/[^a-z0-9]/gi, '') || 'pagina'}-${LARGURA}.png`)
    writeFileSync(nome, Buffer.from(data, 'base64'))
    console.log(
      `  ${alvo.padEnd(16)} ${nome.padEnd(34)} ${Math.round(caixa.w * escala)}x${Math.round(caixa.h * escala)}`,
    )
  }

  /*
   * O atalho flutuante é `fixed`: numa captura que passa da viewport ele sai
   * desenhado onde a janela está, não onde estaria durante a rolagem. Dizer
   * isso aqui evita abrir bug para sobreposição que não existe — já aconteceu.
   */
  console.log(
    '\n  Lembre: o atalho de próxima seção é `fixed`. Numa seção mais alta que a\n' +
      '  janela ele aparece na captura em cima do conteúdo; isso é artefato da\n' +
      '  captura, não sobreposição real. Confira no navegador antes de "corrigir".\n',
  )

  navegador.kill()
  process.exit(0)
}

main().catch((e) => {
  console.error('\n' + e.message + '\n')
  process.exit(1)
})

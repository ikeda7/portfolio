/**
 * Gera `public/og.png` — o card que LinkedIn, WhatsApp, X e Slack mostram
 * quando alguém cola o link do site.
 *
 *     npm run og
 *
 * Renderiza `template.html` em 1200x630 com o Chrome headless. O template é
 * HTML comum: para mudar o card, edite o template e rode de novo.
 *
 * O Chrome é procurado nos caminhos padrão do Windows e do macOS/Linux.
 * Se o seu estiver em outro lugar: `CHROME_PATH="/caminho/chrome" npm run og`.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')

const TEMPLATE = resolve(here, 'template.html')
const OUTPUT = resolve(root, 'public/og.png')

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

function findChrome() {
  for (const candidate of CANDIDATES) {
    if (candidate && existsSync(candidate)) return candidate
  }
  throw new Error(
    'Chrome não encontrado. Informe o caminho: CHROME_PATH="/caminho/chrome" npm run og',
  )
}

const chrome = findChrome()

execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    // Tempo virtual para as fontes do Google Fonts chegarem antes do print.
    '--virtual-time-budget=8000',
    `--screenshot=${OUTPUT}`,
    pathToFileURL(TEMPLATE).href,
  ],
  { stdio: 'pipe' },
)

if (!existsSync(OUTPUT)) {
  throw new Error(`O Chrome não escreveu ${OUTPUT}.`)
}

const kb = (statSync(OUTPUT).size / 1024).toFixed(1)
process.stdout.write(`public/og.png gerado — 1200x630, ${kb} kB
`)

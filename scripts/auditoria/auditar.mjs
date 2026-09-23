/**
 * Auditoria visual do portfólio, dirigindo um navegador de verdade.
 *
 * Existe porque os quatro portões (typecheck, lint, format, build) não veem
 * nada do que importa numa página: contraste, texto cortado, overflow, alvo de
 * toque pequeno demais, espaço morto. Tudo aqui já pegou bug real — o painel de
 * Formação estava com o texto decepado e passava em todos os portões.
 *
 * Sem dependência nova: o Node 24 tem `WebSocket` global, então dá para falar
 * CDP direto com o Chrome ou o Edge que já existe na máquina.
 *
 *   npm run build
 *   npm run preview -- --port 4173 --strictPort    (noutro terminal)
 *   npm run auditar
 *
 * Variáveis:
 *   BROWSER_PATH   caminho do executável, se a busca automática falhar
 *   BROWSER_FLAGS  flags extras, separadas por espaço (ex.: --no-sandbox no CI)
 *   AUDIT_URL      alvo (padrão http://localhost:4173/)
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const URL_ALVO = process.env.AUDIT_URL ?? 'http://localhost:4173/'
const PORTA_CDP = 9222 + Math.floor(Math.random() * 400)

/*
 * Flags extras para ambiente onde o sandbox do Chrome nao sobe — container de
 * CI rodando como root e o caso classico. Fica por variavel de ambiente de
 * proposito: passar --no-sandbox fixo aqui enfraqueceria o navegador na
 * maquina de quem desenvolve, para resolver um problema que so existe no CI.
 */
const FLAGS_EXTRAS = (process.env.BROWSER_FLAGS ?? '').split(' ').filter(Boolean)
const LARGURAS = [320, 390, 768, 1280, 1920]
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

/* ------------------------------------------------------------------ *
 * Sondas — rodam dentro da página                                     *
 * ------------------------------------------------------------------ */

/**
 * Contraste, tamanho de fonte e alvo de toque.
 *
 * Sem regex de propósito: um `\d` que vire `d` faz o parser devolver `null`
 * para toda cor, e aí a auditoria pula todos os elementos e reporta zero falha
 * sempre. Já aconteceu. Por isso `medidos` existe e o runner aborta se vier 0.
 */
const SONDA_A11Y = `(() => {
  const parse = (c) => {
    const i = c.indexOf('('), j = c.lastIndexOf(')')
    if (i < 0 || j < 0) return null
    const n = c.slice(i + 1, j).split(',').map((v) => parseFloat(v))
    return n.length >= 3 && n.slice(0, 3).every((v) => !isNaN(v)) ? n.slice(0, 3) : null
  }
  const alpha = (c) => {
    const i = c.indexOf('('), j = c.lastIndexOf(')')
    if (i < 0) return 1
    const n = c.slice(i + 1, j).split(',').map((v) => parseFloat(v))
    return n.length >= 4 ? n[3] : 1
  }
  const lum = (r) => {
    const [a, b, c2] = r.map((v) => {
      const x = v / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * a + 0.7152 * b + 0.0722 * c2
  }
  const ratio = (f, b) => {
    const l = [lum(f), lum(b)].sort((x, y) => y - x)
    return (l[0] + 0.05) / (l[1] + 0.05)
  }
  const fundoDe = (el) => {
    let n = el
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor
      const p = parse(c)
      if (p && alpha(c) > 0.5) return p
      n = n.parentElement
    }
    return [13, 13, 13]
  }

  const out = { medidos: 0, contraste: [], pequenos: 0, cortados: [], semNome: [], headings: [], alvos: [] }

  /*
   * Margem de contraste por estilo.
   *
   * Passar no AA e binario, e binario esconde o quanto falta para reprovar:
   * um par a 4.52:1 e outro a 12:1 saem os dois como "ok", mas o primeiro
   * reprova se alguem clarear o fundo de um painel em dois pontos. Agrupado
   * por estilo (cor + tamanho + peso + fundo), e nao por elemento, porque o
   * que se conserta e o token — a ocorrencia so repete a decisao.
   */
  const margens = new Map()

  document.querySelectorAll('body *').forEach((el) => {
    const cs = getComputedStyle(el)

    /*
     * Conteudo cortado por overflow escondido. sr-only usa isso de proposito.
     *
     * So conta quando o que transborda carrega TEXTO. Decoracao cortada de
     * proposito e comum e legitima: o selo de vinil dos projetos tem um disco
     * de 240% de altura, enquadrado pela moldura como um vinil visto de perto,
     * e a checagem acusava os seis cards de "conteudo cortado" quando nenhuma
     * letra estava escondida. Alarme falso treina quem le o relatorio a ignorar
     * o relatorio.
     */
    if (!String(el.className).includes('sr-only')) {
      const escondido = cs.overflowY === 'hidden' || cs.overflow === 'hidden'
      const sobra = el.scrollHeight - el.clientHeight
      const limite = el.clientHeight
      const textoVazando = [...el.querySelectorAll('*')].some((f) => {
        if (f.getAttribute('aria-hidden') === 'true' || f.closest('[aria-hidden="true"]')) return false
        if (!Array.from(f.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return false
        return f.offsetTop + f.offsetHeight > limite + 2
      })
      if (escondido && sobra > 2 && el.clientHeight > 0 && textoVazando) {
        out.cortados.push(
          el.tagName.toLowerCase() + ' -' + sobra + 'px "' + (el.innerText || '').trim().slice(0, 30) + '"',
        )
      }
    }

    if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) return
    const fg = parse(cs.color)
    if (!fg) return
    out.medidos++
    const size = parseFloat(cs.fontSize)
    const peso = parseInt(cs.fontWeight, 10) || 400
    if (size < 10) out.pequenos++
    const min = size >= 24 || (size >= 18.66 && peso >= 700) ? 3 : 4.5
    const fundo = fundoDe(el)
    const r = ratio(fg, fundo)

    const chave = cs.color + ' sobre ' + fundo.join() + ' @' + cs.fontSize + '/' + peso
    const visto = margens.get(chave)
    if (visto) {
      visto.n++
    } else {
      margens.set(chave, { r: r, min: min, n: 1, amostra: (el.textContent || '').trim().slice(0, 22) })
    }

    if (r < min && out.contraste.length < 8) {
      out.contraste.push(r.toFixed(2) + ':1 (min ' + min + ') ' + cs.fontSize + ' "' + el.textContent.trim().slice(0, 24) + '"')
    }
  })

  document.querySelectorAll('a, button').forEach((el) => {
    const nome = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title') || '').trim()
    if (!nome) out.semNome.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0])
  })

  const niveis = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]))
  let anterior = 0
  niveis.forEach((n) => {
    if (anterior && n > anterior + 1) out.headings.push('pulou h' + anterior + ' -> h' + n)
    anterior = n
  })
  out.h1 = niveis.filter((n) => n === 1).length

  document.querySelectorAll('a, button, input, textarea').forEach((el) => {
    const b = el.getBoundingClientRect()
    if (b.width === 0 && b.height === 0) return
    // O link "Abrir" dos cards usa stretched link: a area real e o card
    // inteiro, via ::after, que getBoundingClientRect nao enxerga.
    if (String(el.className).includes('after:inset-0')) return
    // sr-only so aparece no foco, quando ja tem tamanho normal.
    if (String(el.className).includes('sr-only')) return
    if (b.width < 24 || b.height < 24) {
      out.alvos.push((el.getAttribute('aria-label') || el.innerText || el.tagName).trim().slice(0, 20) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height))
    }
  })

  // As cinco combinacoes mais apertadas, da menor margem para a maior.
  out.folgas = [...margens.values()]
    .sort((a, b) => a.r / a.min - b.r / b.min)
    .slice(0, 5)
    .map((m) => ({
      r: +m.r.toFixed(2),
      min: m.min,
      folga: +(m.r / m.min).toFixed(2),
      n: m.n,
      amostra: m.amostra,
    }))

  return out
})()`

/**
 * Espaço morto: container muito maior que o conteúdo que carrega.
 *
 * Usa a **união** das caixas dos filhos, não a soma: colunas lado a lado numa
 * grade somariam alturas e inflariam a ocupação para muito acima de 100%.
 */
const SONDA_VAZIOS = `(() => {
  const visivel = (el) => {
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden') return false
    if (cs.position === 'fixed' || cs.position === 'absolute') return false
    const b = el.getBoundingClientRect()
    return b.height > 0 && b.width > 0
  }
  const nome = (el) => {
    const cab = el.querySelector('h2, h3')
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
      (cab ? ' "' + cab.innerText.trim().slice(0, 20) + '"' : '')
  }

  const achados = []
  document.querySelectorAll('main section, main article, main [class*="rounded-[14px]"], main [class*="grid"]').forEach((el) => {
    if (!visivel(el)) return
    const b = el.getBoundingClientRect()
    if (b.height < 80) return
    const cs = getComputedStyle(el)
    const padTop = parseFloat(cs.paddingTop) || 0
    const padBottom = parseFloat(cs.paddingBottom) || 0
    const util = b.height - padTop - padBottom
    if (util <= 0) return
    const caixas = [...el.children].filter(visivel).map((f) => f.getBoundingClientRect())
    if (!caixas.length) return

    const topoMin = Math.min(...caixas.map((c) => c.top))
    const baseMax = Math.max(...caixas.map((c) => c.bottom))
    const sobraFim = Math.round(b.bottom - padBottom - baseMax)
    const sobraInicio = Math.round(topoMin - (b.top + padTop))
    const ocupacao = Math.round(((baseMax - topoMin) / util) * 100)

    const partes = []
    if (sobraInicio > 60) partes.push('topo ' + sobraInicio + 'px')
    if (sobraFim > 60) partes.push('fim ' + sobraFim + 'px')
    if (ocupacao < 65) partes.push('ocupacao ' + ocupacao + '%')
    if (partes.length) achados.push(nome(el) + ' -> ' + partes.join(' | '))
  })
  return achados.slice(0, 10)
})()`

/* ------------------------------------------------------------------ *
 * Runner                                                              *
 * ------------------------------------------------------------------ */

async function main() {
  const perfil = await mkdtemp(path.join(tmpdir(), 'auditoria-'))
  const navegador = spawn(acharNavegador(), [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORTA_CDP}`,
    '--user-data-dir=' + perfil,
    '--window-size=1440,900',
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
  const erros = []
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
    if (m.method === 'Runtime.exceptionThrown') {
      erros.push(m.params.exceptionDetails?.exception?.description ?? 'exceção')
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      erros.push((m.params.args ?? []).map((a) => a.value ?? a.description).join(' '))
    }
  }
  await send('Runtime.enable')
  await send('DOM.enable')
  await send('CSS.enable')
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
  const secoes = await js(
    `JSON.stringify([...document.querySelectorAll('main section[id]')].map(s=>s.id))`,
  )
  for (const s of JSON.parse(secoes)) {
    await js(`document.getElementById('${s}').scrollIntoView()`)
    await sleep(700)
  }
  await sleep(700)

  let falhou = false
  const linha = (rotulo, valor, ruim, avisar = false) => {
    if (ruim) falhou = true
    const marca = ruim ? 'FALHA' : avisar ? 'aviso' : '  ok '
    console.log(`  ${marca}  ${rotulo.padEnd(30)} ${valor}`)
  }

  const a = await js(SONDA_A11Y)
  if (!a.medidos) throw new Error('A auditoria não mediu nenhum elemento — a sonda de cor quebrou.')

  console.log(`\n### ACESSIBILIDADE  (${a.medidos} elementos medidos)`)
  linha('contraste WCAG AA', a.contraste.length + ' falha(s)', a.contraste.length > 0)
  a.contraste.forEach((c) => console.log('          ' + c))

  /*
   * Aviso, nao falha. 4.6:1 passa no AA, e reprovar aqui transformaria a
   * auditoria num portao que ninguem consegue fechar. O numero existe para
   * a proxima pessoa que for mexer numa cor saber de quanto e o colchao
   * antes de mexer — foi assim que o acento roxo virou azul sem regredir.
   */
  const APERTADO = 1.15
  const pior = a.folgas?.[0]
  if (pior) {
    linha(
      'margem do estilo mais justo',
      `${pior.folga}x o minimo (${pior.r}:1 de ${pior.min})`,
      false,
      pior.folga < APERTADO,
    )
    for (const f of a.folgas) {
      console.log(
        `          ${String(f.r + ':1').padEnd(8)} min ${String(f.min).padEnd(4)} folga ${String(f.folga + 'x').padEnd(6)} ${String(f.n).padStart(3)} elem.  "${f.amostra}"`,
      )
    }
  }
  linha('texto abaixo de 10px', a.pequenos, a.pequenos > 0)
  linha('conteudo cortado', a.cortados.length, a.cortados.length > 0)
  a.cortados.forEach((c) => console.log('          ' + c))
  linha('interativo sem nome', a.semNome.length, a.semNome.length > 0)
  linha(
    'ordem de headings',
    a.headings.length ? a.headings.join(', ') : 'ok',
    a.headings.length > 0,
  )
  linha('h1 na pagina', a.h1, a.h1 !== 1)
  linha('alvo abaixo de 24x24', a.alvos.length, a.alvos.length > 0)
  a.alvos.forEach((t) => console.log('          ' + t))

  console.log('\n### LARGURAS')
  for (const w of LARGURAS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w <= 768,
    })
    await sleep(500)
    await js('window.scrollTo(0,0)')
    await sleep(300)
    const o = await js(
      `document.documentElement.scrollWidth - document.documentElement.clientWidth`,
    )
    linha(`overflow em ${w}px`, o + 'px', o > 0)
  }

  console.log('\n### ESPACO MORTO')
  for (const [w, h] of [
    [1440, 900],
    [1920, 1080],
  ]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: false,
    })
    await sleep(600)
    for (const s of JSON.parse(secoes)) {
      await js(`document.getElementById('${s}').scrollIntoView()`)
      await sleep(500)
    }
    const v = await js(SONDA_VAZIOS)
    // O hero centraliza o conteudo de proposito; ~10% de respiro nao e buraco.
    const relevantes = v.filter((x) => !x.startsWith('section#top'))
    linha(
      `espaco morto ${w}x${h}`,
      relevantes.length ? relevantes.length + ' local(is)' : 'nenhum',
      relevantes.length > 0,
    )
    relevantes.forEach((x) => console.log('          ' + x))
  }

  /* ------------------------------------------------------------------ *
   * Hover: todo interativo responde ao mouse?                           *
   * ------------------------------------------------------------------ */

  /*
   * Existe porque o dono do portfolio reparou antes da auditoria: "vi alguns
   * que nao estavam tendo nem o hover". Eram tres classes de defeito, e
   * nenhuma delas aparece em nenhuma das outras checagens — o elemento tem
   * nome acessivel, tamanho de alvo e contraste, e mesmo assim nao se anuncia
   * como clicavel:
   *
   *   - o canal ATIVO da waveform, que so tinha estilo de estado;
   *   - os quatro campos do formulario, que so tinham :focus;
   *   - a marca "Lucas /IKEDA", que e link no header e no rodape.
   *
   * **As transicoes sao desligadas antes de medir.** Todo hover aqui e
   * `transition-all duration-300`, entao ler o estilo logo depois de forcar
   * :hover devolve o valor de PARTIDA, que e igual ao de antes — a primeira
   * versao desta sonda acusou 79 de 82 elementos como mudos. Sem transicao o
   * valor final e instantaneo e a checagem inteira roda em segundos em vez de
   * minutos.
   */
  const PROPS_HOVER = [
    'color',
    'backgroundColor',
    'borderTopColor',
    'borderLeftColor',
    'boxShadow',
    'opacity',
    'transform',
    'textDecorationLine',
    'gap',
    'width',
  ]

  const totalHover = await js(`(() => {
    const estilo = document.createElement('style')
    estilo.id = 'auditoria-sem-transicao'
    estilo.textContent = '*,*::before,*::after{transition:none !important;animation:none !important}'
    document.head.appendChild(estilo)

    const els = [...document.querySelectorAll('a, button, input, textarea, select, [role="button"]')]
      .filter((el) => {
        const b = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        if (b.width === 0 || b.height === 0) return false
        if (cs.visibility === 'hidden' || cs.display === 'none') return false
        if (String(el.className).includes('sr-only')) return false
        // Armadilha anti-bot: invisivel para humano, entao nao deve reagir.
        if (el.closest('[aria-hidden="true"]')) return false
        return true
      })
    els.forEach((el, i) => el.setAttribute('data-hv', String(i)))
    return els.length
  })()`)

  const estiloDe = (i) =>
    js(`(() => {
      const el = document.querySelector('[data-hv="${i}"]')
      const ler = (n) => ${JSON.stringify(PROPS_HOVER)}.map((prop) => getComputedStyle(n)[prop]).join('|')
      const filhos = [...el.querySelectorAll('*')].map(ler).join('//')
      return ler(el) + '###' + filhos
    })()`)

  const { root } = await send('DOM.getDocument', { depth: -1 })
  const semHover = []

  for (let i = 0; i < totalHover; i++) {
    const antes = await estiloDe(i)
    const { nodeIds } = await send('DOM.querySelectorAll', {
      nodeId: root.nodeId,
      selector: `[data-hv="${i}"]`,
    })
    if (!nodeIds?.length) continue

    /*
     * Forca :hover no elemento E nos ancestrais: `group-hover:` do Tailwind
     * pendura a regra no ancestral marcado com `.group`, entao um link cujo
     * unico feedback vem do card ao redor passaria por mudo.
     */
    const cadeia = []
    let atual = nodeIds[0]
    for (let n = 0; n < 6 && atual; n++) {
      cadeia.push(atual)
      const { node } = await send('DOM.describeNode', { nodeId: atual })
      atual = node?.parentId
    }
    for (const nodeId of cadeia) {
      await send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] })
    }

    const depois = await estiloDe(i)

    for (const nodeId of cadeia) {
      await send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] })
    }

    if (antes === depois) {
      semHover.push(
        await js(`(() => {
          const el = document.querySelector('[data-hv="${i}"]')
          const sec = el.closest('section[id]')
          const nome = (el.getAttribute('aria-label') || el.innerText || el.tagName).trim().replace(/\\s+/g, ' ').slice(0, 34)
          return (sec ? '#' + sec.id : 'fora') + ' ' + el.tagName.toLowerCase() + ' "' + nome + '"'
        })()`),
      )
    }
  }

  await js(`document.getElementById('auditoria-sem-transicao')?.remove()`)

  console.log(`\n### HOVER  (${totalHover} interativos visiveis)`)
  linha('interativo sem hover', semHover.length, semHover.length > 0)
  semHover.forEach((x) => console.log('          ' + x))

  console.log('\n### CONSOLE')
  linha('erros de console', erros.length, erros.length > 0)
  erros.slice(0, 3).forEach((e) => console.log('          ' + e))

  console.log(falhou ? '\nAUDITORIA COM FALHAS\n' : '\nAUDITORIA LIMPA\n')
  ws.close()
  navegador.kill()
  process.exit(falhou ? 1 : 0)
}

main().catch((e) => {
  console.error('\nAUDITORIA NAO RODOU:', e.message, '\n')
  process.exit(1)
})

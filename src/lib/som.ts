/*
 * Efeitos sonoros da página, todos sintetizados na hora pela Web Audio API —
 * nenhum arquivo de áudio. Cada um imita o equipamento que o dispara: pedal,
 * fita cassete, botões de mute e solo da DAW, fader, knob, pad e o scratch de
 * DJ ao abrir um projeto.
 *
 * Regras que valem para todos:
 *
 * - **Só tocam em resposta a um clique**, nunca sozinhos. O `AudioContext`
 *   nasce no primeiro clique, que é o que os navegadores exigem.
 * - **No celular** ele pode nascer `suspended`: o `resume()` é chamado ainda
 *   dentro do gesto e o som só é agendado depois dele. No iPhone,
 *   `navigator.audioSession.type = 'playback'` (Safari 16.4+) faz a Web Audio
 *   tocar como mídia, mesmo com a chave de silencioso (os pads ficavam mudos
 *   no celular do dono, 24/09).
 * - **Baixos.** Ganho de pico entre 0,03 e 0,25: é textura, não trilha.
 * - Sem Web Audio (navegador antigo, política do sistema), tudo fica mudo em
 *   silêncio — nunca quebra o clique.
 */

let contexto: AudioContext | null = null
let ruidoBranco: AudioBuffer | null = null

/** Garante o contexto rodando e entrega o instante de agora para agendar. */
async function tocar(desenhar: (ctx: AudioContext, t: number) => void): Promise<void> {
  try {
    const sessao = (navigator as Navigator & { audioSession?: { type: string } }).audioSession
    if (sessao) sessao.type = 'playback'
    contexto ??= new AudioContext()
    const ctx = contexto
    if (ctx.state !== 'running') await ctx.resume()
    desenhar(ctx, ctx.currentTime)
  } catch {
    // Sem áudio disponível: o clique continua funcionando, só sem som.
  }
}

/** Um segundo de ruído branco, gerado uma vez e reaproveitado. */
function ruido(ctx: AudioContext): AudioBuffer {
  if (!ruidoBranco) {
    ruidoBranco = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const dados = ruidoBranco.getChannelData(0)
    for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1
  }
  return ruidoBranco
}

/** Ganho com ataque curto e queda exponencial até o silêncio. */
function envelope(ctx: AudioContext, t: number, pico: number, duracao: number, ataque = 0.004) {
  const ganho = ctx.createGain()
  ganho.gain.setValueAtTime(0.0001, t)
  ganho.gain.exponentialRampToValueAtTime(pico, t + ataque)
  ganho.gain.exponentialRampToValueAtTime(0.0001, t + duracao)
  ganho.connect(ctx.destination)
  return ganho
}

/** Estalo de ruído filtrado: a parte mecânica de todo botão físico. */
function estalo(ctx: AudioContext, t: number, frequencia: number, pico: number, duracao: number) {
  const fonte = ctx.createBufferSource()
  fonte.buffer = ruido(ctx)
  const filtro = ctx.createBiquadFilter()
  filtro.type = 'bandpass'
  filtro.frequency.value = frequencia
  filtro.Q.value = 0.9
  fonte.connect(filtro).connect(envelope(ctx, t, pico, duracao, 0.001))
  fonte.start(t)
  fonte.stop(t + duracao + 0.02)
}

/** Tom de oscilador com a frequência indo de `de` a `ate`. */
function tom(
  ctx: AudioContext,
  t: number,
  forma: OscillatorType,
  de: number,
  ate: number,
  pico: number,
  duracao: number,
  ataque?: number,
) {
  const osc = ctx.createOscillator()
  osc.type = forma
  osc.frequency.setValueAtTime(de, t)
  if (ate !== de) osc.frequency.exponentialRampToValueAtTime(ate, t + duracao)
  osc.connect(envelope(ctx, t, pico, duracao, ataque))
  osc.start(t)
  osc.stop(t + duracao + 0.02)
}

/**
 * Pedal (Front-end): o footswitch metálico — estalo seco e um baque grave. Ao
 * ligar, soma um zumbido curto de amplificador, o "efeito entrou".
 */
export function somPedal(ligar: boolean) {
  void tocar((ctx, t) => {
    estalo(ctx, t, 2600, 0.22, 0.03)
    tom(ctx, t, 'sine', 110, 48, 0.2, 0.09)
    if (ligar) {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = 110
      const filtro = ctx.createBiquadFilter()
      filtro.type = 'lowpass'
      filtro.frequency.value = 900
      osc.connect(filtro).connect(envelope(ctx, t + 0.02, 0.035, 0.22, 0.02))
      osc.start(t + 0.02)
      osc.stop(t + 0.26)
    }
  })
}

/** Knob do pedal: um tique de detente, bem curto e agudo. */
export function somKnob() {
  void tocar((ctx, t) => estalo(ctx, t, 5200, 0.07, 0.012))
}

/**
 * Fita cassete (Bancos de dados): a tecla do deck ("clunk") e, ao tocar, o
 * chiado da fita com o motor ganhando velocidade; ao parar, o motor perdendo.
 */
export function somFita(tocando: boolean) {
  void tocar((ctx, t) => {
    estalo(ctx, t, 1100, 0.2, 0.05)
    tom(ctx, t, 'sine', 80, 55, 0.14, 0.07)
    if (tocando) {
      const chiado = ctx.createBufferSource()
      chiado.buffer = ruido(ctx)
      const filtro = ctx.createBiquadFilter()
      filtro.type = 'bandpass'
      filtro.frequency.value = 3200
      filtro.Q.value = 0.7
      const ganho = ctx.createGain()
      ganho.gain.setValueAtTime(0.0001, t + 0.05)
      ganho.gain.exponentialRampToValueAtTime(0.03, t + 0.4)
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
      ganho.connect(ctx.destination)
      chiado.connect(filtro).connect(ganho)
      chiado.start(t + 0.05)
      chiado.stop(t + 0.95)
      tom(ctx, t + 0.05, 'sine', 55, 130, 0.035, 0.5, 0.15)
    } else {
      tom(ctx, t + 0.04, 'sine', 130, 40, 0.035, 0.4, 0.01)
    }
  })
}

/**
 * Mute e solo (Back-end): o clique digital de um botão de DAW. Solo é mais
 * agudo que mute, e desligar soa um degrau abaixo de ligar.
 */
export function somMuteSolo(tipo: 'mute' | 'solo', ligar: boolean) {
  void tocar((ctx, t) => {
    const base = tipo === 'solo' ? 1320 : 780
    tom(
      ctx,
      t,
      'square',
      ligar ? base : base * 0.75,
      ligar ? base : base * 0.75,
      0.035,
      0.045,
      0.002,
    )
    estalo(ctx, t, 4000, 0.05, 0.01)
  })
}

/** Fader (Linguagens): o deslize — ruído varrendo para cima ao subir, para baixo ao descer. */
export function somFader(subir: boolean) {
  void tocar((ctx, t) => {
    const fonte = ctx.createBufferSource()
    fonte.buffer = ruido(ctx)
    const filtro = ctx.createBiquadFilter()
    filtro.type = 'bandpass'
    filtro.Q.value = 3
    filtro.frequency.setValueAtTime(subir ? 700 : 2600, t)
    filtro.frequency.exponentialRampToValueAtTime(subir ? 2600 : 700, t + 0.16)
    fonte.connect(filtro).connect(envelope(ctx, t, 0.09, 0.18, 0.02))
    fonte.start(t)
    fonte.stop(t + 0.2)
  })
}

/*
 * Uma nota por pad, da escala pentatônica de lá menor (A3 a E5): em qualquer
 * combinação de pads ligados, nada soa errado junto.
 */
const NOTAS = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25]

/**
 * Pad (IA aplicada): a nota do pad. Desligar toca a mesma nota caindo uma
 * oitava, mais curta e mais baixa — o ouvido distingue "ligou" de
 * "desligou" sem olhar.
 */
export function somPad(indice: number, ligar: boolean) {
  void tocar((ctx, t) => {
    const nota = NOTAS[indice % NOTAS.length] ?? 440
    tom(
      ctx,
      t,
      'triangle',
      nota,
      ligar ? nota : nota / 2,
      ligar ? 0.09 : 0.06,
      ligar ? 0.6 : 0.3,
      0.01,
    )
  })
}

/**
 * Scratch de DJ (card de projeto): o disco vai e volta embaixo da agulha —
 * "wicka-wicka". Um dente-de-serra filtrado com a altura subindo e descendo
 * três vezes, com um respiro entre os movimentos, e o chiado do vinil junto.
 */
export function somScratch() {
  void tocar((ctx, t) => {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    const filtro = ctx.createBiquadFilter()
    filtro.type = 'lowpass'
    filtro.frequency.value = 2200
    const ganho = ctx.createGain()
    ganho.gain.setValueAtTime(0.0001, t)
    const movimentos: readonly [inicio: number, de: number, ate: number][] = [
      [0, 170, 520],
      [0.1, 520, 150],
      [0.22, 160, 480],
    ]
    for (const [inicio, de, ate] of movimentos) {
      const a = t + inicio
      osc.frequency.setValueAtTime(de, a)
      osc.frequency.exponentialRampToValueAtTime(ate, a + 0.085)
      ganho.gain.setValueAtTime(0.0001, a)
      ganho.gain.exponentialRampToValueAtTime(0.07, a + 0.01)
      ganho.gain.exponentialRampToValueAtTime(0.0001, a + 0.09)
    }
    osc.connect(filtro).connect(ganho).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.34)
    estalo(ctx, t, 1800, 0.05, 0.3)
  })
}

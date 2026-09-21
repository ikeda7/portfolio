import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { contatoEstaConfigurado, enviarContato } from '@/lib/contact'
import type { FormStatus } from '@/types/content'

interface FormValues {
  readonly nome: string
  readonly email: string
  readonly mensagem: string
}

const EMPTY_FORM: FormValues = { nome: '', email: '', mensagem: '' }

/** Validação de e-mail suficiente para o cliente; o provedor revalida no envio. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Tempo mínimo entre abrir a página e enviar. Bot preenche e dispara na hora. */
const TEMPO_MINIMO_MS = 3_000

/** Intervalo mínimo entre dois envios do mesmo visitante. */
const INTERVALO_ENTRE_ENVIOS_MS = 30_000

const FIELD_CLASS =
  'border-line-strong focus:border-accent focus:glow-input w-full border-0 border-b bg-transparent px-0.5 py-2.5 text-[15px] outline-none transition-all duration-300'

const LABEL_CLASS = 'text-ink-faint font-mono text-[10px] tracking-[0.14em] uppercase'

function validar({ nome, email, mensagem }: FormValues): string | null {
  if (nome.trim().length < 2) return 'Informe seu nome.'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Informe um e-mail válido.'
  if (mensagem.trim().length < 10) return 'A mensagem precisa ter pelo menos 10 caracteres.'
  if (mensagem.length > 5000) return 'A mensagem passou de 5000 caracteres.'
  return null
}

/**
 * Formulário de contato.
 *
 * Contra spam, sem CAPTCHA: um campo-armadilha invisível para humanos e um
 * tempo mínimo entre carregar a página e enviar. Nenhum dos dois é barreira
 * séria contra um atacante dedicado — a proteção real é a allowlist de
 * domínios do EmailJS. Aqui o alvo é o bot de formulário genérico.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  // Marcado num efeito, nao no render: `Date.now()` no corpo do componente
  // e impuro. Comecando em 0, se o efeito nao tiver rodado a checagem de tempo
  // passa — falha para o lado de deixar o visitante enviar.
  const montadoEm = useRef(0)
  const ultimoEnvio = useRef(0)
  const armadilha = useRef('')

  useEffect(() => {
    montadoEm.current = Date.now()
  }, [])

  const configurado = contatoEstaConfigurado()

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const agora = Date.now()

    // Bot: caiu na armadilha ou enviou rápido demais. Fingimos sucesso para
    // não ensinar o script a contornar a checagem.
    if (armadilha.current || agora - montadoEm.current < TEMPO_MINIMO_MS) {
      setStatus('ok')
      setMessage('Mensagem enviada. Obrigado!')
      setValues(EMPTY_FORM)
      return
    }

    if (agora - ultimoEnvio.current < INTERVALO_ENTRE_ENVIOS_MS) {
      setStatus('erro')
      setMessage('Aguarde alguns segundos antes de enviar de novo.')
      return
    }

    const erro = validar(values)
    if (erro) {
      setStatus('erro')
      setMessage(erro)
      return
    }

    setStatus('enviando')
    setMessage(null)

    const resultado = await enviarContato({
      nome: values.nome.trim(),
      email: values.email.trim(),
      mensagem: values.mensagem.trim(),
    })

    if (resultado.ok) {
      ultimoEnvio.current = Date.now()
      setStatus('ok')
      setMessage('Mensagem enviada. Obrigado!')
      setValues(EMPTY_FORM)
      return
    }

    setStatus('erro')
    setMessage(
      resultado.motivo === 'nao-configurado'
        ? '[PENDENTE] Envio não configurado — preencha as variáveis VITE_EMAILJS_* no .env.local.'
        : 'Não foi possível enviar agora. Tente novamente ou use um dos canais ao lado.',
    )
  }

  const enviando = status === 'enviando'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[26px]">
      {/* Armadilha: fora da tela e fora da ordem de tabulação. Quem preenche é bot. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha este campo
          <input
            type="text"
            name="empresa"
            tabIndex={-1}
            autoComplete="off"
            onChange={(event) => (armadilha.current = event.target.value)}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={LABEL_CLASS}>Nome</span>
        <input
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
          required
          maxLength={120}
          autoComplete="name"
          disabled={enviando}
          className={FIELD_CLASS}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={LABEL_CLASS}>E-mail</span>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          maxLength={200}
          autoComplete="email"
          disabled={enviando}
          className={FIELD_CLASS}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={LABEL_CLASS}>Mensagem</span>
        <textarea
          name="mensagem"
          rows={4}
          value={values.mensagem}
          onChange={handleChange}
          required
          maxLength={5000}
          disabled={enviando}
          className={`${FIELD_CLASS} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={enviando}
        className="border-accent bg-accent hover:glow-cta flex items-center gap-2.5 self-start rounded-lg border px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando && (
          <span
            aria-hidden="true"
            className="size-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {enviando ? 'Enviando…' : 'Enviar mensagem'}
      </button>

      <output
        aria-live="polite"
        className={`font-mono text-[11px] ${status === 'ok' ? 'text-accent-text' : 'text-ink-faint'}`}
      >
        {message ??
          (configurado
            ? ''
            : '[PENDENTE] Configure as variáveis VITE_EMAILJS_* para ativar o envio.')}
      </output>
    </form>
  )
}

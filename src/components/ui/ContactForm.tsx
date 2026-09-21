import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import type { FormStatus } from '@/types/content'

interface FormValues {
  readonly nome: string
  readonly email: string
  readonly mensagem: string
}

const EMPTY_FORM: FormValues = { nome: '', email: '', mensagem: '' }

/** Validação simples de e-mail — suficiente para o cliente; o envio revalida. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_CLASS =
  'border-line focus:border-accent focus:glow-input w-full border-0 border-b bg-transparent px-0.5 py-2.5 text-[15px] outline-none transition-all duration-300'

const LABEL_CLASS = 'text-ink-faint font-mono text-[10px] tracking-[0.14em] uppercase'

function validate({ nome, email, mensagem }: FormValues): string | null {
  if (nome.trim().length < 2) return 'Informe seu nome.'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Informe um e-mail válido.'
  if (mensagem.trim().length < 10) return 'A mensagem precisa ter pelo menos 10 caracteres.'
  return null
}

/**
 * Formulário de contato.
 *
 * PENDENTE: o envio real ainda não está plugado. As credenciais vivem em
 * variáveis `VITE_EMAILJS_*` (ver `.env.example`) e nunca no código.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const error = validate(values)
    if (error) {
      setStatus('erro')
      setMessage(error)
      return
    }

    setStatus('enviando')
    setMessage(null)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID

    if (!serviceId) {
      setStatus('erro')
      setMessage('[PENDENTE] Envio não configurado — preencha as variáveis VITE_EMAILJS_* no .env.')
      return
    }

    try {
      // TODO(integracao): plugar o provedor de envio usando as variaveis VITE_EMAILJS_*.
      throw new Error('Integração de envio ainda não implementada.')
    } catch (submitError) {
      console.error('Falha ao enviar o formulário de contato:', submitError)
      setStatus('erro')
      setMessage('Não foi possível enviar agora. Tente novamente ou use um dos canais ao lado.')
    }
  }

  const isSending = status === 'enviando'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[26px]">
      <label className="flex flex-col gap-2">
        <span className={LABEL_CLASS}>Nome</span>
        <input
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
          required
          autoComplete="name"
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
          autoComplete="email"
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
          className={`${FIELD_CLASS} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={isSending}
        className="border-accent bg-accent hover:glow-cta self-start rounded-lg border px-7 py-3.5 text-sm font-semibold text-[#0D0D0D] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? 'Enviando…' : 'Enviar mensagem'}
      </button>

      <output
        aria-live="polite"
        className={`font-mono text-[11px] ${status === 'ok' ? 'text-accent' : 'text-ink-faint'}`}
      >
        {message}
      </output>
    </form>
  )
}

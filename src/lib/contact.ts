/**
 * Envio do formulário de contato via EmailJS.
 *
 * Usamos a API REST direto com `fetch` em vez do SDK: é uma requisição só e
 * evita mais uma dependência no bundle.
 *
 * Sobre a chave pública: ela é pública por definição — vai no JavaScript que
 * o visitante baixa, não há como escondê-la. O que de fato protege a conta é
 * a **allowlist de domínios** no painel do EmailJS. Configure-a antes de
 * publicar, senão qualquer um pode disparar e-mails pela sua cota.
 */

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
const TIMEOUT_MS = 15_000

export interface ContactPayload {
  readonly nome: string
  readonly email: string
  readonly mensagem: string
}

export type SendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly motivo: 'nao-configurado' | 'rede' | 'recusado' }

interface EmailJSConfig {
  readonly serviceId: string
  readonly templateId: string
  readonly publicKey: string
}

/** Lê as credenciais do ambiente. `null` se alguma estiver faltando. */
function lerConfig(): EmailJSConfig | null {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return null
  return { serviceId, templateId, publicKey }
}

/** `true` quando o envio está plugado — a UI usa isso para avisar antes do clique. */
export function contatoEstaConfigurado(): boolean {
  return lerConfig() !== null
}

export async function enviarContato(payload: ContactPayload): Promise<SendResult> {
  const config = lerConfig()
  if (!config) return { ok: false, motivo: 'nao-configurado' }

  // Sem timeout, uma rede ruim deixa o botão em "Enviando…" para sempre.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: {
          nome: payload.nome,
          email: payload.email,
          mensagem: payload.mensagem,
        },
      }),
    })

    if (!response.ok) {
      // O corpo do erro do EmailJS pode conter detalhes do template; fica no
      // console para depurar, nunca na tela do visitante.
      console.error('EmailJS recusou o envio:', response.status, await response.text())
      return { ok: false, motivo: 'recusado' }
    }

    return { ok: true }
  } catch (error) {
    console.error('Falha de rede ao enviar o formulário de contato:', error)
    return { ok: false, motivo: 'rede' }
  } finally {
    clearTimeout(timer)
  }
}

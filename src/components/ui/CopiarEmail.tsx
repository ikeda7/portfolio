import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CopiarEmailProps {
  readonly email: string
}

type Estado = 'parado' | 'copiado' | 'falhou'

/**
 * O e-mail em destaque, com um botão que copia.
 *
 * Mora entre o convite e os canais do Contato. Ali havia ~100px vazios —
 * o formulário ao lado é mais alto que convite + canais —, e em vez de
 * esticar alguma coisa o espaço virou atalho: muita gente prefere escrever
 * do próprio cliente de e-mail, e copiar o endereço é o passo que o
 * `mailto:` não resolve (ele abre o app que o sistema quiser, às vezes
 * nenhum).
 *
 * O retorno é em texto e num `aria-live`, não só no ícone: "Copiado" precisa
 * chegar a quem usa leitor de tela. Se o navegador negar a área de
 * transferência (contexto sem HTTPS, permissão), o botão diz que falhou em
 * vez de fingir — o endereço continua ali, selecionável.
 */
export function CopiarEmail({ email }: CopiarEmailProps) {
  const [estado, setEstado] = useState<Estado>('parado')

  useEffect(() => {
    if (estado === 'parado') return
    const id = window.setTimeout(() => setEstado('parado'), 2200)
    return () => window.clearTimeout(id)
  }, [estado])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email)
      setEstado('copiado')
    } catch {
      setEstado('falhou')
    }
  }

  const rotulo = estado === 'copiado' ? 'Copiado' : estado === 'falhou' ? 'Não deu' : 'Copiar'

  return (
    <div className="border-line bg-panel flex items-center justify-between gap-3 rounded-[10px] border py-2 pr-2 pl-4">
      <span className="text-ink min-w-0 font-mono text-[13px] tracking-[0.02em] break-all select-all">
        {email}
      </span>
      <button
        type="button"
        onClick={copiar}
        className={`hover:border-accent hover:text-accent-text flex min-h-9 shrink-0 items-center gap-2 rounded-md border px-3 font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 ${
          estado === 'copiado'
            ? 'border-accent text-accent-text'
            : 'border-line-strong text-ink-muted'
        }`}
      >
        {estado === 'copiado' ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
        {rotulo}
        <span className="sr-only"> o e-mail</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {estado === 'copiado'
          ? 'E-mail copiado.'
          : estado === 'falhou'
            ? 'Não foi possível copiar.'
            : ''}
      </span>
    </div>
  )
}

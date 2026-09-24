import { site } from '@/data/site'

interface MarcaProps {
  readonly className?: string
}

/**
 * A marca "Lucas /IKEDA", link para o topo. Uma só para o header e o rodapé.
 *
 * Eram duas cópias do mesmo JSX, com o nome em 16px e o sobrenome em 11px —
 * pequena demais para ser a assinatura da página (leitura do dono, 24/09).
 * Subiu para 20/13px, e virou componente para as duas não saírem de
 * sincronia na próxima mudança.
 *
 * O sobrenome acende no hover porque já é a parte em acento; o nome em branco
 * não tem para onde clarear. Foi a sonda de hover da auditoria que pegou as
 * duas marcas como os únicos clicáveis mudos da página.
 */
export function Marca({ className = '' }: MarcaProps) {
  return (
    <a
      href="#top"
      className={`group flex items-baseline gap-2 ${className}`}
      aria-label="Voltar ao topo"
    >
      <span className="text-ink text-[20px] leading-none font-bold tracking-[-0.02em]">
        {site.brand.firstName}
      </span>
      <span className="text-accent-text group-hover:text-ink font-mono text-[13px] leading-none tracking-[0.1em] transition-colors duration-300">
        /{site.brand.lastName.toUpperCase()}
      </span>
    </a>
  )
}

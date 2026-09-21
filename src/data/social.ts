import type { SocialChannel } from '@/types/content'

/**
 * Painel "Canais" da seção de contato.
 * PENDENTE: confirmar URLs reais (LinkedIn, e-mail público, X) com o dono.
 */
export const socialChannels: readonly SocialChannel[] = [
  { label: 'GitHub', href: 'https://github.com/ikeda7', icon: 'github' },
  { label: 'LinkedIn', href: null, icon: 'linkedin' },
  { label: 'E-mail', href: null, icon: 'mail' },
  { label: 'X', href: null, icon: 'x' },
]

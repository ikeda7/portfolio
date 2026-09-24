import type { SocialChannel } from '@/types/content'

/**
 * Canais de contato. O telefone do currículo fica de fora de propósito:
 * publicar número em site aberto é convite para spam.
 */
export const socialChannels: readonly SocialChannel[] = [
  { label: 'GitHub', handle: '/ikeda7', href: 'https://github.com/ikeda7', icon: 'github' },
  {
    label: 'LinkedIn',
    handle: '/lucasikeda',
    href: 'https://www.linkedin.com/in/lucasikeda',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    handle: '@_ikedaz',
    href: 'https://instagram.com/_ikedaz',
    icon: 'instagram',
  },
  {
    label: 'E-mail',
    handle: 'lucasvikeda@gmail.com',
    href: 'mailto:lucasvikeda@gmail.com',
    icon: 'mail',
  },
]

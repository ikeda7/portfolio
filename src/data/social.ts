import type { SocialChannel } from '@/types/content'

/** Canais do currículo. O telefone existe, mas fica fora para evitar spam. */
export const socialChannels: readonly SocialChannel[] = [
  { label: 'GitHub', href: 'https://github.com/ikeda7', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucasikeda', icon: 'linkedin' },
  { label: 'E-mail', href: 'mailto:lucasvikeda@gmail.com', icon: 'mail' },
]

import { SiteConfig } from 'types'

import { absoluteUrl } from '@/lib/utils'

const defaultUrl = absoluteUrl('')

/** Public URL path for the primary HandlerHub logo mark. */
export const siteLogoSrc = '/handler-hub-logo-new.png'

export const siteConfig: SiteConfig = {
  name: 'HandlerHub',
  description:
    'Connect with professional dog show handlers. Find, book, and manage handler services for your next dog show with ease.',
  shortDescription:
    'The professional marketplace connecting dog show handlers with exhibitors',
  url: defaultUrl,
  mailSupport: 'support@handlerhub.com',
  address: 'HandlerHub - Professional Handler Services',
  ogImage: `${defaultUrl}/og.jpg`,
  social: {
    links: {
      twitter: {
        label: 'Twitter',
        icon: 'twitter',
        href: '',
      },
      instagram: {
        label: 'Instagram',
        icon: 'instagram',
        href: '',
      },
      facebook: {
        label: 'Facebook',
        icon: 'facebook',
        href: '',
      },
    },
  },
}

import { MarketingConfig } from 'types'

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: 'Browse',
      href: '/handlers',
    },
    {
      title: 'How it Works',
      href: '/#how-it-works',
    },
    {
      title: 'For Handlers',
      href: '/for-handlers',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  multiLevelNav: [
    {
      title: 'Browse',
      href: '/handlers',
    },
    {
      title: 'How it Works',
      href: '/#how-it-works',
    },
    {
      title: 'For Handlers',
      href: '/for-handlers',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  footer: {
    links: [
      {
        href: 'https://bit.ly/48LTNin',
        name: 'Public Roadmap',
        target: '_blank',
      },
      {
        href: '/legal/privacy-policy',
        name: 'Privacy Policy',
      },
      {
        href: '/legal/cookies-policy',
        name: 'Cookies Policy',
      },
      {
        href: '/legal/terms-of-service',
        name: 'Terms of Service',
      },
    ],
  },
  postsPerPage: 6,
}

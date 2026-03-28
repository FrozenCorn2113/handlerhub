import { Metadata } from 'next'

import { siteConfig } from '@/config/site'

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      'dog show',
      'handler',
      'exhibitor',
      'AKC',
      'conformation',
      'grooming',
      'professional handler',
      'HandlerHub',
    ],
    authors: [
      {
        name: 'HandlerHub',
      },
    ],
    creator: 'HandlerHub',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title,
      description,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@handlerhub',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

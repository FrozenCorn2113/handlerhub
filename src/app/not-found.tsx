import Image from 'next/image'
import Link from 'next/link'

import {
  EnvelopeSimple,
  MagnifyingGlass,
  Question,
} from '@phosphor-icons/react/dist/ssr'

export default function NotFoundPage() {
  const navigations = [
    {
      icon: <MagnifyingGlass size={24} weight="duotone" />,
      title: 'Find Handlers',
      desc: 'Browse our directory of professional dog show handlers by breed and region.',
      href: '/handlers',
    },
    {
      icon: <Question size={24} weight="duotone" />,
      title: 'Help & FAQ',
      desc: 'Find answers to common questions about HandlerHub.',
      href: '/help',
    },
    {
      icon: <EnvelopeSimple size={24} weight="duotone" />,
      title: 'Contact Support',
      desc: 'Get in touch with our team for help with your account.',
      href: '/contact',
    },
  ]

  return (
    <main className="to-sand-50 flex min-h-screen items-center justify-center bg-gradient-to-b from-white px-4 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-lg text-center">
        <Link href="/" className="mb-8 inline-block">
          <Image
            src="/handler-hub-logo-dark.png"
            width={48}
            height={48}
            alt="HandlerHub"
            priority
          />
        </Link>

        <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="bg-brand-600 hover:bg-brand-700 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition"
          >
            Back to Home
          </Link>
        </div>

        <ul className="mt-12 divide-y divide-gray-200 text-left dark:divide-gray-800">
          {navigations.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className="flex gap-x-4 py-5 transition hover:opacity-80"
              >
                <div className="bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 flex size-12 flex-none items-center justify-center rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

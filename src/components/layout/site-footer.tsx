import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { marketingConfig } from '@/config/marketing'
import { siteConfig } from '@/config/site'

import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'

import ChangelogButton from '@/components/shared/changelog-button'
import { Icons } from '@/components/shared/icons'
import IconLogo from '@/components/shared/logo-icon'

import { SocialLink } from '@/root/types'
import { Lock } from '@phosphor-icons/react/dist/ssr'

export async function SiteFooter({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const user = await getCurrentUser()
  const footerSocialLinks: SocialLink[] = Object.entries(
    siteConfig.social?.links ?? {}
  )
    .filter(([, value]) => value != null)
    .map(([key, value]) => ({
      ...value!,
      icon: key as keyof typeof Icons,
    }))
  const footerMenuLinks = marketingConfig.footer.links

  return (
    <footer
      className={cn('border-t border-gray-100 bg-white pb-10 pt-16', className)}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4">
              <IconLogo className="h-16 w-auto" />
            </div>
            <p className="mb-6 max-w-xs text-sm text-gray-500">
              {siteConfig.shortDescription ?? siteConfig.description}
            </p>
            <div className="flex gap-3">
              {footerSocialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="flex size-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
                >
                  <span className="sr-only">{link.label}</span>
                  {React.createElement(Icons[link.icon || 'plus'], {
                    height: 18,
                    width: 18,
                    className: 'text-current',
                    'aria-hidden': 'true',
                  })}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Platform
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href="/handlers"
                >
                  Find a Handler
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href="/for-handlers"
                >
                  For Handlers
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Company
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href="/#how-it-works"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href="/feedback"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <a
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  href={footerMenuLinks[0]?.href ?? '#'}
                  target="_blank"
                >
                  Public Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Legal
            </h5>
            <ul className="space-y-4">
              {footerMenuLinks
                .filter((l) => !l.target)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-gray-500 transition-colors hover:text-gray-900"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name} Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-xs text-gray-400">
              <Lock size={14} />
              Secure SSL Encryption
            </span>
            {user && (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Dashboard</span>
                  {React.createElement(Icons.user, {
                    height: 20,
                    width: 20,
                    'aria-hidden': 'true',
                  })}
                </Link>
                <ChangelogButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

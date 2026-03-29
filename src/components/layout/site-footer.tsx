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
      className={cn(
        'border-t border-white/10 bg-[#14472F] pb-10 pt-20 text-[#F8F4EE]/70',
        className
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Wordmark */}
        <div className="mb-16 border-b border-white/10 pb-16 text-center">
          <Image
            src="/images/brand/footer-wordmark.png"
            alt="HandlerHub"
            width={480}
            height={120}
            className="mx-auto max-w-[280px] sm:max-w-[480px]"
            style={{
              width: '100%',
              height: 'auto',
              opacity: 0.9,
            }}
          />
        </div>

        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-6 flex items-center gap-3 text-[#F8F4EE]">
              <IconLogo className="size-10" />
              <h2
                className="text-2xl tracking-tight text-[#F8F4EE]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                }}
              >
                {siteConfig.name}
              </h2>
            </div>
            <p className="mb-8 max-w-xs text-[#F8F4EE]/70">
              {siteConfig.shortDescription ?? siteConfig.description}
            </p>
            <div className="flex gap-4">
              {footerSocialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-[#F8F4EE]/70 transition-all hover:bg-white/20 hover:text-white"
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
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Platform
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="transition-colors hover:text-[#F8F4EE]"
                  href="/handlers"
                >
                  Find a Handler
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#F8F4EE]"
                  href="/for-handlers"
                >
                  For Handlers
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#F8F4EE]"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Company
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="transition-colors hover:text-[#F8F4EE]"
                  href="/#how-it-works"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#F8F4EE]"
                  href="/feedback"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-[#F8F4EE]"
                  href={footerMenuLinks[0]?.href ?? '#'}
                  target="_blank"
                >
                  Public Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Legal
            </h5>
            <ul className="space-y-4">
              {footerMenuLinks
                .filter((l) => !l.target)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      className="transition-colors hover:text-[#F8F4EE]"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <p className="text-sm text-[#F8F4EE]/50">
            &copy; {new Date().getFullYear()} {siteConfig.name} Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-xs font-bold text-[#F8F4EE]/50">
              <Lock size={14} />
              Secure SSL Encryption
            </span>
            {user && (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-[#F8F4EE]/70 hover:text-[#F8F4EE]"
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

import React, { useCallback } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'

import { cn } from '@/lib/utils'

import IconLogo from '@/components/shared/logo-icon'

interface MainNavProps {
  items?: any
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const currentPathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const closeMobileMenu = useCallback(() => {
    setShowMobileMenu(false)
  }, [])

  React.useEffect(() => {
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest('.mobile-nav') &&
        showMobileMenu
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener('click', closeMobileMenuOnClickOutside)

    return () => {
      document.removeEventListener('click', closeMobileMenuOnClickOutside)
    }
  }, [showMobileMenu, closeMobileMenu])

  const isActiveLink = (href: string) =>
    href === currentPathname ||
    (href !== '/' && currentPathname.startsWith(href))

  return (
    <div className="flex items-center gap-8 md:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <IconLogo />
        <span className="hidden text-lg font-semibold tracking-tight text-slate-900 sm:inline-block">
          Handler<span className="text-primary">Hub</span>
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 lg:flex">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-sm font-medium transition-colors hover:text-slate-900',
                isActiveLink(item.href) ? 'text-slate-900' : 'text-slate-600',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
              onClick={closeMobileMenu}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

import React from 'react'

import Link from 'next/link'

import { siteConfig } from '@/config/site'

import { cn } from '@/lib/utils'

import { NavDesktop } from '@/components/layout/navigation/animation/nav-animation-desktop'
import { NavMobile } from '@/components/layout/navigation/animation/nav-animation-mobile'
import IconLogo from '@/components/shared/logo-icon'

type MainNavProps = {
  className?: string
}

export const MainNavAnimation: React.FC<MainNavProps> = ({ className }) => {
  const MainNavClasses = cn(
    'fixed',
    'top-0',
    'left-0',
    'right-0',
    'bg-neutral-950',
    'border-b',
    'border-neutral-700',
    className
  )

  return (
    <div className={MainNavClasses}>
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <Link href="/" className="items-center sm:flex">
          <IconLogo className="h-10 w-auto" />
        </Link>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  )
}

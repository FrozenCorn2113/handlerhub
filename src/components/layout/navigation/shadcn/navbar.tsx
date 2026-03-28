'use client'

import { cn } from '@/lib/utils'

import { useCurrentUser } from '@/hooks/use-current-user'
import useScroll from '@/hooks/use-scroll'

import { MainNav } from '@/components/layout/navigation/shadcn/main-nav'
import { UserAccountNav } from '@/components/layout/navigation/user-account-nav'
import AuthLink from '@/components/shared/auth-link'
import ButtonShareFeedback from '@/components/shared/button-share-feedback'
import ChangelogButton from '@/components/shared/changelog-button'

import MobileSheetMenu from '../shadcn/mobile-sheet-menu'
import { MainNavItem } from '@/root/types'

interface NavBarProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  rightElements?: React.ReactNode
  scroll?: boolean
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50)
  const user = useCurrentUser()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all',
        { 'shadow-sm': scroll ? scrolled : false }
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center gap-3">
          {rightElements}

          {!user && (
            <>
              <ChangelogButton />
              <AuthLink
                variant="ghost"
                href="/login"
                text="Sign In"
                className="hidden px-4 text-sm font-semibold sm:flex"
              />
            </>
          )}

          {user && (
            <>
              <ul className="mr-2 hidden items-center gap-3 md:flex">
                <li>
                  <ButtonShareFeedback />
                </li>
              </ul>
              <UserAccountNav initialUser={user} />
            </>
          )}

          {!user && (
            <>
              <AuthLink
                href="/register"
                text="Get Started"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
              />
            </>
          )}
          <MobileSheetMenu />
        </div>
      </div>
    </header>
  )
}

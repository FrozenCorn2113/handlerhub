'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  type DashboardNavItem,
  exhibitorNavItems,
  handlerNavItems,
} from '@/config/dashboard'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { UserAvatar } from '@/components/shared/user-avatar'

import {
  CalendarBlank,
  ChartBar,
  ChatCircle,
  Envelope,
  Gear,
  House,
  List,
  MagnifyingGlass,
  Question,
  Receipt,
  SignOut,
  Storefront,
  Trophy,
  User,
  Users,
} from '@phosphor-icons/react'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'

// Map nav titles to Phosphor icons
const iconMap: Record<string, PhosphorIcon> = {
  Home: House,
  Bookings: CalendarBlank,
  Clients: Users,
  Shows: Trophy,
  Profile: User,
  'My Dogs': House,
  'Find a Handler': MagnifyingGlass,
  Invoices: Receipt,
  Inbox: Envelope,
  Messages: ChatCircle,
  Stats: ChartBar,
  Services: Storefront,
}

// ---------------------------------------------------------------------------
// Active state detection
// ---------------------------------------------------------------------------
function isItemActive(item: DashboardNavItem, pathname: string) {
  if (item.href === '/dashboard' && !item.children) {
    return pathname === '/dashboard'
  }
  if (
    pathname === item.href ||
    (item.href !== '/dashboard' && pathname.startsWith(item.href))
  )
    return true
  if (item.children?.some((c) => pathname.startsWith(c.href))) return true
  return false
}

function isChildActive(childHref: string, pathname: string) {
  return (
    pathname === childHref ||
    (childHref !== '/dashboard' && pathname.startsWith(childHref))
  )
}

// ---------------------------------------------------------------------------
// Sidebar nav content (shared between desktop and mobile)
// ---------------------------------------------------------------------------
function SidebarNav({
  items,
  pathname,
  onNavClick,
}: {
  items: DashboardNavItem[]
  pathname: string
  onNavClick?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {items.map((item) => {
        const active = isItemActive(item, pathname)
        const Icon = iconMap[item.title]

        if (!item.children) {
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-all ${
                active
                  ? 'border-l-2 border-paddock-green bg-sage/30 text-paddock-green'
                  : 'border-l-2 border-transparent text-warm-brown hover:bg-light-sand hover:text-ringside-black'
              }`}
            >
              {Icon && (
                <Icon
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  className={active ? 'text-paddock-green' : 'text-warm-gray'}
                />
              )}
              {item.title}
            </Link>
          )
        }

        // Parent with children
        return (
          <div key={item.title} className="flex flex-col">
            <div
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-sans text-[13px] font-medium ${
                active ? 'text-paddock-green' : 'text-warm-brown'
              }`}
            >
              {Icon && (
                <Icon
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  className={active ? 'text-paddock-green' : 'text-warm-gray'}
                />
              )}
              {item.title}
            </div>
            {/* Always show children for items with sub-nav */}
            <div className="ml-5 flex flex-col gap-0.5 border-l border-sand pl-3">
              {item.children.map((child) => {
                const childIsActive = isChildActive(child.href, pathname)
                const ChildIcon = iconMap[child.title]
                return (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={onNavClick}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 font-sans text-[13px] font-medium transition-all ${
                      childIsActive
                        ? 'bg-sage/30 text-paddock-green'
                        : 'text-warm-gray hover:bg-light-sand hover:text-ringside-black'
                    }`}
                  >
                    {ChildIcon && (
                      <ChildIcon
                        size={16}
                        weight={childIsActive ? 'fill' : 'regular'}
                        className={
                          childIsActive
                            ? 'text-paddock-green'
                            : 'text-warm-gray'
                        }
                      />
                    )}
                    {child.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Bottom utility links
// ---------------------------------------------------------------------------
function SidebarFooter({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <div className="border-t border-sand px-3 py-4">
      <div className="flex flex-col gap-0.5">
        <Link
          href="/dashboard/settings"
          onClick={onNavClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-light-sand hover:text-ringside-black"
        >
          <Gear size={20} weight="regular" className="text-warm-gray" />
          Settings
        </Link>
        <Link
          href="/help"
          onClick={onNavClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-light-sand hover:text-ringside-black"
        >
          <Question size={20} weight="regular" className="text-warm-gray" />
          Support
        </Link>
        <button
          onClick={() => {
            onNavClick?.()
            signOut({ callbackUrl: '/' })
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-light-sand hover:text-ringside-black"
        >
          <SignOut size={20} weight="regular" className="text-warm-gray" />
          Log out
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// User info block
// ---------------------------------------------------------------------------
function SidebarUserInfo() {
  const { data: session } = useSession()
  const user = session?.user
  if (!user) return null

  const displayName = user.name || 'User'
  const roleName =
    user.role === 'HANDLER'
      ? 'Handler'
      : user.role === 'EXHIBITOR'
        ? 'Exhibitor'
        : user.role === 'ADMIN'
          ? 'Admin'
          : 'Member'

  return (
    <div className="border-t border-sand px-3 py-3">
      <Link
        href="/dashboard/profile"
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-light-sand"
      >
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.image || '/images/avatars/noavatar.png',
          }}
          className="size-8 border border-tan/40"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-[13px] font-semibold text-ringside-black">
            {displayName}
          </p>
          <p className="font-sans text-[11px] text-warm-gray">{roleName}</p>
        </div>
      </Link>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DashboardSidebar -- main export
// ---------------------------------------------------------------------------
export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const userRole = session?.user?.role
  const items = userRole === 'EXHIBITOR' ? exhibitorNavItems : handlerNavItems

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/dashboard">
          <span
            className="text-2xl tracking-tight text-paddock-green"
            style={{ fontFamily: "'Roca One', sans-serif" }}
          >
            HandlerHub
          </span>
        </Link>
      </div>

      {/* Main nav */}
      <div className="flex flex-1 flex-col overflow-y-auto pt-2">
        <SidebarNav
          items={items}
          pathname={pathname}
          onNavClick={() => setMobileOpen(false)}
        />
      </div>

      {/* User info */}
      <SidebarUserInfo />

      {/* Bottom utility links */}
      <SidebarFooter onNavClick={() => setMobileOpen(false)} />
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[220px] md:shrink-0 md:flex-col md:border-r md:border-sand md:bg-white">
        {sidebarContent}
      </aside>

      {/* Mobile hamburger button */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="flex size-10 items-center justify-center rounded-xl border border-sand bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(28,18,8,0.1)] transition-all duration-200 hover:scale-105"
              aria-label="Open navigation"
            >
              <List size={20} weight="bold" className="text-warm-brown" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-[260px] flex-col border-r border-sand bg-white p-0"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

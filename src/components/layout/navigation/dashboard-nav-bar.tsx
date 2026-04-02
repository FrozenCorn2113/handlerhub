'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  type DashboardNavItem,
  exhibitorNavItems,
  handlerNavItems,
} from '@/config/dashboard'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { UserAvatar } from '@/components/shared/user-avatar'

import {
  Bell,
  CalendarBlank,
  CaretDown,
  ChartBar,
  ChatCircle,
  Envelope,
  Gear,
  House,
  MagnifyingGlass,
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
// Profile Dropdown -- uses Radix DropdownMenu (portal-based)
// ---------------------------------------------------------------------------
function ProfileDropdown() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-full border border-tan/80 bg-white py-1.5 pl-1.5 pr-4 shadow-[0_1px_4px_rgba(28,18,8,0.06)] transition-all duration-200 hover:border-tan hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)] focus:outline-none">
          <UserAvatar
            user={{
              name: user.name || null,
              image: user.image || '/images/avatars/noavatar.png',
            }}
            className="size-7 border border-tan/40"
          />
          <span className="font-sans text-[13px] font-medium text-ringside-black">
            {displayName.split(' ')[0]}
          </span>
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border-tan/80 bg-white py-2 shadow-[0_8px_30px_rgba(28,18,8,0.14)]"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <p className="font-sans text-sm font-semibold text-ringside-black">
            {displayName}
          </p>
          <p className="font-sans text-xs font-normal text-warm-gray">
            {roleName}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-tan/40" />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profile"
            className="flex cursor-pointer items-center gap-3 px-4 py-2.5 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5"
          >
            <User size={15} className="text-warm-gray" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex cursor-pointer items-center gap-3 px-4 py-2.5 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5"
          >
            <Gear size={15} className="text-warm-gray" />
            Settings
          </Link>
        </DropdownMenuItem>
        {user.role === 'ADMIN' && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard-admin"
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5"
            >
              <Gear size={15} className="text-warm-gray" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-tan/40" />
        <DropdownMenuItem
          onSelect={() => signOut({ callbackUrl: '/' })}
          className="flex cursor-pointer items-center gap-3 px-4 py-2.5 font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5"
        >
          <SignOut size={15} className="text-warm-gray" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ---------------------------------------------------------------------------
// DashboardNavBar -- main export
// ---------------------------------------------------------------------------
export function DashboardNavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const userRole = session?.user?.role
  const items = userRole === 'EXHIBITOR' ? exhibitorNavItems : handlerNavItems

  function isItemActive(item: DashboardNavItem) {
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

  return (
    <nav className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-tan bg-ring-cream px-6">
      {/* Wordmark */}
      <div className="mr-8 flex shrink-0 items-center">
        <Link href="/dashboard">
          <span
            className="text-2xl tracking-tight text-paddock-green"
            style={{ fontFamily: "'Roca One', sans-serif" }}
          >
            HandlerHub
          </span>
        </Link>
      </div>

      {/* Center nav links -- DropdownMenu per trigger (portal-based) */}
      <div className="hidden flex-1 items-center gap-1 md:flex">
        {items.map((item) => {
          const active = isItemActive(item)

          // Simple link (no children)
          if (!item.children) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-all ${
                  active
                    ? 'bg-paddock-green text-white'
                    : 'text-warm-brown hover:bg-light-sand hover:text-ringside-black'
                }`}
              >
                {item.title}
              </Link>
            )
          }

          // Dropdown item (has children)
          return (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-all focus:outline-none ${
                    active
                      ? 'bg-paddock-green text-white hover:bg-paddock-green/90'
                      : 'text-warm-brown hover:bg-light-sand hover:text-ringside-black'
                  }`}
                >
                  {item.title}
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={active ? 'text-white/80' : 'text-warm-gray'}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="min-w-[200px] rounded-xl border-tan/80 bg-white py-2 shadow-[0_8px_30px_rgba(28,18,8,0.14),0_2px_8px_rgba(28,18,8,0.06)]"
              >
                {item.children.map((child) => {
                  const ChildIcon = iconMap[child.title]
                  const isChildActive =
                    pathname === child.href ||
                    (child.href !== '/dashboard' &&
                      pathname.startsWith(child.href))
                  return (
                    <DropdownMenuItem key={child.title} asChild>
                      <Link
                        href={child.href}
                        className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left font-sans text-[13px] font-medium transition-all hover:bg-paddock-green/5 hover:text-ringside-black ${
                          isChildActive
                            ? 'bg-paddock-green/5 text-paddock-green'
                            : 'text-warm-brown'
                        }`}
                      >
                        {ChildIcon && (
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paddock-green/10">
                            <ChildIcon
                              size={15}
                              weight="regular"
                              className="text-paddock-green"
                            />
                          </span>
                        )}
                        {child.title}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        })}
      </div>

      {/* Right cluster */}
      <div className="ml-4 flex items-center gap-2">
        {/* Notification bell */}
        <Link
          href="/dashboard/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-light-sand"
        >
          <Bell size={20} weight="regular" className="text-warm-brown" />
        </Link>

        {/* Settings gear */}
        <Link
          href="/dashboard/settings"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-light-sand"
        >
          <Gear size={20} weight="regular" className="text-warm-brown" />
        </Link>

        {/* Profile dropdown */}
        <ProfileDropdown />
      </div>
    </nav>
  )
}

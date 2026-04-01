'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Bell,
  CalendarBlank,
  CaretDown,
  ChartBar,
  ChatCircle,
  Envelope,
  Gear,
  House,
  Receipt,
  Trophy,
  User,
  Users,
} from '@phosphor-icons/react'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

interface OpsNavProps {
  role: 'handler' | 'exhibitor'
}

interface NavChild {
  label: string
  icon: PhosphorIcon
}

interface NavItem {
  label: string
  icon: PhosphorIcon
  children?: NavChild[]
}

const handlerNav: NavItem[] = [
  { label: 'Home', icon: House },
  {
    label: 'Bookings',
    icon: CalendarBlank,
    children: [
      { label: 'Bookings', icon: CalendarBlank },
      { label: 'Invoices', icon: Receipt },
    ],
  },
  {
    label: 'Clients',
    icon: Users,
    children: [
      { label: 'Clients', icon: Users },
      { label: 'Inbox', icon: Envelope },
    ],
  },
  {
    label: 'Shows',
    icon: Trophy,
    children: [
      { label: 'Shows', icon: Trophy },
      { label: 'Stats', icon: ChartBar },
    ],
  },
  { label: 'Profile', icon: User },
]

const exhibitorNav: NavItem[] = [
  { label: 'My Dogs', icon: House },
  {
    label: 'Bookings',
    icon: CalendarBlank,
    children: [
      { label: 'Bookings', icon: CalendarBlank },
      { label: 'Messages', icon: ChatCircle },
    ],
  },
  { label: 'Find a Handler', icon: Users },
]

function NavDropdown({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem
  isActive: boolean
  onSelect: (label: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!item.children) {
    return (
      <button
        onClick={() => onSelect(item.label)}
        className={`whitespace-nowrap rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-all ${
          isActive
            ? 'bg-paddock-green/10 text-paddock-green'
            : 'text-warm-brown hover:bg-light-sand hover:text-ringside-black'
        }`}
      >
        {item.label}
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-all ${
          isActive
            ? 'bg-paddock-green/10 text-paddock-green'
            : 'text-warm-brown hover:bg-light-sand hover:text-ringside-black'
        }`}
      >
        {item.label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-tan/80 bg-white py-2 shadow-[0_8px_30px_rgba(28,18,8,0.14),0_2px_8px_rgba(28,18,8,0.06)]">
          {item.children.map((child) => {
            const ChildIcon = child.icon
            return (
              <button
                key={child.label}
                onClick={() => {
                  onSelect(child.label)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5 hover:text-ringside-black"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paddock-green/10">
                  <ChildIcon
                    size={15}
                    weight="regular"
                    className="text-paddock-green"
                  />
                </span>
                {child.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function OpsNav({ role }: OpsNavProps) {
  const items = role === 'handler' ? handlerNav : exhibitorNav
  const [activeTab, setActiveTab] = useState(items[0].label)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const firstName = role === 'handler' ? 'James' : 'Sarah'
  const initials = role === 'handler' ? 'JR' : 'SM'
  const roleName = role === 'handler' ? 'Handler' : 'Exhibitor'
  const notificationCount = role === 'handler' ? 3 : 1

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function isItemActive(item: NavItem) {
    if (item.label === activeTab) return true
    if (item.children?.some((c) => c.label === activeTab)) return true
    return false
  }

  return (
    <nav className="flex h-[72px] items-center justify-between border-b border-tan bg-ring-cream px-6">
      {/* Logo */}
      <div className="mr-8 flex shrink-0 items-center">
        <span
          className="text-2xl tracking-tight text-ringside-black"
          style={{ fontFamily: "'Roca One', sans-serif" }}
        >
          HandlerHub
        </span>
      </div>

      {/* Nav Items */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {items.map((item) => (
          <NavDropdown
            key={item.label}
            item={item}
            isActive={isItemActive(item)}
            onSelect={setActiveTab}
          />
        ))}
      </div>

      {/* Right cluster: notifications, settings, profile */}
      <div className="ml-4 flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-light-sand">
          <Bell size={20} weight="regular" className="text-warm-brown" />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-[#24845a] to-paddock-green px-1 font-sans text-[10px] font-bold text-white shadow-[0_1px_4px_rgba(31,107,74,0.3)]">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-light-sand">
          <Gear size={20} weight="regular" className="text-warm-brown" />
        </button>

        {/* Profile card element */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-full border border-tan/80 bg-white py-1.5 pl-1.5 pr-4 shadow-[0_1px_4px_rgba(28,18,8,0.06)] transition-all duration-200 hover:border-tan hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#24845a] to-paddock-green font-sans text-[11px] font-bold text-white">
              {initials}
            </div>
            <span className="font-sans text-[13px] font-medium text-ringside-black">
              {firstName}
            </span>
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-tan/80 bg-white py-2 shadow-[0_8px_30px_rgba(28,18,8,0.14)]">
              <div className="border-b border-tan/40 px-4 py-3">
                <p className="font-sans text-sm font-semibold text-ringside-black">
                  {firstName} {role === 'handler' ? 'Rodriguez' : 'Mitchell'}
                </p>
                <p className="font-sans text-xs text-warm-gray">{roleName}</p>
              </div>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5">
                <User size={15} className="text-warm-gray" />
                View Profile
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-sans text-[13px] font-medium text-warm-brown transition-all hover:bg-paddock-green/5">
                <Gear size={15} className="text-warm-gray" />
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

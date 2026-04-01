'use client'

import { useEffect, useRef, useState } from 'react'

import { CaretDown } from '@phosphor-icons/react'

interface OpsNavProps {
  role: 'handler' | 'exhibitor'
}

interface NavItem {
  label: string
  children?: string[]
}

const handlerNav: NavItem[] = [
  { label: 'Home' },
  { label: 'Bookings', children: ['Bookings', 'Invoices'] },
  { label: 'Clients', children: ['Clients', 'Inbox'] },
  { label: 'Shows', children: ['Shows', 'Stats'] },
  { label: 'Profile' },
]

const exhibitorNav: NavItem[] = [
  { label: 'My Dogs' },
  { label: 'Bookings', children: ['Bookings', 'Messages'] },
  { label: 'Find a Handler' },
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
        className={`whitespace-nowrap px-3 py-2 font-sans text-[13px] font-medium transition-colors ${
          isActive
            ? 'text-paddock-green'
            : 'text-warm-brown hover:text-ringside-black'
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
        className={`flex items-center gap-1 whitespace-nowrap px-3 py-2 font-sans text-[13px] font-medium transition-colors ${
          isActive
            ? 'text-paddock-green'
            : 'text-warm-brown hover:text-ringside-black'
        }`}
      >
        {item.label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-tan bg-white py-1 shadow-[0_4px_20px_rgba(28,18,8,0.12)]">
          {item.children.map((child) => (
            <button
              key={child}
              onClick={() => {
                onSelect(child)
                setOpen(false)
              }}
              className="block w-full px-4 py-2 text-left font-sans text-[13px] font-medium text-warm-brown transition-colors hover:bg-light-sand hover:text-ringside-black"
            >
              {child}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function OpsNav({ role }: OpsNavProps) {
  const items = role === 'handler' ? handlerNav : exhibitorNav
  const [activeTab, setActiveTab] = useState(items[0].label)
  const initials = role === 'handler' ? 'JH' : 'SE'

  // Check if a nav item or its children is active
  function isItemActive(item: NavItem) {
    if (item.label === activeTab) return true
    if (item.children?.includes(activeTab)) return true
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

      {/* Avatar */}
      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paddock-green font-sans text-xs font-semibold text-white">
        {initials}
      </div>
    </nav>
  )
}

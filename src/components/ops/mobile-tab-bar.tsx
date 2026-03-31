'use client'

import { useState } from 'react'

import {
  CalendarBlank,
  ChatCircle,
  Dog,
  DotsThreeCircle,
  Envelope,
  House,
  MagnifyingGlass,
  Trophy,
} from '@phosphor-icons/react'

interface MobileTabBarProps {
  role: 'handler' | 'exhibitor'
  fixed?: boolean
}

const handlerItems = [
  { label: 'Home', icon: House },
  { label: 'Bookings', icon: CalendarBlank },
  { label: 'Inbox', icon: Envelope },
  { label: 'Shows', icon: Trophy },
  { label: 'More', icon: DotsThreeCircle },
]

const exhibitorItems = [
  { label: 'Home', icon: House },
  { label: 'Dogs', icon: Dog },
  { label: 'Bookings', icon: CalendarBlank },
  { label: 'Messages', icon: ChatCircle },
  { label: 'Find Handler', icon: MagnifyingGlass },
]

export function MobileTabBar({ role, fixed = false }: MobileTabBarProps) {
  const items = role === 'handler' ? handlerItems : exhibitorItems
  const [active, setActive] = useState(items[0].label)

  return (
    <div
      className={`${fixed ? 'fixed bottom-0 left-0 right-0 lg:hidden' : ''} flex items-center justify-around border-t border-tan bg-white py-2`}
    >
      {items.map(({ label, icon: Icon }) => (
        <button
          key={label}
          onClick={() => setActive(label)}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            active === label ? 'text-paddock-green' : 'text-warm-gray'
          }`}
        >
          <Icon size={22} weight={active === label ? 'fill' : 'regular'} />
          <span className="font-sans text-[10px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}

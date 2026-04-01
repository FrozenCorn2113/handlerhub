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
      className={`${fixed ? 'fixed bottom-4 left-4 right-4 lg:hidden' : ''}`}
    >
      <div className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-tan/60 bg-white/95 px-2 py-2 shadow-[0_4px_20px_rgba(28,18,8,0.12),0_0_0_1px_rgba(28,18,8,0.04)] backdrop-blur-md">
        {items.map(({ label, icon: Icon }) => {
          const isActive = active === label
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                isActive ? 'text-white' : 'text-warm-gray hover:text-warm-brown'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-paddock-green shadow-[0_2px_8px_rgba(31,107,74,0.3)]" />
              )}
              <Icon
                size={20}
                weight={isActive ? 'fill' : 'regular'}
                className="relative z-10"
              />
              <span className="relative z-10 font-sans text-[9px] font-semibold">
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

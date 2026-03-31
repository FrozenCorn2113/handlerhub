'use client'

import { useState } from 'react'

interface OpsNavProps {
  role: 'handler' | 'exhibitor'
}

const handlerTabs = [
  'Home',
  'Bookings',
  'Inbox',
  'Clients',
  'Shows',
  'Invoices',
  'Stats',
  'Profile',
]
const exhibitorTabs = [
  'Home',
  'My Dogs',
  'Bookings',
  'Messages',
  'Find a Handler',
]

export function OpsNav({ role }: OpsNavProps) {
  const tabs = role === 'handler' ? handlerTabs : exhibitorTabs
  const [activeTab, setActiveTab] = useState(tabs[0])
  const initials = role === 'handler' ? 'JH' : 'SE'

  return (
    <nav className="flex h-[72px] items-center justify-between border-b border-tan bg-ring-cream px-6">
      {/* Logo */}
      <div className="mr-8 flex shrink-0 items-center">
        <span className="font-display text-2xl font-light tracking-tight text-ringside-black">
          Handler
        </span>
        <span className="font-sans text-xl font-semibold tracking-tight text-paddock-green">
          Hub
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative whitespace-nowrap px-3 py-2 font-sans text-[13px] font-medium transition-colors ${
              activeTab === tab
                ? 'text-paddock-green'
                : 'text-warm-brown hover:text-ringside-black'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-paddock-green" />
            )}
          </button>
        ))}
      </div>

      {/* Avatar */}
      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paddock-green font-sans text-xs font-semibold text-white">
        {initials}
      </div>
    </nav>
  )
}

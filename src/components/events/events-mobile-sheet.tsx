'use client'

import { type ReactNode, useCallback, useState } from 'react'

import { Funnel, List, MapTrifold } from '@phosphor-icons/react'
import { Drawer } from 'vaul'

interface EventsMobileSheetProps {
  filterSummary: string
  eventCount: number
  filterContent: ReactNode
  listContent: ReactNode
}

export function EventsMobileSheet({
  filterSummary,
  eventCount,
  filterContent,
  listContent,
}: EventsMobileSheetProps) {
  const [snap, setSnap] = useState<number | string | null>('148px')

  return (
    <Drawer.Root
      snapPoints={['148px', 0.55, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
          style={{
            maxHeight: '92vh',
          }}
        >
          {/* Handle */}
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1.5 w-10 rounded-full bg-[#E8E0D4]" />
          </div>

          {/* Peek header: filter summary + event count */}
          <div className="flex items-center justify-between border-b border-[#E8E0D4] px-4 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <Funnel size={16} weight="bold" className="text-paddock-green" />
              <span className="text-sm font-medium text-ringside-black">
                {filterSummary || 'All Events'}
              </span>
            </div>
            <span className="rounded-full bg-paddock-green/10 px-2.5 py-0.5 text-xs font-semibold text-paddock-green">
              {eventCount.toLocaleString()} event{eventCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" data-vaul-no-drag>
            {/* Filters section */}
            <div className="border-b border-[#E8E0D4] bg-[#FAFAF7] p-4">
              {filterContent}
            </div>

            {/* Event list */}
            <div className="bg-[#FAFAF7]">{listContent}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

'use client'

import { useState } from 'react'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_LABELS,
  FILTERABLE_EVENT_TYPES,
  US_STATES,
} from '@/lib/events/constants'

import { Funnel, MagnifyingGlass, X } from '@phosphor-icons/react'
import { EntryStatus, EventType } from '@prisma/client'

export interface FilterState {
  search: string
  state: string
  eventType: string
  entryStatus: string
  dateFrom: string
  dateTo: string
}

interface EventsFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  breeds: string[]
  resultCount: number
}

export function EventsFilters({
  filters,
  onFiltersChange,
  breeds,
  resultCount,
}: EventsFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      state: '',
      eventType: '',
      entryStatus: '',
      dateFrom: '',
      dateTo: '',
    })
  }

  const hasActiveFilters =
    filters.state ||
    filters.eventType ||
    filters.entryStatus ||
    filters.dateFrom ||
    filters.dateTo

  return (
    <>
      {/* Search bar */}
      <div className="relative">
        <MagnifyingGlass
          size={18}
          weight="bold"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray"
        />
        <input
          type="text"
          placeholder="Search by club, breed, city, or state..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full rounded-xl border border-[#E8E0D4] bg-white py-3 pl-10 pr-4 text-sm text-ringside-black placeholder-warm-gray/60 transition-colors focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
        />
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="flex w-full items-center justify-between rounded-xl border border-[#E8E0D4] bg-white px-4 py-2.5 text-sm font-medium text-ringside-black md:hidden"
      >
        <div className="flex items-center gap-2">
          <Funnel size={16} weight="bold" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paddock-green text-[10px] font-bold text-white">
              {
                [
                  filters.state,
                  filters.eventType,
                  filters.entryStatus,
                  filters.dateFrom,
                ].filter(Boolean).length
              }
            </span>
          )}
        </div>
      </button>

      {/* Filter controls */}
      <div
        className={`space-y-3 ${showMobileFilters ? 'block' : 'hidden'} md:block`}
      >
        {/* State */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full rounded-lg border border-[#E8E0D4] bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
          >
            <option value="">All States</option>
            {Object.entries(US_STATES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            Event Type
          </label>
          <select
            value={filters.eventType}
            onChange={(e) => updateFilter('eventType', e.target.value)}
            className="w-full rounded-lg border border-[#E8E0D4] bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
          >
            <option value="">All Types</option>
            {FILTERABLE_EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {EVENT_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        {/* Entry Status */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            Entry Status
          </label>
          <select
            value={filters.entryStatus}
            onChange={(e) => updateFilter('entryStatus', e.target.value)}
            className="w-full rounded-lg border border-[#E8E0D4] bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
          >
            <option value="">Any Status</option>
            {(Object.keys(ENTRY_STATUS_CONFIG) as EntryStatus[]).map(
              (status) => (
                <option key={status} value={status}>
                  {ENTRY_STATUS_CONFIG[status].label}
                </option>
              )
            )}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              className="w-full rounded-lg border border-[#E8E0D4] bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              className="w-full rounded-lg border border-[#E8E0D4] bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            />
          </div>
        </div>

        {/* Clear Filters + Count */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-warm-gray">
            {resultCount} event{resultCount !== 1 ? 's' : ''} found
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-medium text-show-orange transition-colors hover:text-show-orange/80"
            >
              <X size={12} weight="bold" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </>
  )
}

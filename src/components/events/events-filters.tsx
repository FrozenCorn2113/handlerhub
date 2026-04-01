'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_LABELS,
  FILTERABLE_EVENT_TYPES,
  US_STATES,
} from '@/lib/events/constants'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  CaretDown,
  Funnel,
  MagnifyingGlass,
  SortAscending,
  X,
} from '@phosphor-icons/react'
import { EntryStatus } from '@prisma/client'

export interface FilterState {
  search: string
  state: string
  eventType: string
  entryStatus: string
  dateFrom: string
  dateTo: string
  breed: string
  indoorOutdoor: string
  superintendent: string
  sortBy: string
}

export const EMPTY_FILTERS: FilterState = {
  search: '',
  state: '',
  eventType: '',
  entryStatus: '',
  dateFrom: '',
  dateTo: '',
  breed: '',
  indoorOutdoor: '',
  superintendent: '',
  sortBy: 'date',
}

interface EventsFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  breeds: string[]
  superintendents: string[]
  resultCount: number
}

function FilterBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-slate-blue px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  )
}

function FilterPopover({
  label,
  badgeCount,
  isOpen,
  onOpenChange,
  children,
}: {
  label: string
  badgeCount: number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 rounded-full border border-sand bg-white px-3 py-2 text-sm font-medium text-ringside-black shadow-sm transition-all hover:border-paddock-green/40 hover:shadow-md">
          {label}
          <FilterBadge count={badgeCount} />
          <CaretDown
            size={14}
            weight="bold"
            className="ml-0.5 text-warm-gray"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-64 rounded-2xl border border-sand bg-white p-3 shadow-lg"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export function EventsFilters({
  filters,
  onFiltersChange,
  breeds,
  superintendents,
  resultCount,
}: EventsFiltersProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null)

  const updateFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      onFiltersChange({ ...filters, [key]: value })
      setOpenPopover(null)
    },
    [filters, onFiltersChange]
  )

  const clearFilters = useCallback(() => {
    onFiltersChange(EMPTY_FILTERS)
    setOpenPopover(null)
  }, [onFiltersChange])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.state) count++
    if (filters.eventType) count++
    if (filters.entryStatus) count++
    if (filters.dateFrom || filters.dateTo) count++
    if (filters.breed) count++
    if (filters.indoorOutdoor) count++
    if (filters.superintendent) count++
    return count
  }, [filters])

  const hasActiveFilters = activeFilterCount > 0

  // Count per popover group
  const locationCount = filters.state ? 1 : 0
  const typeCount =
    (filters.eventType ? 1 : 0) + (filters.indoorOutdoor ? 1 : 0)
  const statusCount = filters.entryStatus ? 1 : 0
  const dateCount = filters.dateFrom || filters.dateTo ? 1 : 0
  const breedCount = filters.breed ? 1 : 0
  const superCount = filters.superintendent ? 1 : 0

  return (
    <div className="space-y-3">
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
          className="w-full rounded-2xl border border-sand bg-white py-2.5 pl-10 pr-4 text-sm text-ringside-black placeholder-warm-gray/60 transition-colors focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
        />
      </div>

      {/* Horizontal filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Location */}
        <FilterPopover
          label="Location"
          badgeCount={locationCount}
          isOpen={openPopover === 'location'}
          onOpenChange={(open) => setOpenPopover(open ? 'location' : null)}
        >
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
          >
            <option value="">All States</option>
            {Object.entries(US_STATES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </FilterPopover>

        {/* Event Type */}
        <FilterPopover
          label="Type"
          badgeCount={typeCount}
          isOpen={openPopover === 'type'}
          onOpenChange={(open) => setOpenPopover(open ? 'type' : null)}
        >
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Event Type
              </label>
              <select
                value={filters.eventType}
                onChange={(e) => updateFilter('eventType', e.target.value)}
                className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
              >
                <option value="">All Types</option>
                {FILTERABLE_EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {EVENT_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Indoor / Outdoor
              </label>
              <select
                value={filters.indoorOutdoor}
                onChange={(e) => updateFilter('indoorOutdoor', e.target.value)}
                className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
              >
                <option value="">Any</option>
                <option value="Indoors">Indoors</option>
                <option value="Outdoors">Outdoors</option>
              </select>
            </div>
          </div>
        </FilterPopover>

        {/* Entry Status */}
        <FilterPopover
          label="Status"
          badgeCount={statusCount}
          isOpen={openPopover === 'status'}
          onOpenChange={(open) => setOpenPopover(open ? 'status' : null)}
        >
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            Entry Status
          </label>
          <select
            value={filters.entryStatus}
            onChange={(e) => updateFilter('entryStatus', e.target.value)}
            className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
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
        </FilterPopover>

        {/* Date Range */}
        <FilterPopover
          label="Dates"
          badgeCount={dateCount}
          isOpen={openPopover === 'dates'}
          onOpenChange={(open) => setOpenPopover(open ? 'dates' : null)}
        >
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
              placeholder="From"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
              placeholder="To"
            />
          </div>
        </FilterPopover>

        {/* Breed */}
        {breeds.length > 0 && (
          <FilterPopover
            label="Breed"
            badgeCount={breedCount}
            isOpen={openPopover === 'breed'}
            onOpenChange={(open) => setOpenPopover(open ? 'breed' : null)}
          >
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Breed
            </label>
            <select
              value={filters.breed}
              onChange={(e) => updateFilter('breed', e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
            >
              <option value="">All Breeds</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </FilterPopover>
        )}

        {/* Superintendent */}
        {superintendents.length > 0 && (
          <FilterPopover
            label="Superintendent"
            badgeCount={superCount}
            isOpen={openPopover === 'superintendent'}
            onOpenChange={(open) =>
              setOpenPopover(open ? 'superintendent' : null)
            }
          >
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Superintendent
            </label>
            <select
              value={filters.superintendent}
              onChange={(e) => updateFilter('superintendent', e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
            >
              <option value="">All</option>
              {superintendents.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FilterPopover>
        )}

        {/* Sort */}
        <Popover
          open={openPopover === 'sort'}
          onOpenChange={(open) => setOpenPopover(open ? 'sort' : null)}
        >
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 rounded-full border border-sand bg-white px-3 py-2 text-sm font-medium text-warm-gray shadow-sm transition-all hover:border-paddock-green/40 hover:shadow-md">
              <SortAscending size={14} weight="bold" />
              Sort
              <CaretDown size={14} weight="bold" className="ml-0.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={6}
            className="w-52 rounded-2xl border border-sand bg-white p-3 shadow-lg"
          >
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-ringside-black focus:border-paddock-green focus:outline-none"
            >
              <option value="date">Show Date</option>
              <option value="closingDate">Entry Closing Date</option>
            </select>
          </PopoverContent>
        </Popover>

        {/* Clear + count */}
        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs text-warm-gray">
            {resultCount.toLocaleString()} event{resultCount !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-blue transition-colors hover:bg-slate-blue/10"
            >
              <X size={12} weight="bold" />
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

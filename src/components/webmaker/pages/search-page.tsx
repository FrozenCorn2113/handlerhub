/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'

import { REGIONS } from '@/lib/constants/regions'
import { AKC_GROUPS } from '@/lib/constants/service-types'

import {
  Dog,
  Funnel,
  MagnifyingGlass,
  MapPin,
  UserPlus,
} from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

export interface SearchHandler {
  id: string
  name: string
  profileImage: string | null
  breeds: string[]
  regions: string[]
  serviceType: 'Campaign' | 'Ringside' | 'Both' | 'Grooming'
  registries: string[]
  ratePerShow: number | null
  yearsExperience: number | null
}

interface SearchPageProps {
  handlers: SearchHandler[]
}

export function WebmakerSearchPage({ handlers }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAkcGroup, setSelectedAkcGroup] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedServiceType, setSelectedServiceType] = useState('')

  const filteredHandlers = useMemo(() => {
    return handlers.filter((handler) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        handler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        handler.breeds.some((b) =>
          b.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesGroup =
        selectedAkcGroup === '' ||
        handler.breeds.some((b) =>
          b.toLowerCase().includes(selectedAkcGroup.toLowerCase())
        )

      const matchesRegion =
        selectedRegion === '' ||
        handler.regions.some((r) => r === selectedRegion)

      const matchesService =
        selectedServiceType === '' ||
        handler.serviceType === selectedServiceType

      return matchesSearch && matchesGroup && matchesRegion && matchesService
    })
  }, [
    handlers,
    searchQuery,
    selectedAkcGroup,
    selectedRegion,
    selectedServiceType,
  ])

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedAkcGroup !== '' ||
    selectedRegion !== '' ||
    selectedServiceType !== ''

  function clearFilters() {
    setSearchQuery('')
    setSelectedAkcGroup('')
    setSelectedRegion('')
    setSelectedServiceType('')
  }

  const isEmpty = handlers.length === 0
  const noResults = !isEmpty && filteredHandlers.length === 0

  return (
    <div className="min-h-[80vh] bg-ring-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-light tracking-tight text-ringside-black">
            Find a Handler
          </h1>
          <p className="mt-2 font-body text-base text-warm-gray">
            Browse professional handlers by breed, region, and service type.
          </p>
        </div>

        {/* Filter bar */}
        <div className="card-hh mb-10 p-4">
          <div className="flex flex-col items-end gap-3 md:flex-row">
            {/* Search input */}
            <div className="min-w-0 flex-1">
              <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Search
              </label>
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Handler name, breed..."
                  className="w-full rounded-full border border-tan bg-white py-2.5 pl-10 pr-4 font-body text-sm text-ringside-black transition-colors placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/30"
                />
              </div>
            </div>

            {/* AKC Group dropdown */}
            <div className="w-full md:w-48">
              <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                AKC Group
              </label>
              <select
                value={selectedAkcGroup}
                onChange={(e) => setSelectedAkcGroup(e.target.value)}
                className="w-full appearance-none rounded-full border border-tan bg-white px-3 py-2.5 font-body text-sm text-ringside-black transition-colors focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/30"
              >
                <option value="">All Groups</option>
                {AKC_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Region dropdown */}
            <div className="w-full md:w-52">
              <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full appearance-none rounded-full border border-tan bg-white px-3 py-2.5 font-body text-sm text-ringside-black transition-colors focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/30"
              >
                <option value="">All Regions</option>
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type dropdown */}
            <div className="w-full md:w-44">
              <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Service
              </label>
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full appearance-none rounded-full border border-tan bg-white px-3 py-2.5 font-body text-sm text-ringside-black transition-colors focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/30"
              >
                <option value="">All Services</option>
                <option value="Campaign">Campaign</option>
                <option value="Ringside">Ringside</option>
                <option value="Both">Both</option>
                <option value="Grooming">Grooming</option>
              </select>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 whitespace-nowrap py-2.5 font-body text-sm font-medium text-paddock-green transition-colors hover:text-forest"
              >
                <Funnel className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Empty state -- no handlers in DB */}
        {isEmpty && (
          <div className="mx-auto max-w-md py-24 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage">
              <Dog className="h-8 w-8 text-paddock-green" />
            </div>
            <h2 className="mb-3 font-display text-2xl font-light text-ringside-black">
              Be one of the first handlers on HandlerHub
            </h2>
            <p className="mb-8 font-body text-base text-warm-gray">
              Create your profile and start getting discovered by exhibitors.
            </p>
            <Link href="/register" className="btn-primary inline-flex">
              <UserPlus className="h-4 w-4" />
              Create Your Profile
            </Link>
          </div>
        )}

        {/* No results for current filters */}
        {noResults && (
          <div className="mx-auto max-w-md py-24 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-light-sand">
              <MagnifyingGlass className="h-8 w-8 text-warm-gray" />
            </div>
            <h2 className="mb-3 font-display text-2xl font-light text-ringside-black">
              No handlers match your filters
            </h2>
            <p className="mb-6 font-body text-base text-warm-gray">
              Try adjusting your search criteria or clearing your filters.
            </p>
            <button
              onClick={clearFilters}
              className="btn-secondary inline-flex"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Handler grid */}
        {filteredHandlers.length > 0 && (
          <>
            <p className="mb-6 font-body text-sm text-warm-gray">
              {filteredHandlers.length} handler
              {filteredHandlers.length !== 1 ? 's' : ''} found
            </p>
            <div
              className="grid gap-10"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              }}
            >
              {filteredHandlers.map((handler) => (
                <Link
                  key={handler.id}
                  href={`/handlers/${handler.id}`}
                  className="card-hh group flex flex-col gap-4 p-6"
                >
                  {/* Top row: photo + name */}
                  <div className="flex items-start gap-4">
                    {/* Profile photo */}
                    {handler.profileImage ? (
                      <img
                        src={handler.profileImage}
                        alt={handler.name}
                        className="h-16 w-16 shrink-0 rounded-full border-2 border-tan object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-tan bg-light-sand">
                        <span className="font-display text-xl text-warm-gray">
                          {handler.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-xl font-light text-ringside-black transition-colors group-hover:text-paddock-green">
                        {handler.name}
                      </h3>
                      {/* Service type badge */}
                      <span className="mt-1 inline-block rounded-full bg-sage px-2.5 py-0.5 font-body text-xs font-semibold uppercase tracking-wide text-paddock-green">
                        {handler.serviceType}
                      </span>
                    </div>
                  </div>

                  {/* Breed specialty chips */}
                  {handler.breeds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {handler.breeds.slice(0, 4).map((breed) => (
                        <span
                          key={breed}
                          className="chip-breed rounded-full px-2.5 py-1 font-body text-xs"
                        >
                          {breed}
                        </span>
                      ))}
                      {handler.breeds.length > 4 && (
                        <span className="px-2 py-1 font-body text-xs text-warm-gray">
                          +{handler.breeds.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Region chips */}
                  {handler.regions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {handler.regions.slice(0, 3).map((region) => (
                        <span
                          key={region}
                          className="flex items-center gap-1 rounded-full bg-light-sand px-2.5 py-1 font-body text-xs text-warm-gray"
                        >
                          <MapPin className="h-3 w-3" />
                          {region}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom row: registries + pricing */}
                  <div className="mt-auto flex items-center justify-between border-t border-tan/50 pt-2">
                    {/* Registry chips */}
                    <div className="flex gap-1.5">
                      {handler.registries.map((reg) => (
                        <span
                          key={reg}
                          className="chip-verified rounded-full px-2 py-0.5 font-body text-[10px] font-semibold uppercase"
                        >
                          {reg}
                        </span>
                      ))}
                    </div>
                    {/* Pricing */}
                    {handler.ratePerShow != null && (
                      <span className="font-body text-sm font-semibold text-ringside-black">
                        From ${handler.ratePerShow}/show
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

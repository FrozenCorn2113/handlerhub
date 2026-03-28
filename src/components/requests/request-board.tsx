/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'

import { REGIONS } from '@/lib/constants/regions'
import { SERVICE_TYPES } from '@/lib/constants/service-types'
import { AKC_GROUPS } from '@/lib/constants/service-types'

import { RequestCard } from '@/components/requests/request-card'

import { MagnifyingGlass, Plus } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

export interface ServiceRequestItem {
  id: string
  title: string
  description: string
  breed: string | null
  akcGroup: string | null
  serviceType: string
  region: string | null
  showName: string | null
  showDate: string | null
  showLocation: string | null
  status: string
  createdAt: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    responses: number
  }
}

interface RequestBoardProps {
  requests: ServiceRequestItem[]
}

export function RequestBoard({ requests }: RequestBoardProps) {
  const [serviceType, setServiceType] = useState('')
  const [akcGroup, setAkcGroup] = useState('')
  const [region, setRegion] = useState('')

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (serviceType && r.serviceType !== serviceType) return false
      if (akcGroup && r.akcGroup !== akcGroup) return false
      if (region && r.region !== region) return false
      return true
    })
  }, [requests, serviceType, akcGroup, region])

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1
            className="text-3xl font-light tracking-tight text-ringside-black md:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Request Board
          </h1>
          <p
            className="mt-2 font-medium text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            See what exhibitors are looking for
          </p>
        </div>
        <Link
          href="/requests/new"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-ring-cream transition-colors hover:bg-forest"
        >
          <Plus weight="bold" className="h-4 w-4" />
          Post a Request
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-3 rounded-2xl border border-[#D4CFC4] bg-white p-4">
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="rounded-full border-[#D4CFC4] bg-ring-cream py-2 pl-4 pr-8 text-sm text-ringside-black focus:border-paddock-green focus:ring-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <option value="">All Services</option>
          {SERVICE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select
          value={akcGroup}
          onChange={(e) => setAkcGroup(e.target.value)}
          className="rounded-full border-[#D4CFC4] bg-ring-cream py-2 pl-4 pr-8 text-sm text-ringside-black focus:border-paddock-green focus:ring-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <option value="">All AKC Groups</option>
          {AKC_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-full border-[#D4CFC4] bg-ring-cream py-2 pl-4 pr-8 text-sm text-ringside-black focus:border-paddock-green focus:ring-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {(serviceType || akcGroup || region) && (
          <button
            onClick={() => {
              setServiceType('')
              setAkcGroup('')
              setRegion('')
            }}
            className="px-3 text-sm font-medium text-paddock-green transition-colors hover:text-forest"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
          {filtered.map((r) => (
            <RequestCard
              key={r.id}
              id={r.id}
              title={r.title}
              breed={r.breed}
              akcGroup={r.akcGroup}
              serviceType={r.serviceType}
              region={r.region}
              showName={r.showName}
              showDate={r.showDate}
              responseCount={r._count.responses}
              createdAt={r.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-ring-cream">
            <MagnifyingGlass className="h-8 w-8 text-warm-gray" />
          </div>
          <h3
            className="mb-2 text-xl font-light text-ringside-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            No open requests yet
          </h3>
          <p
            className="mb-6 text-sm text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Be the first to post what you&apos;re looking for.
          </p>
          <Link
            href="/requests/new"
            className="inline-flex items-center gap-2 rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-ring-cream transition-colors hover:bg-forest"
          >
            <Plus weight="bold" className="h-4 w-4" />
            Post a Request
          </Link>
        </div>
      )}
    </div>
  )
}

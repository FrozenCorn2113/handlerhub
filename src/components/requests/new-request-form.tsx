/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { REGIONS } from '@/lib/constants/regions'
import { AKC_GROUPS, SERVICE_TYPES } from '@/lib/constants/service-types'

import { PaperPlaneRight } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

interface EventSuggestion {
  id: string
  name: string
  startDate?: string
  endDate?: string
  venue?: {
    name: string
    city: string
    state: string
  } | null
}

export function NewRequestForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [breed, setBreed] = useState('')
  const [akcGroup, setAkcGroup] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [region, setRegion] = useState('')
  const [showName, setShowName] = useState('')
  const [showDate, setShowDate] = useState('')
  const [showLocation, setShowLocation] = useState('')

  // Event autocomplete state
  const [eventSuggestions, setEventSuggestions] = useState<EventSuggestion[]>(
    []
  )
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchEvents = useCallback(async (query: string) => {
    if (query.length < 2) {
      setEventSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsSearching(true)
    try {
      const res = await fetch(
        `/api/events?search=${encodeURIComponent(query)}&limit=10&view=list`
      )
      if (res.ok) {
        const data = await res.json()
        const events = data.events || []
        setEventSuggestions(events)
        setShowSuggestions(events.length > 0)
      }
    } catch {
      // Silently fail -- autocomplete is optional
    } finally {
      setIsSearching(false)
    }
  }, [])

  function handleShowNameChange(value: string) {
    setShowName(value)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchEvents(value)
    }, 300)
  }

  function selectEvent(event: EventSuggestion) {
    setShowName(event.name)
    if (event.startDate) {
      const dateStr = new Date(event.startDate).toISOString().split('T')[0]
      setShowDate(dateStr)
    }
    if (event.venue) {
      setShowLocation(
        `${event.venue.name}, ${event.venue.city}, ${event.venue.state}`
      )
    }
    setShowSuggestions(false)
    setEventSuggestions([])
  }

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const body: Record<string, unknown> = {
        title,
        description,
        serviceType,
      }
      if (breed) body.breed = breed
      if (akcGroup) body.akcGroup = akcGroup
      if (region) body.region = region
      if (showName) body.showName = showName
      if (showDate) body.showDate = showDate
      if (showLocation) body.showLocation = showLocation

      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const text = await res.text()
        try {
          const issues = JSON.parse(text)
          if (Array.isArray(issues)) {
            setError(
              issues.map((i: { message: string }) => i.message).join(', ')
            )
          } else {
            setError(text)
          }
        } catch {
          setError(text || 'Something went wrong')
        }
        return
      }

      const created = await res.json()
      router.push(`/requests/${created.id}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#D4CFC4] bg-ring-cream text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:ring-paddock-green p-3'
  const labelClass = 'block text-sm font-medium text-ringside-black mb-1.5'

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 lg:px-12">
      <h1
        className="mb-2 text-3xl font-light tracking-tight text-ringside-black md:text-4xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Post a Request
      </h1>
      <p
        className="mb-8 text-warm-gray"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Describe what you need and handlers will reach out to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-slate-blue">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Looking for a Golden Retriever handler in the Pacific Northwest"
            className={inputClass}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description <span className="text-slate-blue">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your needs, experience level of your dog, any preferences..."
            rows={5}
            className={`${inputClass} resize-none`}
            required
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className={labelClass}>
            Service Type <span className="text-slate-blue">*</span>
          </label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Select a service type</option>
            {SERVICE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Breed */}
        <div>
          <label htmlFor="breed" className={labelClass}>
            Breed
          </label>
          <input
            id="breed"
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="e.g., Golden Retriever"
            className={inputClass}
          />
        </div>

        {/* AKC Group */}
        <div>
          <label htmlFor="akcGroup" className={labelClass}>
            AKC Group
          </label>
          <select
            id="akcGroup"
            value={akcGroup}
            onChange={(e) => setAkcGroup(e.target.value)}
            className={inputClass}
          >
            <option value="">Select an AKC group</option>
            {AKC_GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label htmlFor="region" className={labelClass}>
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a region</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Show Info */}
        <div className="border-t border-[#D4CFC4] pt-5">
          <p className="mb-4 text-sm font-medium text-ringside-black">
            Show Details (optional)
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative sm:col-span-2" ref={suggestionsRef}>
              <label htmlFor="showName" className={labelClass}>
                Show Name
              </label>
              <input
                id="showName"
                type="text"
                value={showName}
                onChange={(e) => handleShowNameChange(e.target.value)}
                onFocus={() => {
                  if (eventSuggestions.length > 0) setShowSuggestions(true)
                }}
                placeholder="Start typing to search events..."
                className={inputClass}
                autoComplete="off"
              />
              {isSearching && (
                <div className="absolute right-3 top-[38px] text-xs text-warm-gray">
                  Searching...
                </div>
              )}
              {showSuggestions && eventSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-xl border border-[#D4CFC4] bg-white shadow-lg">
                  <ul className="max-h-60 overflow-auto py-1">
                    {eventSuggestions.map((event) => (
                      <li key={event.id}>
                        <button
                          type="button"
                          onClick={() => selectEvent(event)}
                          className="w-full px-4 py-2.5 text-left transition-colors hover:bg-ring-cream"
                        >
                          <p className="text-sm font-medium text-ringside-black">
                            {event.name}
                          </p>
                          <p className="text-xs text-warm-gray">
                            {event.venue
                              ? `${event.venue.city}, ${event.venue.state}`
                              : ''}
                            {event.startDate &&
                              ` - ${new Date(
                                event.startDate
                              ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}`}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="showDate" className={labelClass}>
                Show Date
              </label>
              <input
                id="showDate"
                type="date"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="showLocation" className={labelClass}>
                Show Location
              </label>
              <input
                id="showLocation"
                type="text"
                value={showLocation}
                onChange={(e) => setShowLocation(e.target.value)}
                placeholder="e.g., Madison Square Garden, New York, NY"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !title || !description || !serviceType}
          className="inline-flex items-center gap-2 rounded-full bg-paddock-green px-8 py-3 text-sm font-medium text-ring-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PaperPlaneRight weight="bold" className="h-4 w-4" />
          {isSubmitting ? 'Posting...' : 'Post Request'}
        </button>
      </form>
    </div>
  )
}

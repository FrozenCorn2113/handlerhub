'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  CalendarBlank,
  MagnifyingGlass,
  MapPin,
  Plus,
  SpinnerGap,
  Trophy,
} from '@phosphor-icons/react'

interface EventSuggestion {
  id: string
  name: string
  date: string
  location: string
}

interface AddShowDialogProps {
  onAdd: (data: {
    eventId: string
    eventName: string
    eventDate: string
    eventLocation: string
    maxDogs: number | null
    notes: string | null
  }) => Promise<void>
}

export function AddShowDialog({ onAdd }: AddShowDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventSuggestion | null>(
    null
  )
  const [maxDogs, setMaxDogs] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<NodeJS.Timeout>()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function resetForm() {
    setQuery('')
    setSuggestions([])
    setSelectedEvent(null)
    setMaxDogs('')
    setNotes('')
    setError(null)
    setShowDropdown(false)
  }

  function handleInput(value: string) {
    setQuery(value)
    setSelectedEvent(null)
    setError(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/events/search?q=${encodeURIComponent(value)}`
        )
        const data = await res.json()
        setSuggestions(data.events || [])
        setShowDropdown(data.events?.length > 0)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  function selectEvent(event: EventSuggestion) {
    setSelectedEvent(event)
    setQuery(event.name)
    setShowDropdown(false)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedEvent) {
      setError('Please select a show from the search results.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await onAdd({
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        eventDate: selectedEvent.date,
        eventLocation: selectedEvent.location,
        maxDogs: maxDogs ? parseInt(maxDogs, 10) : null,
        notes: notes.trim() || null,
      })
      resetForm()
      setOpen(false)
    } catch (err: any) {
      setError(err?.message || 'Failed to add show. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" />
          Add Show
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-ring-cream sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-light text-ringside-black">
            Add Upcoming Show
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-warm-gray">
            Search for an event and declare your attendance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event search */}
          <div ref={dropdownRef} className="relative">
            <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
              Event
            </label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                placeholder="Search by club name..."
                className="w-full rounded-xl border border-sand bg-white py-2.5 pl-10 pr-4 font-body text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
              />
              {loading && (
                <SpinnerGap className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-warm-gray" />
              )}
            </div>

            {/* Selected event preview */}
            {selectedEvent && (
              <div className="mt-2 rounded-xl border border-paddock-green/30 bg-sage/30 p-3">
                <div className="flex items-start gap-2">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-paddock-green" />
                  <div>
                    <p className="font-body text-sm font-semibold text-ringside-black">
                      {selectedEvent.name}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3 font-body text-xs text-warm-gray">
                      <span className="flex items-center gap-1">
                        <CalendarBlank className="h-3 w-3" />
                        {new Date(selectedEvent.date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      {selectedEvent.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedEvent.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute left-0 top-full z-30 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-sand bg-white p-1 shadow-lg">
                {suggestions.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => selectEvent(event)}
                    className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-light-sand"
                  >
                    <span className="font-body text-sm font-medium text-ringside-black">
                      {event.name}
                    </span>
                    <span className="font-body text-xs text-warm-gray">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {event.location ? ` \u00b7 ${event.location}` : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Max dogs */}
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
              Max Dogs{' '}
              <span className="font-normal text-warm-gray">(optional)</span>
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={maxDogs}
              onChange={(e) => setMaxDogs(e.target.value)}
              placeholder="How many dogs can you handle?"
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 font-body text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
              Notes{' '}
              <span className="font-normal text-warm-gray">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Any details for exhibitors..."
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 font-body text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting || !selectedEvent}
            className="w-full"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <SpinnerGap className="h-4 w-4 animate-spin" />
                Adding...
              </span>
            ) : (
              'Add Show'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

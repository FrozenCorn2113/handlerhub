'use client'

import { useCallback, useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'

import { AddShowDialog } from '@/components/shows/add-show-dialog'
import { ShowAttendanceList } from '@/components/shows/show-attendance-list'

import {
  CalendarBlank,
  CaretDown,
  MapPin,
  SpinnerGap,
  Trophy,
} from '@phosphor-icons/react'

interface AttendanceItem {
  id: string
  eventId: string
  eventName: string
  eventDate: string
  eventLocation: string
  maxDogs: number | null
  notes: string | null
  attendeeCount?: number
}

export function ShowsPageClient() {
  const [upcoming, setUpcoming] = useState<AttendanceItem[]>([])
  const [past, setPast] = useState<AttendanceItem[]>([])
  const [stats, setStats] = useState({ totalUpcoming: 0, totalPastThisYear: 0 })
  const [loading, setLoading] = useState(true)
  const [showPast, setShowPast] = useState(false)

  const fetchAttendance = useCallback(async () => {
    try {
      const res = await fetch('/api/handler-attendance')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUpcoming(data.upcoming || [])
      setPast(data.past || [])
      setStats(data.stats || { totalUpcoming: 0, totalPastThisYear: 0 })
    } catch (err) {
      console.error('Failed to fetch attendance:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAttendance()
  }, [fetchAttendance])

  async function handleAdd(data: {
    eventId: string
    eventName: string
    eventDate: string
    eventLocation: string
    maxDogs: number | null
    notes: string | null
  }) {
    const res = await fetch('/api/handler-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: data.eventId,
        maxDogs: data.maxDogs,
        notes: data.notes,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || 'Failed to add show')
    }

    // Refresh the list
    await fetchAttendance()
  }

  async function handleRemove(id: string) {
    const res = await fetch(`/api/handler-attendance/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || 'Failed to remove show')
    }

    // Optimistic removal
    setUpcoming((prev) => prev.filter((item) => item.id !== id))
    setStats((prev) => ({
      ...prev,
      totalUpcoming: Math.max(0, prev.totalUpcoming - 1),
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <SpinnerGap className="h-8 w-8 animate-spin text-warm-gray" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card variant="static" className="p-4 text-center">
          <span className="font-display text-3xl font-light text-paddock-green">
            {stats.totalUpcoming}
          </span>
          <p className="mt-1 font-body text-xs text-warm-gray">
            Upcoming Shows
          </p>
        </Card>
        <Card variant="static" className="p-4 text-center">
          <span className="font-display text-3xl font-light text-ringside-black">
            {stats.totalPastThisYear}
          </span>
          <p className="mt-1 font-body text-xs text-warm-gray">Past Shows</p>
        </Card>
        <Card
          variant="static"
          className="col-span-2 flex items-center justify-center p-4 sm:col-span-1"
        >
          <AddShowDialog onAdd={handleAdd} />
        </Card>
      </div>

      {/* Upcoming shows */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-light text-ringside-black">
            <Trophy className="h-5 w-5 text-paddock-green" />
            Upcoming Shows
          </h2>
          <span className="font-body text-sm text-warm-gray">
            {upcoming.length} show{upcoming.length !== 1 ? 's' : ''}
          </span>
        </div>

        {upcoming.length === 0 ? (
          <Card
            variant="static"
            className="border-2 border-dashed border-sand p-8 text-center"
          >
            <CalendarBlank className="mx-auto h-10 w-10 text-tan" />
            <p className="mt-3 font-display text-lg font-light text-warm-gray">
              No upcoming shows declared
            </p>
            <p className="mx-auto mt-2 max-w-sm font-body text-sm text-warm-gray/70">
              Let exhibitors know where you will be. Add upcoming shows to
              appear in show-specific searches.
            </p>
            <div className="mt-5">
              <AddShowDialog onAdd={handleAdd} />
            </div>
          </Card>
        ) : (
          <ShowAttendanceList items={upcoming} onRemove={handleRemove} />
        )}
      </div>

      {/* Past shows (collapsible) */}
      {past.length > 0 && (
        <div>
          <button
            onClick={() => setShowPast(!showPast)}
            className="mb-3 flex items-center gap-2 font-display text-lg font-light text-warm-gray transition-colors hover:text-ringside-black"
          >
            <CaretDown
              className={`h-4 w-4 transition-transform ${showPast ? 'rotate-180' : ''}`}
            />
            Past Shows ({past.length})
          </button>
          {showPast && (
            <ShowAttendanceList items={past} onRemove={handleRemove} isPast />
          )}
        </div>
      )}
    </div>
  )
}

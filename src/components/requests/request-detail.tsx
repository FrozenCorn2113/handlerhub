/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { relativeTime } from '@/lib/relative-time'

import { ReportButton } from '@/components/requests/report-button'

import {
  Calendar,
  ChatCircle,
  MapPin,
  PaperPlaneRight,
  User,
} from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

interface ResponseItem {
  id: string
  message: string
  createdAt: string
  handler: {
    id: string
    name: string | null
    image: string | null
  }
  conversation: {
    id: string
  } | null
}

interface RequestDetailProps {
  request: {
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
    responses: ResponseItem[]
  }
  currentUserId: string | null
  currentUserRole: string | null
}

const SERVICE_TYPE_COLORS: Record<string, string> = {
  HANDLING: 'bg-sage text-forest',
  GROOMING: 'bg-pastel-sky text-[#1A5276]',
  TRANSPORT: 'bg-pale-peach text-[#8B4513]',
  OTHER: 'bg-pastel-ribbon text-[#6B5B00]',
}

function formatServiceType(type: string): string {
  return type.charAt(0) + type.slice(1).toLowerCase()
}

export function RequestDetail({
  request,
  currentUserId,
  currentUserRole,
}: RequestDetailProps) {
  const router = useRouter()
  const [responseMessage, setResponseMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAccepting, setIsAccepting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const isPoster = currentUserId === request.user.id
  const isHandler = currentUserRole === 'HANDLER'
  const alreadyResponded = request.responses.some(
    (r) => r.handler.id === currentUserId
  )
  const isOpen = request.status === 'OPEN'

  async function handleAcceptResponse(responseId: string) {
    setIsAccepting(responseId)
    try {
      const res = await fetch(`/api/requests/${request.id}/accept-response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseId }),
      })

      if (!res.ok) {
        const text = await res.text()
        setError(text || 'Failed to accept response')
        return
      }

      const data = await res.json()
      router.push(`/dashboard/bookings/${data.bookingId}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsAccepting(null)
    }
  }

  const chipColor =
    SERVICE_TYPE_COLORS[request.serviceType] || SERVICE_TYPE_COLORS.OTHER

  async function handleRespond(e: React.FormEvent) {
    e.preventDefault()
    if (!responseMessage.trim()) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/requests/${request.id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: responseMessage }),
      })

      if (!res.ok) {
        const text = await res.text()
        setError(text || 'Something went wrong')
        return
      }

      setSuccess(true)
      setResponseMessage('')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 lg:px-12">
      {/* Back link */}
      <Link
        href="/requests"
        className="mb-6 inline-block text-sm font-medium text-paddock-green transition-colors hover:text-forest"
      >
        &larr; Back to Request Board
      </Link>

      {/* Main card */}
      <div className="mb-6 rounded-2xl border border-[#D4CFC4] bg-white p-6 md:p-8">
        {/* Status badge */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${chipColor}`}
          >
            {formatServiceType(request.serviceType)}
          </span>
          <span className="text-xs text-warm-gray">
            {relativeTime(request.createdAt)}
          </span>
        </div>

        <h1
          className="mb-4 text-2xl font-light tracking-tight text-ringside-black md:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {request.title}
        </h1>

        <p
          className="mb-6 whitespace-pre-wrap leading-relaxed text-ringside-black/80"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {request.description}
        </p>

        {/* Chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {request.breed && (
            <span className="rounded-full bg-pastel-mint px-3 py-1 text-xs font-medium text-forest">
              {request.breed}
            </span>
          )}
          {request.akcGroup && (
            <span className="rounded-full bg-[#F0EAE0] px-3 py-1 text-xs font-medium text-warm-brown">
              {request.akcGroup}
            </span>
          )}
          {request.region && (
            <span className="rounded-full bg-pastel-sky px-3 py-1 text-xs font-medium text-[#1A5276]">
              {request.region}
            </span>
          )}
        </div>

        {/* Show info */}
        {(request.showName || request.showDate || request.showLocation) && (
          <div className="mb-4 flex flex-wrap gap-4 border-t border-[#D4CFC4]/50 pt-4 text-sm text-warm-gray">
            {request.showName && (
              <span className="flex items-center gap-1.5">
                <MapPin weight="fill" className="h-4 w-4" />
                {request.showName}
              </span>
            )}
            {request.showDate && (
              <span className="flex items-center gap-1.5">
                <Calendar weight="fill" className="h-4 w-4" />
                {new Date(request.showDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
            {request.showLocation && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {request.showLocation}
              </span>
            )}
          </div>
        )}

        {/* Posted by + Report */}
        <div className="flex items-center justify-between border-t border-[#D4CFC4]/50 pt-4 text-sm text-warm-gray">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage">
              <User weight="fill" className="h-4 w-4 text-forest" />
            </div>
            <span>Posted by {request.user.name || 'Anonymous'}</span>
          </div>
          <ReportButton requestId={request.id} />
        </div>
      </div>

      {/* Handler Response Section */}
      {!currentUserId && (
        <div className="rounded-2xl border border-[#D4CFC4] bg-white p-6 text-center">
          <p
            className="mb-4 text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sign in to respond to this request
          </p>
          <Link
            href={`/login?next=${encodeURIComponent(`/requests/${request.id}`)}`}
            className="inline-flex rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-ring-cream transition-colors hover:bg-forest"
          >
            Sign In
          </Link>
        </div>
      )}

      {currentUserId &&
        isHandler &&
        !isPoster &&
        !alreadyResponded &&
        !success && (
          <div className="rounded-2xl border border-[#D4CFC4] bg-white p-6">
            <h2
              className="mb-4 text-lg font-light text-ringside-black"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Respond to This Request
            </h2>
            <form onSubmit={handleRespond}>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder="Introduce yourself and explain how you can help..."
                rows={4}
                className="w-full resize-none rounded-xl border border-[#D4CFC4] bg-ring-cream p-4 text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:ring-paddock-green"
                style={{ fontFamily: 'var(--font-body)' }}
                required
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting || !responseMessage.trim()}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-ring-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PaperPlaneRight weight="bold" className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </button>
            </form>
          </div>
        )}

      {currentUserId && isHandler && alreadyResponded && (
        <div className="rounded-2xl border border-paddock-green/20 bg-sage/30 p-6 text-center">
          <ChatCircle
            weight="fill"
            className="mx-auto mb-2 h-8 w-8 text-paddock-green"
          />
          <p className="text-sm font-medium text-forest">
            You have already responded to this request.
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-paddock-green/20 bg-sage/30 p-6 text-center">
          <ChatCircle
            weight="fill"
            className="mx-auto mb-2 h-8 w-8 text-paddock-green"
          />
          <p className="text-sm font-medium text-forest">
            Your response has been sent. A conversation has been started.
          </p>
          <Link
            href="/dashboard/messages"
            className="mt-2 inline-block text-sm text-paddock-green underline hover:text-forest"
          >
            Go to Messages
          </Link>
        </div>
      )}

      {/* Poster sees responses */}
      {isPoster && request.responses.length > 0 && (
        <div className="mt-6">
          <h2
            className="mb-4 text-lg font-light text-ringside-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Responses ({request.responses.length})
          </h2>
          <div className="space-y-4">
            {request.responses.map((resp) => (
              <div
                key={resp.id}
                className="rounded-2xl border border-[#D4CFC4] bg-white p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage">
                    <User weight="fill" className="h-4 w-4 text-forest" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ringside-black">
                      {resp.handler.name || 'Handler'}
                    </p>
                    <p className="text-xs text-warm-gray">
                      {relativeTime(resp.createdAt)}
                    </p>
                  </div>
                </div>
                <p
                  className="mb-3 text-sm text-ringside-black/80"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {resp.message}
                </p>
                <div className="flex items-center gap-3">
                  {resp.conversation && (
                    <Link
                      href="/dashboard/messages"
                      className="text-sm font-medium text-paddock-green transition-colors hover:text-forest"
                    >
                      View Conversation &rarr;
                    </Link>
                  )}
                  {isPoster && isOpen && (
                    <button
                      type="button"
                      onClick={() => handleAcceptResponse(resp.id)}
                      disabled={isAccepting === resp.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-paddock-green px-5 py-2 text-sm font-medium text-ring-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isAccepting === resp.id
                        ? 'Accepting...'
                        : 'Accept & Create Booking'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isPoster && request.responses.length === 0 && (
        <div className="mt-6 rounded-2xl border border-[#D4CFC4] bg-ring-cream p-6 text-center">
          <p className="text-sm text-warm-gray">
            No handlers have responded yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  )
}

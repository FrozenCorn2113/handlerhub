/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

import { relativeTime } from '@/lib/relative-time'

import { ReportButton } from '@/components/requests/report-button'

import { ChatCircle } from '@phosphor-icons/react/dist/ssr'

interface RequestCardProps {
  id: string
  title: string
  description?: string | null
  posterName?: string | null
  breed?: string | null
  akcGroup?: string | null
  serviceType: string
  region?: string | null
  showName?: string | null
  showDate?: string | null
  responseCount: number
  createdAt: string
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

export function RequestCard({
  id,
  title,
  description,
  posterName,
  breed,
  serviceType,
  showName,
  responseCount,
  createdAt,
}: RequestCardProps) {
  const chipColor =
    SERVICE_TYPE_COLORS[serviceType] || SERVICE_TYPE_COLORS.OTHER

  // Build the secondary line: breed + show name
  const details = [breed, showName].filter(Boolean).join(' - ')

  return (
    <Link
      href={`/requests/${id}`}
      className="group block rounded-2xl border border-[#D4CFC4] bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Poster name */}
          {posterName && (
            <p
              className="mb-0.5 text-sm font-semibold text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {posterName}
            </p>
          )}

          {/* Title row with service chip */}
          <div className="mb-1 flex items-center gap-2">
            <h3
              className="line-clamp-1 text-base font-medium text-ringside-black transition-colors group-hover:text-paddock-green"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {title}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${chipColor}`}
            >
              {formatServiceType(serviceType)}
            </span>
          </div>

          {/* Breed + show name */}
          {details && <p className="mb-1 text-sm text-warm-gray">{details}</p>}

          {/* Message snippet */}
          {description && (
            <p className="line-clamp-1 text-sm text-warm-gray/70">
              {description}
            </p>
          )}
        </div>

        {/* Timestamp in corner */}
        <span className="shrink-0 text-xs text-warm-gray">
          {relativeTime(createdAt)}
        </span>
      </div>

      {/* Footer: responses + report */}
      <div className="mt-3 flex items-center justify-between border-t border-[#D4CFC4]/50 pt-2.5">
        <span className="flex items-center gap-1 text-xs font-medium text-paddock-green">
          <ChatCircle weight="fill" className="h-3.5 w-3.5" />
          {responseCount} handler{responseCount !== 1 ? 's' : ''} responded
        </span>
        <ReportButton requestId={id} />
      </div>
    </Link>
  )
}

/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

import { relativeTime } from '@/lib/relative-time'

import { ReportButton } from '@/components/requests/report-button'

import { Calendar, ChatCircle, MapPin } from '@phosphor-icons/react/dist/ssr'

interface RequestCardProps {
  id: string
  title: string
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
  breed,
  akcGroup,
  serviceType,
  region,
  showName,
  showDate,
  responseCount,
  createdAt,
}: RequestCardProps) {
  const chipColor =
    SERVICE_TYPE_COLORS[serviceType] || SERVICE_TYPE_COLORS.OTHER

  return (
    <Link
      href={`/requests/${id}`}
      className="group block rounded-2xl border border-[#D4CFC4] bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        <h3
          className="line-clamp-2 text-lg font-semibold text-ringside-black transition-colors group-hover:text-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {title}
        </h3>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${chipColor}`}
          >
            {formatServiceType(serviceType)}
          </span>
          {breed && (
            <span className="rounded-full bg-pastel-mint px-3 py-1 text-xs font-medium text-forest">
              {breed}
            </span>
          )}
          {akcGroup && (
            <span className="rounded-full bg-[#F0EAE0] px-3 py-1 text-xs font-medium text-warm-brown">
              {akcGroup}
            </span>
          )}
          {region && (
            <span className="rounded-full bg-pastel-sky px-3 py-1 text-xs font-medium text-[#1A5276]">
              {region}
            </span>
          )}
        </div>

        {(showName || showDate) && (
          <div className="flex items-center gap-3 text-sm text-warm-gray">
            {showName && (
              <span className="flex items-center gap-1">
                <MapPin weight="fill" className="h-3.5 w-3.5" />
                {showName}
              </span>
            )}
            {showDate && (
              <span className="flex items-center gap-1">
                <Calendar weight="fill" className="h-3.5 w-3.5" />
                {new Date(showDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        )}

        <div className="mt-1 flex items-center justify-between border-t border-[#D4CFC4]/50 pt-3">
          <span className="text-xs text-warm-gray">
            {relativeTime(createdAt)}
          </span>
          <div className="flex items-center gap-3">
            <ReportButton requestId={id} />
            <span className="flex items-center gap-1 text-xs font-medium text-paddock-green">
              <ChatCircle weight="fill" className="h-3.5 w-3.5" />
              {responseCount} handler{responseCount !== 1 ? 's' : ''} responded
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

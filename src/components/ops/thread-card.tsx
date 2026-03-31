'use client'

interface ThreadCardProps {
  name: string
  preview: string
  time: string
  unread?: boolean
  avatarUrl?: string
}

export function ThreadCard({
  name,
  preview,
  time,
  unread = false,
  avatarUrl,
}: ThreadCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="card-hh flex items-center gap-4">
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-light-sand">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-sans text-xs font-semibold text-warm-brown">
            {initials}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-sans text-sm ${unread ? 'font-semibold text-ringside-black' : 'font-medium text-warm-brown'}`}
        >
          {name}
        </p>
        <p className="truncate font-sans text-xs text-warm-gray">{preview}</p>
      </div>

      {/* Time + unread dot */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-sans text-[11px] text-warm-gray">{time}</span>
        {unread && (
          <span className="h-2.5 w-2.5 rounded-full bg-paddock-green" />
        )}
      </div>
    </div>
  )
}

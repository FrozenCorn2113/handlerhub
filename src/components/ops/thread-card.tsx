'use client'

interface ThreadCardProps {
  name: string
  preview: string
  time: string
  unread?: boolean
  unreadCount?: number
  avatarUrl?: string
}

export function ThreadCard({
  name,
  preview,
  time,
  unread = false,
  unreadCount = 1,
  avatarUrl,
}: ThreadCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border bg-white px-5 py-4 transition-all duration-200 hover:bg-ring-cream/60 ${
        unread
          ? 'border-l-[3px] border-y-tan/60 border-l-paddock-green border-r-tan/60 shadow-[0_2px_12px_rgba(28,18,8,0.06)]'
          : 'border-tan/60 shadow-[0_1px_4px_rgba(28,18,8,0.04)]'
      }`}
    >
      {/* Avatar with ring */}
      <div
        className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-offset-2 ${
          unread ? 'ring-paddock-green' : 'ring-tan'
        }`}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="size-full object-cover" />
        ) : (
          <div
            className={`flex size-full items-center justify-center ${
              unread ? 'bg-sage' : 'bg-light-sand'
            }`}
          >
            <span
              className={`font-sans text-xs font-semibold ${
                unread ? 'text-paddock-green' : 'text-warm-brown'
              }`}
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-sans text-sm ${
            unread
              ? 'font-bold text-ringside-black'
              : 'font-medium text-warm-brown'
          }`}
        >
          {name}
        </p>
        <p className="truncate font-sans text-xs text-warm-gray">{preview}</p>
      </div>

      {/* Time + unread badge */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span
          className={`font-sans text-[11px] ${
            unread ? 'font-medium text-paddock-green' : 'text-warm-gray'
          }`}
        >
          {time}
        </span>
        {unread && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-paddock-green to-forest px-1.5 font-sans text-[10px] font-bold text-white shadow-[0_1px_4px_rgba(31,107,74,0.3)]">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  )
}

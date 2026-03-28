import { getLevelBadgeStyle, getLevelDisplayName } from '@/lib/handler-levels'
import { cn } from '@/lib/utils'

import { HandlerLevel } from '@prisma/client'

interface HandlerLevelBadgeProps {
  level: HandlerLevel
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export function HandlerLevelBadge({
  level,
  className,
  size = 'md',
  showIcon = false,
}: HandlerLevelBadgeProps) {
  const style = getLevelBadgeStyle(level)
  const displayName = getLevelDisplayName(level)

  // Size variants
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold shadow-sm',
        style.gradient ? style.bg : `${style.bg} border ${style.border}`,
        style.text,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <LevelIcon level={level} />}
      <span>{displayName}</span>
    </div>
  )
}

function LevelIcon({ level }: { level: HandlerLevel }) {
  const icons = {
    NEW: (
      <svg
        className="size-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    VERIFIED: (
      <svg
        className="size-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    PROFESSIONAL: (
      <svg
        className="size-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    ELITE: (
      <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  }

  return icons[level] || null
}

import * as React from 'react'

import { cn } from '@/lib/utils'

interface MissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  title: string
  description: string
  themeColor: string
  imagePosition?: string
}

const MissionCard = React.forwardRef<HTMLDivElement, MissionCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      description,
      themeColor,
      imagePosition = 'center',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={
          {
            '--theme-color': themeColor,
          } as React.CSSProperties
        }
        className={cn('group size-full', className)}
        {...props}
      >
        <div className="relative block size-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl">
          <div
            className="absolute inset-0 bg-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: imagePosition,
            }}
          />
          {/* Strong overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95) 0%, hsl(var(--theme-color) / 0.85) 35%, hsl(var(--theme-color) / 0.3) 70%, transparent 100%)`,
            }}
          />
          <div className="relative flex h-full flex-col justify-end p-6 text-white">
            <h3 className="font-display text-3xl font-bold tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-base font-medium leading-relaxed text-white/90">
              {description}
            </p>
          </div>
        </div>
      </div>
    )
  }
)
MissionCard.displayName = 'MissionCard'

export { MissionCard }

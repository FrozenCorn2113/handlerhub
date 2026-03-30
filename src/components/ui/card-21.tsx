import * as React from 'react'

import { cn } from '@/lib/utils'

interface MissionCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  imageUrl: string
  title: string
  description: string
  themeColor: string
  imagePosition?: string
  href: string
}

const MissionCard = React.forwardRef<HTMLAnchorElement, MissionCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      description,
      themeColor,
      imagePosition = 'center',
      href,
      ...props
    },
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        style={
          {
            '--theme-color': themeColor,
          } as React.CSSProperties
        }
        className={cn(
          'group block size-full transition-transform duration-300 hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {/* Image card */}
        <div className="relative h-[320px] overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
          <div
            className="absolute inset-0 bg-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: imagePosition,
            }}
          />
        </div>

        {/* Title + description below the card */}
        <div className="px-1 pt-5">
          <h3 className="font-display text-2xl font-bold tracking-tight text-[#14472F]">
            {title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-gray-600">
            {description}
          </p>
        </div>
      </a>
    )
  }
)
MissionCard.displayName = 'MissionCard'

export { MissionCard }

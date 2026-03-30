import * as React from 'react'

import { cn } from '@/lib/utils'

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-1 gap-3 md:grid-cols-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
BentoGrid.displayName = 'BentoGrid'

interface BentoGridItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, title, description, header, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-gray-100 bg-card p-4 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl',
          className
        )}
        {...props}
      >
        <div className="relative min-h-[6rem] w-full flex-1 overflow-hidden rounded-xl">
          {header}
        </div>

        <div className="transition-transform duration-200 group-hover:translate-x-1">
          {icon}
          <div className="font-body text-sm font-bold text-[#14472F]">
            {title}
          </div>
          <p className="font-body text-xs text-[#4A3E2E]/70">{description}</p>
        </div>
      </div>
    )
  }
)
BentoGridItem.displayName = 'BentoGridItem'

export { BentoGrid, BentoGridItem }

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'

import { SexyBorder } from '@/components/ui/sexy-border'

import { type VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paddock-green/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-paddock-green text-[#F8F4EE] hover:bg-forest',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-paddock-green text-paddock-green bg-transparent hover:bg-paddock-green/10',
        secondary: 'bg-light-sand text-[#1C1208] hover:bg-sand',
        ghost:
          'bg-transparent text-warm-brown hover:bg-warm-brown/10 hover:text-[#1C1208]',
        link: 'underline-offset-4 hover:underline text-paddock-green',
        orange: 'bg-show-orange hover:bg-show-orange/90 text-white',
        sexy: 'transition-all text-white hover:bg-opacity-0',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <WithSexyBorder variant={variant} className={cn('w-fit', className)}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </WithSexyBorder>
    )
  }
)
Button.displayName = 'Button'

export function WithSexyBorder({
  variant,
  className,
  children,
}: {
  variant: string | null | undefined
  className?: string
  children: React.ReactNode
}) {
  if (variant === 'sexy') {
    return <SexyBorder className={className}>{children}</SexyBorder>
  } else {
    return <>{children}</>
  }
}

export { Button, buttonVariants }

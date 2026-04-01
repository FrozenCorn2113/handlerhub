import * as React from 'react'

import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'

import { SexyBorder } from '@/components/ui/sexy-border'

import { type VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paddock-green/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'btn-brand-base btn-gradient-primary text-[#F8F4EE]',
        destructive: 'btn-brand-base btn-gradient-destructive text-white',
        outline:
          'border border-sand text-warm-brown bg-transparent hover:bg-sand/50 transition-all duration-200',
        secondary:
          'border border-sand text-warm-brown bg-transparent hover:bg-sand/50 transition-all duration-200',
        ghost:
          'bg-transparent text-warm-brown hover:bg-sand/30 hover:text-[#1C1208] transition-all duration-200',
        link: 'underline-offset-4 hover:underline text-paddock-green transition-colors duration-200',
        accent: 'btn-brand-base btn-gradient-accent text-white',
        dark: 'btn-brand-base btn-gradient-dark text-white',
        orange: 'btn-brand-base btn-gradient-accent text-white',
        sexy: 'btn-brand-base transition-all text-white hover:bg-opacity-0',
      },
      size: {
        default: 'h-10 px-6 text-sm',
        sm: 'h-8 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
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

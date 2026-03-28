import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { Sparkle } from '@phosphor-icons/react/dist/ssr'

interface FoundingHandlerBannerProps {
  variant?: 'default' | 'compact' | 'cta'
  showCTA?: boolean
}

export function FoundingHandlerBanner({
  variant = 'default',
  showCTA = true,
}: FoundingHandlerBannerProps) {
  if (variant === 'compact') {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Sparkle className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="flex-1">
            <h4 className="font-semibold text-primary">
              Founding Handler Program
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Join free while we build the premier handler marketplace. Lock in
              your founding handler status with zero fees, forever.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'cta') {
    return (
      <div className="rounded-lg border border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Sparkle className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Are you a professional dog handler?
              </h3>
              <p className="mt-1 text-muted-foreground">
                Join our exclusive Founding Handler Program - 100% free, no fees
                ever. Get your profile live and start receiving booking requests
                today.
              </p>
            </div>
          </div>
          {showCTA && (
            <Button size="lg" asChild className="shrink-0">
              <Link href="/register">Join Free</Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border-2 border-primary bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary p-3">
          <Sparkle className="size-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            LIMITED TIME
          </div>
          <h3 className="text-2xl font-bold">Founding Handler Program</h3>
          <p className="mt-2 text-lg text-muted-foreground">
            Join free while we build the premier dog show handler marketplace.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <div className="size-1.5 rounded-full bg-primary" />
              <span>100% Free - No subscription fees, ever</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="size-1.5 rounded-full bg-primary" />
              <span>No commission on bookings</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="size-1.5 rounded-full bg-primary" />
              <span>
                Complete professional profile with unlimited visibility
              </span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="size-1.5 rounded-full bg-primary" />
              <span>Early access to new features</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="size-1.5 rounded-full bg-primary" />
              <span>Help shape the future of handler booking</span>
            </li>
          </ul>
          {showCTA && (
            <div className="mt-6">
              <Button size="lg" asChild className="mr-4">
                <Link href="/register">Join as Founding Handler</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/for-handlers">Learn More</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

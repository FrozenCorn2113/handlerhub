'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Handshake,
  MagnifyingGlass,
  PaperPlaneTilt,
} from '@phosphor-icons/react'

interface BookingInterstitialProps {
  onContinue: () => void
}

const steps = [
  {
    number: 1,
    icon: PaperPlaneTilt,
    title: 'Send your request',
    description: 'Describe the dog, show, and services you need',
  },
  {
    number: 2,
    icon: MagnifyingGlass,
    title: 'Handler reviews',
    description: 'Most handlers respond within 24-48 hours',
  },
  {
    number: 3,
    icon: Handshake,
    title: 'Confirm together',
    description: 'Discuss details and confirm the booking',
  },
]

export default function BookingInterstitial({
  onContinue,
}: BookingInterstitialProps) {
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">How booking works</CardTitle>
          <CardDescription>
            Three simple steps to connect with a handler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="size-5" weight="duotone" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Step {step.number}
                    </span>
                  </div>
                  <p className="font-semibold leading-none">{step.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={onContinue} className="w-full" size="lg">
            Send a Request
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

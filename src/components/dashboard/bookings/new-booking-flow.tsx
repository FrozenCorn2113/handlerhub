'use client'

import { useState } from 'react'

import BookingInterstitial from '@/components/dashboard/bookings/booking-interstitial'
import BookingRequestForm from '@/components/forms/booking-request-form'

import { DogProfile, HandlerProfile, User } from '@prisma/client'

interface NewBookingFlowProps {
  user: User
  handler?: (User & { handlerProfile: HandlerProfile | null }) | null
  dogProfiles: DogProfile[]
}

export default function NewBookingFlow({
  user,
  handler,
  dogProfiles,
}: NewBookingFlowProps) {
  const [showForm, setShowForm] = useState(false)

  if (!showForm) {
    return <BookingInterstitial onContinue={() => setShowForm(true)} />
  }

  return (
    <BookingRequestForm
      user={user}
      handler={handler}
      dogProfiles={dogProfiles}
    />
  )
}

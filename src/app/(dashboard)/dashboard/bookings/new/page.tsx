import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import NewBookingFlow from '@/components/dashboard/bookings/new-booking-flow'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

interface NewBookingPageProps {
  searchParams: {
    handlerId?: string
  }
}

export const metadata = {
  title: 'Request Booking',
  description: 'Request a handler for your dog show',
}

export default async function NewBookingPage({
  searchParams,
}: NewBookingPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'EXHIBITOR') {
    redirect('/dashboard')
  }

  let handler: any = null
  if (searchParams.handlerId) {
    handler = await prisma.user.findUnique({
      where: {
        id: searchParams.handlerId,
        role: 'HANDLER',
      },
      include: {
        handlerProfile: true,
      },
    })
  }

  // Fetch user's dog profiles
  const dogProfiles = await prisma.dogProfile.findMany({
    where: {
      userId: user.id,
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Request Handler Booking"
        text="Send a booking request to a professional handler for your upcoming dog show."
      />

      <div className="grid gap-10">
        <NewBookingFlow
          user={user as any}
          handler={handler}
          dogProfiles={dogProfiles}
        />
      </div>
    </DashboardShell>
  )
}

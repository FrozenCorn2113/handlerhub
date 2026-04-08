import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { BookingsTabs } from '@/components/dashboard/bookings-tabs'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export const metadata = {
  title: 'Bookings',
  description: 'Manage your booking requests',
}

export default async function BookingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'HANDLER' && user.role !== 'EXHIBITOR') {
    redirect('/dashboard')
  }

  const where: Record<string, unknown> = {}
  if (user.role === 'HANDLER') {
    where.handlerId = user.id
  } else {
    where.exhibitorId = user.id
  }

  const bookingRequests = await prisma.bookingRequest.findMany({
    where,
    include: {
      handler: {
        include: {
          handlerProfile: true,
        },
      },
      exhibitor: true,
      review: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const serialized = bookingRequests.map((b) => ({
    ...b,
    showDate: b.showDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    respondedAt: b.respondedAt?.toISOString() ?? null,
    completedAt: b.completedAt?.toISOString() ?? null,
  }))

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Bookings"
        text={
          user.role === 'HANDLER'
            ? 'View and manage booking requests from exhibitors'
            : 'View and manage your booking requests to handlers'
        }
      >
        {user.role === 'EXHIBITOR' && (
          <Button asChild>
            <Link href="/dashboard/bookings/new">New Booking Request</Link>
          </Button>
        )}
      </DashboardHeader>

      {bookingRequests.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="font-body text-warm-gray">
              {user.role === 'HANDLER'
                ? 'No booking requests yet. A complete profile helps exhibitors find and trust you -- make sure yours is up to date.'
                : 'No bookings yet. Browse our network of trusted handlers to find the perfect match for your dog.'}
            </p>
            {user.role === 'EXHIBITOR' && (
              <div className="mt-4 flex justify-center gap-3">
                <Button asChild>
                  <Link href="/handlers">Browse Handlers</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/bookings/new">New Request</Link>
                </Button>
              </div>
            )}
            {user.role === 'HANDLER' && (
              <Button asChild className="mt-4">
                <Link href="/dashboard/profile">Complete Profile</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <BookingsTabs
          bookings={serialized as any}
          userRole={user.role as 'HANDLER' | 'EXHIBITOR'}
        />
      )}
    </DashboardShell>
  )
}

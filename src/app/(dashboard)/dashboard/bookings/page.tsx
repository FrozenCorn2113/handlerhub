import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { BookingActions } from '@/components/dashboard/booking-actions'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

import { Calendar, MapPin } from '@phosphor-icons/react/dist/ssr'
import { format } from 'date-fns'

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

  const where: any = {}
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

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      PENDING: 'default',
      ACCEPTED: 'secondary',
      DECLINED: 'destructive',
      COMPLETED: 'outline',
      CANCELLED: 'outline',
    }

    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

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
          <Button href="/dashboard/bookings/new">New Booking Request</Button>
        )}
      </DashboardHeader>

      <div className="space-y-4">
        {bookingRequests.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                {user.role === 'HANDLER'
                  ? 'No booking requests yet. Make sure your profile is complete!'
                  : 'No booking requests yet. Browse handlers to get started!'}
              </p>
              {user.role === 'EXHIBITOR' && (
                <div className="mt-4 flex justify-center gap-2">
                  <Button href="/handlers">Browse Handlers</Button>
                  <Button href="/dashboard/bookings/new" variant="secondary">
                    New Request
                  </Button>
                </div>
              )}
              {user.role === 'HANDLER' && (
                <Button
                  href="/dashboard/profile"
                  variant="secondary"
                  className="mt-4"
                >
                  Complete Profile
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookingRequests.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {user.role === 'HANDLER' ? (
                        <>
                          <Avatar className="size-12">
                            <AvatarImage
                              src={booking.exhibitor.image || undefined}
                              alt={booking.exhibitor.name || 'Exhibitor'}
                            />
                            <AvatarFallback>
                              {booking.exhibitor.name?.charAt(0) || 'E'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {booking.showName}
                            </CardTitle>
                            <CardDescription>
                              Requested by {booking.exhibitor.name}
                            </CardDescription>
                          </div>
                        </>
                      ) : (
                        <>
                          <Avatar className="size-12">
                            <AvatarImage
                              src={booking.handler.image || undefined}
                              alt={booking.handler.name || 'Handler'}
                            />
                            <AvatarFallback>
                              {booking.handler.name?.charAt(0) || 'H'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {booking.showName}
                            </CardTitle>
                            <CardDescription>
                              Handler: {booking.handler.name}
                            </CardDescription>
                          </div>
                        </>
                      )}
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span>{format(new Date(booking.showDate), 'PPP')}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span>{booking.showLocation}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">Dog Information</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.dogName} • {booking.dogBreed}
                    </div>
                  </div>

                  {booking.message && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Message</div>
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        {booking.message}
                      </div>
                    </div>
                  )}

                  {booking.handlerNotes && user.role === 'EXHIBITOR' && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Handler Notes</div>
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        {booking.handlerNotes}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                      userRole={user.role as 'HANDLER' | 'EXHIBITOR'}
                      handlerName={booking.handler.name || 'Handler'}
                      hasReview={!!booking.review}
                    />

                    {user.role === 'EXHIBITOR' && (
                      <Button
                        variant="secondary"
                        href={`/handlers/${booking.handler.id}`}
                        className="px-3 py-2 text-sm"
                      >
                        View Handler Profile
                      </Button>
                    )}
                    {booking.exhibitor.email && user.role === 'HANDLER' && (
                      <a
                        href={`mailto:${booking.exhibitor.email}`}
                        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Contact Exhibitor
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

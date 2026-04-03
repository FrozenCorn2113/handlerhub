'use client'

import Link from 'next/link'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BookingActions } from '@/components/dashboard/booking-actions'

import { Calendar, MapPin } from '@phosphor-icons/react'
import { format } from 'date-fns'

interface BookingUser {
  id: string
  name: string | null
  image: string | null
  email?: string | null
  handlerProfile?: { id: string } | null
}

interface Booking {
  id: string
  showName: string
  showLocation: string
  showDate: string | Date
  dogBreed: string
  dogName: string | null
  message: string
  status: string
  handlerNotes: string | null
  createdAt: string | Date
  handler: BookingUser
  exhibitor: BookingUser
  review: { id: string } | null
}

interface BookingsTabsProps {
  bookings: Booking[]
  userRole: 'HANDLER' | 'EXHIBITOR'
}

const STATUS_VARIANTS: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  PENDING: 'default',
  ACCEPTED: 'secondary',
  CONFIRMED: 'secondary',
  DECLINED: 'destructive',
  COMPLETED: 'outline',
  CANCELLED: 'outline',
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-paddock-green px-1.5 text-xs font-semibold text-white">
      {count}
    </span>
  )
}

function BookingCard({
  booking,
  userRole,
}: {
  booking: Booking
  userRole: 'HANDLER' | 'EXHIBITOR'
}) {
  const otherParty =
    userRole === 'HANDLER' ? booking.exhibitor : booking.handler

  return (
    <Link href={`/dashboard/bookings/${booking.id}`} className="block">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarImage
                  src={otherParty.image || undefined}
                  alt={
                    otherParty.name ||
                    (userRole === 'HANDLER' ? 'Exhibitor' : 'Handler')
                  }
                />
                <AvatarFallback>
                  {otherParty.name?.charAt(0) ||
                    (userRole === 'HANDLER' ? 'E' : 'H')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{booking.showName}</CardTitle>
                <CardDescription>
                  {userRole === 'HANDLER'
                    ? `Requested by ${booking.exhibitor.name}`
                    : `Handler: ${booking.handler.name}`}
                </CardDescription>
              </div>
            </div>
            <Badge variant={STATUS_VARIANTS[booking.status] || 'default'}>
              {booking.status}
            </Badge>
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
              {booking.dogName} - {booking.dogBreed}
            </div>
          </div>

          {booking.message && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Message</div>
              <div className="line-clamp-2 rounded-lg bg-muted p-3 text-sm">
                {booking.message}
              </div>
            </div>
          )}

          {booking.handlerNotes && userRole === 'EXHIBITOR' && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Handler Notes</div>
              <div className="rounded-lg bg-muted p-3 text-sm">
                {booking.handlerNotes}
              </div>
            </div>
          )}

          <div
            className="flex flex-wrap items-center gap-2"
            onClick={(e) => e.preventDefault()}
          >
            <BookingActions
              bookingId={booking.id}
              status={booking.status}
              userRole={userRole}
              handlerName={booking.handler.name || 'Handler'}
              hasReview={!!booking.review}
            />

            {userRole === 'EXHIBITOR' && (
              <Button
                variant="secondary"
                href={`/handlers/${booking.handler.id}`}
                className="px-3 py-2 text-sm"
              >
                View Handler Profile
              </Button>
            )}
            {booking.exhibitor.email && userRole === 'HANDLER' && (
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
    </Link>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <p className="font-body text-warm-gray">{message}</p>
      </CardContent>
    </Card>
  )
}

export function BookingsTabs({ bookings, userRole }: BookingsTabsProps) {
  if (userRole === 'HANDLER') {
    const newRequests = bookings.filter((b) => b.status === 'PENDING')
    const active = bookings.filter(
      (b) => b.status === 'ACCEPTED' || b.status === 'CONFIRMED'
    )
    const past = bookings.filter(
      (b) =>
        b.status === 'COMPLETED' ||
        b.status === 'DECLINED' ||
        b.status === 'CANCELLED'
    )

    return (
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="new">
            New Requests
            <CountBadge count={newRequests.length} />
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <CountBadge count={active.length} />
          </TabsTrigger>
          <TabsTrigger value="past">
            Past
            <CountBadge count={past.length} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="space-y-4">
            {newRequests.length === 0 ? (
              <EmptyState message="No new requests. A complete profile helps exhibitors find and trust you." />
            ) : (
              newRequests.map((b) => (
                <BookingCard key={b.id} booking={b} userRole={userRole} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="space-y-4">
            {active.length === 0 ? (
              <EmptyState message="No active bookings right now." />
            ) : (
              active.map((b) => (
                <BookingCard key={b.id} booking={b} userRole={userRole} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {past.length === 0 ? (
              <EmptyState message="No past bookings yet." />
            ) : (
              past.map((b) => (
                <BookingCard key={b.id} booking={b} userRole={userRole} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    )
  }

  // EXHIBITOR tabs
  const active = bookings.filter(
    (b) =>
      b.status === 'PENDING' ||
      b.status === 'ACCEPTED' ||
      b.status === 'CONFIRMED'
  )
  const past = bookings.filter(
    (b) =>
      b.status === 'COMPLETED' ||
      b.status === 'DECLINED' ||
      b.status === 'CANCELLED'
  )

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="mb-4 w-full justify-start">
        <TabsTrigger value="active">
          Active
          <CountBadge count={active.length} />
        </TabsTrigger>
        <TabsTrigger value="past">
          Past
          <CountBadge count={past.length} />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="space-y-4">
          {active.length === 0 ? (
            <EmptyState message="No active bookings. Browse our network of trusted handlers to find the perfect match for your dog." />
          ) : (
            active.map((b) => (
              <BookingCard key={b.id} booking={b} userRole={userRole} />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="past">
        <div className="space-y-4">
          {past.length === 0 ? (
            <EmptyState message="No past bookings yet." />
          ) : (
            past.map((b) => (
              <BookingCard key={b.id} booking={b} userRole={userRole} />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { BookingData } from '@/components/dashboard/bookings/booking-detail-view'
import { BookingStatusActions } from '@/components/dashboard/bookings/booking-status-actions'

import {
  Calendar,
  Dog,
  MapPin,
  Note,
  Scroll,
  Tag,
  Truck,
  User,
} from '@phosphor-icons/react'
import { format } from 'date-fns'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  ACCEPTED: 'bg-blue-100 text-blue-800 border-blue-300',
  CONFIRMED: 'bg-green-100 text-green-800 border-green-300',
  COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  DECLINED: 'bg-red-100 text-red-800 border-red-300',
  CANCELLED: 'bg-gray-100 text-gray-600 border-gray-300',
}

interface BookingSidebarProps {
  booking: BookingData
  userRole: 'HANDLER' | 'EXHIBITOR'
}

export function BookingSidebar({ booking, userRole }: BookingSidebarProps) {
  const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.PENDING

  const showDate = new Date(booking.showDate)
  const dogPhoto = booking.dogProfile?.photos?.[0] ?? null

  const handlerProfile = booking.handler?.handlerProfile
  const handlerLocation =
    handlerProfile?.city && handlerProfile?.state
      ? `${handlerProfile.city}, ${handlerProfile.state}`
      : null

  // Calculate total price from services
  const totalPrice = booking.services.reduce(
    (sum: number, s: any) => sum + s.priceAtBooking * s.quantity,
    0
  )

  return (
    <div className="space-y-4">
      {/* Status */}
      <Card variant="static">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-warm-gray">
              Status
            </span>
            <Badge
              className={`${statusColor} rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {booking.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Actions */}
      <BookingStatusActions
        bookingId={booking.id}
        status={booking.status}
        userRole={userRole}
      />

      {/* Dog Info */}
      <Card variant="static">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Dog className="size-4 text-paddock-green" weight="fill" />
            Dog Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-start gap-3">
            {dogPhoto ? (
              <img
                src={dogPhoto}
                alt={booking.dogName || 'Dog'}
                className="size-14 rounded-xl border border-sand object-cover"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-xl border border-sand bg-light-sand">
                <Dog className="size-6 text-warm-gray" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold text-ringside-black">
                {booking.dogName || 'Unnamed'}
              </p>
              <p className="font-body text-sm text-warm-gray">
                {booking.dogBreed}
              </p>
              {booking.dogProfile?.registeredName && (
                <p className="font-body text-xs italic text-warm-gray">
                  {booking.dogProfile.registeredName}
                </p>
              )}
            </div>
          </div>
          {booking.dogProfile && (
            <div className="space-y-1.5 border-t border-sand pt-2">
              {booking.dogProfile.titles && (
                <p className="font-body text-xs text-warm-gray">
                  <span className="font-medium text-ringside-black">
                    Titles:
                  </span>{' '}
                  {booking.dogProfile.titles}
                </p>
              )}
              {booking.dogProfile.showExperience && (
                <p className="font-body text-xs text-warm-gray">
                  <span className="font-medium text-ringside-black">
                    Experience:
                  </span>{' '}
                  {booking.dogProfile.showExperience.replace('_', ' ')}
                </p>
              )}
              {booking.dogProfile.temperament && (
                <p className="font-body text-xs text-warm-gray">
                  <span className="font-medium text-ringside-black">
                    Temperament:
                  </span>{' '}
                  {booking.dogProfile.temperament}
                </p>
              )}
              {booking.dogProfile.specialNeeds && (
                <p className="font-body text-xs text-warm-gray">
                  <span className="font-medium text-ringside-black">
                    Special Needs:
                  </span>{' '}
                  {booking.dogProfile.specialNeeds}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Show Info */}
      <Card variant="static">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="size-4 text-paddock-green" weight="fill" />
            Show Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <p className="font-display text-sm font-semibold text-ringside-black">
            {booking.showName}
          </p>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-warm-gray" />
            <p className="font-body text-sm text-warm-gray">
              {booking.showLocation}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-3.5 text-warm-gray" />
            <p className="font-body text-sm text-warm-gray">
              {format(showDate, 'PPP')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      {booking.services.length > 0 && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Tag className="size-4 text-paddock-green" weight="fill" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {booking.services.map((service: any) => (
              <div
                key={service.id}
                className="flex items-center justify-between rounded-lg bg-light-sand/50 px-3 py-2"
              >
                <div>
                  <p className="font-body text-sm font-medium text-ringside-black">
                    {service.handlerService.name}
                  </p>
                  {service.quantity > 1 && (
                    <p className="font-body text-xs text-warm-gray">
                      x{service.quantity}
                    </p>
                  )}
                </div>
                <p className="font-body text-sm font-semibold text-paddock-green">
                  ${(service.priceAtBooking / 100).toFixed(2)}
                </p>
              </div>
            ))}
            {totalPrice > 0 && (
              <div className="flex items-center justify-between border-t border-sand pt-2">
                <p className="font-body text-sm font-medium text-ringside-black">
                  Total
                </p>
                <p className="font-display text-sm font-semibold text-paddock-green">
                  ${(totalPrice / 100).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Handler / Exhibitor Info */}
      <Card variant="static">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="size-4 text-paddock-green" weight="fill" />
            {userRole === 'EXHIBITOR' ? 'Handler' : 'Exhibitor'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {userRole === 'EXHIBITOR' ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  src={booking.handler.image || undefined}
                  alt={booking.handler.name || 'Handler'}
                />
                <AvatarFallback className="bg-sage font-display text-sm text-paddock-green">
                  {booking.handler.name?.charAt(0) || 'H'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/handlers/${booking.handler.id}`}
                  className="font-display text-sm font-semibold text-ringside-black hover:text-paddock-green"
                >
                  {handlerProfile?.businessName ||
                    booking.handler.name ||
                    'Handler'}
                </Link>
                {handlerLocation && (
                  <p className="font-body text-xs text-warm-gray">
                    {handlerLocation}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  src={booking.exhibitor.image || undefined}
                  alt={booking.exhibitor.name || 'Exhibitor'}
                />
                <AvatarFallback className="bg-sage font-display text-sm text-paddock-green">
                  {booking.exhibitor.name?.charAt(0) || 'E'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-ringside-black">
                  {booking.exhibitor.name || 'Exhibitor'}
                </p>
                {booking.exhibitor.email && (
                  <a
                    href={`mailto:${booking.exhibitor.email}`}
                    className="font-body text-xs text-paddock-green hover:underline"
                  >
                    {booking.exhibitor.email}
                  </a>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Handler Notes */}
      {booking.handlerNotes && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Note className="size-4 text-paddock-green" weight="fill" />
              Handler Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg bg-light-sand/50 p-3">
              <p className="font-body text-sm leading-relaxed text-warm-gray">
                {booking.handlerNotes}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Class Entries */}
      {booking.classEntries && booking.classEntries.length > 0 && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Scroll className="size-4 text-paddock-green" weight="fill" />
              Class Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1.5">
              {booking.classEntries.map((entry: string, i: number) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-full bg-sage/30 text-xs text-paddock-green"
                >
                  {entry}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Travel Requirements */}
      {booking.travelRequirements && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Truck className="size-4 text-paddock-green" weight="fill" />
              Travel Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-body text-sm leading-relaxed text-warm-gray">
              {booking.travelRequirements}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Prior Handler Experience */}
      {booking.priorHandlerExperience && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4 text-paddock-green" weight="fill" />
              Prior Handler Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-body text-sm leading-relaxed text-warm-gray">
              {booking.priorHandlerExperience}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Original Message */}
      {booking.message && (
        <Card variant="static">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Note className="size-4 text-paddock-green" weight="fill" />
              Original Request
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg bg-light-sand/50 p-3">
              <p className="font-body text-sm leading-relaxed text-warm-gray">
                {booking.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

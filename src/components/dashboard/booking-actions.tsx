'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { ReviewFormModal } from '@/components/reviews/review-form-modal'

import { ChatCircle, Check, SpinnerGap, X } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface BookingActionsProps {
  bookingId: string
  status: string
  userRole: 'HANDLER' | 'EXHIBITOR'
  handlerName?: string
  hasReview?: boolean
}

export function BookingActions({
  bookingId,
  status,
  userRole,
  handlerName,
  hasReview,
}: BookingActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false)

  const updateBookingStatus = async (
    newStatus: string,
    handlerNotes?: string
  ) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/booking-requests/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          ...(handlerNotes && { handlerNotes }),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update booking')
      }

      toast.success(
        newStatus === 'ACCEPTED'
          ? 'Booking accepted!'
          : newStatus === 'DECLINED'
            ? 'Booking declined'
            : 'Booking marked as completed'
      )

      router.refresh()
    } catch (error) {
      console.error('Update booking error:', error)
      toast.error('Failed to update booking. Please try again.')
    } finally {
      setIsLoading(false)
      setIsDeclineDialogOpen(false)
    }
  }

  const handleAccept = () => updateBookingStatus('ACCEPTED')
  const handleDecline = () => updateBookingStatus('DECLINED', declineReason)
  const handleComplete = () => updateBookingStatus('COMPLETED')

  const handleMessage = async () => {
    setIsLoading(true)
    try {
      // Create or get conversation for this booking
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingRequestId: bookingId,
        }),
      })

      if (response.ok) {
        router.push('/dashboard/messages')
      } else {
        throw new Error('Failed to create conversation')
      }
    } catch (error) {
      console.error('Message error:', error)
      toast.error('Failed to open messages')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler actions for PENDING bookings
  if (userRole === 'HANDLER' && status === 'PENDING') {
    return (
      <div className="flex gap-2">
        <Button
          onClick={handleAccept}
          disabled={isLoading}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? (
            <SpinnerGap className="size-4 animate-spin" />
          ) : (
            <>
              <Check className="mr-2 size-4" />
              Accept
            </>
          )}
        </Button>

        <AlertDialog
          open={isDeclineDialogOpen}
          onOpenChange={setIsDeclineDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={isLoading}>
              <X className="mr-2 size-4" />
              Decline
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Decline Booking Request</AlertDialogTitle>
              <AlertDialogDescription>
                Optionally provide a reason for declining. This will be visible
                to the exhibitor.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              placeholder="Reason for declining (optional)..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              rows={4}
              className="my-4"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDecline} disabled={isLoading}>
                {isLoading ? (
                  <SpinnerGap className="size-4 animate-spin" />
                ) : (
                  'Decline Booking'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // Handler actions for ACCEPTED bookings
  if (userRole === 'HANDLER' && status === 'ACCEPTED') {
    return (
      <Button
        onClick={handleComplete}
        disabled={isLoading}
        size="sm"
        variant="secondary"
      >
        {isLoading ? (
          <SpinnerGap className="size-4 animate-spin" />
        ) : (
          'Mark as Completed'
        )}
      </Button>
    )
  }

  // Exhibitor actions for COMPLETED bookings
  if (userRole === 'EXHIBITOR' && status === 'COMPLETED' && handlerName) {
    if (hasReview) {
      return (
        <Button size="sm" variant="outline" disabled>
          Review Submitted
        </Button>
      )
    }
    return <ReviewFormModal bookingId={bookingId} handlerName={handlerName} />
  }

  // Message button for all non-cancelled bookings
  if (status !== 'CANCELLED') {
    return (
      <Button
        onClick={handleMessage}
        variant="outline"
        size="sm"
        disabled={isLoading}
      >
        <ChatCircle className="mr-2 size-4" />
        Message
      </Button>
    )
  }

  return null
}

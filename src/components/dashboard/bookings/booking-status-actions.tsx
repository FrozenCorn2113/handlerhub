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

import {
  Check,
  CheckCircle,
  ClockCountdown,
  Info,
  Prohibit,
  SpinnerGap,
  X,
  XCircle,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface BookingStatusActionsProps {
  bookingId: string
  status: string
  userRole: 'HANDLER' | 'EXHIBITOR'
}

const GUIDANCE: Record<string, Record<string, { icon: any; text: string }>> = {
  PENDING: {
    EXHIBITOR: {
      icon: ClockCountdown,
      text: 'Your request has been sent. Handlers typically respond within 24-48 hours.',
    },
    HANDLER: {
      icon: Info,
      text: 'Review this request and accept or decline.',
    },
  },
  ACCEPTED: {
    EXHIBITOR: {
      icon: Check,
      text: 'The handler has accepted. Confirm the booking details to proceed.',
    },
    HANDLER: {
      icon: Check,
      text: 'You accepted this request. Waiting for confirmation to proceed.',
    },
  },
  CONFIRMED: {
    EXHIBITOR: {
      icon: CheckCircle,
      text: "You're all set for the show. Message your handler with any questions.",
    },
    HANDLER: {
      icon: CheckCircle,
      text: "This booking is confirmed. You're all set for the show.",
    },
  },
  COMPLETED: {
    EXHIBITOR: {
      icon: CheckCircle,
      text: 'How did it go? Leave a review.',
    },
    HANDLER: {
      icon: CheckCircle,
      text: 'This booking has been completed.',
    },
  },
  DECLINED: {
    EXHIBITOR: {
      icon: XCircle,
      text: 'This request was declined.',
    },
    HANDLER: {
      icon: XCircle,
      text: 'You declined this request.',
    },
  },
  CANCELLED: {
    EXHIBITOR: {
      icon: Prohibit,
      text: 'This booking was cancelled.',
    },
    HANDLER: {
      icon: Prohibit,
      text: 'This booking was cancelled.',
    },
  },
}

export function BookingStatusActions({
  bookingId,
  status,
  userRole,
}: BookingStatusActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const updateStatus = async (newStatus: string, handlerNotes?: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/booking-requests/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          ...(handlerNotes && { handlerNotes }),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to update booking')
      }

      const messages: Record<string, string> = {
        ACCEPTED: 'Booking accepted!',
        DECLINED: 'Booking declined.',
        CONFIRMED: 'Booking confirmed!',
        COMPLETED: 'Booking marked as completed.',
        CANCELLED: 'Booking cancelled.',
      }

      toast.success(messages[newStatus] || 'Booking updated.')
      router.refresh()
    } catch (error: any) {
      console.error('Update booking error:', error)
      toast.error(
        error.message || 'Failed to update booking. Please try again.'
      )
    } finally {
      setIsLoading(false)
      setIsDeclineDialogOpen(false)
      setIsCancelDialogOpen(false)
    }
  }

  const guidance = GUIDANCE[status]?.[userRole]
  const GuidanceIcon = guidance?.icon

  // Determine if there are active statuses that allow cancel
  const canCancel =
    (status === 'ACCEPTED' || status === 'CONFIRMED') &&
    (userRole === 'HANDLER' || userRole === 'EXHIBITOR')

  return (
    <div className="space-y-3">
      {/* Guidance callout */}
      {guidance && (
        <div className="flex items-start gap-3 rounded-xl border border-sand bg-light-sand/50 p-3">
          {GuidanceIcon && (
            <GuidanceIcon
              className="mt-0.5 size-4 shrink-0 text-paddock-green"
              weight="fill"
            />
          )}
          <p className="font-body text-sm leading-relaxed text-warm-gray">
            {guidance.text}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {/* PENDING + Handler: Accept / Decline */}
        {status === 'PENDING' && userRole === 'HANDLER' && (
          <>
            <Button
              onClick={() => updateStatus('ACCEPTED')}
              disabled={isLoading}
              size="sm"
              className="flex-1"
            >
              {isLoading ? (
                <SpinnerGap className="size-4 animate-spin" />
              ) : (
                <>
                  <Check className="mr-1.5 size-4" />
                  Accept
                </>
              )}
            </Button>

            <AlertDialog
              open={isDeclineDialogOpen}
              onOpenChange={setIsDeclineDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="flex-1"
                >
                  <X className="mr-1.5 size-4" />
                  Decline
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Decline Booking Request</AlertDialogTitle>
                  <AlertDialogDescription>
                    Optionally provide a reason for declining. This will be
                    visible to the exhibitor.
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
                  <AlertDialogAction
                    onClick={() => updateStatus('DECLINED', declineReason)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <SpinnerGap className="size-4 animate-spin" />
                    ) : (
                      'Decline Booking'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        {/* ACCEPTED + Either: Confirm Booking */}
        {status === 'ACCEPTED' && (
          <Button
            onClick={() => updateStatus('CONFIRMED')}
            disabled={isLoading}
            size="sm"
            className="w-full"
          >
            {isLoading ? (
              <SpinnerGap className="size-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="mr-1.5 size-4" />
                Confirm Booking
              </>
            )}
          </Button>
        )}

        {/* CONFIRMED + Handler: Mark as Completed */}
        {status === 'CONFIRMED' && userRole === 'HANDLER' && (
          <Button
            onClick={() => updateStatus('COMPLETED')}
            disabled={isLoading}
            size="sm"
            className="w-full"
          >
            {isLoading ? (
              <SpinnerGap className="size-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="mr-1.5 size-4" />
                Mark as Completed
              </>
            )}
          </Button>
        )}

        {/* Cancel for any active status */}
        {canCancel && (
          <AlertDialog
            open={isCancelDialogOpen}
            onOpenChange={setIsCancelDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isLoading}
                className="w-full"
              >
                <Prohibit className="mr-1.5 size-4" />
                Cancel Booking
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this booking? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => updateStatus('CANCELLED')}
                  disabled={isLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isLoading ? (
                    <SpinnerGap className="size-4 animate-spin" />
                  ) : (
                    'Yes, Cancel'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

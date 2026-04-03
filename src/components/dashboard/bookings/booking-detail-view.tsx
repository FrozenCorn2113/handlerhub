'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { BookingSidebar } from '@/components/dashboard/bookings/booking-sidebar'
import { ChatInterface } from '@/components/messaging/chat-interface'

import {
  ArrowLeft,
  CaretDown,
  CaretUp,
  ChatCircle,
  SpinnerGap,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

export interface BookingData {
  id: string
  exhibitorId: string
  handlerId: string
  dogProfileId: string | null
  showName: string
  showLocation: string
  showDate: string
  dogBreed: string
  dogName: string | null
  message: string
  status: string
  classEntries: string[]
  travelRequirements: string | null
  priorHandlerExperience: string | null
  eventId: string | null
  handlerNotes: string | null
  handlerResponded: boolean
  respondedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
  exhibitor: {
    id: string
    name: string | null
    image: string | null
    email: string | null
  }
  handler: {
    id: string
    name: string | null
    image: string | null
    email: string | null
    handlerProfile: {
      id: string
      fullName: string | null
      businessName: string | null
      bio: string | null
      city: string | null
      state: string | null
    } | null
  }
  dogProfile: {
    id: string
    name: string
    breed: string
    sex: string
    age: number
    registeredName: string | null
    titles: string | null
    showExperience: string
    temperament: string | null
    specialNeeds: string | null
    photos: string[]
  } | null
  services: Array<{
    id: string
    bookingId: string
    handlerServiceId: string
    quantity: number
    priceAtBooking: number
    handlerService: {
      id: string
      name: string
      description: string | null
      price: number
      pricePer: string
    }
  }>
  conversation: {
    id: string
    bookingRequestId: string | null
    participantIds: string[]
    lastMessageAt: string | null
  } | null
}

interface BookingDetailViewProps {
  booking: BookingData
  userRole: 'HANDLER' | 'EXHIBITOR'
  currentUserId: string
  otherParticipant: {
    id: string
    name: string | null
    image: string | null
  }
}

export function BookingDetailView({
  booking,
  userRole,
  currentUserId,
  otherParticipant,
}: BookingDetailViewProps) {
  const router = useRouter()
  const [conversationId, setConversationId] = useState<string | null>(
    booking.conversation?.id ?? null
  )
  const [isCreatingConversation, setIsCreatingConversation] = useState(false)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)

  const handleStartConversation = async () => {
    setIsCreatingConversation(true)
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingRequestId: booking.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to create conversation')
      }

      const conversation = await response.json()
      setConversationId(conversation.id)
      router.refresh()
    } catch (error) {
      console.error('Create conversation error:', error)
      toast.error('Failed to start conversation')
    } finally {
      setIsCreatingConversation(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-sand bg-white px-4 py-3 md:px-6">
        <Link
          href="/dashboard/bookings"
          className="rounded-lg p-1.5 text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-semibold text-ringside-black">
            {booking.showName}
          </h1>
          <p className="font-body text-xs text-warm-gray">
            Booking with{' '}
            {userRole === 'EXHIBITOR'
              ? booking.handler.handlerProfile?.businessName ||
                booking.handler.name
              : booking.exhibitor.name}
          </p>
        </div>
      </div>

      {/* Mobile: collapsible details */}
      <div className="border-b border-sand md:hidden">
        <button
          onClick={() => setMobileDetailsOpen(!mobileDetailsOpen)}
          className="flex w-full items-center justify-between bg-light-sand/30 px-4 py-3"
        >
          <span className="font-body text-sm font-medium text-ringside-black">
            Booking Details
          </span>
          {mobileDetailsOpen ? (
            <CaretUp className="size-4 text-warm-gray" />
          ) : (
            <CaretDown className="size-4 text-warm-gray" />
          )}
        </button>
        {mobileDetailsOpen && (
          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            <BookingSidebar booking={booking} userRole={userRole} />
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="min-h-0 flex-1 md:grid md:grid-cols-[1fr_380px]">
        {/* Conversation panel */}
        <div className="flex h-full flex-col border-r border-sand">
          {conversationId ? (
            <ChatInterface
              conversationId={conversationId}
              currentUserId={currentUserId}
              otherParticipant={otherParticipant}
              showName={booking.showName}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-ring-cream p-8">
              <div className="flex size-16 items-center justify-center rounded-full bg-sage/30">
                <ChatCircle
                  className="size-8 text-paddock-green"
                  weight="fill"
                />
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg font-semibold text-ringside-black">
                  No conversation yet
                </h3>
                <p className="mt-1 font-body text-sm text-warm-gray">
                  Start a conversation to discuss booking details with{' '}
                  {otherParticipant.name || 'the other party'}.
                </p>
              </div>
              <Button
                onClick={handleStartConversation}
                disabled={isCreatingConversation}
                size="sm"
              >
                {isCreatingConversation ? (
                  <SpinnerGap className="mr-2 size-4 animate-spin" />
                ) : (
                  <ChatCircle className="mr-2 size-4" />
                )}
                Start Conversation
              </Button>
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <div className="hidden h-full overflow-y-auto bg-white p-4 md:block">
          <BookingSidebar booking={booking} userRole={userRole} />
        </div>
      </div>
    </div>
  )
}

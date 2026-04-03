import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { BookingDetailView } from '@/components/dashboard/bookings/booking-detail-view'

export const metadata = {
  title: 'Booking Details',
  description: 'View booking details and conversation',
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'HANDLER' && user.role !== 'EXHIBITOR') {
    redirect('/dashboard')
  }

  const { id } = await params

  const booking = await prisma.bookingRequest.findUnique({
    where: { id },
    include: {
      exhibitor: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
      handler: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          handlerProfile: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              bio: true,
              city: true,
              state: true,
            },
          },
        },
      },
      dogProfile: {
        select: {
          id: true,
          name: true,
          breed: true,
          sex: true,
          age: true,
          registeredName: true,
          titles: true,
          showExperience: true,
          temperament: true,
          specialNeeds: true,
          photos: true,
        },
      },
      services: {
        include: {
          handlerService: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              pricePer: true,
            },
          },
        },
      },
      conversation: {
        select: {
          id: true,
          bookingRequestId: true,
          participantIds: true,
          lastMessageAt: true,
        },
      },
    },
  })

  if (!booking) {
    notFound()
  }

  // Auth gate: user must be either the exhibitor or handler
  const isHandler = user.id === booking.handlerId
  const isExhibitor = user.id === booking.exhibitorId

  if (!isHandler && !isExhibitor) {
    notFound()
  }

  const userRole = isHandler ? 'HANDLER' : 'EXHIBITOR'

  const otherParticipant = isHandler
    ? {
        id: booking.exhibitor.id,
        name: booking.exhibitor.name,
        image: booking.exhibitor.image,
      }
    : {
        id: booking.handler.id,
        name: booking.handler.name,
        image: booking.handler.image,
      }

  // Serialize to plain JSON for client component
  const bookingData = JSON.parse(JSON.stringify(booking))

  return (
    <BookingDetailView
      booking={bookingData}
      userRole={userRole}
      currentUserId={user.id}
      otherParticipant={otherParticipant}
    />
  )
}

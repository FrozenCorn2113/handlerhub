import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { MessagesClient } from '@/components/messaging/messages-client'

export const metadata = {
  title: 'Messages | HandlerHub',
}

export const dynamic = 'force-dynamic'

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { new?: string; conversation?: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?next=/dashboard/messages')
  }

  // Fetch conversations server-side for initial render
  let conversations: any[] = []
  try {
    const raw = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: user.id,
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        bookingRequest: {
          select: {
            showName: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { sentAt: 'desc' },
          include: {
            sender: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    })

    // Compute unread counts
    conversations = await Promise.all(
      raw.map(async (conv) => {
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conv.id,
            senderId: { not: user.id },
            readAt: null,
          },
        })

        const otherParticipant =
          conv.participants.find((p) => p.id !== user.id) ?? null

        return {
          id: conv.id,
          lastMessageAt: conv.lastMessageAt?.toISOString() ?? null,
          unreadCount,
          otherParticipant,
          bookingRequest: conv.bookingRequest,
          messages: conv.messages.map((m) => ({
            content: m.content,
            sentAt: m.sentAt.toISOString(),
            sender: m.sender,
          })),
        }
      })
    )
  } catch {
    conversations = []
  }

  // If ?new= param is present, look up the handler to prefill compose
  let newRecipient: {
    id: string
    name: string | null
    image: string | null
  } | null = null
  if (searchParams.new) {
    try {
      const recipient = await prisma.user.findUnique({
        where: { id: searchParams.new },
        select: { id: true, name: true, image: true },
      })
      if (recipient) {
        newRecipient = recipient
      }
    } catch {
      // ignore
    }
  }

  return (
    <MessagesClient
      conversations={conversations}
      currentUserId={user.id}
      currentUserName={user.name ?? null}
      currentUserImage={user.image ?? null}
      initialConversationId={searchParams.conversation ?? null}
      newRecipient={newRecipient}
    />
  )
}

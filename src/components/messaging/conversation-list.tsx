'use client'

import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

import { ChatInterface } from './chat-interface'
import { ChatCircle } from '@phosphor-icons/react'
import { formatDistanceToNow } from 'date-fns'

interface ConversationListProps {
  conversations: any[]
  currentUserId: string
}

export function ConversationList({
  conversations,
  currentUserId,
}: ConversationListProps) {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null)

  const getOtherParticipant = (conversation: any) => {
    return conversation.bookingRequest.exhibitorId === currentUserId
      ? conversation.bookingRequest.handler
      : conversation.bookingRequest.exhibitor
  }

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  )

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <div className="divide-y">
          {conversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation)
            const lastMessage = conversation.messages[0]
            const isSelected = conversation.id === selectedConversationId

            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                className={`w-full p-4 text-left transition-colors hover:bg-muted ${
                  isSelected ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={otherParticipant.image || undefined}
                      alt={otherParticipant.name || 'User'}
                    />
                    <AvatarFallback>
                      {otherParticipant.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-medium">
                        {otherParticipant.name}
                      </p>
                      {lastMessage && (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(lastMessage.sentAt), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {conversation.bookingRequest.showName}
                    </p>
                    {lastMessage && (
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {lastMessage.sender.id === currentUserId ? 'You: ' : ''}
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        {selectedConversation ? (
          <ChatInterface
            conversation={selectedConversation}
            currentUserId={currentUserId}
            otherParticipant={getOtherParticipant(selectedConversation)}
          />
        ) : (
          <Card className="flex h-[600px] items-center justify-center">
            <div className="text-center">
              <ChatCircle className="mx-auto mb-4 size-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

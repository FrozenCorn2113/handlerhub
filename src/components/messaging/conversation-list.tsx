'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ChatCircle, MagnifyingGlass } from '@phosphor-icons/react'
import { formatDistanceToNow } from 'date-fns'

export interface ConversationItem {
  id: string
  lastMessageAt: string | null
  unreadCount: number
  otherParticipant: {
    id: string
    name: string | null
    image: string | null
  } | null
  bookingRequest: {
    showName: string
  } | null
  messages: Array<{
    content: string
    sentAt: string
    sender: {
      id: string
      name: string | null
    }
  }>
}

interface ConversationListSidebarProps {
  conversations: ConversationItem[]
  currentUserId: string
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ConversationListSidebar({
  conversations,
  currentUserId,
  selectedId,
  onSelect,
}: ConversationListSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="border-b border-sand p-4">
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-2.5 text-warm-gray"
          />
          <input
            className="w-full rounded-xl border border-sand bg-ring-cream py-2 pl-10 pr-4 font-body text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-1 focus:ring-paddock-green/50"
            placeholder="Search conversations..."
            type="text"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <ChatCircle size={48} weight="light" className="mb-3 text-sand" />
            <p className="text-center font-display text-lg font-light text-warm-gray">
              No conversations yet
            </p>
            <p className="mt-1 text-center font-body text-sm text-warm-gray">
              Browse handlers and send a message to get started.
            </p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const other = conversation.otherParticipant
            const lastMessage = conversation.messages[0]
            const isSelected = conversation.id === selectedId
            const isUnread = conversation.unreadCount > 0

            return (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={`w-full border-b border-sand/50 px-4 py-3.5 text-left transition-colors hover:bg-light-sand ${
                  isSelected
                    ? 'border-l-4 border-l-paddock-green bg-light-sand'
                    : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage
                      src={other?.image || undefined}
                      alt={other?.name || 'User'}
                    />
                    <AvatarFallback className="bg-sage font-display text-sm text-paddock-green">
                      {other?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`truncate font-body text-sm ${
                          isUnread
                            ? 'font-semibold text-ringside-black'
                            : 'font-medium text-warm-brown'
                        }`}
                      >
                        {other?.name || 'Unknown User'}
                      </p>
                      <div className="flex shrink-0 items-center gap-2">
                        {lastMessage && (
                          <span className="font-body text-xs text-warm-gray">
                            {formatDistanceToNow(new Date(lastMessage.sentAt), {
                              addSuffix: false,
                            })}
                          </span>
                        )}
                        {isUnread && (
                          <span className="flex size-2 shrink-0 rounded-full bg-paddock-green" />
                        )}
                      </div>
                    </div>
                    {conversation.bookingRequest?.showName && (
                      <p className="mt-0.5 truncate font-body text-xs text-warm-gray">
                        {conversation.bookingRequest.showName}
                      </p>
                    )}
                    {lastMessage && (
                      <p
                        className={`mt-1 truncate font-body text-xs ${
                          isUnread ? 'text-warm-brown' : 'text-warm-gray'
                        }`}
                      >
                        {lastMessage.sender.id === currentUserId ? 'You: ' : ''}
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

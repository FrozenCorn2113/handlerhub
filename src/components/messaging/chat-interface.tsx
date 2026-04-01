'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  ArrowLeft,
  ArrowsClockwise,
  PaperPlaneRight,
  SpinnerGap,
} from '@phosphor-icons/react'
import { format, isToday, isYesterday } from 'date-fns'
import { toast } from 'sonner'

interface ChatInterfaceProps {
  conversationId: string
  currentUserId: string
  otherParticipant: {
    id: string
    name: string | null
    image: string | null
  }
  showName?: string | null
  onBack?: () => void
}

interface MessageData {
  id: string
  content: string
  senderId: string
  sentAt: string
  readAt: string | null
  sender: {
    id: string
    name: string | null
    image: string | null
  }
}

function formatDateDivider(date: Date): string {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(date, 'MMMM d, yyyy')
}

export function ChatInterface({
  conversationId,
  currentUserId,
  otherParticipant,
  showName,
  onBack,
}: ChatInterfaceProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<MessageData[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    loadMessages()
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`
      )
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Load messages error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadMessages()
    setIsRefreshing(false)
  }

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newMessage.trim() }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const sentMessage = await response.json()
      setMessages((prev) => [...prev, sentMessage])
      setNewMessage('')
      inputRef.current?.focus()
      router.refresh()
    } catch (error) {
      console.error('Send message error:', error)
      toast.error('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Group messages by date for dividers
  const groupedMessages: Array<{
    date: string
    messages: MessageData[]
  }> = []
  let currentDate = ''
  for (const msg of messages) {
    const msgDate = formatDateDivider(new Date(msg.sentAt))
    if (msgDate !== currentDate) {
      currentDate = msgDate
      groupedMessages.push({ date: msgDate, messages: [msg] })
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-sand bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="mr-1 rounded-lg p-1.5 text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black lg:hidden"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <Avatar className="size-9">
            <AvatarImage
              src={otherParticipant.image || undefined}
              alt={otherParticipant.name || 'User'}
            />
            <AvatarFallback className="bg-sage font-display text-sm text-paddock-green">
              {otherParticipant.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-base font-semibold text-ringside-black">
              {otherParticipant.name || 'Unknown User'}
            </h3>
            {showName && (
              <p className="font-body text-xs text-warm-gray">{showName}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-lg p-2 text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black"
        >
          <ArrowsClockwise
            size={18}
            className={isRefreshing ? 'animate-spin' : ''}
          />
        </button>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-ring-cream px-4 py-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerGap size={24} className="animate-spin text-paddock-green" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-body text-sm text-warm-gray">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedMessages.map((group) => (
              <div key={group.date}>
                {/* Date divider */}
                <div className="flex items-center gap-3 py-2">
                  <div className="h-px flex-1 bg-sand" />
                  <span className="font-body text-xs font-medium text-warm-gray">
                    {group.date}
                  </span>
                  <div className="h-px flex-1 bg-sand" />
                </div>

                {/* Messages in this date group */}
                <div className="space-y-3">
                  {group.messages.map((message) => {
                    const isOwn = message.senderId === currentUserId

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-2.5 ${
                              isOwn
                                ? 'bg-sage text-forest [border-bottom-right-radius:4px]'
                                : 'border border-sand bg-light-sand text-ringside-black [border-bottom-left-radius:4px]'
                            }`}
                          >
                            <p className="font-body text-sm leading-relaxed">
                              {message.content}
                            </p>
                          </div>
                          <p
                            className={`mt-1 font-body text-xs text-warm-gray ${
                              isOwn ? 'text-right' : 'text-left'
                            }`}
                          >
                            {format(new Date(message.sentAt), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <footer className="border-t border-sand bg-white p-4">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 rounded-xl border border-sand bg-ring-cream px-4 py-2.5 font-body text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-1 focus:ring-paddock-green/50"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            size="icon"
            className="shrink-0"
          >
            {isSending ? (
              <SpinnerGap className="size-4 animate-spin" />
            ) : (
              <PaperPlaneRight className="size-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 font-body text-xs text-warm-gray">
          Press Enter to send
        </p>
      </footer>
    </div>
  )
}

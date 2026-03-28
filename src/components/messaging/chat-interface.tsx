'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import {
  ArrowsClockwise,
  PaperPlaneRight,
  SpinnerGap,
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface ChatInterfaceProps {
  conversation: any
  currentUserId: string
  otherParticipant: any
}

export function ChatInterface({
  conversation,
  currentUserId,
  otherParticipant,
}: ChatInterfaceProps) {
  const router = useRouter()
  const [messages, setMessages] = useState(conversation.messages || [])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    // Load full conversation messages
    loadMessages()
  }, [conversation.id])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/conversations/${conversation.id}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Load messages error:', error)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadMessages()
    router.refresh()
    setIsRefreshing(false)
  }

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const response = await fetch(
        `/api/conversations/${conversation.id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newMessage.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const sentMessage = await response.json()
      setMessages([...messages, sentMessage])
      setNewMessage('')
      scrollToBottom()
      router.refresh()
    } catch (error) {
      console.error('Send message error:', error)
      toast.error('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="flex h-[600px] flex-col">
      {/* Header */}
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={otherParticipant.image || undefined}
              alt={otherParticipant.name || 'User'}
            />
            <AvatarFallback>
              {otherParticipant.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{otherParticipant.name}</h3>
            <p className="text-sm text-muted-foreground">
              {conversation.bookingRequest.showName}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <ArrowsClockwise
            className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </Button>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message: any) => {
              const isOwnMessage = message.senderId === currentUserId
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] space-y-1 ${
                      isOwnMessage ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(message.sentAt), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </CardContent>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            className="resize-none"
            disabled={isSending}
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
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  )
}

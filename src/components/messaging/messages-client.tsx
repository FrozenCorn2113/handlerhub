'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { ChatInterface } from './chat-interface'
import { ConversationItem, ConversationListSidebar } from './conversation-list'
import {
  ChatCircle,
  EnvelopeSimple,
  PaperPlaneRight,
  SpinnerGap,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface MessagesClientProps {
  conversations: ConversationItem[]
  currentUserId: string
  currentUserName: string | null
  currentUserImage: string | null
  initialConversationId: string | null
  newRecipient: {
    id: string
    name: string | null
    image: string | null
  } | null
}

export function MessagesClient({
  conversations: initialConversations,
  currentUserId,
  currentUserName,
  currentUserImage,
  initialConversationId,
  newRecipient,
}: MessagesClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [conversations, setConversations] =
    useState<ConversationItem[]>(initialConversations)
  const [selectedId, setSelectedId] = useState<string | null>(
    initialConversationId
  )
  const [showCompose, setShowCompose] = useState(!!newRecipient)
  const [composeMessage, setComposeMessage] = useState('')
  const [isSendingNew, setIsSendingNew] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')

  // If newRecipient exists, check if there's already a conversation with them
  useEffect(() => {
    if (newRecipient) {
      const existing = conversations.find(
        (c) => c.otherParticipant?.id === newRecipient.id
      )
      if (existing) {
        setSelectedId(existing.id)
        setShowCompose(false)
        setMobileView('chat')
      } else {
        setShowCompose(true)
      }
    }
  }, [newRecipient])

  const selectedConversation = conversations.find((c) => c.id === selectedId)

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedId(id)
    setShowCompose(false)
    setMobileView('chat')
  }, [])

  const handleBack = useCallback(() => {
    setMobileView('list')
    setSelectedId(null)
    setShowCompose(false)
  }, [])

  const handleSendNewMessage = async () => {
    if (!newRecipient || !composeMessage.trim() || isSendingNew) return

    setIsSendingNew(true)
    try {
      const response = await fetch('/api/conversations/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: newRecipient.id,
          message: composeMessage.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      setComposeMessage('')
      setShowCompose(false)

      // Refresh conversations and select the new one
      const convResponse = await fetch('/api/conversations')
      if (convResponse.ok) {
        const updatedConversations = await convResponse.json()
        setConversations(
          updatedConversations.map((c: any) => ({
            id: c.id,
            lastMessageAt: c.lastMessageAt,
            unreadCount: c.unreadCount ?? 0,
            otherParticipant: c.otherParticipant,
            bookingRequest: c.bookingRequest,
            messages: c.messages.map((m: any) => ({
              content: m.content,
              sentAt: m.sentAt,
              sender: m.sender,
            })),
          }))
        )
      }

      setSelectedId(data.conversationId)
      setMobileView('chat')

      // Clean up URL params
      router.replace('/dashboard/messages', { scroll: false })
    } catch (error) {
      console.error('Send new message error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSendingNew(false)
    }
  }

  const handleComposeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendNewMessage()
    }
  }

  // Get other participant info for selected conversation
  const selectedOther = selectedConversation?.otherParticipant

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-ring-cream">
      {/* Left sidebar -- conversation list */}
      <aside
        className={`w-full shrink-0 border-r border-sand bg-white lg:block lg:w-80 ${
          mobileView === 'list' ? 'block' : 'hidden'
        }`}
      >
        <ConversationListSidebar
          conversations={conversations}
          currentUserId={currentUserId}
          selectedId={selectedId}
          onSelect={handleSelectConversation}
        />
      </aside>

      {/* Right panel -- chat or empty/compose state */}
      <main
        className={`flex-1 lg:block ${
          mobileView === 'chat' || showCompose ? 'block' : 'hidden'
        }`}
      >
        {showCompose && newRecipient ? (
          // Compose new message view
          <div className="flex h-full flex-col bg-white">
            <header className="flex items-center gap-3 border-b border-sand px-4 py-3">
              <button
                onClick={handleBack}
                className="mr-1 rounded-lg p-1.5 text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black lg:hidden"
              >
                <ChatCircle size={20} />
              </button>
              <Avatar className="size-9">
                <AvatarImage
                  src={newRecipient.image || undefined}
                  alt={newRecipient.name || 'User'}
                />
                <AvatarFallback className="bg-sage font-display text-sm text-paddock-green">
                  {newRecipient.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-display text-base font-semibold text-ringside-black">
                  New message to {newRecipient.name || 'User'}
                </h3>
              </div>
            </header>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <div className="w-full max-w-lg text-center">
                <Avatar className="mx-auto size-16">
                  <AvatarImage
                    src={newRecipient.image || undefined}
                    alt={newRecipient.name || 'User'}
                  />
                  <AvatarFallback className="bg-sage font-display text-2xl text-paddock-green">
                    {newRecipient.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 font-display text-xl font-light text-ringside-black">
                  Start a conversation with {newRecipient.name}
                </h2>
                <p className="mt-2 font-body text-sm text-warm-gray">
                  Send your first message to get started. Include details about
                  the show, dog, and what you are looking for.
                </p>
              </div>
            </div>

            <footer className="border-t border-sand bg-white p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={composeMessage}
                  onChange={(e) => setComposeMessage(e.target.value)}
                  onKeyDown={handleComposeKeyDown}
                  placeholder="Type your first message..."
                  disabled={isSendingNew}
                  className="flex-1 rounded-xl border border-sand bg-ring-cream px-4 py-2.5 font-body text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-1 focus:ring-paddock-green/50"
                />
                <Button
                  onClick={handleSendNewMessage}
                  disabled={!composeMessage.trim() || isSendingNew}
                  size="icon"
                  className="shrink-0"
                >
                  {isSendingNew ? (
                    <SpinnerGap className="size-4 animate-spin" />
                  ) : (
                    <PaperPlaneRight className="size-4" />
                  )}
                </Button>
              </div>
            </footer>
          </div>
        ) : selectedConversation && selectedOther ? (
          // Active conversation
          <ChatInterface
            conversationId={selectedConversation.id}
            currentUserId={currentUserId}
            otherParticipant={selectedOther}
            showName={selectedConversation.bookingRequest?.showName}
            onBack={handleBack}
          />
        ) : (
          // Empty state -- no conversation selected
          <div className="flex h-full flex-col items-center justify-center bg-white px-6">
            <EnvelopeSimple
              size={64}
              weight="light"
              className="mb-4 text-sand"
            />
            <h2 className="font-display text-2xl font-light text-ringside-black">
              {conversations.length === 0
                ? 'No messages yet'
                : 'Select a conversation'}
            </h2>
            <p className="mt-2 max-w-sm text-center font-body text-sm text-warm-gray">
              {conversations.length === 0
                ? 'Browse the marketplace to find a handler and send your first message.'
                : 'Choose a conversation from the list to view your messages.'}
            </p>
            {conversations.length === 0 && (
              <Button asChild className="mt-6">
                <a href="/handlers">Browse Handlers</a>
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

import { siteConfig } from '@/config/site'

import { resend } from '@/lib/email'

import BookingAcceptedEmail from '@/components/emails/booking-accepted-email'
import BookingDeclinedEmail from '@/components/emails/booking-declined-email'
import BookingRequestEmail from '@/components/emails/booking-request-email'
import NewMessageEmail from '@/components/emails/new-message-email'
import ReviewPromptEmail from '@/components/emails/review-prompt-email'

import { env } from '@/root/env.mjs'

const fromEmail = env.RESEND_FROM_EMAIL ?? siteConfig.mailSupport

interface ServiceItem {
  name: string
  price: number
}

interface SendBookingRequestParams {
  to: string
  handlerName: string
  exhibitorName: string
  dogName: string
  showName: string
  showDate: string
  services: ServiceItem[]
  totalPrice: number
  bookingUrl: string
}

export async function sendBookingRequestEmail({
  to,
  handlerName,
  exhibitorName,
  dogName,
  showName,
  showDate,
  services,
  totalPrice,
  bookingUrl,
}: SendBookingRequestParams) {
  return resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `New booking request from ${exhibitorName} - ${siteConfig.name}`,
    react: BookingRequestEmail({
      handlerName,
      exhibitorName,
      dogName,
      showName,
      showDate,
      services,
      totalPrice,
      bookingUrl,
    }),
  })
}

interface SendBookingAcceptedParams {
  to: string
  exhibitorName: string
  handlerName: string
  dogName: string
  showName: string
  showDate: string
  bookingUrl: string
}

export async function sendBookingAcceptedEmail({
  to,
  exhibitorName,
  handlerName,
  dogName,
  showName,
  showDate,
  bookingUrl,
}: SendBookingAcceptedParams) {
  return resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `${handlerName} accepted your booking - ${siteConfig.name}`,
    react: BookingAcceptedEmail({
      exhibitorName,
      handlerName,
      dogName,
      showName,
      showDate,
      bookingUrl,
    }),
  })
}

interface SendBookingDeclinedParams {
  to: string
  exhibitorName: string
  handlerName: string
  dogName: string
  showName: string
  bookingUrl: string
}

export async function sendBookingDeclinedEmail({
  to,
  exhibitorName,
  handlerName,
  dogName,
  showName,
  bookingUrl,
}: SendBookingDeclinedParams) {
  return resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `Booking update for ${showName} - ${siteConfig.name}`,
    react: BookingDeclinedEmail({
      exhibitorName,
      handlerName,
      dogName,
      showName,
      bookingUrl,
    }),
  })
}

interface SendReviewPromptParams {
  to: string
  userName: string
  otherPartyName: string
  showName: string
  showDate: string
  reviewUrl: string
}

export async function sendReviewPromptEmail({
  to,
  userName,
  otherPartyName,
  showName,
  showDate,
  reviewUrl,
}: SendReviewPromptParams) {
  return resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `How did it go at ${showName}? - ${siteConfig.name}`,
    react: ReviewPromptEmail({
      userName,
      otherPartyName,
      showName,
      showDate,
      reviewUrl,
    }),
  })
}

interface SendNewMessageParams {
  to: string
  senderName: string
  messagePreview: string
  conversationUrl: string
}

export async function sendNewMessageEmail({
  to,
  senderName,
  messagePreview,
  conversationUrl,
}: SendNewMessageParams) {
  return resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `${senderName} sent you a message - ${siteConfig.name}`,
    react: NewMessageEmail({
      senderName,
      messagePreview:
        messagePreview.length > 200
          ? messagePreview.slice(0, 200) + '...'
          : messagePreview,
      conversationUrl,
    }),
  })
}

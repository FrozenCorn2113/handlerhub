import { siteConfig } from '@/config/site'

import { resend } from '@/lib/email'

import NewMessageEmail from '@/components/emails/new-message-email'
import RequestResponseEmail from '@/components/emails/request-response-email'

import { env } from '@/root/env.mjs'

const fromEmail = env.RESEND_FROM_EMAIL ?? siteConfig.mailSupport

/**
 * Send a new message notification email to the recipient.
 */
export async function sendNewMessageNotification({
  recipientEmail,
  senderName,
  messagePreview,
  conversationUrl,
}: {
  recipientEmail: string
  senderName: string
  messagePreview: string
  conversationUrl: string
}) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `${senderName} sent you a message on ${siteConfig.name}`,
      react: NewMessageEmail({
        senderName,
        messagePreview:
          messagePreview.length > 200
            ? messagePreview.slice(0, 200) + '...'
            : messagePreview,
        conversationUrl,
      }),
    })
  } catch (error) {
    console.error('Failed to send new message email:', error)
  }
}

/**
 * Send a request response notification email to the exhibitor.
 */
export async function sendRequestResponseNotification({
  recipientEmail,
  handlerName,
  messagePreview,
  requestTitle,
  requestUrl,
}: {
  recipientEmail: string
  handlerName: string
  messagePreview: string
  requestTitle: string
  requestUrl: string
}) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `A handler responded to your request on ${siteConfig.name}`,
      react: RequestResponseEmail({
        handlerName,
        messagePreview:
          messagePreview.length > 200
            ? messagePreview.slice(0, 200) + '...'
            : messagePreview,
        requestTitle,
        requestUrl,
      }),
    })
  } catch (error) {
    console.error('Failed to send request response email:', error)
  }
}

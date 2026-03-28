'use server'

import { siteConfig } from '@/config/site'

import { resend } from '@/lib/email'
import { FeedbackFormSchema } from '@/lib/validations/feedback-form'

import { env } from '@/root/env.mjs'
import { z } from 'zod'

type FeedbackFormInputs = z.infer<typeof FeedbackFormSchema>

export async function sendFeedbackEmail(data: FeedbackFormInputs) {
  const result = FeedbackFormSchema.safeParse(data)

  if (result.success) {
    const { name, email, description } = result.data
    try {
      const fromEmail = env.RESEND_FROM_EMAIL
      if (!fromEmail) {
        throw new Error('RESEND_FROM_EMAIL is not set')
      }

      const data = await resend.emails.send({
        from: fromEmail,
        to: [siteConfig.mailSupport],
        reply_to: email,
        subject: `${siteConfig.name} - New Feedback`,
        text: `Name: ${name}\nEmail: ${email}\n\nSuggestion: ${description}`,
      })
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}

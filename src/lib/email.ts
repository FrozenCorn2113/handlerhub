import { env } from '@/root/env.mjs'
import { Resend } from 'resend'

// Use a placeholder key when not configured — actual sends will fail gracefully
// since all call sites wrap resend.emails.send() in try/catch.
export const resend = new Resend(env.RESEND_API_KEY ?? 're_placeholder')

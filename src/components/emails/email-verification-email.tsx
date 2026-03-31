import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { env } from '@/root/env.mjs'
import { Button, Text } from '@react-email/components'

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} - Verify your email address`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Verify your email address</Text>
      <Text style={emailStyles.text}>
        Your email address ({email}) was used to sign up for {siteConfig.name}.
        Please verify it by clicking the button below.
      </Text>
      <Button
        href={`${env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
        style={emailStyles.primaryButton}
      >
        Verify email
      </Button>
      <Text style={{ ...emailStyles.smallText, marginTop: '24px' }}>
        If you did not sign up for {siteConfig.name}, you can safely ignore this
        email.
      </Text>
    </EmailLayout>
  )
}

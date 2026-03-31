import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { env } from '@/root/env.mjs'
import { Button, Text } from '@react-email/components'

interface WelcomeEmailProps {
  email: string
}

const baseUrl = env.NEXT_PUBLIC_APP_URL ?? ''

export function WelcomeEmail({
  email,
}: Readonly<WelcomeEmailProps>): JSX.Element {
  const previewText = `Welcome to ${siteConfig.name}`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Welcome to {siteConfig.name}</Text>
      <Text style={emailStyles.text}>
        Your email address ({email}) has been verified. You can now access all
        features of your account.
      </Text>
      <Text style={emailStyles.text}>
        Complete your profile to get started finding or offering handler
        services.
      </Text>
      <Button href={`${baseUrl}/dashboard`} style={emailStyles.primaryButton}>
        Go to Dashboard
      </Button>
    </EmailLayout>
  )
}

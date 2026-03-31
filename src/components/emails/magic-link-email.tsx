import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { Button, Text } from '@react-email/components'

interface MagicLinkEmailProps {
  identifier: string
  url: string
}

export default function MagicLinkEmail({
  identifier,
  url,
}: MagicLinkEmailProps): JSX.Element {
  const previewText = `${siteConfig.name} - Sign in link`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Sign in to {siteConfig.name}</Text>
      <Text style={emailStyles.text}>
        A sign-in link was requested for {identifier}. Click the button below to
        sign in.
      </Text>
      <Button href={url} style={emailStyles.primaryButton}>
        Sign in
      </Button>
      <Text style={{ ...emailStyles.smallText, marginTop: '24px' }}>
        If you did not request this, you can safely ignore this email.
      </Text>
      <Text style={emailStyles.smallText}>
        Hint: You can set a permanent password in Dashboard &rarr; Settings.
      </Text>
    </EmailLayout>
  )
}

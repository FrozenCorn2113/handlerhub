import { siteConfig } from '@/config/site'

import { absoluteUrl } from '@/lib/utils'

import { EmailLayout, emailStyles } from './email-layout'
import { Button, Text } from '@react-email/components'

interface ResetPasswordEmailProps {
  email: string
  resetPasswordToken: string
}

export function ResetPasswordEmail({
  email,
  resetPasswordToken,
}: Readonly<ResetPasswordEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} - Reset your password`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Reset your password</Text>
      <Text style={emailStyles.text}>
        A password reset was requested for your {siteConfig.name} account (
        {email}). Click the button below to set a new password.
      </Text>
      <Button
        href={absoluteUrl(
          `/signin/password-update?token=${resetPasswordToken}`
        )}
        style={emailStyles.primaryButton}
      >
        Set new password
      </Button>
      <Text style={{ ...emailStyles.smallText, marginTop: '24px' }}>
        If you did not request a password reset, you can safely ignore this
        email. Do not forward this email to anyone.
      </Text>
    </EmailLayout>
  )
}

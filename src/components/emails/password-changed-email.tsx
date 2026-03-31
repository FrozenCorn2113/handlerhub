import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { env } from '@/root/env.mjs'
import { Link, Text } from '@react-email/components'

interface PasswordChangedEmailProps {
  email: string
}

const baseUrl = env.NEXT_PUBLIC_APP_URL ?? ''

export function PasswordChangedEmail({
  email,
}: Readonly<PasswordChangedEmailProps>): JSX.Element {
  const previewText = `Your ${siteConfig.name} password was changed`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Password changed</Text>
      <Text style={emailStyles.text}>
        The password for your {siteConfig.name} account ({email}) was
        successfully changed.
      </Text>
      <Text style={emailStyles.text}>
        If you did not make this change, please{' '}
        <Link href={`${baseUrl}/contact`} style={emailStyles.secondaryLink}>
          contact support
        </Link>{' '}
        immediately and reset your password.
      </Text>
    </EmailLayout>
  )
}

import { siteConfig } from '@/config/site'

import { AuthEmailLayout } from './auth-email-layout'
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
    <AuthEmailLayout previewText={previewText}>
      <Text className="text-lg font-semibold text-gray-900">
        Password changed
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        The password for your {siteConfig.name} account ({email}) was
        successfully changed.
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        If you did not make this change, please{' '}
        <Link
          href={`${baseUrl}/contact`}
          className="font-semibold text-[#1F6B4A] underline"
        >
          contact support
        </Link>{' '}
        immediately and reset your password.
      </Text>
    </AuthEmailLayout>
  )
}

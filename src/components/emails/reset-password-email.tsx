import { siteConfig } from '@/config/site'

import { absoluteUrl } from '@/lib/utils'

import { AuthEmailLayout } from './auth-email-layout'
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
    <AuthEmailLayout previewText={previewText}>
      <Text className="text-lg font-semibold text-gray-900">
        Reset your password
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        A password reset was requested for your {siteConfig.name} account (
        {email}). Click the button below to set a new password.
      </Text>
      <Button
        href={absoluteUrl(
          `/signin/password-update?token=${resetPasswordToken}`
        )}
        className="mt-2 rounded-md bg-[#1F6B4A] px-6 py-3 text-center text-sm font-semibold text-white"
      >
        Set new password
      </Button>
      <Text className="mt-6 text-xs text-gray-400">
        If you did not request a password reset, you can safely ignore this
        email. Do not forward this email to anyone.
      </Text>
    </AuthEmailLayout>
  )
}

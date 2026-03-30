import { siteConfig } from '@/config/site'

import { AuthEmailLayout } from './auth-email-layout'
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
    <AuthEmailLayout previewText={previewText}>
      <Text className="text-lg font-semibold text-gray-900">
        Verify your email address
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        Your email address ({email}) was used to sign up for {siteConfig.name}.
        Please verify it by clicking the button below.
      </Text>
      <Button
        href={`${env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
        className="mt-2 rounded-md bg-[#1F6B4A] px-6 py-3 text-center text-sm font-semibold text-white"
      >
        Verify email
      </Button>
      <Text className="mt-6 text-xs text-gray-400">
        If you did not sign up for {siteConfig.name}, you can safely ignore this
        email.
      </Text>
    </AuthEmailLayout>
  )
}

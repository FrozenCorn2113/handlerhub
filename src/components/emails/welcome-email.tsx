import { siteConfig } from '@/config/site'

import { AuthEmailLayout } from './auth-email-layout'
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
    <AuthEmailLayout previewText={previewText}>
      <Text className="text-lg font-semibold text-gray-900">
        Welcome to {siteConfig.name}
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        Your email address ({email}) has been verified. You can now access all
        features of your account.
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        Complete your profile to get started finding or offering handler
        services.
      </Text>
      <Button
        href={`${baseUrl}/dashboard`}
        className="mt-2 rounded-md bg-[#1F6B4A] px-6 py-3 text-center text-sm font-semibold text-white"
      >
        Go to Dashboard
      </Button>
    </AuthEmailLayout>
  )
}

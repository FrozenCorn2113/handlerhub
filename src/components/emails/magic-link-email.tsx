import { siteConfig } from '@/config/site'

import { AuthEmailLayout } from './auth-email-layout'
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
    <AuthEmailLayout previewText={previewText}>
      <Text className="text-lg font-semibold text-gray-900">
        Sign in to {siteConfig.name}
      </Text>
      <Text className="text-sm leading-6 text-gray-600">
        A sign-in link was requested for {identifier}. Click the button below to
        sign in.
      </Text>
      <Button
        href={url}
        className="mt-2 rounded-md bg-[#1F6B4A] px-6 py-3 text-center text-sm font-semibold text-white"
      >
        Sign in
      </Button>
      <Text className="mt-6 text-xs text-gray-400">
        If you did not request this, you can safely ignore this email.
      </Text>
      <Text className="text-xs text-gray-400">
        Hint: You can set a permanent password in Dashboard &rarr; Settings.
      </Text>
    </AuthEmailLayout>
  )
}

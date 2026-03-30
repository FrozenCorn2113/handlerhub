import { siteConfig } from '@/config/site'

import { env } from '@/root/env.mjs'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface AuthEmailLayoutProps {
  previewText: string
  children: React.ReactNode
}

const baseUrl = env.NEXT_PUBLIC_APP_URL ?? ''

export function AuthEmailLayout({
  previewText,
  children,
}: Readonly<AuthEmailLayoutProps>): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-white font-sans">
          <Container className="mx-auto max-w-[600px] px-6 py-10">
            {/* Logo */}
            <Section className="mb-8 text-center">
              <Img
                src={`${baseUrl}/handler-hub-logo-dark.png`}
                alt={siteConfig.name}
                width={160}
                height={40}
                className="mx-auto"
              />
            </Section>

            {/* Content */}
            <Section>{children}</Section>

            {/* Footer */}
            <Section className="mt-10">
              <Hr className="border-gray-200" />
              <Text className="mt-6 text-center text-xs text-gray-400">
                {siteConfig.name}
              </Text>
              <Text className="mt-1 text-center text-xs text-gray-400">
                <Link
                  href={`${baseUrl}/contact`}
                  className="text-gray-400 underline"
                >
                  Contact support
                </Link>
              </Text>
              <Text className="mt-4 text-center text-xs text-gray-300">
                You received this email because you have an account on{' '}
                {siteConfig.name}. If you did not create an account, you can
                safely ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

import { siteConfig } from '@/config/site'

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface RequestResponseEmailProps {
  handlerName: string
  messagePreview: string
  requestTitle: string
  requestUrl: string
}

export default function RequestResponseEmail({
  handlerName,
  messagePreview,
  requestTitle,
  requestUrl,
}: RequestResponseEmailProps): JSX.Element {
  const previewText = `A handler responded to your request on ${siteConfig.name}`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-lg px-4 py-8">
            <Section>
              <Text className="text-xl font-semibold text-gray-900">
                A handler responded to your request
              </Text>
              <Text className="text-gray-600">
                <strong>{handlerName}</strong> responded to your request &quot;
                {requestTitle}&quot; on {siteConfig.name}:
              </Text>
              <Section className="rounded-lg bg-gray-50 px-4 py-3">
                <Text className="italic text-gray-700">
                  &quot;{messagePreview}&quot;
                </Text>
              </Section>
              <Button
                href={requestUrl}
                className="mt-4 rounded-full bg-[#1F6B4A] px-6 py-3 text-center text-sm font-semibold text-white"
              >
                View Response
              </Button>
            </Section>
            <Section className="mt-8 border-t border-gray-200 pt-4">
              <Text className="text-xs text-gray-400">
                This email was sent from {siteConfig.name}. You can manage your
                notification preferences in your dashboard settings.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

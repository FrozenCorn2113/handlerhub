import { siteConfig } from '@/config/site'

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface EmailLayoutProps {
  previewText: string
  children: React.ReactNode
  unsubscribeUrl?: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

export function EmailLayout({
  previewText,
  children,
  unsubscribeUrl,
}: Readonly<EmailLayoutProps>): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body
        style={{
          backgroundColor: '#F8F4EE',
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: '0',
          padding: '0',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 20px',
          }}
        >
          {/* Header with wordmark */}
          <Section
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              border: '1px solid #D4CFC4',
              borderBottom: 'none',
              padding: '32px 40px',
              textAlign: 'center' as const,
            }}
          >
            <Text
              style={{
                margin: '0',
                fontSize: '24px',
                lineHeight: '1',
                color: '#1C1208',
              }}
            >
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                }}
              >
                Handler
              </span>
              <span
                style={{
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  borderBottom: '2px solid #1F6B4A',
                  paddingBottom: '2px',
                }}
              >
                Hub
              </span>
            </Text>
          </Section>

          {/* Divider below header */}
          <Hr
            style={{
              borderTop: '1px solid #D4CFC4',
              margin: '0',
            }}
          />

          {/* Content area */}
          <Section
            style={{
              backgroundColor: '#FFFFFF',
              padding: '32px 40px',
              border: '1px solid #D4CFC4',
              borderTop: 'none',
              borderBottom: 'none',
            }}
          >
            {children}
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              border: '1px solid #D4CFC4',
              borderTop: 'none',
              padding: '0 40px 24px',
            }}
          >
            <Hr
              style={{
                borderTop: '1px solid #D4CFC4',
                margin: '0 0 24px 0',
              }}
            />
            <Text
              style={{
                fontSize: '13px',
                color: '#7A6E5E',
                textAlign: 'center' as const,
                margin: '0 0 8px 0',
              }}
            >
              {siteConfig.name}
            </Text>
            <Text
              style={{
                fontSize: '13px',
                color: '#7A6E5E',
                textAlign: 'center' as const,
                margin: '0 0 16px 0',
              }}
            >
              <Link
                href={`${baseUrl}/help`}
                style={{ color: '#7A6E5E', textDecoration: 'underline' }}
              >
                Help Center
              </Link>
              {' | '}
              <Link
                href={`${baseUrl}/contact`}
                style={{ color: '#7A6E5E', textDecoration: 'underline' }}
              >
                Contact Support
              </Link>
              {unsubscribeUrl ? (
                <>
                  {' | '}
                  <Link
                    href={unsubscribeUrl}
                    style={{ color: '#7A6E5E', textDecoration: 'underline' }}
                  >
                    Unsubscribe
                  </Link>
                </>
              ) : null}
            </Text>
            <Text
              style={{
                fontSize: '12px',
                color: '#7A6E5E',
                textAlign: 'center' as const,
                margin: '0',
              }}
            >
              You received this because you have an account on {siteConfig.name}
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Shared style constants for child templates
export const emailStyles = {
  heading: {
    fontFamily: 'Georgia, serif',
    fontSize: '28px',
    fontWeight: 300 as const,
    color: '#1C1208',
    lineHeight: '1.3',
    margin: '0 0 16px 0',
  },
  text: {
    fontSize: '16px',
    color: '#1C1208',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  smallText: {
    fontSize: '13px',
    color: '#7A6E5E',
    lineHeight: '1.5',
    margin: '0 0 8px 0',
  },
  primaryButton: {
    backgroundColor: '#1F6B4A',
    color: '#F8F4EE',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontWeight: 500 as const,
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
  },
  secondaryLink: {
    color: '#1F6B4A',
    textDecoration: 'underline',
  },
  infoBox: {
    backgroundColor: '#F8F4EE',
    border: '1px solid #D4CFC4',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '16px 0',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#7A6E5E',
    margin: '0 0 2px 0',
    lineHeight: '1.4',
  },
  infoValue: {
    fontSize: '16px',
    color: '#1C1208',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
    fontWeight: 500 as const,
  },
}

import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { Button, Section, Text } from '@react-email/components'

interface NewMessageEmailProps {
  senderName: string
  messagePreview: string
  conversationUrl: string
}

export default function NewMessageEmail({
  senderName,
  messagePreview,
  conversationUrl,
}: NewMessageEmailProps): JSX.Element {
  const previewText = `${senderName} sent you a message on ${siteConfig.name}`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>New message from {senderName}</Text>
      <Text style={emailStyles.text}>
        You received a new message on {siteConfig.name}:
      </Text>
      <Section style={emailStyles.infoBox}>
        <Text
          style={{
            fontSize: '15px',
            color: '#1C1208',
            fontStyle: 'italic',
            margin: '0',
            lineHeight: '1.6',
          }}
        >
          &quot;{messagePreview}&quot;
        </Text>
      </Section>
      <Section style={{ textAlign: 'center' as const, margin: '24px 0 0 0' }}>
        <Button href={conversationUrl} style={emailStyles.primaryButton}>
          View Conversation
        </Button>
      </Section>
    </EmailLayout>
  )
}

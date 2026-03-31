import { siteConfig } from '@/config/site'

import { EmailLayout, emailStyles } from './email-layout'
import { Button, Section, Text } from '@react-email/components'

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
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>
        A handler responded to your request
      </Text>
      <Text style={emailStyles.text}>
        <strong>{handlerName}</strong> responded to your request &quot;
        {requestTitle}&quot; on {siteConfig.name}:
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
        <Button href={requestUrl} style={emailStyles.primaryButton}>
          View Response
        </Button>
      </Section>
    </EmailLayout>
  )
}

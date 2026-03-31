import { EmailLayout, emailStyles } from './email-layout'
import { Button, Section, Text } from '@react-email/components'

interface ReviewPromptEmailProps {
  userName: string
  otherPartyName: string
  showName: string
  showDate: string
  reviewUrl: string
}

export default function ReviewPromptEmail({
  userName,
  otherPartyName,
  showName,
  showDate,
  reviewUrl,
}: ReviewPromptEmailProps): JSX.Element {
  const previewText = `How did it go at ${showName}?`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>How did it go?</Text>
      <Text style={emailStyles.text}>
        Hi {userName}, your booking with <strong>{otherPartyName}</strong> at{' '}
        <strong>{showName}</strong> on {showDate} is complete.
      </Text>

      <Text style={emailStyles.text}>
        Your feedback helps the HandlerHub community. Take a moment to share how
        it went.
      </Text>

      <Section style={{ textAlign: 'center' as const, margin: '24px 0 0 0' }}>
        <Button href={reviewUrl} style={emailStyles.primaryButton}>
          Leave a Review
        </Button>
      </Section>

      <Text style={emailStyles.smallText}>
        Reviews help handlers build their reputation and help exhibitors find
        the right match.
      </Text>
    </EmailLayout>
  )
}

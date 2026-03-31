import { EmailLayout, emailStyles } from './email-layout'
import { env } from '@/root/env.mjs'
import { Button, Section, Text } from '@react-email/components'

interface BookingDeclinedEmailProps {
  exhibitorName: string
  handlerName: string
  dogName: string
  showName: string
  bookingUrl: string
}

const baseUrl = env.NEXT_PUBLIC_APP_URL ?? ''

export default function BookingDeclinedEmail({
  exhibitorName,
  handlerName,
  dogName,
  showName,
  bookingUrl,
}: BookingDeclinedEmailProps): JSX.Element {
  const previewText = `${handlerName} isn't available for your booking`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Booking Update</Text>
      <Text style={emailStyles.text}>
        Hi {exhibitorName}, unfortunately <strong>{handlerName}</strong>{' '}
        isn&apos;t available for <strong>{dogName}</strong> at{' '}
        <strong>{showName}</strong>.
      </Text>

      <Text style={emailStyles.text}>
        Don&apos;t worry -- there are plenty of other great handlers on
        HandlerHub who can help.
      </Text>

      <Section style={{ textAlign: 'center' as const, margin: '24px 0 0 0' }}>
        <Button href={`${baseUrl}/handlers`} style={emailStyles.primaryButton}>
          Find Another Handler
        </Button>
      </Section>

      <Text style={emailStyles.smallText}>
        You can also view the original booking details{' '}
        <a href={bookingUrl} style={emailStyles.secondaryLink}>
          here
        </a>
        .
      </Text>
    </EmailLayout>
  )
}

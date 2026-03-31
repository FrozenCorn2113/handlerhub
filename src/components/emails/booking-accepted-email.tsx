import { EmailLayout, emailStyles } from './email-layout'
import { Button, Section, Text } from '@react-email/components'

interface BookingAcceptedEmailProps {
  exhibitorName: string
  handlerName: string
  dogName: string
  showName: string
  showDate: string
  bookingUrl: string
}

export default function BookingAcceptedEmail({
  exhibitorName,
  handlerName,
  dogName,
  showName,
  showDate,
  bookingUrl,
}: BookingAcceptedEmailProps): JSX.Element {
  const previewText = `Great news! ${handlerName} accepted your booking for ${dogName}`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>Booking Accepted</Text>
      <Text style={emailStyles.text}>
        Great news, {exhibitorName}! <strong>{handlerName}</strong> accepted
        your booking for <strong>{dogName}</strong>.
      </Text>

      <Section style={emailStyles.infoBox}>
        <Text style={emailStyles.infoLabel}>Handler</Text>
        <Text style={emailStyles.infoValue}>{handlerName}</Text>
        <Text style={emailStyles.infoLabel}>Show</Text>
        <Text style={emailStyles.infoValue}>{showName}</Text>
        <Text style={emailStyles.infoLabel}>Date</Text>
        <Text style={emailStyles.infoValue}>{showDate}</Text>
        <Text style={emailStyles.infoLabel}>Dog</Text>
        <Text style={{ ...emailStyles.infoValue, margin: '0' }}>{dogName}</Text>
      </Section>

      <Section style={{ textAlign: 'center' as const, margin: '24px 0 0 0' }}>
        <Button href={bookingUrl} style={emailStyles.primaryButton}>
          View Booking
        </Button>
      </Section>

      <Text style={emailStyles.smallText}>
        You can message your handler directly through the booking page if you
        need to coordinate any details.
      </Text>
    </EmailLayout>
  )
}

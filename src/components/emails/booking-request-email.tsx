import { EmailLayout, emailStyles } from './email-layout'
import { Button, Section, Text } from '@react-email/components'

interface ServiceItem {
  name: string
  price: number
}

interface BookingRequestEmailProps {
  handlerName: string
  exhibitorName: string
  dogName: string
  showName: string
  showDate: string
  services: ServiceItem[]
  totalPrice: number
  bookingUrl: string
}

export default function BookingRequestEmail({
  handlerName,
  exhibitorName,
  dogName,
  showName,
  showDate,
  services,
  totalPrice,
  bookingUrl,
}: BookingRequestEmailProps): JSX.Element {
  const previewText = `${exhibitorName} wants to book you for ${dogName} at ${showName}`

  return (
    <EmailLayout previewText={previewText}>
      <Text style={emailStyles.heading}>New Booking Request</Text>
      <Text style={emailStyles.text}>
        Hi {handlerName}, <strong>{exhibitorName}</strong> wants you for{' '}
        <strong>{dogName}</strong> at <strong>{showName}</strong>.
      </Text>

      <Section style={emailStyles.infoBox}>
        <Text style={emailStyles.infoLabel}>Show</Text>
        <Text style={emailStyles.infoValue}>{showName}</Text>
        <Text style={emailStyles.infoLabel}>Date</Text>
        <Text style={emailStyles.infoValue}>{showDate}</Text>
        <Text style={emailStyles.infoLabel}>Dog</Text>
        <Text style={emailStyles.infoValue}>{dogName}</Text>
        <Text style={emailStyles.infoLabel}>Services</Text>
        {services.map((service, index) => (
          <Text
            key={index}
            style={{
              fontSize: '15px',
              color: '#1C1208',
              margin: '0 0 4px 0',
              lineHeight: '1.4',
            }}
          >
            {service.name} — ${service.price.toFixed(2)}
          </Text>
        ))}
        <Text
          style={{
            fontSize: '16px',
            color: '#1C1208',
            fontWeight: 600,
            margin: '12px 0 0 0',
            lineHeight: '1.4',
            borderTop: '1px solid #D4CFC4',
            paddingTop: '12px',
          }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </Section>

      <Section style={{ textAlign: 'center' as const, margin: '24px 0 0 0' }}>
        <Button href={bookingUrl} style={emailStyles.primaryButton}>
          View Booking
        </Button>
      </Section>

      <Text style={emailStyles.smallText}>
        Please respond to this booking request as soon as possible. The
        exhibitor will be notified of your decision.
      </Text>
    </EmailLayout>
  )
}

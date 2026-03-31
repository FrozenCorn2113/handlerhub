import { EmailLayout, emailStyles } from './email-layout'
import { Section, Text } from '@react-email/components'

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

export default function ContactFormEmail({
  name,
  email,
  message,
}: ContactFormEmailProps) {
  return (
    <EmailLayout previewText="New contact form submission">
      <Text style={emailStyles.heading}>New Form Submission</Text>
      <Text style={emailStyles.text}>
        You just received a contact form submission. Here are the details:
      </Text>
      <Section style={emailStyles.infoBox}>
        <Text style={emailStyles.infoLabel}>Name</Text>
        <Text style={emailStyles.infoValue}>{name}</Text>
        <Text style={emailStyles.infoLabel}>Email</Text>
        <Text style={emailStyles.infoValue}>{email}</Text>
        <Text style={emailStyles.infoLabel}>Message</Text>
        <Text style={{ ...emailStyles.infoValue, margin: '0' }}>{message}</Text>
      </Section>
    </EmailLayout>
  )
}

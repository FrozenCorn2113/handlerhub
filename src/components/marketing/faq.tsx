import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FAQProps = {
  className?: string
}

const pricingFaqData = [
  {
    id: 'item-1',
    question: 'What is the Founding Handler Program?',
    answer:
      'The Founding Handler Program is our exclusive launch initiative for professional dog handlers. Join completely free during our beta phase and help shape the future of handler booking. Founding handlers get lifetime access with zero fees - no subscription charges, no commission on bookings, ever.',
  },
  {
    id: 'item-2',
    question: 'Is HandlerHub really free for handlers?',
    answer:
      'Yes! During our launch phase, all handlers join 100% free as founding members. There are no subscription fees, no commission on bookings, and no hidden charges. We want to build the best handler marketplace with input from professional handlers like you.',
  },
  {
    id: 'item-3',
    question: 'Will it always be free for handlers?',
    answer:
      'Founding handlers who join during our launch phase will maintain their free access forever. This is our way of thanking early adopters for helping us build and improve HandlerHub. Future pricing may be introduced for new handlers, but founding members are grandfathered in.',
  },
  {
    id: 'item-4',
    question: 'How does HandlerHub work for exhibitors?',
    answer:
      'Exhibitors can browse handler profiles, filter by breed specialty, location, and experience, then send booking requests directly to handlers. Save your dog profiles for quick bookings, track all your requests in one dashboard, and connect with professional handlers across the country - all completely free.',
  },
  {
    id: 'item-5',
    question: 'Do exhibitors pay to use HandlerHub?',
    answer:
      'No! HandlerHub is free for both exhibitors and founding handlers. We believe in making it easy for the dog show community to connect and work together without barriers.',
  },
  {
    id: 'item-6',
    question: 'What features do handlers get?',
    answer:
      'Handlers can create comprehensive professional profiles showcasing their experience, breed specialties, show wins, and pricing. Receive booking requests directly from exhibitors, manage your availability calendar, display your credentials and insurance, and connect with new clients nationwide.',
  },
  {
    id: 'item-7',
    question: 'How do I get started as a handler?',
    answer:
      'Simply register for a free account, select "Handler" as your role, and complete your professional profile. Add your experience, breed specialties, services offered, and pricing. Once published, exhibitors can find you and send booking requests directly.',
  },
  {
    id: 'item-8',
    question: 'Can I be both an exhibitor and handler?',
    answer:
      'Currently, accounts are set up as either exhibitor or handler during registration. If you need both roles, please contact our support team and we can help set up dual access for your account.',
  },
]

export default function FAQ({ className }: FAQProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full text-left ' + className)}
    >
      {pricingFaqData.map((faqItem) => (
        <AccordionItem key={faqItem.id} value={faqItem.id}>
          <AccordionTrigger>{faqItem.question}</AccordionTrigger>
          <AccordionContent>{faqItem.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

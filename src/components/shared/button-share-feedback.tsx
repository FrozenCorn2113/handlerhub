import Link from 'next/link'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'

import { ChatText } from '@phosphor-icons/react/dist/ssr'

export default function ButtonShareFeedback() {
  return (
    <Link
      href="/feedback"
      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'px-4')}
    >
      <ChatText className="mr-2 size-4" />
      <p>Share a feedback</p>
    </Link>
  )
}

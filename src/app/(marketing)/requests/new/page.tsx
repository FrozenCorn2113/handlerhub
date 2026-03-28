import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { NewRequestForm } from '@/components/requests/new-request-form'
import { WebmakerShell } from '@/components/webmaker/shell'

export const metadata = {
  title: 'Post a Request | HandlerHub',
}

export default async function NewRequestPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?next=/requests/new')
  }

  return (
    <WebmakerShell>
      <NewRequestForm />
    </WebmakerShell>
  )
}

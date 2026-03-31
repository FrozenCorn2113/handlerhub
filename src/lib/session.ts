import { cache } from 'react'

import { auth } from '@/lib/auth/auth'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  console.log('[getCurrentUser]', {
    hasSession: !!session,
    hasUser: !!session?.user,
    userId: session?.user?.id,
  })
  if (!session?.user) {
    return undefined
  }
  return session.user
})

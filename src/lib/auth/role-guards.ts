import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

export async function requireHandler() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== 'HANDLER') redirect('/e')
  return user
}

export async function requireExhibitor() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== 'EXHIBITOR') redirect('/h')
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== 'ADMIN') redirect('/login')
  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

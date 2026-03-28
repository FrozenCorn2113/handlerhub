import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'

import { z } from 'zod'

const roleSchema = z.object({
  role: z.enum(['HANDLER', 'EXHIBITOR']),
})

export const POST = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return new Response('Not authenticated', { status: 401 })
  }

  const json = await req.json().catch(() => null)
  const parsed = roleSchema.safeParse(json)
  if (!parsed.success) {
    return new Response('Invalid request body', { status: 422 })
  }

  // Prevent privilege escalation.
  if (parsed.data.role !== 'HANDLER' && parsed.data.role !== 'EXHIBITOR') {
    return new Response('Invalid role', { status: 422 })
  }

  await prisma.user.update({
    where: { id: req.auth.user.id },
    data: { role: parsed.data.role },
  })

  return Response.json({ role: parsed.data.role })
})

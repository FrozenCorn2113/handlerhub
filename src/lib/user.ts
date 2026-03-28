import { prisma } from '@/lib/db'
import { withTimeout } from '@/lib/with-timeout'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await withTimeout(
      prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          name: true,
          email: true,
          password: true,
          emailVerified: true,
        },
      }),
      800,
      'getUserByEmail timed out'
    )

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await withTimeout(
      prisma.user.findUnique({ where: { id } }),
      800,
      'getUserById timed out'
    )

    return user
  } catch {
    return null
  }
}

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
      5000,
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
      5000,
      'getUserById timed out'
    )

    return user
  } catch (error) {
    console.error(
      '[getUserById] failed:',
      error instanceof Error ? error.message : error
    )
    return null
  }
}

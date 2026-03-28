import { PrismaClient } from '@prisma/client'
import 'server-only'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

function getDatabaseUrl(): string | undefined {
  const url =
    process.env.POSTGRES_DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_DATABASE_URL

  if (!url) return undefined

  // Supabase requires SSL; make local dev more forgiving if omitted.
  if (url.includes('supabase.co') && !url.includes('sslmode=')) {
    const joiner = url.includes('?') ? '&' : '?'
    return `${url}${joiner}sslmode=require`
  }

  return url
}

export let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasources: {
        db: {
          url: getDatabaseUrl(),
        },
      },
    })
  }
  prisma = global.cachedPrisma
}
